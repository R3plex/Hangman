const sol = document.querySelector("#sol");
const poto = document.querySelector("#poto");
const bras = document.querySelector("#bras");
const diago = document.querySelector("#diago");
const corde = document.querySelector("#corde");
const Head = document.querySelector("#Head");
const Body = document.querySelector("#Body");
const armOne = document.querySelector("#armOne");
const armTwo = document.querySelector("#armTwo");
const legOne = document.querySelector("#legOne");
const legTwo = document.querySelector("#legTwo");

sol.classList.add("show");
poto.classList.add("show");
// bras.classList.add("show");
// diago.classList.add("show");
// corde.classList.add("show");

const submit = document.querySelector(".Submit");
const text = document.querySelector("input");
let hiddenWord;
const wordDisplay = document.querySelector(".wordDisplay");
let lettersFound = [];
let NumberOfBad = 0;
const stickMan = [
  bras,
  diago,
  corde,
  Head,
  Body,
  armOne,
  armTwo,
  legOne,
  legTwo,
];
let lettersInWord = [];
const resetBtn = document.querySelector(".reset");
let notDone = true;
const random = document.querySelector(".random");

const alphabet = Object.fromEntries(
  [...document.querySelectorAll(".letter")].map((elem) => [elem.id, elem])
);
// alphabet = {letter-a:objecta , letter-b:objectb ...}
for (let key in alphabet) {
  alphabet[key].addEventListener("click", () => {
    isLetterIn(key[key.length - 1]);
  });
}

function reset() {
  wordDisplay.textContent = "Enter a word";
  lettersInWord = [];
  NumberOfBad = 0;
  lettersFound = [];
  for (let key in alphabet) {
    alphabet[key].classList.remove("clicked");
  }
  for (let i = 0; i < stickMan.length; i++) {
    stickMan[i].classList.remove("show");
  }
  notDone = true;
}

resetBtn.addEventListener("click", reset);

function drawWord() {
  wordDisplay.textContent = "";
  for (i of hiddenWord) {
    i === " "
      ? (wordDisplay.textContent += " - ")
      : lettersFound.indexOf(i) > -1
      ? (wordDisplay.textContent += i)
      : (wordDisplay.textContent += " _ ");
  }
}

function randomWord() {
  reset();
  fetch("/Hangman/wordlist.txt")
    .then((res) => res.text())
    .then((text) => {
      const words = text.split("\n");
      hiddenWord = words[Math.floor(Math.random() * 1000)];
      for (i of hiddenWord) {
        if (i !== " ") {
          lettersInWord.push(i);
        }
      }
      text.value = "";
      lettersFound = [];
      drawWord();
    });
}

random.addEventListener("click", randomWord);

submit.addEventListener("click", () => {
  reset();
  hiddenWord = text.value.trim().toLocaleLowerCase();
  for (i of hiddenWord) {
    if (i !== " ") {
      lettersInWord.push(i);
    }
  }
  text.value = "";
  lettersFound = [];
  drawWord();
});

function drawHangman() {
  for (let i = 0; i < NumberOfBad; i++) {
    stickMan[i].classList.add("show");
  }
}

function isLetterIn(letter) {
  if (notDone) {
    if (hiddenWord.indexOf(letter) > -1) {
      alphabet[`letter-${letter}`].classList.add("clicked");
      lettersFound.push(letter);
      drawWord();
      if (wordDisplay.textContent.indexOf("_") == -1) {
        wordDisplay.textContent = `Well done the word was "${hiddenWord}"`;
        notDone = false;
      }
    } else {
      alphabet[`letter-${letter}`].classList.add("clicked");
      NumberOfBad++;
      drawHangman();
      if (NumberOfBad === 9) {
        wordDisplay.textContent = `You lost, the word was "${hiddenWord}"`;
        notDone = false;
      }
    }
  }
}
