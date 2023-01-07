const ALL_WORDS = ['canal'];

const NUMBER_OF_TRIES = 5;

const gameBoard = document.getElementById('game-board');
const userWordForm = document.getElementById('user-word-form');

let currentRow = 0;
let secretWord;

const chooseSecretWord = () => {
  return ALL_WORDS[Math.floor(Math.random() * ALL_WORDS.length)];
};

const createRow = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < NUMBER_OF_TRIES; i++) {
    const newRow = document.createElement('div');
    newRow.classList.add('game-board__row');
    for (let j = 0; j < secretWord.length; j++) {
      const newLetterContainer = document.createElement('span');
      newLetterContainer.classList.add('letter');
      newRow.append(newLetterContainer);
    }
    fragment.appendChild(newRow);
  }

  return fragment;
};

const paintRow = (letter, position, className, delay) => {
  const element = gameBoard.children[currentRow].children[position];
  element.classList.add(className, 'animated');
  element.style.animationDelay = `${delay}ms`;
  element.textContent = letter;
};

const checkRow = word => {
  let delay = 1;
  let wordToCheck = secretWord;
  let className;
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if (letter === secretWord[i]) {
      wordToCheck = wordToCheck.replace(letter, '');
      className = 'letter--correct';
    } else if (secretWord.includes(letter) && wordToCheck.includes(letter)) {
      wordToCheck = wordToCheck.replace(letter, '');
      className = 'letter--present';
    } else {
      className = 'letter--incorrect';
    }
    paintRow(letter, i, className, delay * 100);
    delay++;
  }
};

const startGame = () => {
  secretWord = chooseSecretWord();
  gameBoard.append(createRow());
};

startGame();

userWordForm.addEventListener('submit', e => {
  e.preventDefault();
  console.dir(e.target);
  if (e.target.word.value.length !== 5) return;

  if (currentRow < NUMBER_OF_TRIES) {
    checkRow(e.target.word.value);
    currentRow++;
    e.target.reset();
  }
});
