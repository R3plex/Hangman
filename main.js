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
bras.classList.add("show");
diago.classList.add("show");
corde.classList.add("show");

const alphabet = Object.fromEntries(
  [...document.querySelectorAll(".letter")].map((elem) => [elem.id, elem])
);
// alphabet = {letter-a:objecta , letter-b:objectb ...}
for (let key in alphabet) {
  alphabet[key].addEventListener("click", () => {
    isLetterIn(key[key.length - 1]);
  });
}

const submit = document.querySelector(".Submit");
const text = document.querySelector("input");
let motCache;
const wordDisplay = document.querySelector(".wordDisplay");
let lettreTrouve = [];
let NumberOfBad = 0;
const stickMan = [Head, Body, armOne, armTwo, legOne, legTwo];
let lettreMotCache = [];
const resetBtn = document.querySelector(".reset");
let pasFini = true;

resetBtn.addEventListener("click", reset);

submit.addEventListener("click", () => {
  reset();
  motCache = text.value.trim();
  for (i of motCache) {
    if (i !== " ") {
      lettreMotCache.push(i);
    }
  }
  text.value = "";
  lettreTrouve = [];
  afficheMot();
});

function reset() {
  wordDisplay.textContent = "Enter a word";
  lettreMotCache = [];
  NumberOfBad = 0;
  lettreTrouve = [];
  for (let key in alphabet) {
    alphabet[key].classList.remove("clicked");
  }
  for (let i = 0; i < stickMan.length; i++) {
    stickMan[i].classList.remove("show");
  }
  pasFini = true;
}

function afficheHangman() {
  for (let i = 0; i < NumberOfBad; i++) {
    stickMan[i].classList.add("show");
  }
}

function afficheMot() {
  wordDisplay.textContent = "";
  for (i of motCache) {
    i === " "
      ? (wordDisplay.textContent += " - ")
      : lettreTrouve.indexOf(i) > -1
      ? (wordDisplay.textContent += i)
      : (wordDisplay.textContent += " _ ");
  }
}

function isLetterIn(letter) {
  if (pasFini) {
    if (motCache.indexOf(letter) > -1) {
      alphabet[`letter-${letter}`].classList.add("clicked");
      lettreTrouve.push(letter);
      if (JSON.stringify(lettreTrouve) == JSON.stringify(lettreMotCache)) {
        wordDisplay.textContent = `Bravo tu a bien trouve le mot "${motCache}"`;
        pasFini = false;
      } else {
        afficheMot();
      }
    } else {
      alphabet[`letter-${letter}`].classList.add("clicked");
      NumberOfBad++;
      afficheHangman();
      if (NumberOfBad === 6) {
        wordDisplay.textContent = `You lost, the word was "${motCache}"`;
        pasFini = false;
      }
    }
  }
}
