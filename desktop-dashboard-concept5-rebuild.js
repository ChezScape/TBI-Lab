/* TBI v4.11a8 Dashboard Concept 5 Desktop Rebuild helper.
   Small DOM normalisation only: no pipeline, storage, parser, or mobile behaviour changes. */
(function () {
    "use strict";

    function isDesktop() {
        return document.documentElement.getAttribute("data-device-mode") === "desktop" ||
            document.documentElement.classList.contains("device-desktop") ||
            document.body?.getAttribute("data-device-mode") === "desktop";
    }

    function textOf(node) {
        return (node && node.textContent ? node.textContent : "").replace(/\s+/g, " ").trim();
    }

    function normaliseRunCard(card) {
        if (!card) return;
        var footer = card.querySelector(".tbi-run-footer");
        if (!footer) return;

        var footerItems = Array.from(footer.querySelectorAll("span"));
        var coinsPerHour = footerItems.find(function (item) { return /coins\s*\/\s*hour/i.test(textOf(item)); });
        var cellsPerHour = footerItems.find(function (item) { return /cells\s*\/\s*hour/i.test(textOf(item)); });

        var goldMetric = card.querySelector(".tbi-run-metric.gold");
        var greenMetric = card.querySelector(".tbi-run-metric.green");

        function setSub(metric, source, fallbackLabel) {
            if (!metric || !source) return;
            var strong = source.querySelector("strong");
            var value = strong ? textOf(strong) : textOf(source).replace(fallbackLabel, "").trim();
            if (!value) return;
            var sub = metric.querySelector(".c5-run-sub");
            if (!sub) {
                sub = document.createElement("small");
                sub.className = "c5-run-sub";
                metric.appendChild(sub);
            }
            sub.textContent = value + " / hour";
        }

        setSub(goldMetric, coinsPerHour, "Coins / Hour");
        setSub(greenMetric, cellsPerHour, "Cells / Hour");
    }

    function renameHeadings() {
        Array.from(document.querySelectorAll(".tbi-card-heading h3, .tbi-card h3")).forEach(function (heading) {
            var text = textOf(heading).toLowerCase();
            if (text === "✦ effects active" || text === "effects active") {
                heading.innerHTML = heading.innerHTML.replace(/Effects Active/i, "Killed With Effect Active");
            }
        });
    }

    function normaliseFooter() {
        var footer = document.querySelector(".tbi-status-footer");
        if (!footer || footer.getAttribute("data-c5-footer") === "true") return;
        var spans = footer.querySelectorAll("span");
        if (spans[0]) spans[0].textContent = "ⓘ TIP: Hover over any metric for detailed information and formula.";
        if (spans[1]) spans[1].textContent = "🔒 Data is encrypted and stored locally only.";
        if (spans[2]) spans[2].textContent = "☆ Hold SHIFT + Click any metric to pin it to your quick view.";
        footer.setAttribute("data-c5-footer", "true");
    }

    function applyConcept5() {
        if (!isDesktop()) return;
        document.documentElement.classList.add("tbi-concept5-desktop");
        if (document.body) document.body.classList.add("tbi-concept5-desktop");
        Array.from(document.querySelectorAll(".tbi-run-card")).forEach(normaliseRunCard);
        renameHeadings();
        normaliseFooter();
    }

    var queued = false;
    function schedule() {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(function () {
            queued = false;
            applyConcept5();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", schedule, { once: true });
    } else {
        schedule();
    }

    var observer = new MutationObserver(schedule);
    observer.observe(document.documentElement, { childList: true, subtree: true });
}());
