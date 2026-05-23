"use strict";

import { escapeHTML, miniStat } from "./sectionUtils.js";

export function buildCommandDeckView(state = {}) {
    const historyCount = Array.isArray(state.history) ? state.history.length : 0;
    const activeBuild = state.ui?.buildStyle || "unknown";

    return `
        <div class="tbi-command-view desktop-command-polish">
            <section class="tbi-card tbi-command-card tbi-command-flow">
                <div class="tbi-card-heading compact-heading">
                    <div>
                        <h2>Command Deck</h2>
                        <p>Desktop report workflow. The input console stays above the nav; this deck controls and verifies what happens next.</p>
                    </div>
                    <span class="tbi-command-mode-pill">Desktop</span>
                </div>

                <div class="tbi-command-steps">
                    ${commandStep("1", "Paste report", "Use the Battle Report Input console above.")}
                    ${commandStep("2", "Choose build", `Current build: ${formatBuild(activeBuild)}.`)}
                    ${commandStep("3", "Save or clear", "Save to History, clear the input, or reset loaded runs.")}
                </div>

                <div class="tbi-command-actions desktop-command-actions" aria-label="Command deck actions">
                    <button type="button" data-ui-action="save-report">Save Report</button>
                    <button type="button" data-ui-action="clear-input">Clear Input</button>
                    <button type="button" data-ui-action="clear-runs">Clear Runs</button>
                    <button type="button" data-ui-action="open-history">Open History</button>
                </div>

                <div class="tbi-command-note">
                    Import and export live in History. Debug exports live in the diagnostics panel.
                </div>
            </section>

            <section class="tbi-card tbi-command-status desktop-command-status">
                <div class="tbi-card-heading compact-heading">
                    <div>
                        <h3>Current Data</h3>
                        <p>Loaded state snapshot</p>
                    </div>
                </div>

                <div class="tbi-command-stats desktop-command-stats">
                    ${miniStat("Run A", state.runA ? "Loaded" : "Empty", state.runA ? "good" : "neutral")}
                    ${miniStat("Run B", state.runB ? "Loaded" : "Empty", state.runB ? "good" : "neutral")}
                    ${miniStat("History", String(historyCount), historyCount ? "good" : "neutral")}
                    ${miniStat("Build", escapeHTML(formatBuild(activeBuild)), "neutral")}
                </div>
            </section>
        </div>
    `;
}

export function buildSettingsView(state = {}) {
    return `
        <div class="tbi-view-stack">
            <section class="tbi-card">
                <h2>Settings</h2>
                <p>Current build style: <strong>${escapeHTML(state.ui?.buildStyle || "unknown")}</strong></p>
                <p>Hold the header for diagnostics. Debug output remains powered by the inspection panel.</p>
                <button type="button" data-ui-action="open-command">Open Command Deck</button>
            </section>
        </div>
    `;
}

export function buildMoreView(state = {}) {
    return `
        <div class="tbi-more-view">
            <section class="tbi-card tbi-more-grid">
                <h2>More</h2>
                ${moreButton("history", "History", `${state.history.length} saved runs`)}
                ${moreButton("anomalies", "Anomalies", `${state.anomalies.length} active`)}
                ${moreButton("command", "Command Deck", "Paste, save, clear, export")}
                ${moreButton("settings", "Settings", "Theme and diagnostics")}
            </section>
        </div>
    `;
}

function commandStep(number, title, body) {
    return `
        <div class="tbi-command-step">
            <span>${escapeHTML(number)}</span>
            <strong>${escapeHTML(title)}</strong>
            <em>${escapeHTML(body)}</em>
        </div>
    `;
}

function formatBuild(value = "unknown") {
    return String(value || "unknown")
        .replace(/_/g, " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());
}

function moreButton(tab, label, subtitle) {
    return `
        <button type="button" class="tbi-more-button" data-dashboard-tab="${tab}">
            <strong>${escapeHTML(label)}</strong>
            <span>${escapeHTML(subtitle)}</span>
        </button>
    `;
}
