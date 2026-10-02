/* =========================================================
   MINI GAME — BATU KERTAS GUNTING (SISI KIKI)
   ------------------------------------------------------------
   Aturan rumah:
   - Peluang pemain menang hanya 3%, seri 27%, kalah 70%.
   - Bolak-balik 50:50 tidak berlaku di sini. Giliran Kiki membaca
     satu angka acak dulu, lalu memilih kartu counter atau seri.
   - Match selesai saat salah satu pihak mencapai 3 poin.

   Semua angka diambil dari satu call Math.random() per ronde,
   jadi user tidak bisa menebak polanya dari beberapa kali kena.
   ========================================================= */

(function () {
  "use strict";

  var WIN_CHANCE = 0.03;
  var DRAW_CHANCE = 0.27;
  var FIRST_TO = 3;

  /* beats: kartu yang dikalahkan oleh kartu ini. */
  var MOVES = {
    rock: { emoji: "\u270A", name: "Batu", beats: "scissors" },
    paper: { emoji: "\u270B", name: "Kertas", beats: "rock" },
    scissors: { emoji: "\u270C\uFE0F", name: "Gunting", beats: "paper" },
  };

  /* Kebalikan dari beats: kartu yang mengalahkan kartu ini. */
  var LOSE_TO = {
    rock: "paper",
    paper: "scissors",
    scissors: "rock",
  };

  var SAYS = {
    win: [
      "Menang. Screenshot sekarang sebelum hilang.",
      "Wah, jackpot. Peluangnya cuma 3% lho.",
      "Kamu menang. Aku cek ulang RNG-nya dulu.",
    ],
    draw: [
      "Seri. Tidak ada yang berubah.",
      "Seri. Kita berdua salah tebak.",
      "Seri. Luck-nya juga seri.",
    ],
    lose: [
      "Kalah. Peluangnya turun dari 3% jadi 0%.",
      "Nope. Nasib kamu sedang di server lain.",
      "Kalah. Maybe coba lagi besok.",
    ],
    endWin: "MATCH SELESAI. Kamu menang {a}-{b}. Di game berikutnya tetap 3%.",
    endLose: "MATCH SELESAI. Kalah {a}-{b}. Satu lagi, kalau berani.",
  };

  var state = {
    you: 0,
    cpu: 0,
    draw: 0,
    rounds: 0,
    busy: false,
    over: false,
  };

  var timer = null;
  var root = document.getElementById("modalGame");
  if (!root) return;

  var slotYou = document.getElementById("gameSlotYou");
  var slotCpu = document.getElementById("gameSlotCpu");
  var msg = document.getElementById("gameMsg");
  var roundLabel = document.getElementById("gameRoundLabel");
  var roundsOut = document.getElementById("gameRounds");
  var rateOut = document.getElementById("gameRate");
  var resetBtn = document.getElementById("gameReset");
  var meterBar = document.querySelector("#gameMeter span");
  var cards = root.querySelectorAll(".game-card");

  function pickSay(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function setMessage(text, kind) {
    msg.textContent = text;
    msg.className = "game-msg" + (kind ? " is-" + kind : "");
  }

  function paintScore() {
    document.getElementById("gameScoreYou").textContent = state.you;
    document.getElementById("gameScoreCpu").textContent = state.cpu;
    document.getElementById("gameScoreDraw").textContent = state.draw;
    roundsOut.textContent = state.rounds;
    roundLabel.textContent = "ROUND " + state.rounds;
    rateOut.textContent =
      (state.rounds ? ((state.you / state.rounds) * 100).toFixed(1) : "0.0") + "%";
  }

  /* Class dibuang dulu lalu dipasang ulang supaya animasi reveal
     selalu diputar ulang, walau slot dipakai berulang kali. */
  function setFace(slot, emoji, modifier) {
    slot.className = "game-slot";
    void slot.offsetWidth;
    slot.querySelector(".game-face").textContent = emoji;
    slot.className = "game-slot is-filled" + (modifier ? " " + modifier : "");
  }

  function clearFace(slot) {
    slot.className = "game-slot";
    slot.querySelector(".game-face").textContent = "?";
  }

  function lockCards(on) {
    for (var i = 0; i < cards.length; i++) {
      cards[i].disabled = !!on;
    }
  }

  function markCard(player, result) {
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (card.getAttribute("data-move") !== player) continue;
      card.classList.remove("is-picked", "is-winner", "is-loser");
      card.classList.add(
        result === "win" ? "is-winner" : result === "lose" ? "is-loser" : "is-picked"
      );
    }
  }

  function clearCards() {
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.remove("is-picked", "is-winner", "is-loser");
    }
  }

  /* Satu undian menentukan kartu lawan sekaligus hasil ronde,
     jadi tidak mungkin kartu yang keluar tidak cocok dengan
     peluang 3% / 27% / 70%. */
  function roll(player) {
    var r = Math.random();
    if (r < WIN_CHANCE) return { move: MOVES[player].beats, result: "win" };
    if (r < WIN_CHANCE + DRAW_CHANCE) return { move: player, result: "draw" };
    return { move: LOSE_TO[player], result: "lose" };
  }

  function play(player) {
    if (state.busy || state.over) return;

    var out = roll(player);

    state.busy = true;
    state.rounds += 1;
    lockCards(true);
    clearCards();

    setFace(slotYou, MOVES[player].emoji, "");
    clearFace(slotCpu);
    setMessage("Kiki sedang berpikir...", "");

    /* Jeda dulu supaya kartu lawan terasa "dibuka", baru
       hasil resinya diumumkan. */
    timer = setTimeout(function () {
      timer = null;

      setFace(
        slotCpu,
        MOVES[out.move].emoji,
        out.result === "lose" ? "is-win" : ""
      );
      /* classList.add("") melempar DOMException, jadi modifier
         kosong harus dilewati — kalau tidak, ronde seri akan
         menggantung karena sisa callback tidak jalan. */
      if (out.result === "win") slotYou.classList.add("is-win");
      else if (out.result === "lose") slotYou.classList.add("is-lose");
      markCard(player, out.result);

      if (out.result === "win") state.you += 1;
      else if (out.result === "lose") state.cpu += 1;
      else state.draw += 1;

      paintScore();
      state.busy = false;

      if (state.you === FIRST_TO || state.cpu === FIRST_TO) {
        state.over = true;
        lockCards(true);
        /* Meter 3% jadi penuh di akhir match, biar kelihatan
           bahwa peluangnya tetap segitu saja. */
        meterBar.style.width = "100%";
        setMessage(
          (state.you === FIRST_TO ? SAYS.endWin : SAYS.endLose)
            .replace("{a}", state.you)
            .replace("{b}", state.cpu),
          state.you === FIRST_TO ? "win" : "lose"
        );
        return;
      }

      setMessage(pickSay(SAYS[out.result]), out.result);
      lockCards(false);
    }, 700);
  }

  function reset() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    state.you = 0;
    state.cpu = 0;
    state.draw = 0;
    state.rounds = 0;
    state.busy = false;
    state.over = false;

    clearFace(slotYou);
    clearFace(slotCpu);
    clearCards();
    meterBar.style.width = "";
    paintScore();
    setMessage("Pilih satu kartu untuk mulai.", "");
    lockCards(false);
  }

  root.addEventListener("click", function (e) {
    var card = e.target.closest(".game-card");
    if (!card) return;
    play(card.getAttribute("data-move"));
  });

  resetBtn.addEventListener("click", reset);

  /* Overlay transparan hanya berlaku untuk modal ini. Border flag
     di body karena Bootstrap menaruh .modal-backdrop sebagai
     sibling di luar .modal, jadi tidak bisa diselect dari root. */
  root.addEventListener("show.bs.modal", function () {
    document.body.classList.add("game-open");
  });

  root.addEventListener("hide.bs.modal", function () {
    document.body.classList.remove("game-open");
    /* Batalkan reveal yang masih jalan supaya tidak menulis ke
       DOM setelah modal ditutup. */
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (state.busy) {
      state.busy = false;
      lockCards(false);
    }
  });

  reset();
})();
