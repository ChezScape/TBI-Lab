Tower Battle Intel v4.11a8 Dashboard Concept 5 Desktop Rebuild Patch

What this patch does:
- Desktop-only dashboard mockup alignment pass.
- Keeps the Concept 5 two-column desktop composition instead of collapsing too early.
- Makes the right rail match the mockup proportions better.
- Compacts Run A / VS / Run B by moving duplicate footer values into the Coins/Cells metric tiles.
- Keeps the four-card primary and secondary matrix on desktop.
- Adds 720p-height compaction so the dashboard should feel like the mockup in Chrome at desktop 720p.
- Makes Quick Actions use the mockup-like 4 small buttons + 2 wide buttons layout.
- Does not modify mobile.css.
- Does not touch parser, save data, battle history, report import/export, storage, or game-brain files.

Files included:
- desktop-dashboard-concept5-rebuild.css
- desktop-dashboard-concept5-rebuild.js
- apply-dashboard-concept5-rebuild.ps1
- README_DASHBOARD_CONCEPT5_REBUILD_PATCH.txt
- DASHBOARD_CONCEPT5_REBUILD_AUDIT_NOTES.txt

Install:
1. Unzip these files into the Tower Battle Intel project folder that contains desktop.css and index.html.
2. In PowerShell, open that same folder.
3. Run:

   powershell -ExecutionPolicy Bypass -File .\apply-dashboard-concept5-rebuild.ps1

4. Hard refresh Chrome with Ctrl+F5.

Rollback:
The patch creates timestamped backups:
- desktop.css.backup-v4.11a8-YYYYMMDD-HHMMSS
- index.html.backup-v4.11a8-YYYYMMDD-HHMMSS

To rollback, rename/copy those backups back to desktop.css and index.html, then delete desktop-dashboard-concept5-rebuild.js if you want it removed.
