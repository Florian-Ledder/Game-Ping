const express = require('express');
const cors = require('cors');
const { GameDig } = require('gamedig');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors()); 
const dbConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'db_config.json'), 'utf-8')
);

let db;

if (dbConfig.use_remote_sql) {
  const mysql = require('mysql2');
  db = mysql.createConnection(dbConfig.remote).promise();
  console.log('Remote SQL aktiv');
} else {
  const sqlite3 = require('sqlite3').verbose();
  const sqliteDb = new sqlite3.Database(path.join(__dirname, 'status.db'));

  db = {
    execute: (sql, params = []) =>
      new Promise((res, rej) =>
        sqliteDb.all(sql, params, (e, r) => (e ? rej(e) : res([r])))
      ),
    run: (sql, params = []) =>
      new Promise((res, rej) =>
        sqliteDb.run(sql, params, function (e) {
          e ? rej(e) : res([{ insertId: this.lastID }]);
        })
      )
  };
  console.log('SQLite aktiv');
}

async function initDB() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS logs (
      id TEXT,
      online INTEGER,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
initDB();
async function getLastOnline(id) {
  const [rows] = await db.execute(
    `SELECT timestamp FROM logs 
     WHERE id = ? AND online = 1 
     ORDER BY timestamp DESC LIMIT 1`,
    [id]
  );
  return rows.length ? rows[0].timestamp : null;
}

async function queryServer(srv) {
  let online = 0;
  let state = null;

  try {
    state = await GameDig.query({
      type: srv.type,
      host: srv.host,
      port: parseInt(srv.port),
      checkPlayers: true,
      requestRules: true
    });
    online = 1;
  } catch (_) {
    online = 0;
  }

  await db.execute(
    `INSERT INTO logs (id, online) VALUES (?, ?)`,
    [srv.id, online]
  );

  const lastOnline = online ? null : await getLastOnline(srv.id);

  return {
    id: srv.id,
    domain: srv.host,
    online: !!online,
    lastOnline,
    state
  };
}

function loadServers() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, 'server.json'), 'utf-8')
  );
}

app.get('/api/full', async (req, res) => {
  const servers = loadServers();

  const result = await Promise.all(
    servers.map(async (srv) => {
      const r = await queryServer(srv);

      // Uptime direkt hier berechnen
      const [stats] = await db.execute(
        `SELECT COUNT(*) as total, SUM(online) as success FROM logs WHERE id = ?`,
        [srv.id]
      );
      
      const total = stats[0].total || 1;
      const success = stats[0].success || 0;
      const uptimeValue = ((success * 100) / total).toFixed(2);

      return {
        ...srv,
        online: r.online,
        lastOnline: r.lastOnline,
        uptime: uptimeValue,
        ...(r.online ? r.state : {})
      };
    })
  );

  res.json(result);
});

app.get('/api/cut', async (req, res) => {
  const servers = loadServers();

  const result = await Promise.all(
    servers.map(async (srv) => {
      const r = await queryServer(srv);

      return {
        id: r.id,
        domain: r.domain,
        online: r.online,
        players: r.online ? r.state.players.length : 0,
        maxPlayers: r.online ? r.state.maxplayers : null,
        ...(r.online ? {} : { lastOnline: r.lastOnline })
      };
    })
  );

  res.json(result);
});

app.get('/api/stream', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  const send = async () => {
    const servers = loadServers();
    const data = await Promise.all(servers.map(queryServer));
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  send();
  const interval = setInterval(send, 1000);

  req.on('close', () => clearInterval(interval));
});

app.listen(3000, () =>
  console.log('API at http://localhost:3000')
);