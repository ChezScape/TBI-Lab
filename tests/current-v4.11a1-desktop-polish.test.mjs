import fs from "node:fs";
import assert from "node:assert/strict";

const read = file => fs.readFileSync(file, "utf8");

const config = read("./config/appConfig.js");
const app = read("./app.js");
const bootstrap = read("./bootstrap.js");
const index = read("./index.html");
const desktopGuard = read("./src/ui/desktopPolishGuard.js");
const desktopCss = read("./desktop.css");
const mobileCss = read("./mobile.css");

assert.match(config, /version:\s*"v4\.11a1"/);
assert.match(app, /APP ENTRY v4\.11a1/);
assert.match(bootstrap, /BOOTSTRAP v4\.11a1/);
assert.match(index, /desktopPolishGuard\.js/);
assert.ok(index.indexOf("platformIsolationGuard.js") < index.indexOf("desktopPolishGuard.js"), "desktop polish guard should load after platform guard");
assert.ok(index.indexOf("desktopPolishGuard.js") < index.indexOf("app.js"), "desktop polish guard should load before app.js");
assert.match(desktopGuard, /DESKTOP POLISH GUARD v4\.11a1/);
assert.match(desktopGuard, /TowerBattleIntelDesktopPolishGuard/);
assert.match(desktopCss, /v4\.11a1 Desktop Mockup Polish Lock/);
assert.match(desktopCss, /@media \(min-width: 800px\)/);
assert.match(desktopCss, /desktop-polish-locked/);
assert.match(mobileCss, /v4\.11a1 Mobile left untouched/);

console.log("current-v4.11a1-desktop-polish.test.mjs passed");
