// Mock take home challenge Wordle for FAC26
const dictionary = ['tears', 'water', 'river', 'juice', 'tools', 'freak', 'cloth'];

const state = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(6).fill().map(() => Array(5).fill('')),
    currentRow: 0,
    currentColumn: 0,
}   

// function handleFirstTab(e) {
//     if (e.key === 'Tab') { // the "I am a keyboard user" key
//         console.log('TAB Pressed')
//         document.body.classList.add('user-is-tabbing');
//         window.removeEventListener('keydown', handleFirstTab);
//     }
// }

// window.addEventListener('keydown', handleFirstTab);

function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.querySelector(`#box${i}${j}`);
            box.textContent = state.grid[i][j];
            
        }
        
    }
}

function drawBox(container, row, column, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${column}`;
    box.textContent = letter;

    container.appendChild(box);
    
    return box;
}

function drawGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j)
            
        }
    }

    container.appendChild(grid);
}
// using addEventListener rather than onkeydown
function registerKeyboardEvents() {
    document.body.addEventListener("keydown", (e) => {
        const key = e.key;
        if (key === 'Enter') {
            if (state.currentColumn === 5) {
                const word = getCurrentWord();
                if (isWordValid(word)) {
                    revealWord(word);
                    state.currentRow++;
                    state.currentColumn = 0;
                } else {
                    alert('This is not a valid word User.');
                }
            }
        }
        if (key === 'Backspace') {
            removeLetter();
        }
        if (isLetter(key)) {
            addLetter(key);
        }

        updateGrid();
    });
}

function getCurrentWord() {
    return state.grid[state.currentRow].reduce((acc, current) => acc + current);
}

function isWordValid(word) {
    return dictionary.includes(word);
}

function revealWord(guess) {
    const row = state.currentRow;
    // const contrastButton = document.querySelector('#contrast');

    for (let i = 0; i < 5; i++) {
        const box = document.querySelector(`#box${row}${i}`);
        const letter = box.textContent;

        if (contrastButton.checked === false) {
        if (letter === state.secret[i]) {
            box.classList.add('right');
        } else if (state.secret.includes(letter)) {
            box.classList.add('wrong');
        } else {
            box.classList.add('empty');
        }
    } else if (contrastButton.checked === true) {
        if (letter === state.secret[i]) {
            box.classList.remove('right');
            box.classList.add('contrast-right');
        } else if (state.secret.includes(letter)) {
            box.classList.remove('wrong');
            box.classList.add('contrast-wrong');
        } else {
            box.classList.remove('empty');
            box.classList.add('contrast-empty');
        }
    }
    }
    
    const isWinner = state.secret === guess;
    const isGameOver = state.currentRow === 5;

    if (isWinner) {
        alert('Congratulations User :) You win!');
    } else if (isGameOver) {
        alert(`Better luck next time User:( The correct word was ${state.secret}.`)
    }
}

function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
    if (state.currentColumn === 5) return;
    state.grid[state.currentRow][state.currentColumn] = letter;
    state.currentColumn++;
}

function removeLetter() {
    if (state.currentColumn === 0) return;
    state.grid[state.currentRow][state.currentColumn - 1] = '';
    state.currentColumn--;
}

function startUp() {
    // is this the bug below?
    const game = document.querySelector("#game");
    drawGrid(game);

    registerKeyboardEvents();

    console.log(state.secret); 
}

startUp();

// console.log(state.grid[state.currentRow]);

// High contrast feature 
const contrastButton = document.querySelector('#contrast');
// let contrastToggle = false;
contrastButton.addEventListener("click", (e) => {

    const boxes = document.querySelector(".grid").childNodes;
    console.log('check');
    e.target.blur();

    boxes.forEach(box => {
        if (contrastButton.checked === true) {
            if (box.className.includes('right')) {
                box.classList.remove('right');
                box.classList.add('contrast-right');
            } else if (box.className.includes('wrong')) {
                box.classList.remove('wrong');
                box.classList.add('contrast-wrong');
            } else if (box.className.includes('empty')) {
                box.classList.remove('empty');
                box.classList.add('contrast-empty');
            }
        
    } else if (contrastButton.checked === false) {
        if (box.className.includes('contrast-right')) {
            box.classList.add('right');
            box.classList.remove('contrast-right');
        } else if (box.className.includes('contrast-wrong')) {
            box.classList.add('wrong');
            box.classList.remove('contrast-wrong');
        } else if (box.className.includes('contrast-empty')) {
            box.classList.add('empty');
            box.classList.remove('contrast-empty');
        }
    
}
})

})




// if (contrastToggle === false) {
//     contrastToggle = true;
//     e.target.blur();
    

//     console.log(contrastToggle);
// } else if (contrastToggle === true) {
//     contrastToggle = false;
//     e.target.blur();
//     console.log(contrastToggle);
// } 