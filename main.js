var cards = Array.from(document.querySelectorAll('.card-item'));
var nextCover = document.getElementById('next');
var previousCover = document.getElementById('previous');
var activeCard = 0;

function setCardsPosition() {
  cards.forEach((el, i) => {
    el.style.zIndex = cards.length - i;
    el.style.transform = `translate3d(calc(${10 * i}%), 0, ${
      -100 * i
    }px) scale(${1 - 0.1 * i})`;
  });
}

nextCover.addEventListener('click', () => {
  cards.push(cards.shift());
  setCardsPosition();
});

previousCover.addEventListener('click', () => {
  cards.unshift(cards.pop());
  setCardsPosition();
});

setCardsPosition();
