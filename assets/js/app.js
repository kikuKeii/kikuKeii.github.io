AOS.init({
  duration: 800, // Durasi animasi (ms)
  easing: "ease-in-out", // Efek transisi
  once: false, // Animasi hanya sekali
  offset: 100, // Mulai animasi sebelum elemen masuk viewport
  delay: 50, // Delay kecil
  mirror: false, // Tidak mengulang saat scroll ke atas
  anchorPlacement: "top-bottom",
});

function alertShow(title, text, icon, confirmButtonText) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
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
  sendAlert(payload);

  window.open(url, "_blank");
}

$(document).ready(function () {
  $(".download-cv").on("click", function () {
    alertShow("Info", "You Are download PDF", "info", "Okay");
  });
  $(".download-cv").each(function () {
    let el = $(this);
    el.attr("href", "./assets/pdf/Miftakhuddin Falaki - IT Programmer.pdf");
    el.attr("download", "Miftakhuddin Falaki - IT Programmer.pdf");
  });
});

$(document).keydown(function (e) {
  if (e.ctrlKey && e.which === 80) {
    e.preventDefault();

    const route = "./assets/pdf/Miftakhuddin Falaki - IT Programmer.pdf";

    window.open(
      route,
      "cvWindow",
      "width=1000,height=800,left=100,top=100,resizable=yes,scrollbars=yes",
    );
  }
});

addEventListener("DOMContentLoaded", () => {
  showToast("Miftakhuddin Falaki", "Welcome to kiki.my.id", 0, 15000);
});
function showToast(title, message, interval, delay) {
  let t_interval = setInterval(() => {
    var randomString = Math.random().toString(36).substring(2, 15);
    var data = {
      title,
      message,
      delay,
      randomString,
    };
    $(".toast-container").append(`
    <div id="toast-${data.randomString}" class="toast text-bg-light" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay=${data.delay}>
        <div class="toast-header">
        <img src="./assets/images/hero2.jpg" class="rounded me-2" alt="Avatar" width="25"  />
        <strong class="me-auto">${data.title}</strong>
        <small id="toast-time-${data.randomString}">now</small>
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"></button>
        </div>
        <div class="toast-body">${data.message}</div>
    </div>`);
    $(`#toast-${data.randomString}`).toast("show");
    countTime(`#toast-time-${data.randomString}`, data.delay);

    setTimeout(() => {
      $(`#toast-${data.randomString}`).remove();
    }, data.delay);

    clearInterval(t_interval);
  }, interval);
}

function countTime(e, time) {
  let startTime = new Date().getTime();
  let endTime = startTime - time;

  $(e).html(timeToString(startTime - endTime));

  var f_interval = setInterval(() => {
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime;

    $(e).html(timeToString(elapsedTime));

    if (elapsedTime >= time) {
      clearInterval(f_interval);
    }
  }, 1000);
}

function timeToString(elapsedTime) {
  var seconds = Math.floor(elapsedTime / 1000) % 60;
  var minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
  var hours = Math.floor(elapsedTime / (1000 * 60 * 60)) % 24;
  var days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `${days} days ago`;
  }
  if (hours > 0) {
    return `${hours} hours ago`;
  }
  if (minutes > 0) {
    return `${minutes} minutes ago`;
  }
  if (seconds > 20) {
    return `${seconds} seconds ago`;
  }
  return "just now";
}

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
