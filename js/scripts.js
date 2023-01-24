const ALL_WORDS = [
  'alaba',
  'bollo',
  'canal',
  'dados',
  'estar',
  'farol',
  'gatos',
  'index',
  'jaula',
  'labio',
  'moral',
  'nacer',
  'oasis',
  'piano',
  'queja',
  'rampa',
  'salta',
  'trama',
  'uvula',
  'valla',
  'yermo',
  'zorro'
];

const NUMBER_OF_TRIES = 5;

const gameBoard = document.getElementById('game-board');
const userWordForm = document.getElementById('user-word-form');
const popUpElement = document.getElementById('pop-up');

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
    if (letter === wordToCheck[i]) {
      className = 'letter--correct';
      wordToCheck = wordToCheck.replace(letter, '-');
      paintRow(letter, i, className, delay * 100);
    }
  }

  for (let i = 0; i < wordToCheck.length; i++) {
    const letter = word[i];
    if (wordToCheck.includes(letter)) {
      className = 'letter--present';
      wordToCheck = wordToCheck.replace(letter, '-');
      paintRow(letter, i, className, delay * 100);
    } else {
      className = 'letter--incorrect';
      paintRow(letter, i, className, delay * 100);
    }
  }

  console.log(wordToCheck);

  delay++;

  currentRow++;
};

const startGame = () => {
  secretWord = chooseSecretWord();
  console.log(secretWord);
  gameBoard.append(createRow());
};

const checkErrors = msg => {
  popUpElement.innerHTML = '';
  const newText = document.createElement('p');
  newText.textContent = msg;
  popUpElement.append(newText);
  popUpElement.classList.add('pop-up--show');
  const timeoutId = setTimeout(() => {
    popUpElement.classList.remove('pop-up--show');
    clearTimeout(timeoutId);
  }, 2000);
};

startGame();

const checkWin = word => {
  checkRow(word);
  console.log(word);

  if (word === secretWord) {
    console.log('WIN');
    return true;
  }

  if (currentRow === NUMBER_OF_TRIES) {
    checkErrors('No te quedan más intentos');
    //MODAL HAS PERDIDO
  }
  return false;
};

userWordForm.addEventListener('submit', e => {
  e.preventDefault();
  if (e.target.word.value.length !== 5) {
    checkErrors('La palabra debe tener 5 letras');
    return;
  }

  if (!checkWin(e.target.word.value)) {
    e.target.reset();
  }
});
