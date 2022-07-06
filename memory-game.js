"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

const colors = shuffle(COLORS);

createCards(colors);

let currentCards = [];
/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  const row1 = document.createElement("div");
  row1.setAttribute("class", "row");
  gameBoard.appendChild(row1);
  const row2 = document.createElement("div");
  row2.setAttribute("class", "row");
  gameBoard.appendChild(row2);

  const rows = document.querySelectorAll(".row");

  let numCards = 0;

  for (let color of colors) {
    let card = document.createElement("div");
    card.setAttribute("id", "card");
    card.style.backgroundColor = color;
    card.classList.add("faceDown");

    if (numCards < colors.length / 2) {
      // distributes cards evenly between the two rows
      rows[0].appendChild(card);
    } else {
      rows[1].appendChild(card);
    }

    numCards++;

    card.addEventListener("click", handleCardClick);
  }
}

/** Flip a card face-up. */
function flipCard(card) {
  // ... you need to write this ...
  card.classList.remove("faceDown");
}

/** Flip a card face-down. */

function unFlipCard(cards) {
  // ... you need to write this ...
  for (let card of cards) {
    card.classList.add("faceDown");
  }
  currentCards = [];
  return currentCards;
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  if (currentCards.length < 2 && evt.target.classList.contains("faceDown")) {
    flipCard(evt.target);
    currentCards.push(evt.target);
    currentCards = isMatch(currentCards);
  }
}

function isMatch(currentCards) {
  if (currentCards.length === 2) {
    if (
      currentCards[0].style.backgroundColor ===
      currentCards[1].style.backgroundColor
    ) {
      currentCards = [];
    } else {
      setTimeout(unFlipCard, FOUND_MATCH_WAIT_MSECS, currentCards);
    }
  }
  return currentCards;
}
