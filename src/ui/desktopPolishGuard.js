"use strict";

/**
 * DESKTOP POLISH GUARD v4.11a1
 *
 * Desktop-only visual/runtime helper for the mockup-locked desktop baseline.
 * It deliberately does not own actions, import/export, modals, history, or parsing.
 * Its job is to mark desktop polish state and expose safe layout diagnostics.
 */
(function () {
    const VERSION = "v4.11a1";
    const MIN_DESKTOP_WIDTH = 800;

    let bound = false;
    let lastSnapshot = null;

    function isDesktopMode() {
        const mode = document.documentElement?.dataset?.deviceMode || window.TowerBattleIntelDeviceMode || "desktop";
        return mode === "desktop";
    }

    function bind() {
        if (bound || typeof document === "undefined") return status();
        bound = true;

        applyDesktopPolishFlags();

        let timer = null;
        const schedule = () => {
            clearTimeout(timer);
            timer = window.setTimeout(applyDesktopPolishFlags, 120);
        };

        window.addEventListener("resize", schedule, { passive: true });
        window.addEventListener("orientationchange", schedule, { passive: true });
        document.addEventListener("DOMContentLoaded", applyDesktopPolishFlags, { once: true });

        window.TowerBattleIntelDesktopPolishGuard = Object.freeze({
            status,
            snapshot,
            apply: applyDesktopPolishFlags
        });

        console.log(`[Tower Battle Intel] Desktop polish guard bound ${VERSION}`);
        return status();
    }

    function applyDesktopPolishFlags() {
        const desktop = isDesktopMode();
        const root = document.documentElement;
        const body = document.body;

        root.classList.toggle("desktop-polish-locked", desktop);
        root.setAttribute("data-desktop-polish-version", VERSION);
        root.setAttribute("data-desktop-min-width", String(MIN_DESKTOP_WIDTH));

        if (body) {
            body.classList.toggle("desktop-polish-locked", desktop);
            body.setAttribute("data-desktop-polish-version", VERSION);
        }

        lastSnapshot = snapshot();
        return lastSnapshot;
    }

    function snapshot() {
        const root = document.documentElement;
        const body = document.body;
        const app = document.getElementById("app");
        const viewportWidth = window.innerWidth || root?.clientWidth || 0;
        const viewportHeight = window.innerHeight || root?.clientHeight || 0;

        return {
            version: VERSION,
            mode: root?.dataset?.deviceMode || window.TowerBattleIntelDeviceMode || null,
            desktop: isDesktopMode(),
            viewportWidth,
            viewportHeight,
            documentScrollWidth: root?.scrollWidth || 0,
            bodyScrollWidth: body?.scrollWidth || 0,
            appScrollWidth: app?.scrollWidth || 0,
            horizontalOverflow: Boolean(root && root.scrollWidth > viewportWidth + 2),
            mobileOnlyVisible: Array.from(document.querySelectorAll("[data-device-only='mobile']")).filter(el => !el.hidden).length,
            desktopOnlyVisible: Array.from(document.querySelectorAll("[data-device-only='desktop']")).filter(el => !el.hidden).length
        };
    }

    function status() {
        return {
            desktopPolishGuardBound: bound,
            desktopPolishGuardVersion: VERSION,
            minDesktopWidth: MIN_DESKTOP_WIDTH,
            snapshot: lastSnapshot || snapshot()
        };
    }

    bind();
}());
