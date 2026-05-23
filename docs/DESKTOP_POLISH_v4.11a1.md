# Tower Battle Intel v4.11a1 Desktop Polish Lock

## Scope

This is a desktop-only polish checkpoint built on top of the stable v4.11a Desktop Lock full build.

## Rules

- Keep the current mockup look.
- Protect desktop as the working baseline.
- Do not repair or redesign mobile in this build.
- Do not replace import/export/download/search/dropdown systems.
- Add only safe visual/runtime desktop polish.

## Added

- `src/ui/desktopPolishGuard.js`
- desktop-only focus/scrollbar/overflow polish in `desktop.css`
- tests/current-v4.11a1-desktop-polish.test.mjs

## Browser check

```js
TowerBattleIntel?.version
TowerBattleIntelPlatformIsolationGuard?.status()
TowerBattleIntelDesktopPolishGuard?.status()
```

Expected:

```text
v4.11a1
desktopPolishGuardBound: true
mode: desktop
```

## Next

Use this as the polished desktop checkpoint, then do mobile separately as `v4.11b`.
