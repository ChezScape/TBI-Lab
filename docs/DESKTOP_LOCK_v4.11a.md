# Tower Battle Intel v4.11a Desktop-Locked Cleanup

## Purpose

v4.11a is a conservative desktop-first cleanup build. It keeps the current mockup look and preserves the recovered v4.10y control stack while isolating desktop from mobile bleed.

## What changed

- Version moved to `v4.11a`.
- Added `src/ui/platformIsolationGuard.js`.
- Unified desktop threshold around `800px`.
- Desktop keeps `desktop.css`; mobile keeps `mobile.css`.
- Desktop hides mobile-only controls using `[data-device-only="mobile"]` and specific mobile rail/FAB/sheet selectors.
- Mobile behaviour is deliberately not repaired in this build; it is reserved for v4.11b.

## What did not change

- Mockup layout is not redesigned.
- Parser/game logic is not changed.
- Import/export/download/history search recovery stack is left intact.
- Emergency bridges are not removed yet; consolidation comes after platform isolation is proven.

## Browser checks

```js
TowerBattleIntel?.version
TowerBattleIntelPlatformIsolationGuard?.status()
TowerBattleIntelNativeControls?.status()
```

Expected:

```text
v4.11a
platformIsolationGuardBound: true
mode: "desktop" on desktop viewports
```

## Next phase

v4.11b should be mobile-only repair, using v4.11a desktop as the protected baseline.
