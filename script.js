"use strict";
// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const modal = document.querySelector(".modal");
const modal2 = document.querySelector(".modal-2");
const btn = document.querySelector(".close-modal");
const body = document.querySelector(".body");
const btnAgain = document.querySelector(".btn--new");
document.querySelector(".body").style.backdropFilter = "blur(0px)";
//starting conditions
let score, currentScore, activePlayer, playing;
let scores;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add("hidden");

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  player1El.classList.remove("player--active");
};
const again = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add("hidden");

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  document;

  modal2.classList.add("hidden");
  modal.classList.add("hidden");
  document.querySelector(".body").style.backdropFilter = "blur(0)";

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
  player0El.classList.add("player--active");
};
document.querySelector(".body").style.backdropFilter = "blur(0)";

init();
let currentPlayer = document.getElementById(`current--${activePlayer}`);
const switchPlayer = function () {
  currentPlayer.textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  currentPlayer = document.getElementById(`current--${activePlayer}`);
  currentPlayer.textContent = currentScore;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
// sounds
const diceSound = document.getElementById("diceAudio");
const coinSound = document.getElementById("coinAudio");
const newGameSound = document.getElementById("GameSound1");

function newGameSound1() {
  newGameSound.play(); // Play the audio
}

function newGameSound2() {
  newGameSound.play(); // Play the audio
}

// Add event listeners to buttons
document.querySelector(".win1").addEventListener("mousedown", newGameSound1);
document.querySelector(".win2").addEventListener("mousedown", newGameSound2);

function playDiceSound() {
  diceSound.play();
}

function playCoinSound() {
  coinSound.play();
}
function updateAudioSource(newSource) {
  coinAudio.src = newSource;
  coinAudio.load();
}
function playWinningSound() {
  const winningAudio = new Audio("27JS6W5-retro-win-ga-sound-3.mp3");
  winningAudio.play();
}

// Event listener for the button
// document.querySelector(".btn--roll").addEventListener("mousedown", () => {
//   if (score >= 10) {
//     // Change the audio source to the new sound
//     updateAudioSource("27JS6W5-retro-win-game-sound-3.mp3");
//   }
// });

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1generating random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    //2display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    let currentPlayer = document.getElementById(`current--${activePlayer}`);
    //3check fo rolled 1; if true, switch palyer
    if (dice !== 1) {
      currentScore += dice;
      currentPlayer.textContent = currentScore;
    } else {
      currentPlayer.textContent = 0;
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1 add current score to player
    scores[activePlayer] += currentScore;
    // scores[2] = scores[2] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if score >=100
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add("hidden");
      playWinningSound();

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      if (activePlayer === 0) {
        modal.classList.remove("hidden");
        document.querySelector(".body").style.backdropFilter = "blur(6px)";
      } else if (activePlayer === 1) {
        modal2.classList.remove("hidden");
        document.querySelector(".body").style.backdropFilter = "blur(6px)";
      }
    } else {
      switchPlayer();
    }
  }
});

document.querySelector(".win1").addEventListener("click", again);
document.querySelector(".win2").addEventListener("click", again);
let isAudioPlaying = false;

document.querySelector(".btn.btn--roll").addEventListener("click", function () {
  // Game logic here...

  if (!isAudioPlaying) {
    document.getElementById("my_audio").play();
    isAudioPlaying = true;
  }
});
