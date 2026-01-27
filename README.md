#Server Monitor (Beta)

Ein leistungsstarker Multi-Server-Monitor für Gameserver (Minecraft, ARK, etc.), basierend auf Node.js, GameDig und SQL.

## Features
- **Auto-Grouping:** Erkennt Server-IDs automatisch und gruppiert die Ansicht.
- **Hybrid-SQL:** Unterstützt lokale SQLite-Datenbanken oder externe MySQL/MariaDB-Server.
- **Uptime-Tracking:** Berechnet die Verfügbarkeit basierend auf historischen Scan-Daten.
- **Duale API:** - `/api/full` für Administratoren (voller Daten-Dump).
  - `/api/cut` für öffentliche Status-Anzeigen (leichtgewichtig).

## Installation
1. Repository klonen.
2. `npm install` ausführen.
3. `server.json` mit deinen Serverdaten füllen.
4. `db_config.json` für SQL-Zugriff konfigurieren.
5. `node index.js` starten.

## API Endpunkte
- `GET /api/full` - Liefert alle Gamedig-Daten inkl. Uptime.
- `GET /api/cut` - Liefert nur ID, Status und Spielerzahlen.
