# Tower Battle Intel v4.11a Build Report

## Build type

Full project build, desktop-first cleanup pass.

## Baseline

Started from the confirmed working `v4.10y` cleaned checkpoint.

## Main goal

Preserve the current mockup look and working desktop behaviour while isolating desktop from mobile-specific UI bleed. Mobile is not repaired in this build; it is reserved for v4.11b.

## Changes made

- Updated app version to `v4.11a`.
- Added `src/ui/platformIsolationGuard.js`.
- Loaded the platform isolation guard before the app module.
- Unified the desktop/mobile threshold around `800px`.
- Added desktop CSS guard rules that hide mobile-only controls on desktop.
- Added a mobile isolation notice without changing mobile behaviour.
- Updated current tests to v4.11a.
- Kept the recovered import/export/download/dropdown/search stack intact.
- Did not redesign the mockup.

## Tests run

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

All passed in the build environment.

## Browser checks

```js
TowerBattleIntel?.version
TowerBattleIntelPlatformIsolationGuard?.status()
TowerBattleIntelNativeControls?.status()
```

Expected version: `v4.11a`.

## Next step

Use this as the desktop protected baseline. Then start `v4.11b` as the mobile-only repair pass.
