'use strict';

const score0el = document.querySelector('#score--0');
const score1el = document.querySelector('#score--1');
const diceel = document.querySelector('.dice');
const btnroll = document.querySelector('.btn--roll');
const btnnew = document.querySelector('.btn--new');
const btnhold = document.querySelector('.btn--hold');
const current0el = document.querySelector('#current--0');
const current1el = document.querySelector('#current--1');
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');

score0el.textContent = 0;
score1el.textContent = 0;
diceel.classList.add('hidden');

const scores = [0, 0];
let currscore = 0;
let activePlayer = 0;
let playing = true;
const switchfunction = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};
//rolling dice functionality
btnroll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceel.classList.remove('hidden');
    diceel.src = `dice-${dice}.png`;

    // 3. Check if rolled 1 switch player
    if (dice !== 1) {
      //add dice to current score
      currscore += dice;
      console.log(currscore);
      document.getElementById(`current--${activePlayer}`).textContent =
        currscore;
    } else {
      //switching player
      switchfunction();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player score
    scores[activePlayer] += currscore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceel.classList.add('hidden');
    } else {
      // 3. switch to next player
      switchfunction();
    }
  }
});
// when new game button is clicked
btnnew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  current0el.textContent = 0;
  current1el.textContent = 0;
  playing = true;
  currscore = 0;
  score0el.textContent = 0;
  score1el.textContent = 0;
});
