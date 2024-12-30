const cardValues = ['🐶', '🐱', '🐶', '🦁', '🐰', '🐻', '🐹', '🐹', '🐻', '🐰', '🦁', '🐱'];

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let score = 0;

const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">?</div>
            <div class="card-back">${value}</div>
        </div>
    `;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.querySelector('.card-back').textContent === secondCard.querySelector('.card-back').textContent;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    score++;
    scoreDisplay.textContent = score;
    resetBoard();

    if (score === cardValues.length / 2) {
        alert("You win!");
        restartButton.style.display = 'block';
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffleCards() {
    cardValues.sort(() => Math.random() - 0.5);
}

function startGame() {
    shuffleCards();
    cardValues.forEach(value => {
        const card = createCard(value);
        gameContainer.appendChild(card);
    });
}

function restartGame() {
    score = 0;
    scoreDisplay.textContent = score;
    restartButton.style.display = 'none';
    gameContainer.innerHTML = '';
    startGame();
}

restartButton.addEventListener('click', restartGame);

startGame();
