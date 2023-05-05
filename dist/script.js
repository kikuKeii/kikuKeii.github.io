const d = new Date();

AOS.init({
  offset: 150,
  duration: 500,
  easing: "ease-in-sine",
  delay: 160,
});
AOS.refresh();

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
  "Programmer.",
  "Web Developer.",
  "seorang yang dapat bekerja dengan baik.",
];
const typingDelay = 50;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing2");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing2");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing2"))
      cursorSpan.classList.add("typing2");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing2");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

function galeryF() {
  datag = [
    {
      name: "Kamar Sehat",
      img: "./img/galery/kamar-sehat-4-min.png",
      link: "https://kamar-sehat.vercel.app/",
      desc: "Cek IP",
      filter: "web",
      icon: '<i class="bi bi-browser-edge"></i>',
    },
    {
      name: "IP Saya",
      img: "./img/galery/ipsaya-desktop.png",
      link: "https://ipsaya.vercel.app/",
      desc: "Cek IP",
      filter: "web",
      icon: '<i class="bi bi-browser-edge"></i>',
    },
    {
      name: "Livechat",
      img: "./img/galery/live-chat-desktop.png",
      link: "https://github.com/kikukeii/mvk-dashboard",
      desc: "Livechat Sederhana",
      filter: "web",
      icon: '<i class="bi bi-browser-edge"></i>',
    },
    {
      name: "MVK Dashboard",
      img: "./img/galery/1-home-min.png",
      link: "https://github.com/kikuKeii/live-chat-sistem-sederhana",
      desc: "Point of Sale",
      filter: "web",
      icon: '<i class="bi bi-browser-edge"></i>',
    },
    {
      name: "Niji Sticker For WhatsApp",
      img: "./img/galery/niji.png",
      link: "https://kikukeii.github.io/niji",
      desc: "Aplikasi Niji Sticker For WhatsApp",
      filter: "android",
      icon: '<i class="bi bi-android2"></i>',
    },
    {
      name: "Kiku Index Movie",
      img: "./img/galery/kiku-index-movie.png",
      link: "https://kiku-index-movie.vercel.app",
      desc: "Web Serach Film",
      filter: "web",
      icon: '<i class="bi bi-browser-edge"></i>',
    },
    {
      name: "Bookcase.my.id",
      img: "./img/galery/bookcase.png",
      link: "https://bookcase.my.id",
      desc: "Blog Anime, Manga, Novel",
      filter: "blog",
      icon: '<i class="bi bi-journal-richtext"></i>',
    },
    {
      name: "WNIndo",
      img: "./img/galery/wnindo.png",
      link: "https://wnindo.vercel.app",
      desc: "Web Novel Bahasa Indoneia",
      filter: "blog",
      icon: '<i class="bi bi-journal-richtext"></i>',
    },
    {
      name: "Starter Kit CI4 APP",
      img: "./img/galery/ci4-app.png",
      link: "https://github.com/kikuKeii/ci4app-starter",
      desc: "",
      filter: "service",
      icon: '<i class="bi bi-fire"></i>',
    },
    {
      name: "Induksi Magnet",
      img: "./img/galery/induksi-m.png",
      link: "https://github.com/kikuKeii/induksiMagnet",
      desc: "Aplikasi Menhitung Rumus Induksi Magnet",
      filter: "desktop",
      icon: '<i class="bi bi-cpu"></i>',
    },
    {
      name: "Starter Kit Express API",
      img: "./img/galery/induksi-m.png",
      link: "https://github.com/kikuKeii/starter-express-api-vercel",
      desc: "Starter Kit Express API deploy on Vercel.app",
      filter: "service",
      icon: '<i class="bi bi-fire"></i>',
    },
    {
      name: "Lize Tea Time",
      img: "./img/galery/404.png",
      link: "#",
      desc: "Music Player",
      filter: "bot",
      icon: '<i class="bi bi-robot"></i>',
    },
    {
      name: "keiiKomik",
      img: "./img/galery/keiikomik.png",
      link: "https://keiikomik.vercel.app",
      desc: "Web Review Manga",
      filter: "web",
      icon: '<i class="bi bi-browser-edge"></i>',
    },
  ];
  datag.forEach(function (g) {
    gs(g);
  });
  function gs(g) {
    var div = document.createElement("div");
    div.setAttribute("class", `col filter ${g.filter}`);
    div.innerHTML = `
        <figure class="galery-hover"><img src="${g.img}" alt="sampel"/>
        <figcaption>${g.icon}
          <h4>${g.desc}    </h4>
          <h2 name="${g.name}">${g.name}</h2>
        </figcaption><a href="${g.link}"></a>
      </figure>`;
    document.querySelector("#galery-list").appendChild(div);
  }
}

window.onload = galeryF;

$(document).ready(function () {
  $(".filter-button").click(function () {
    var value = $(this).attr("data-filter");
    if (value == "all") {
      $(".filter").show("1000");
    } else {
      $(".filter")
        .not("." + value)
        .hide("3000");
      $(".filter")
        .filter("." + value)
        .show("3000");
    }
    $(".filter-button").removeClass("active").addClass("inactive");
    $(this).addClass("active").removeClass("inactive");
  });
});

$(".hover").mouseleave(function () {
  $(this).removeClass("hover");
});

let year = d.getFullYear();
document.getElementById("years").innerHTML = year;
