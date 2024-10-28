const items = document.querySelectorAll('.item');
const bins = document.querySelectorAll('.bin');
const timerDisplay = document.getElementById('timer');
const levelDisplay = document.getElementById('level');
const startBtn = document.getElementById('start-btn');

let time = 60;
let timer;
let currentLevel = 1;
let itemsSorted = 0;

startBtn.addEventListener('click', startGame);

function startGame() {
    resetGame();
    timer = setInterval(updateTimer, 1000);
}

function resetGame() {
    time = 60;
    itemsSorted = 0;
    timerDisplay.textContent = `Time: ${time}`;
    levelDisplay.textContent = `Level: ${currentLevel}`;
    items.forEach(item => item.style.display = 'flex');
}

function updateTimer() {
    time--;
    timerDisplay.textContent = `Time: ${time}`;
    if (time === 0) {
        clearInterval(timer);
        alert('Time is up! Try again.');
        resetGame();
    }
}

items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

bins.forEach(bin => {
    bin.addEventListener('dragover', dragOver);
    bin.addEventListener('drop', dropItem);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => e.target.classList.add('dragging'), 0);
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function dropItem(e) {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    const item = document.getElementById(itemId);
    const binType = e.target.id.split('-')[0];
    const itemType = item.getAttribute('data-type');

    if (binType === itemType) {
        e.target.appendChild(item);
        item.style.display = 'none';
        itemsSorted++;
        checkLevelCompletion();
    }
}

function checkLevelCompletion() {
    if (itemsSorted === items.length) {
        clearInterval(timer);
        alert(`Level ${currentLevel} Complete!`);
        if (currentLevel < 4) {
            currentLevel++;
            startGame();
        } else {
            alert('You won the game!');
            resetGame();
        }
    }
}
