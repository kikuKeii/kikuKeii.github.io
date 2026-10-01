(function () {
  "use strict";

  var STORAGE_KEY = "kiki-theme";
  var AUTO_KEY = "kiki-theme-auto";

  var MAP_FILTER_DARK = "invert(0.92) hue-rotate(180deg) brightness(0.92) contrast(1.05)";

  /* Palet retro: warna keruh, tidak neon, tidak gradient. */
  var THEMES = {
    "amber-crt": {
      name: "Amber CRT",
      color: "#d3a24b",
      "--bg-0": "#16150f",
      "--bg-1": "#1d1b14",
      "--bg-2": "#25221a",
      "--bg-3": "#2f2a20",
      "--line": "#4a4433",
      "--line-2": "#6d6550",
      "--ink": "#e9e2cd",
      "--ink-dim": "#a89f88",
      "--accent": "#d3a24b",
      "--accent-2": "#8fa25c",
      "--accent-3": "#c2743c",
      "--shadow": "#0b0a06",
      "--scan": "0.5",
      "--navbar-bg": "#1d1b14",
      "--map-filter": MAP_FILTER_DARK + " sepia(0.18)",
      "--map-attribution-bg": "#e4ddc8",
      "--map-attribution-text": "#2a2519",
      "--btn-close-filter": "invert(1)",
      "--navbar-toggler-filter": "invert(1)"
    },
    "paper": {
      name: "Paper",
      color: "#8a7a4f",
      "--bg-0": "#e6e0cd",
      "--bg-1": "#f1ebda",
      "--bg-2": "#e2dbc5",
      "--bg-3": "#d5ccb1",
      "--line": "#9a927a",
      "--line-2": "#6f6854",
      "--ink": "#23201a",
      "--ink-dim": "#5d5747",
      "--accent": "#8f6517",
      "--accent-2": "#5c6f31",
      "--accent-3": "#a04f27",
      "--shadow": "#b3ab90",
      "--scan": "0",
      "--navbar-bg": "#f1ebda",
      "--map-filter": "sepia(0.25) saturate(0.9) brightness(1.02)",
      "--map-attribution-bg": "#ffffff",
      "--map-attribution-text": "#23201a",
      "--btn-close-filter": "none",
      "--navbar-toggler-filter": "none"
    },
    "gameboy": {
      name: "Gameboy",
      color: "#8baf4e",
      "--bg-0": "#1a2013",
      "--bg-1": "#212917",
      "--bg-2": "#29321b",
      "--bg-3": "#333d22",
      "--line": "#516638",
      "--line-2": "#7a9850",
      "--ink": "#dde7c2",
      "--ink-dim": "#9cae78",
      "--accent": "#9cb84f",
      "--accent-2": "#c6d67c",
      "--accent-3": "#a5764a",
      "--shadow": "#0c1108",
      "--scan": "0.45",
      "--navbar-bg": "#212917",
      "--map-filter": "grayscale(0.9) sepia(0.55) hue-rotate(45deg) brightness(0.92)",
      "--map-attribution-bg": "#dde7c2",
      "--map-attribution-text": "#21291a",
      "--btn-close-filter": "invert(1)",
      "--navbar-toggler-filter": "invert(1)"
    },
    "cobalt": {
      name: "Cobalt Dust",
      color: "#7fa5c0",
      "--bg-0": "#14181e",
      "--bg-1": "#1b2027",
      "--bg-2": "#232931",
      "--bg-3": "#2c333c",
      "--line": "#434e58",
      "--line-2": "#667682",
      "--ink": "#dde4ea",
      "--ink-dim": "#94a3ad",
      "--accent": "#7fa5c0",
      "--accent-2": "#c3a878",
      "--accent-3": "#b06a5e",
      "--shadow": "#090c0f",
      "--scan": "0.45",
      "--navbar-bg": "#1b2027",
      "--map-filter": "invert(0.92) hue-rotate(190deg) brightness(0.92) contrast(1.05)",
      "--map-attribution-bg": "#dde4ea",
      "--map-attribution-text": "#1b2027",
      "--btn-close-filter": "invert(1)",
      "--navbar-toggler-filter": "invert(1)"
    },
    "rust": {
      name: "Rust",
      color: "#d08a4e",
      "--bg-0": "#1a1512",
      "--bg-1": "#221b16",
      "--bg-2": "#2b221b",
      "--bg-3": "#342a21",
      "--line": "#584737",
      "--line-2": "#82654f",
      "--ink": "#ecdfd2",
      "--ink-dim": "#ae9887",
      "--accent": "#d08a4e",
      "--accent-2": "#97a35e",
      "--accent-3": "#c25a45",
      "--shadow": "#0c0806",
      "--scan": "0.5",
      "--navbar-bg": "#221b16",
      "--map-filter": "invert(0.9) hue-rotate(170deg) brightness(0.9) sepia(0.3) contrast(1.05)",
      "--map-attribution-bg": "#ecdfd2",
      "--map-attribution-text": "#221b16",
      "--btn-close-filter": "invert(1)",
      "--navbar-toggler-filter": "invert(1)"
    },
    "mono": {
      name: "Monochrome",
      color: "#c9c9c9",
      "--bg-0": "#131313",
      "--bg-1": "#1b1b1b",
      "--bg-2": "#232323",
      "--bg-3": "#2c2c2c",
      "--line": "#494949",
      "--line-2": "#6f6f6f",
      "--ink": "#e8e8e8",
      "--ink-dim": "#a0a0a0",
      "--accent": "#c9c9c9",
      "--accent-2": "#969696",
      "--accent-3": "#b0b0b0",
      "--shadow": "#070707",
      "--scan": "0.5",
      "--navbar-bg": "#1b1b1b",
      "--map-filter": "grayscale(1) invert(0.88) contrast(1.05)",
      "--map-attribution-bg": "#e8e8e8",
      "--map-attribution-text": "#1b1b1b",
      "--btn-close-filter": "invert(1)",
      "--navbar-toggler-filter": "invert(1)"
    }
  };

  var ORDER = ["amber-crt", "paper", "gameboy", "cobalt", "rust", "mono"];

  var DEFAULT_THEME = "amber-crt";
  var DAY_MS = 24 * 60 * 60 * 1000;
  var current = DEFAULT_THEME;

  /* Alias supaya kelas utilitas Bootstrap tetap nyambung. */
  function aliases(t) {
    return {
      "--text-light": t["--ink"],
      "--text-muted": t["--ink-dim"],
      "--text-muted-dark": t["--line-2"],
      "--bg-dark-1": t["--bg-1"],
      "--bg-dark-2": t["--bg-0"],
      "--accent-cyan": t["--accent"],
      "--accent-blue": t["--accent"],
      "--accent-purple": t["--accent-2"],
      "--glass-bg": t["--bg-2"],
      "--glass-border": t["--line"],
      "--glass-border-hover": t["--accent"],
      "--glow-cyan": "none",
      "--glow-purple": "none",

      "--bs-body-bg": t["--bg-0"],
      "--bs-body-color": t["--ink"],
      "--bs-body-color-rgb": rgb(t["--ink"]),
      "--bs-emphasis-color": t["--ink"],
      "--bs-emphasis-color-rgb": rgb(t["--ink"]),
      "--bs-secondary-color": t["--ink-dim"],
      "--bs-secondary-color-rgb": rgb(t["--ink-dim"]),
      "--bs-secondary-bg": t["--bg-2"],
      "--bs-tertiary-color": t["--ink-dim"],
      "--bs-tertiary-color-rgb": rgb(t["--ink-dim"]),
      "--bs-tertiary-bg": t["--bg-3"],
      "--bs-heading-color": t["--ink"],
      "--bs-border-color": t["--line"],
      "--bs-border-color-translucent": t["--line"],
      "--bs-link-color": t["--accent"],
      "--bs-link-hover-color": t["--accent-2"],
      "--bs-link-color-rgb": rgb(t["--accent"]),
      "--bs-link-hover-color-rgb": rgb(t["--accent-2"]),
      "--bs-info": t["--accent"],
      "--bs-info-rgb": rgb(t["--accent"]),
      "--bs-info-text-emphasis": t["--accent-2"],
      "--bs-light": t["--ink"],
      "--bs-light-rgb": rgb(t["--ink"]),
      "--bs-secondary": t["--ink-dim"],
      "--bs-secondary-rgb": rgb(t["--ink-dim"]),
      "--bs-dark": t["--bg-0"],
      "--bs-dark-rgb": rgb(t["--bg-0"]),
      "--bs-white-rgb": rgb(t["--ink"])
    };
  }

  function rgb(hex) {
    var h = String(hex).replace("#", "");
    if (h.length === 3) {
      h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    }
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(", ");
  }

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

    var vars = aliases(theme);
    Object.keys(theme).forEach(function (prop) {
      if (prop === "name" || prop === "color") return;
      vars[prop] = theme[prop];
    });

    var root = document.documentElement;
    Object.keys(vars).forEach(function (prop) {
      root.style.setProperty(prop, vars[prop]);
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
    days.sort(function (a, b) {
      return a - b;
    });
    return days.map(function (n) {
      return WEEKDAYS[n];
    });
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

  function swatch(t) {
    /* Swatch 4x4 px, biar kelihatan kayak palet pixel. */
    var c = [
      t["--bg-0"],
      t["--bg-1"],
      t["--bg-2"],
      t["--bg-3"],
      t["--line"],
      t["--line-2"],
      t["--ink"],
      t["--ink-dim"],
      t["--accent"],
      t["--accent"],
      t["--accent-2"],
      t["--accent-3"],
      t["--accent"],
      t["--accent-2"],
      t["--accent-3"],
      t["--ink-dim"]
    ];
    var layers = [];
    for (var i = 0; i < c.length; i++) {
      var col = i % 4;
      var row = Math.floor(i / 4);
      /* Penting: background-position dalam persen dihitung relatif terhadap
         (ukuran container - ukuran layer), BUKAN container. Karena tile
         berukuran 25% dari container, untuk menaruh tile di frac F dari
         container diperlukan posisi F / 0.75. 0, 33.33%, 66.67%, 100%.
         Kalau langsung pakai 0/25/50/75%, baris & kolom terakhir tidak
         pernah sampai tepi danSwatch kelihatan bolong. */
      var px = ((col / 3) * 100).toFixed(4).replace(/\.?0+$/, "");
      var py = ((row / 3) * 100).toFixed(4).replace(/\.?0+$/, "");
      layers.push(
        "linear-gradient(" + c[i] + " 0 0) " + px + "% " + py + "% / 25% 25% no-repeat"
      );
    }
    return layers.join(",");
  }

  function themeCard(name) {
    var t = THEMES[name];
    return (
      '<div class="theme-option" data-theme="' +
      name +
      '" role="button" tabindex="0">' +
      '<div class="theme-swatch" style="background:' +
      swatch(t) +
      '"></div>' +
      '<div class="theme-info">' +
      '<div class="d-flex justify-content-between align-items-center gap-2">' +
      '<span class="theme-name">' +
      t.name +
      "</span>" +
      '<i class="bi bi-check2-square theme-check"></i>' +
      "</div>" +
      '<small class="d-block theme-meta">Day: ' +
      themeDays(name).join(", ") +
      "</small>" +
      '<small class="d-block theme-meta">Next: ' +
      nextOccurrence(name).toLocaleDateString("en-US", DATE_FMT) +
      "</small>" +
      "</div>" +
      "</div>"
    );
  }

  function renderThemeList() {
    var el = document.getElementById("theme-list");
    if (!el) return;

    var today = THEMES[dailyThemeName()];

    /* Tiap color stop conic-gradient wajib punya posisi eksplisit. Kalau
       ada stop terakhir yang posisinya mundur (mis. "0 25%" setelah stop
       tanpa posisi), CSS meng-clamp semuanya jadi satu warna datar. */
    var autoStops = ORDER.map(function (n, i) {
      var at = ((i / ORDER.length) * 100).toFixed(4).replace(/\.?0+$/, "");
      return THEMES[n]["--accent"] + " " + at + "%";
    }).join(",");

    var autoCard =
      '<div class="theme-option" data-theme="auto" role="button" tabindex="0">' +
      '<div class="theme-swatch" style="background:repeating-conic-gradient(' +
      autoStops +
      ') 0 0 / 12px 12px"></div>' +
      '<div class="theme-info">' +
      '<div class="d-flex justify-content-between align-items-center gap-2">' +
      '<span class="theme-name">Auto (Daily)</span>' +
      '<i class="bi bi-check2-square theme-check"></i>' +
      "</div>" +
      '<small class="d-block theme-meta">Rotates the palette automatically every day</small>' +
      '<small class="d-block theme-meta">Theme today: ' +
      today.name +
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