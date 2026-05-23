# Tower Battle Intel v4.11a1 Clean Checkpoint

Current working line: **v4.11a1 working-local cleanup checkpoint**.

This project is the cleaned recovery checkpoint after the v4.10m–v4.10y control/download/import recovery chain plus v4.11a1 desktop lock.

## What works in this checkpoint

- Desktop dashboard shell loads.
- Top tabs work.
- History import picker works and commits selected history JSON.
- History export downloads JSON.
- Debug Health JSON and Full Debug JSON downloads work.
- Stats JSON download works.
- Native dropdowns work normally.
- Details/collapsible panels work normally.
- History search keeps focus while typing.
- Core parser, pipeline, diagnostics, render, UI action, and history utility tests pass.

## Cleaned out

The old drop-in patch scripts and root patch README files have been removed from the project root.

Legacy patch-specific tests were moved to:

```text
tests/legacy-patch-tests/
```

Legacy patch notes were moved to:

```text
docs/legacy-patch-notes/
```

They are kept for reference only. They are not part of the current test run.

## Run local server

```powershell
npx --yes http-server . -p 8080 -c-1
```

Open:

```text
http://localhost:8080/
```

## Current test set

Run from the project root:

```powershell
node .\tests\current-v4.11a1-checkpoint.test.mjs
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

## Next recommended work

Do not add major features directly on this checkpoint. Use this as the rollback point, then start a new `v4.11` branch for deeper consolidation and performance cleanup.

## v4.11a1 Desktop Polish Lock

Desktop-only polish checkpoint built on top of v4.11a Desktop Lock. Mobile repair is intentionally deferred to v4.11b.

Check:

```powershell
node .\tests\current-v4.11a1-desktop-polish.test.mjs
```

Browser:

```js
TowerBattleIntel?.version
TowerBattleIntelDesktopPolishGuard?.status()
```
