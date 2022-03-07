const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let turns = 0;
let record = 100000;

restart();

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip'); // добавили элементу из DOM класс flip

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // second click
        hasFlippedCard = false;
        secondCard = this;
        turns += 1;
        document.querySelector('.turns').innerHTML = 'TURNS: ' + turns;
        checkForMatch();
    }
}

function checkForMatch() {
    // do cards match?
    if(firstCard.dataset.framework === secondCard.dataset.framework){
        // it's a match
        disableCards();
    } else {
        // not a match
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard()
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

function restart() {
    let check = true;

    cards.forEach( card => {
        if(!card.classList.contains('flip')) check = false;
    });

    if(check && turns < record ){
       record = turns;
       document.querySelector('.record').innerHTML = 'MY RECORD: ' + record;
    }

    turns = 0;
    document.querySelector('.turns').innerHTML = 'TURNS: ' + turns;

    cards.forEach( card => {
        card.classList.remove('flip');
    })

    setTimeout(() => {
        shuffle();
    }, 1000);

    cards.forEach(card => card.addEventListener('click', flipCard));
    resetBoard();
}
