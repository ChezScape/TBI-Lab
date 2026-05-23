import fs from "node:fs";
import assert from "node:assert/strict";

const read = file => fs.readFileSync(file, "utf8");

const app = read("./app.js");
const bootstrap = read("./bootstrap.js");
const index = read("./index.html");
const config = read("./config/appConfig.js");
const platformGuard = read("./src/ui/platformIsolationGuard.js");
const deviceMode = read("./src/ui/deviceMode.js");
const desktopCss = read("./desktop.css");
const mobileCss = read("./mobile.css");

assert.match(config, /version:\s*"v4\.11a"/);
assert.match(app, /APP ENTRY v4\.11a/);
assert.match(bootstrap, /BOOTSTRAP v4\.11a/);

assert.match(index, /platformIsolationGuard\.js/);
assert.match(index, /src="\.\/src\/ui\/universalDownloadBridge\.js"/);
assert.match(index, /src="\.\/src\/ui\/historySearchFocusGuard\.js"/);
assert.match(index, /type="module" src="\.\/app\.js"/);
assert.ok(index.indexOf("platformIsolationGuard.js") < index.indexOf("app.js"), "platform guard should load before app.js");
assert.ok(index.indexOf("universalDownloadBridge.js") < index.indexOf("app.js"), "download bridge should load before app.js");
assert.ok(index.indexOf("historySearchFocusGuard.js") < index.indexOf("app.js"), "history search guard should load before app.js");

assert.match(platformGuard, /PLATFORM ISOLATION GUARD v4\.11a/);
assert.match(platformGuard, /DESKTOP_MIN_WIDTH = 800/);
assert.match(platformGuard, /TowerBattleIntelPlatformIsolationGuard/);
assert.match(deviceMode, /desktop starts at 800px/);

assert.match(desktopCss, /v4\.11a Desktop Platform Isolation Guard/);
assert.match(desktopCss, /\[data-device-only="mobile"\]/);
assert.match(mobileCss, /v4\.11a Mobile Isolation Notice/);

console.log("current-v4.11a-desktop-lock.test.mjs passed");
