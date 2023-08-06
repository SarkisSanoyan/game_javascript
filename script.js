//SELECTORS
const $gameTime = document.querySelector('#game-time');
const $result = document.querySelector('#result');
const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $timeControl = document.querySelector('#time-control');

const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'purple', 'pink', 'aquamarine', 'brown', 'black'];
let score = 0;


//EVENT LISTENERS
$start.addEventListener('click', startGameFunc);
$timeControl.addEventListener('change', setTimeFunc);
$game.addEventListener('click', handleBoxFunc);


//FUNCTIONS
function startGameFunc() {
    hide($start);
    $game.style.backgroundColor = 'white';
    $timeControl.setAttribute('disabled', 'true');

    score = 0;
    $result.textContent = score;

    const interval = setInterval(() => {
        const time = $gameTime.textContent; // =$gameTime.innerHTML

        if (time <= 0) {
            clearInterval(interval);
            endGameFunc();
        } else {
            $gameTime.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}

function endGameFunc() {
    show($start);
    $game.style.backgroundColor = 'grey';
    setTimeFunc();
    $timeControl.removeAttribute('disabled');

    $game.textContent = '';
}

function setTimeFunc() {
    $gameTime.textContent = (+$timeControl.value).toFixed(1);
}

function renderBox() {
    $game.textContent = '';

    const colorIndex = random(0, colors.length);
    const boxSize = random(10, 100);

    const gameSize = $game.getBoundingClientRect().width;

    const top = random(0, gameSize - boxSize);
    const left = random(0, gameSize - boxSize);

    const $box = document.createElement('div');
    $box.style.width = $box.style.height = boxSize + 'px';
    $box.style.backgroundColor = colors[colorIndex];
    $box.style.position = 'absolute';
    $box.style.top = top + 'px';
    $box.style.left = left + 'px';
    $box.style.cursor = 'pointer';
    $box.setAttribute('data-kim', 'true');

    $game.appendChild($box);
}

function handleBoxFunc(event) {
    if (event.target.dataset.kim) {
        score++;
        $result.textContent = score;
        renderBox();
    }
}

// SUPPORT FUNCTIONS
function hide($el) {
    $el.classList.add('hide');
}

function show($el) {
    $el.classList.remove('hide');
}

function random(min, max) {
    const diff = max - min;
    return Math.floor(Math.random() * diff + min);
}
