'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //another way to pass id selector to a element.
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnroll = document.querySelector('.btn--roll');
const btnnew = document.querySelector('.btn--new');
const btnhold = document.querySelector('.btn--hold');

let currentscore, playing, scores, activeplayer;

// starting conditions (page is reloaded)
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  currentscore = 0;
  scores = [0, 0];
  activeplayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0; //ternary operator
  currentscore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice
btnroll.addEventListener('click', function () {
  if (playing) {
    //1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check for dice ==1
    if (dice !== 1) {
      //add dice to currentscore
      currentscore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
      // current0El.textContent = currentscore;
    } else {
      // switch to next player
      switchplayer();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player's score
    scores[activeplayer] += currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];

    //2.check if player score >=100
    if (scores[activeplayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    }

    //switch to next player
    switchplayer();
  }
});

btnnew.addEventListener('click', init);
