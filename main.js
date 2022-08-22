var cards = Array.from(document.querySelectorAll('.card-item'));
var nextCover = document.getElementById('next');
var previousCover = document.getElementById('previous');
var cardsDots = Array.from(document.querySelectorAll('.card-dot'));
var activeCard = 0;

cardsDots.forEach((el, i) => {
  el.addEventListener('click', () => {
    setActiveCard(i);
  });
});

function initializeCardsPosition() {
  cards.forEach((el, i) => {
    el.style.zIndex = cards.length - i;
    el.style.transform = `translate3d(calc(${10 * i}%), 0, ${
      -100 * i
    }px) scale(${1 - 0.1 * i})`;
  });
}

function setActiveCard(index) {
  if (index < 0 || index > cards.length - 1) return;

  cards[activeCard].classList.remove('active');
  cards[index].classList.add('active');
  activeCard = index;

  cards[activeCard].style.zIndex = cards.length;
  cards[activeCard].style.transform = 'translate3d(0, 0, 0) scale(1)';
  cards[activeCard].classList.add('active');

  adjustZIndexes();
  adjustTransformValues();

  cardsDots.forEach((el) => el.classList.remove('active'));
  cardsDots[activeCard].classList.add('active');
}

function adjustZIndexes() {
  var el = document.querySelector('.card-item.active');
  var nextWrapper = el;
  var previousWrapper = el;

  while (nextWrapper.nextElementSibling) {
    var currZIndex = nextWrapper.style.zIndex;
    nextWrapper.nextElementSibling.style.zIndex = currZIndex - 1;
    nextWrapper = nextWrapper.nextElementSibling;
  }

  while (previousWrapper.previousElementSibling) {
    previousWrapper.previousElementSibling.style.zIndex =
      previousWrapper.style.zIndex - 1;
    previousWrapper = previousWrapper.previousElementSibling;
  }
}

function adjustTransformValues() {
  var i = 1;
  var activeElement = document.querySelector('.card-item.active');
  var nextWrapper = activeElement;
  var previousWrapper = activeElement;

  while (nextWrapper.nextElementSibling) {
    nextWrapper.nextElementSibling.style.transform = `translate3d(calc(${
      10 * i
    }%), 0, ${-100 * i}px) scale(${1 - 0.1 * i})`;
    nextWrapper = nextWrapper.nextElementSibling;
    i++;
  }

  i = 1;

  while (previousWrapper.previousElementSibling) {
    previousWrapper.previousElementSibling.style.transform = `translate3d(calc(${
      -10 * i
    }%), 0, ${-100 * i}px) scale(${1 - 0.1 * i})`;
    previousWrapper = previousWrapper.previousElementSibling;
    i++;
  }
}

nextCover.addEventListener('click', () => {
  setActiveCard(activeCard + 1);
});

previousCover.addEventListener('click', () => {
  setActiveCard(activeCard - 1);
});

initializeCardsPosition();
