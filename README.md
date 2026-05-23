# Tower Battle Intel v4.11a5

Current working line: **v4.11a5 Desktop Polish Full Build**.

This project is a local/browser-based Battle Report Intelligence Dashboard.

## Current state

- Desktop is the protected working side.
- Mobile repair is intentionally not part of this build.
- Import/export/download/dropdown/search recovery stack is preserved.
- History Stats, Systems, and Command Deck desktop presentation have been polished.

## Run locally

```powershell
npx --yes http-server . -p 8080 -c-1
```

Open:

```text
http://localhost:8080/
```

## Browser checks

```js
TowerBattleIntel?.version
TowerBattleIntelPlatformIsolationGuard?.status()
TowerBattleIntelDesktopPolishGuard?.status()
TowerBattleIntelNativeControls?.status()
```

Expected version: `v4.11a5`.

## Current tests

```powershell
node .\tests\current-v4.11a5-checkpoint.test.mjs
node .\tests\current-v4.11a5-desktop-polish.test.mjs
node .\tests\diagnostics-foundation.test.mjs
node .\tests\pipeline-foundation.test.mjs
node .\tests\report-parser-game-brain.test.mjs
node .\tests\ui-action-foundation.test.mjs
node .\tests\ui-render-layer.test.mjs
node .\tests\history-storage-ui-utils.test.mjs
node .\tests\browser-interaction-bridge-foundation.test.mjs
node .\tests\dropdown-collapsible-fix.test.mjs
node .\tests\history-search-focus-fix.test.mjs
node .\tests\native-import-placement.test.mjs
```

## Next version

If desktop is approved, start `v4.11b` as the mobile-only repair pass.


## v4.11a5 Command Deck Dedup

Desktop Command Deck top controls now use useful shortcuts only: Open History, Import History, Export History, and Open Debug. Save Report, Build, Clear Input, and Clear Runs remain only in the Battle Report Input console below.


## v4.11a5 Command Deck Layout Cleanup

Desktop-only layout polish. Command Deck, Current Data, and Battle Report Input now share one aligned desktop width so maximised windows do not make the input console look detached.
