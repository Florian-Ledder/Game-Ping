# Server Monitor (Beta)

![Status](https://img.shields.io/badge/Status-Beta-orange?style=for-the-badge)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Gamedig](https://img.shields.io/badge/Powered%20by-Gamedig-ff69b4?style=for-the-badge)
<p align="left">
  <a href="https://flowcommunity.de">
    <img src="https://img.shields.io/badge/FlowCommunity-Server-black?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTEyIDJMMiA3djEwbDEwIDUgMTAtNVY3TDEyIDJ6bTAgMi44Mmw2LjI4IDMuMThMMTIgMTEuMTggNS43MiA4IDEyIDQuODJ6TTQgOC44Nmw3IDMuNTV2Ny4zMmwtNy0zLjV2LTcuMzd6bTEzIDcuMzhsLTcgMy41di03LjMybDcgLTMuNTV2Ny4zN3oiLz48L3N2Zz4=" />
  </a>
  <a href="https://flowcommunity.de">
    <img src="https://img.shields.io/badge/FlowCommunity-Monitor-black?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTMuNSAxOC41TDUgMTEuOWw0LjMgNC4zIDUuNy03IDMuNSAzLjVMOC41IDQuN0wyIDExLjJsMS41IDcuM3pNMjAgMmgtMnYyMGgyVjJ6Ii8+PC9zdmc+" />
  </a>
</p>
[Deutsch](#deutsch) | [English](#english)

---

<a name="deutsch"></a>
## 🇩🇪 Deutsch

Ein leistungsstarker Multi-Server-Monitor für Gameserver (Minecraft, ARK, etc.), basierend auf Node.js, GameDig und SQL.

### Features
* **Auto-Grouping:** Erkennt Server-IDs automatisch und gruppiert die Ansi![Uploading full_html.PNG…]()
cht dynamisch.
* **Hybrid-SQL:** Unterstützt lokale SQLite-Datenbanken oder externe MySQL/MariaDB-Server.
* **Uptime-Tracking:** Berechnet die Verfügbarkeit basierend auf historischen Scan-Daten.
* **Duale API:** * `/api/full` für Administratoren (voller Daten-Dump).
    * `/api/cut` für öffentliche Status-Anzeigen (leichtgewichtig).

### Installation
1. Repository klonen.
2. `npm install` ausführen.
3. `server.json` mit deinen Serverdaten füllen.
4. `db_config.json` für SQL-Zugriff konfigurieren.
5. `node index.js` starten.

### API Endpunkte
* **GET** `/api/full` - Liefert alle Gamedig-Daten inkl. Uptime.
* **GET** `/api/cut` - Liefert nur ID, Status und Spielerzahlen.

---

<a name="english"></a>
## 🇺🇸 English

A powerful multi-server monitor for game servers (Minecraft, ARK: SE, etc.) built with Node.js, GameDig, and SQL.

### Features
* **Auto-Grouping:** Automatically detects server IDs and groups the view dynamically.
* **Hybrid SQL Support:** Supports local SQLite databases or external MySQL/MariaDB servers.
* **Uptime Tracking:** Calculates availability based on historical scan data.
* **Dual API Endpoints:** * `/api/full`: Designed for administrators (full data dump).
    * `/api/cut`: Designed for public status displays (lightweight).

### Installation
1. **Clone** the repository.
2. Run `npm install` to install dependencies.
3. Fill `server.json` with your server connection details.
4. Configure `db_config.json` for SQL access.
5. Start the application with `node index.js`.

### API Endpoints
* **GET** `/api/full` – Returns all GameDig data including calculated uptime.
* **GET** `/api/cut` – Returns a minimized dataset (ID, status, and player counts).

---

## License / Lizenz
This project is licensed under the MIT License.
