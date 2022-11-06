// Mock take home challenge Wordle for FAC26
function drawBox(container, row, column, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${column}`;
    box.textContent = letter;

    container.appendChild(box);

}