(function () {
  "use strict";

  var STORAGE_KEY = "kiki-theme";
  var AUTO_KEY = "kiki-theme-auto";

  var DARK_BASE = {
    "--text-light": "#f8fafc",
    "--text-muted": "#94a3b8",
    "--text-muted-dark": "#64748b",
    "--glass-bg": "rgba(255, 255, 255, 0.03)",
    "--glass-border": "rgba(255, 255, 255, 0.08)",
    "--bs-light": "#f8fafc",
    "--bs-light-rgb": "248, 250, 252",
    "--bs-secondary": "#64748b",
    "--bs-secondary-rgb": "100, 116, 139",
    "--btn-close-filter": "invert(1)",
    "--navbar-toggler-filter": "invert(1)",
    "--map-attribution-bg": "#ffffff",
    "--map-attribution-text": "#1f2937"
  };

  var LIGHT_BASE = {
    "--text-light": "#0f172a",
    "--text-muted": "#475569",
    "--text-muted-dark": "#94a3b8",
    "--glass-bg": "rgba(15, 23, 42, 0.03)",
    "--glass-border": "rgba(15, 23, 42, 0.1)",
    "--bs-light": "#0f172a",
    "--bs-light-rgb": "15, 23, 42",
    "--bs-secondary": "#64748b",
    "--bs-secondary-rgb": "100, 116, 139",
    "--btn-close-filter": "invert(0)",
    "--navbar-toggler-filter": "invert(0)",
    "--map-attribution-bg": "rgba(255, 255, 255, 0.9)",
    "--map-attribution-text": "#475569"
  };

  var MAP_FILTER_DARK =
    "invert(0.9) hue-rotate(180deg) brightness(0.95) contrast(1.1)";

  var THEMES = {
    "dark-blue": Object.assign(
      { name: "Dark Blue", color: "#0d6efd" },
      DARK_BASE,
      {
        "--bg-dark-1": "#0a0b1e",
        "--bg-dark-2": "#050610",
        "--accent-cyan": "#00f2fe",
        "--accent-blue": "#007cff",
        "--accent-purple": "#8a2be2",
        "--glass-border-hover": "rgba(0, 242, 254, 0.25)",
        "--glow-cyan": "0 0 15px rgba(0, 242, 254, 0.2)",
        "--glow-purple": "0 0 15px rgba(138, 43, 226, 0.2)",
        "--navbar-bg": "rgba(11, 18, 89, 0.83)",
        "--map-filter": MAP_FILTER_DARK,
        "--bs-info": "#00f2fe",
        "--bs-info-rgb": "0, 242, 254",
        "--bs-info-text-emphasis": "#a5f3fc",
        "--bs-dark": "#050610",
        "--bs-dark-rgb": "5, 6, 16"
      }
    ),
    "dark-green-leaf": Object.assign(
      { name: "Dark Green Leaf", color: "#16a34a" },
      DARK_BASE,
      {
        "--bg-dark-1": "#071a11",
        "--bg-dark-2": "#020d08",
        "--accent-cyan": "#4ade80",
        "--accent-blue": "#16a34a",
        "--accent-purple": "#2dd4bf",
        "--glass-border-hover": "rgba(74, 222, 128, 0.3)",
        "--glow-cyan": "0 0 15px rgba(74, 222, 128, 0.25)",
        "--glow-purple": "0 0 15px rgba(45, 212, 191, 0.25)",
        "--navbar-bg": "rgba(5, 22, 14, 0.83)",
        "--map-filter": MAP_FILTER_DARK,
        "--bs-info": "#4ade80",
        "--bs-info-rgb": "74, 222, 128",
        "--bs-info-text-emphasis": "#bbf7d0",
        "--bs-dark": "#020d08",
        "--bs-dark-rgb": "2, 13, 8"
      }
    ),
    "dark-purple": Object.assign(
      { name: "Dark Purple", color: "#a855f7" },
      DARK_BASE,
      {
        "--bg-dark-1": "#150a22",
        "--bg-dark-2": "#0b0512",
        "--accent-cyan": "#c084fc",
        "--accent-blue": "#8b5cf6",
        "--accent-purple": "#e879f9",
        "--glass-border-hover": "rgba(192, 132, 252, 0.3)",
        "--glow-cyan": "0 0 15px rgba(192, 132, 252, 0.25)",
        "--glow-purple": "0 0 15px rgba(232, 121, 249, 0.25)",
        "--navbar-bg": "rgba(21, 10, 34, 0.83)",
        "--map-filter": MAP_FILTER_DARK,
        "--bs-info": "#c084fc",
        "--bs-info-rgb": "192, 132, 252",
        "--bs-info-text-emphasis": "#e9d5ff",
        "--bs-dark": "#0b0512",
        "--bs-dark-rgb": "11, 5, 18"
      }
    ),
    "dark-amber": Object.assign(
      { name: "Dark Amber", color: "#f59e0b" },
      DARK_BASE,
      {
        "--bg-dark-1": "#1c1306",
        "--bg-dark-2": "#0e0903",
        "--accent-cyan": "#fbbf24",
        "--accent-blue": "#f59e0b",
        "--accent-purple": "#fb923c",
        "--glass-border-hover": "rgba(251, 191, 36, 0.3)",
        "--glow-cyan": "0 0 15px rgba(251, 191, 36, 0.25)",
        "--glow-purple": "0 0 15px rgba(251, 146, 60, 0.25)",
        "--navbar-bg": "rgba(28, 19, 6, 0.83)",
        "--map-filter": MAP_FILTER_DARK,
        "--bs-info": "#fbbf24",
        "--bs-info-rgb": "251, 191, 36",
        "--bs-info-text-emphasis": "#fde68a",
        "--bs-dark": "#0e0903",
        "--bs-dark-rgb": "14, 9, 3"
      }
    ),
    "light-sky": Object.assign(
      { name: "Light Sky", color: "#0284c7" },
      LIGHT_BASE,
      {
        "--bg-dark-1": "#ecf4fb",
        "--bg-dark-2": "#ffffff",
        "--accent-cyan": "#0ea5e9",
        "--accent-blue": "#0284c7",
        "--accent-purple": "#6366f1",
        "--glass-border-hover": "rgba(14, 165, 233, 0.35)",
        "--glow-cyan": "0 0 15px rgba(14, 165, 233, 0.18)",
        "--glow-purple": "0 0 15px rgba(99, 102, 241, 0.18)",
        "--navbar-bg": "rgba(255, 255, 255, 0.85)",
        "--map-filter": "none",
        "--bs-info": "#0ea5e9",
        "--bs-info-rgb": "14, 165, 233",
        "--bs-info-text-emphasis": "#0369a1",
        "--bs-dark": "#ffffff",
        "--bs-dark-rgb": "255, 255, 255"
      }
    ),
    "light-mint": Object.assign(
      { name: "Light Mint", color: "#047857" },
      LIGHT_BASE,
      {
        "--bg-dark-1": "#ecf7f1",
        "--bg-dark-2": "#ffffff",
        "--accent-cyan": "#16a34a",
        "--accent-blue": "#15803d",
        "--accent-purple": "#14b8a6",
        "--glass-border-hover": "rgba(22, 163, 74, 0.35)",
        "--glow-cyan": "0 0 15px rgba(22, 163, 74, 0.18)",
        "--glow-purple": "0 0 15px rgba(20, 184, 166, 0.18)",
        "--navbar-bg": "rgba(255, 255, 255, 0.85)",
        "--map-filter": "none",
        "--bs-info": "#22c55e",
        "--bs-info-rgb": "34, 197, 94",
        "--bs-info-text-emphasis": "#166534",
        "--bs-dark": "#ffffff",
        "--bs-dark-rgb": "255, 255, 255"
      }
    ),
    "light-blossom": Object.assign(
      { name: "Light Blossom", color: "#db2777" },
      LIGHT_BASE,
      {
        "--bg-dark-1": "#fdf1f6",
        "--bg-dark-2": "#ffffff",
        "--accent-cyan": "#ec4899",
        "--accent-blue": "#db2777",
        "--accent-purple": "#a855f7",
        "--glass-border-hover": "rgba(236, 72, 153, 0.35)",
        "--glow-cyan": "0 0 15px rgba(236, 72, 153, 0.18)",
        "--glow-purple": "0 0 15px rgba(168, 85, 247, 0.18)",
        "--navbar-bg": "rgba(255, 255, 255, 0.85)",
        "--map-filter": "none",
        "--bs-info": "#ec4899",
        "--bs-info-rgb": "236, 72, 153",
        "--bs-info-text-emphasis": "#be185d",
        "--bs-dark": "#ffffff",
        "--bs-dark-rgb": "255, 255, 255"
      }
    )
  };

  var ORDER = [
    "dark-blue",
    "light-sky",
    "dark-green-leaf",
    "light-mint",
    "dark-purple",
    "light-blossom",
    "dark-amber"
  ];

  var DEFAULT_THEME = "dark-blue";
  var DAY_MS = 24 * 60 * 60 * 1000;
  var current = DEFAULT_THEME;

  function getStoredTheme() {
    if (typeof localStorage === "undefined") return null;
    var stored = localStorage.getItem(STORAGE_KEY);
    return THEMES[stored] ? stored : null;
  }

  function isAutoTheme() {
    if (typeof localStorage === "undefined") return true;
    return localStorage.getItem(AUTO_KEY) !== "0";
  }

  function dailyThemeName() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var dayOfYear = Math.floor((now - start) / DAY_MS);
    return ORDER[dayOfYear % ORDER.length];
  }

  function resolveTheme() {
    var manual = getStoredTheme();
    if (manual && !isAutoTheme()) return manual;
    return dailyThemeName();
  }

  function applyTheme(name) {
    var theme = THEMES[name];
    if (!theme) return false;

    current = name;

    var root = document.documentElement;
    Object.keys(theme).forEach(function (prop) {
      if (prop === "name" || prop === "color") return;
      root.style.setProperty(prop, theme[prop]);
    });

    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme.color);

    return true;
  }

  function setTheme(name) {
    if (!applyTheme(name)) return false;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, name);
      localStorage.setItem(AUTO_KEY, "0");
    }
    return true;
  }

  function setAutoTheme() {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(AUTO_KEY, "1");
    }
    return applyTheme(dailyThemeName());
  }

  function getTheme() {
    return current;
  }

  var WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var DATE_FMT = { weekday: "long", day: "numeric", month: "long" };

  function themeIndex(name) {
    return ORDER.indexOf(name);
  }

  function themeDays(name) {
    var index = themeIndex(name);
    var total = ORDER.length;
    var year = new Date().getFullYear();
    var days = [];
    var d = new Date(year, 0, 1);
    while (d.getFullYear() === year) {
      var dayOfYear = Math.floor((d - new Date(year, 0, 0)) / DAY_MS);
      if (dayOfYear % total === index) {
        var wd = d.getDay();
        if (days.indexOf(wd) === -1) days.push(wd);
      }
      d = new Date(year, d.getMonth(), d.getDate() + 1);
    }
    days.sort((a, b) => a - b);
    return days.map((n) => WEEKDAYS[n]);
  }

  function nextOccurrence(name) {
    var index = themeIndex(name);
    var total = ORDER.length;
    var now = new Date();
    var dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / DAY_MS);
    var diff = ((index - (dayOfYear % total)) + total) % total;
    var next = new Date(now);
    next.setDate(next.getDate() + (diff === 0 ? total : diff));
    return next;
  }

  function themeCard(name) {
    var t = THEMES[name];
    var swatch =
      "linear-gradient(135deg, " + t["--accent-cyan"] + ", " + t["--accent-purple"] + ")";
    return (
      '<div class="theme-option" data-theme="' +
      name +
      '" role="button" tabindex="0">' +
      '<div class="theme-swatch" style="background:' +
      swatch +
      '"></div>' +
      '<div class="theme-info">' +
      '<div class="d-flex justify-content-between align-items-center">' +
      '<span class="fw-semibold">' +
      t.name +
      "</span>" +
      '<i class="bi bi-check2-circle theme-check"></i>' +
      "</div>" +
      '<small class="d-block text-body-tertiary">Day: ' +
      themeDays(name).join(", ") +
      "</small>" +
      '<small class="d-block text-body-tertiary">Next: ' +
      nextOccurrence(name).toLocaleDateString("en-US", DATE_FMT) +
      "</small>" +
      "</div>" +
      "</div>"
    );
  }

  function renderThemeList() {
    var el = document.getElementById("theme-list");
    if (!el) return;

    var autoCard =
      '<div class="theme-option" data-theme="auto" role="button" tabindex="0">' +
      '<div class="theme-swatch" style="background: conic-gradient(#00f2fe, #8a2be2, #fbbf24, #4ade80, #0ea5e9, #ec4899, #00f2fe)"></div>' +
      '<div class="theme-info">' +
      '<div class="d-flex justify-content-between align-items-center">' +
      '<span class="fw-semibold">Auto (Daily)</span>' +
      '<i class="bi bi-check2-circle theme-check"></i>' +
      "</div>" +
      '<small class="d-block text-body-tertiary">Rotates the theme automatically every day</small>' +
      '<small class="d-block text-body-tertiary">Theme today: ' +
      THEMES[dailyThemeName()].name +
      "</small>" +
      "</div>" +
      "</div>";

    var html = autoCard + ORDER.map(themeCard).join("");
    el.innerHTML = html;

    el.addEventListener("click", function (e) {
      var card = e.target.closest(".theme-option");
      if (!card) return;
      var name = card.getAttribute("data-theme");
      if (name === "auto") {
        setAutoTheme();
      } else {
        setTheme(name);
      }
      markActiveTheme();
    });
  }

  function markActiveTheme() {
    document.querySelectorAll("#theme-list .theme-option").forEach(function (card) {
      var name = card.getAttribute("data-theme");
      var active;
      if (name === "auto") {
        active = isAutoTheme();
      } else {
        active = !isAutoTheme() && getTheme() === name;
      }
      card.classList.toggle("active", active);
    });
  }

  function initThemeList() {
    renderThemeList();
    markActiveTheme();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeList);
  } else {
    initThemeList();
  }

  window.THEMES = THEMES;
  window.setTheme = setTheme;
  window.setAutoTheme = setAutoTheme;
  window.getTheme = getTheme;
  window.isAutoTheme = isAutoTheme;

  applyTheme(resolveTheme());
})();