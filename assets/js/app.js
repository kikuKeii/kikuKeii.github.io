AOS.init({
  duration: 800, // Durasi animasi (ms)
  easing: "ease-in-out", // Efek transisi
  once: false, // Animasi hanya sekali
  offset: 100, // Mulai animasi sebelum elemen masuk viewport
  delay: 50, // Delay kecil
  mirror: false, // Tidak mengulang saat scroll ke atas
  anchorPlacement: "top-bottom",
});

/* Path aset dari halaman utama (root). */
var ASSET_PATH = "./assets/";

/* Preloader: hilang saat gambar hero siap, atau paksa hilang setelah 3 detik. */
var PRELOADER_TIMEOUT = 3000;

function hidePreloader() {
  var el = document.getElementById("preloader");
  if (!el || el.dataset.done === "1") return;
  el.dataset.done = "1";
  el.classList.add("is-done");
  setTimeout(function () {
    el.remove();
  }, 300);
}

(function initPreloader() {
  var timeout = setTimeout(hidePreloader, PRELOADER_TIMEOUT);
  var hero = document.getElementById("hero-main-image");

  if (!hero) {
    clearTimeout(timeout);
    hidePreloader();
    return;
  }

  /* Gambar sudah ada di cache / selesai sebelum script ini jalan. */
  if (hero.complete && hero.naturalWidth > 0) {
    clearTimeout(timeout);
    hidePreloader();
    return;
  }

  /* Event load tetap dipasang walau complete, agar tidak missed. */
  hero.addEventListener(
    "load",
    function () {
      clearTimeout(timeout);
      hidePreloader();
    },
    { once: true }
  );

  hero.addEventListener(
    "error",
    function () {
      clearTimeout(timeout);
      hidePreloader();
    },
    { once: true }
  );
})();

function alertShow(title, text, icon, confirmButtonText) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
  });
}
function sendEmail() {
  let name = $("#cfname").val().trim();
  let email = $("#cemail").val().trim();
  let org = $("#ccompany").val().trim();
  let subject = $("#csubject").val().trim();
  let message = $("#cmessages").val().trim();
  if (!name || !email || !message) {
    return alertShow(
      "Warning",
      "Please fill all the fields Name, Email and Message.",
      "warning",
      "Okay",
    );
  }

  showSpinner("#spinnerEmail", "#btnSendEmail", true);
  let payload = {
    name: name,
    org: org,
    email: email,
    subject: subject,
    message: message,
    keyAuth: "akuganteng1010",
  };

  $.ajax({
    url: apiUrl("email"),
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(payload),
    success: function (res) {
      showSpinner("#spinnerEmail", "#btnSendEmail", false);
      const ok = res?.response === "email";
      alertShow(ok ? "Success" : "Error", res?.message, ok ? "success" : "error", "Okay");
      if (ok) {
        $("#cfname, #cemail, #ccompany, #cmessages").val("");
      }
    },
    error: function (xhr, status, error) {
      showSpinner("#spinnerEmail", "#btnSendEmail", false);
      console.error("Failed send email:", error);
      alertShow("Error", "Failed to send email. Please try again.", "error", "Okay");
    },
  });
}

function sendWhatsapp() {
  let name = $("#cfname").val();
  let email = $("#cemail").val();
  let company = $("#ccompany").val();
  let message = $("#cmessages").val();
  if (!name || !company || !message) {
    return alertShow(
      "Warning",
      "Please fill all the fields Name, Company and Message.",
      "warning",
      "Okay",
    );
  }
  showSpinner("#spinnerWhatsapp", "#btnSendWhatsapp", true);
  // %20 space
  // %0A new line
  let url = `https://api.whatsapp.com/send?phone=6283807303926&text=Name%20${name}%20from%20${company}%0AEmail%20${email}%0A%0A${message}`;
  let payload = {
    text: `*Kikimyid Alert*\n
    Baru saja *${name}* mencoba mengirim pesan melalui WhatsApp.\n
    *Company*: ${company}\n
    *Email*: ${email}\n
    *Message*:\n${message}`,
    parse_mode: "Markdown",
  };
  if (typeof sendAlert === "function") {
    sendAlert(payload);
  }

  window.open(url, "_blank");
  setTimeout(() => showSpinner("#spinnerWhatsapp", "#btnSendWhatsapp", false), 1000);
}

function showSpinner(spinnerId, btnId, show) {
  $(spinnerId).toggleClass("d-none", !show);
  $(btnId).prop("disabled", show);
}

$(document).ready(function () {
  $(".download-cv").on("click", function () {
    alertShow("Info", "You Are download PDF", "info", "Okay");
  });
  $(".download-cv").each(function () {
    let el = $(this);
    el.attr("href", ASSET_PATH + "pdf/Miftakhuddin Falaki - IT Programmer.pdf");
    el.attr("download", "Miftakhuddin Falaki - IT Programmer.pdf");
  });
});

$(document).keydown(function (e) {
  if (e.ctrlKey && e.which === 80) {
    e.preventDefault();

    const route = ASSET_PATH + "pdf/Miftakhuddin Falaki - IT Programmer.pdf";

    window.open(
      route,
      "cvWindow",
      "width=1000,height=800,left=100,top=100,resizable=yes,scrollbars=yes",
    );
  }
});

/* Escape teks sebelum masuk innerHTML (value dari localStorage ikut aman). */
function escapeHtml(str) {
  return String(str).replace(
    /[&<>"']/g,
    (ch) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[ch]
  );
}

/* Sisa waktu dalam detik, dibulatkan ke atas agar tidak tampil "0s" lebih dulu. */
function remainingLabel(ms) {
  if (ms <= 0) return "now";
  const sec = Math.ceil(ms / 1000);
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  const rest = sec % 60;
  return rest ? `${min}m ${rest}s` : `${min}m`;
}

let toastSeq = 0;

/*
 * showToast(title, message, delayBeforeShow, visibleFor)
 * - delayBeforeShow : jeda sebelum toast muncul (ms)
 * - visibleFor      : lama toast tampil sebelum auto-hide (ms)
 *
 * Countdown dihitung dari satu deadline absolut, bukan akumulasi per tick,
 * supaya tidak melenceng walaupun interval terlambat.
 * Elemen dibersihkan lewat event hidden.bs.toast (ikut hormati hover),
 * dengan timer cadangan bila event tidak pernah datang.
 */
function showToast(title, message, delayBeforeShow, visibleFor) {
  const wait = Number(delayBeforeShow) || 0;
  const life = Number(visibleFor) || 15000;

  const mount = () => {
    const $container = $(".toast-container");
    if (!$container.length) return;

    const id = `tst-${++toastSeq}`;
    const $toast = $(`
      <div id="${id}" class="toast" role="alert" aria-live="assertive" aria-atomic="true"
        data-bs-delay="${life}" data-bs-autohide="true">
        <div class="toast-header">
          <img src="${ASSET_PATH}images/hero2.jpg" class="me-2" alt="Avatar" width="25" height="25" />
          <strong class="me-auto">${escapeHtml(title)}</strong>
          <small class="toast-countdown"></small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">${escapeHtml(message)}</div>
      </div>
    `);

    $container.append($toast);

    const deadline = Date.now() + life;
    const $count = $toast.find(".toast-countdown");
    let ticker = null;

    const stop = () => {
      if (ticker !== null) {
        clearInterval(ticker);
        ticker = null;
      }
    };

    const tick = () => {
      const left = deadline - Date.now();
      $count.text(remainingLabel(left));
      if (left <= 0) stop();
    };

    tick();
    ticker = setInterval(tick, 250);

    $toast.on("hide.bs.toast", stop);

    $toast.on("hidden.bs.toast", function () {
      stop();
      $toast.remove();
    });

    // Cadangan:Bootstrap autohide bisa tertahan hover, node tetap dibersihkan.
    setTimeout(function () {
      stop();
      $toast.remove();
    }, life + 1000);

    $toast.toast("show");
  };

  if (wait > 0) {
    setTimeout(mount, wait);
  } else {
    mount();
  }
}

addEventListener("DOMContentLoaded", () => {
  showToast("Miftakhuddin Falaki", "Welcome to kiki.my.id", 0, 15000);
  showToast("Miftakhuddin Falaki", "Actually, you can directly print my resume by pressing ctrl + p", 30000, 15000);
});

function setLocalStorage(key, value, expireDay = 30) {
  var now = new Date();
  var time = now.getTime();
  var expireTime = time + 1000 * 60 * 60 * 24 * expireDay;
  now.setTime(expireTime);
  var expireDate = now.toUTCString();
  localStorage.setItem(key, value);
  localStorage.setItem(`${key}-expire`, expireDate);
}

addEventListener("load", function () {
  var name = localStorage.getItem("cfname")
    ? localStorage.getItem("cfname")
    : "";
  var email = localStorage.getItem("cemail")
    ? localStorage.getItem("cemail")
    : "";
  var company = localStorage.getItem("ccompany")
    ? localStorage.getItem("ccompany")
    : "";
  $("#cfname").val(name);
  $("#cemail").val(email);
  $("#ccompany").val(company);

  if (name != "") {
    showToast("Miftakhuddin Falaki", `Welcome back ${name}`, 7000, 15000);
  }
});


let fetching_dots = 0;

setInterval(() => {
  $(".fetching-data").text(`Fetching${".".repeat(fetching_dots)}`);
  fetching_dots = (fetching_dots + 1) % 4;
}, 300);