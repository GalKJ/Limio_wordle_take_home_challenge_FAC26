import dictionaryArray from "./word_list.js";

// Global variables
    const dictionary = dictionaryArray;
    const contrastMenuToggle = document.querySelector('#contrast-menu-checkbox');

// const state is an object that will keep track of the current game state in memory and update the UI render accordingly   
    const state = {
        secret: dictionary[Math.floor(Math.random() * dictionary.length)],
        grid: Array(6).fill().map(() => Array(5).fill('')),
        currentRow: 0,
        currentColumn: 0,
    }
    
// Function 
    function updateGrid() {
        for (let i = 0; i < state.grid.length; i++) {
            for (let j = 0; j < state.grid[i].length; j++) {
                const box = document.querySelector(`#box${i}${j}`);
                box.textContent = state.grid[i][j];
                
            }
            
        }
    }

// Function creates a div dom element with the class name 'box'. The id of the box div is created using interpolation and named 'box' followed by the values of the row and column arguments passed from the outer and inner for loop indexes. The box div is then appended to the parent grid element. 
    function drawBox(container, row, column, letter = '') {
        const box = document.createElement('div');
        box.className = 'box';
        box.id = `box${row}${column}`;
        box.textContent = letter;

        container.appendChild(box);
        
    }

// Function takes the game div as an argument, creates a div with the class name 'grid' and runs an inner and outer for loop calling the drawBox function for each iteration and passing the arguments 'grid' 'i' 'j' to draw box and finally appends the grid div to the game div as a child. 
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

// Function listens for the keydown event, saves the event keydown to 'key' variable and runs the appropriate if statement. 
    function registerKeyboardEvents() {
        document.body.addEventListener("keydown", (e) => {
            const key = e.key;
            const userOutput = document.querySelector("#user-output");
            if (key === 'Enter') {
                if (state.currentColumn === 5) {
                    const word = getCurrentWord();
                    if (isWordValid(word)) {
                        revealWord(word);
                        state.currentRow++;
                        state.currentColumn = 0;
                    } else {
                        userOutput.textContent = 'This is not a valid word User.';
                    }
                }
            }
            if (key === 'Backspace') {
                removeLetter();
                userOutput.textContent = '';
            }
            if (isLetter(key)) {
                addLetter(key);
            }

            updateGrid();
        });
    }

// Function returns the values from the state object using the index of current row and using reduce returns the indexed values as a string. 
    function getCurrentWord() {
        return state.grid[state.currentRow].reduce((acc, current) => acc + current);
    }
    
// Function checks that the dictionary array includes the string created by getCurrentWord.
    function isWordValid(word) {
        return dictionary.includes(word);
    }

// Function runs a for loop to iterate over the box elements in the UI checking the text content against the word stored in memory at state.secret from index 0 through 4. It then checks if statement conditionals and adds and removes classes accordingly. The function scoped const variable isWinner has it's value set to the return value of currentWord and state.secret being equal while gameOver has a value set to the current row being equal to 5. These truthy values are then used as if statement conditionals.  
    function revealWord(guess) {
        const row = state.currentRow;
        const userOutput = document.querySelector('#user-output');

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
            userOutput.textContent = 'Congratulations User :) You win!';
        } else if (isGameOver) {
            userOutput.textContent = `Better luck next time User:( The correct word was ${state.secret}.`;
        }
    }

    // Function checks if the expression is true. 
    function isLetter(key) {
        return key.length === 1 && key.match(/[a-z]/i);
    }

// Function returns if user is typing at the end of a row. If this conditional returns false the current user input is saved in the state object at the index of current row and current column and the column in incremented by one.  
    function addLetter(letter) {
        if (state.currentColumn === 5) return;
        state.grid[state.currentRow][state.currentColumn] = letter;
        state.currentColumn++;
    }

// Function returns when if statement conditional returns true. Otherwise the state.grid at index current row and current column minus one has it's value set to an empty string and the current state.currentColumn value is decremented by one.
    function removeLetter() {
        if (state.currentColumn === 0) return;
        state.grid[state.currentRow][state.currentColumn - 1] = '';
        state.currentColumn--;
    }

// Function runs drawGrid to render UI game board, registerKeyboardEvents to listen for the key down event and run the relevant if statement. 
    function startUp() {
        const game = document.querySelector("#game");
        
        drawGrid(game);

        registerKeyboardEvents();

        console.log(state.secret); 
    }



// High contrast feature
    const contrastButton = document.querySelector('#contrast');

    contrastButton.addEventListener("click", (e) => {

    const boxes = document.querySelector(".grid").childNodes;

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

// Menu toggle 

        contrastMenuToggle.addEventListener('click', () => {

            const span0 = document.querySelector(".menu-span-0-unchecked");
            const span1 = document.querySelector(".menu-span-1-unchecked");
            const span2 = document.querySelector(".menu-span-2-unchecked");
            const menuContainer = document.querySelector(".menu-container-closed");

            switch (contrastMenuToggle.checked) {
                case false:
                    span0.classList.remove("menu-span-0-checked");
                    span1.classList.remove("menu-span-1-checked");
                    span2.classList.remove("menu-span-2-checked");
                    menuContainer.classList.remove("menu-container-open");
                    break;
                case true:
                    span0.classList.add("menu-span-0-checked");
                    span1.classList.add("menu-span-1-checked");
                    span2.classList.add("menu-span-2-checked");
                    menuContainer.classList.add("menu-container-open");
                    break;
                default:
                    break;
            }
    })

    startUp();