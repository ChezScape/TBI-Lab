# Tower Battle Intel v4.11a Clean Checkpoint

## Purpose

This cleanup checkpoint preserves the working v4.11a local build while removing the temporary drop-in patch clutter from the project root.

## Cleanup performed

- Removed `.git` from the distributable zip.
- Removed old `apply-v4.10*.ps1` patch scripts from the root.
- Removed old `README_DROP_IN_PATCH_v4.10*.txt` files from the root.
- Removed the temporary `patch/` folder because its CSS patches are already merged into `desktop.css` and `mobile.css`.
- Moved old patch-specific tests into `tests/legacy-patch-tests/` and renamed them to `.legacy.mjs.txt` so they do not run accidentally.
- Moved old patch notes into `docs/legacy-patch-notes/`.
- Updated stale file headers and bridge version constants to `v4.11a`.
- Added `tests/current-v4.11a-checkpoint.test.mjs` for the cleaned checkpoint.
- Updated the root README with the current test set.

## Current runtime stack

The app still keeps the working recovery bridges. They have not been deeply consolidated yet because that would be a higher-risk refactor.

Current active bridge stack:

- `nativeControlGuard.js`
- `staticControlBridge.js`
- `liveInteractionBridge.js`
- `nativeImportHardBridge.js`
- `actionAuditBridge.js`
- `finalControlPolishBridge.js`
- `universalDownloadBridge.js`
- `historySearchFocusGuard.js`

## Current passing tests

Run from the project root:

```powershell
node .\tests\current-v4.11a-checkpoint.test.mjs
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

## Recommended next branch

Use this as the rollback checkpoint. Start deeper cleanup/performance work as `v4.11`, not by changing this checkpoint directly.
