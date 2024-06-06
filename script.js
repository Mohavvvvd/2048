let gridContainer = document.getElementById('grid-container');
        let scoreDisplay = document.getElementById('score-value');
        let grid = [];
        let score = 0;
        let selectedCell = null;
    
        function initializeGrid() {
            grid = [];
            score = 0;
            for (let i = 0; i < 4; i++) {
                grid[i] = [];
                for (let j = 0; j < 4; j++) {
                    grid[i][j] = 0;
                }
            }
            addTile();
            addTile();
            renderGrid();
        }
    
        function addTile() {
            let emptyTiles = [];
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (grid[i][j] === 0) {
                        emptyTiles.push({ x: i, y: j });
                    }
                }
            }
            if (emptyTiles.length === 0) {
                return;
            }
            let randomTileIndex = Math.floor(Math.random() * emptyTiles.length);
            let position = emptyTiles[randomTileIndex];
            grid[position.x][position.y] = Math.random() < 0.9 ? 2 : 4;
        }
    
        function renderGrid() {
            gridContainer.innerHTML = '';
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    let cell = document.createElement('div');
                    cell.classList.add('grid-item');
                    cell.dataset.row = i;
                    cell.dataset.col = j;
                    if (grid[i][j] !== 0) {
                        cell.textContent = grid[i][j];
                        cell.dataset.number = grid[i][j]; 
                    }
                    gridContainer.appendChild(cell);
                }
            }
            scoreDisplay.textContent = score;
        }
    
        function startGame() {
            initializeGrid();
        }
    
        function moveLeft() {
            for (let i = 0; i < 4; i++) {
                for (let j = 1; j < 4; j++) {
                    if (grid[i][j] !== 0) {
                        let k = j;
                        while (k > 0 && grid[i][k - 1] === 0) {
                            grid[i][k - 1] = grid[i][k];
                            grid[i][k] = 0;
                            k--;
                        }
                        if (k > 0 && grid[i][k - 1] === grid[i][k]) {
                            grid[i][k - 1] *= 2;
                            score += grid[i][k - 1];
                            grid[i][k] = 0;
                        }
                    }
                }
            }
            addTile();
            renderGrid();
        }
    
        function moveRight() {
            for (let i = 0; i < 4; i++) {
                for (let j = 2; j >= 0; j--) {
                    if (grid[i][j] !== 0) {
                        let k = j;
                        while (k < 3 && grid[i][k + 1] === 0) {
                            grid[i][k + 1] = grid[i][k];
                            grid[i][k] = 0;
                            k++;
                        }
                        if (k < 3 && grid[i][k + 1] === grid[i][k]) {
                            grid[i][k + 1] *= 2;
                            score += grid[i][k + 1];
                            grid[i][k] = 0;
                        }
                    }
                }
            }
            addTile();
            renderGrid();
        }
    
        function moveUp() {
            for (let j = 0; j < 4; j++) {
                for (let i = 1; i < 4; i++) {
                    if (grid[i][j] !== 0) {
                        let k = i;
                        while (k > 0 && grid[k - 1][j] === 0) {
                            grid[k - 1][j] = grid[k][j];
                            grid[k][j] = 0;
                            k--;
                        }
                        if (k > 0 && grid[k - 1][j] === grid[k][j]) {
                            grid[k - 1][j] *= 2;
                            score += grid[k - 1][j];
                            grid[k][j] = 0;
                        }
                    }
                }
            }
            addTile();
            renderGrid();
        }
    
        function moveDown() {
            for (let j = 0; j < 4; j++) {
                for (let i = 2; i >= 0; i--) {
                    if (grid[i][j] !== 0) {
                        let k = i;
                        while (k < 3 && grid[k + 1][j] === 0) {
                            grid[k + 1][j] = grid[k][j];
                            grid[k][j] = 0;
                            k++;
                        }
                        if (k < 3 && grid[k + 1][j] === grid[k][j]) {
                            grid[k + 1][j] *= 2;
                            score += grid[k + 1][j];
                            grid[k][j] = 0;
                        }
                    }
                }
            }
            addTile();
            renderGrid();
        }
    
        function isGameOver() {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (grid[i][j] === 0) {
                        return false;
                    }
                    if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
                        return false;
                    }
                    if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
                        return false;
                    }
                }
            }
            return true;
        }
    
        document.addEventListener('keydown', function(event) {
            switch (event.key) {
                case 'ArrowLeft':
                    moveLeft();
                    break;
                case 'ArrowRight':
                    moveRight();
                    break;
                case 'ArrowUp':
                    moveUp();
                    break;
                case 'ArrowDown':
                    moveDown();
                    break;
            }
            renderGrid();
            if (isGameOver()) {
                alert('Game Over! Your score: ' + score);
                startGame();
            }
        });
gridContainer.addEventListener('touchstart', handleTouchStart, false);
gridContainer.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(event) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = event.touches[0].clientX;
    let yUp = event.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) { 
        if (xDiff > 0) { 
            moveLeft();
        } else { 
            moveRight();
        }
    } else { 
        if (yDiff > 0) { 
            moveUp();
        } else { 
            moveDown();
        }
    }

    xDown = null;
    yDown = null;
}
        
        startGame();