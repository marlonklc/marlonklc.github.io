const moveBall = {
    ballTypes: {
        YELLOW: { id: 'YELLOW', class: 'yellow' },
        RED: { id: 'RED', class: 'red' },
        BLUE: { id: 'BLUE', class: 'blue' },
        GREEN: { id: 'GREEN', class: 'green' },
        EMPTY: { id: 'EMPTY', class: 'disabled' }
    },
    board: Array(9).fill(''),
    containerElement: null,
    allowIndexesMovement: {
        0: [1,3],
        1: [0,2,4],
        2: [1,5],
        3: [0,4,6],
        4: [1,3,5, 7],
        5: [2,4,8],
        6: [3,7],
        7: [4,6, 8],
        8: [5, 7]
    },
    // arrowPositionMovement: {
    //     0: '←',
    //     1: '↑',
    //     1: '→',
    //     1: '↓',

    //     0: '→',
    //     1: '↑',
    //     1: '↑',
    // },


    init: function(container) {
        this.containerElement = container;
    },

    start: function() {
        const shuffledBalls = this.randomizeBalls();
        for (i in shuffledBalls) {
            this.board[i] = shuffledBalls[i];
        }
        this.updateBoard();
        this.generateTemplate();
        
        document.querySelector(".button-restart").classList.remove('visible');
        document.querySelector("#game").classList.remove('disabled');
    },

    generateTemplate: function() {
        const shuffledBalls = this.randomizeBalls();

        // show on page
    },

    randomizeBalls: function() {
        const balls = [
            this.ballTypes.YELLOW, this.ballTypes.YELLOW,
            this.ballTypes.RED, this.ballTypes.RED,
            this.ballTypes.EMPTY,
            this.ballTypes.BLUE, this.ballTypes.BLUE,
            this.ballTypes.GREEN, this.ballTypes.GREEN,
        ];

        const shuffledBalls = balls.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

        return shuffledBalls;
    },

    getEmptyBallIndex: function() {
        let emptyIndex = 0;
        
        for (index in this.board) {
            if (this.board[index].id === this.ballTypes.EMPTY.id) {
                emptyIndex = index;
            }
        }

        return emptyIndex;
    },

    moveBall: function(element, position) {
        const emptyIndex = this.getEmptyBallIndex();

        // swap from ball to empty space
        [this.board[Math.min(emptyIndex, position)], this.board[Math.max(emptyIndex, position)]] = [this.board[Math.max(emptyIndex, position)], this.board[Math.min(emptyIndex, position)]]

        this.updateBoard();
    },

    hoverInBall: function(element, position) {
        // const emptyElementIndex = this.getEmptyBallIndex();
        // const emptyElement = document.querySelector("#" + this.ballTypes.EMPTY.id);

        // emptyElement.innerHTML = '&#8592;';

    },

    hoverOutBall: function(element, position) {
        // const emptyElement = document.querySelector("#" + this.ballTypes.EMPTY.id);

        // emptyElement.innerHTML = '';
    },


    updateBoard: function() {
        let content = '';

        const emptyIndex = this.getEmptyBallIndex();

        for (i in this.board) {
            const isDisabledIndex = !this.allowIndexesMovement[emptyIndex].includes(parseInt(i));
            
            const boardElement = this.board[i];

            content += `<div 
                id="${boardElement.id !== this.ballTypes.EMPTY.id ? `${boardElement.id}-${i}` : this.ballTypes.EMPTY.id}"
                class="${boardElement.class} ${isDisabledIndex ? 'disabled' : 'ball-allow-movement'}" 
                onClick="moveBall.moveBall(this, ${i})"
                onMouseOver="moveBall.hoverInBall(this, ${i})"
                onMouseOut="moveBall.hoverOutBall(this, ${i})"
            >
                ${boardElement.id ? '': ''}
            </div>`;
        }

        this.containerElement.innerHTML = content
    },    

    // makeAMove: async function(element, position) {
    //     if (this.gameover) return;

    //     if (this.board[position] === '') {
    //         const playerSymbol = this.player.symbols[this.player.turnIndex];
    //         this.board[position] = playerSymbol;
    //         this.executeMove(element, playerSymbol);
    //         this.player.toggleTurn();

    //         const hasWinningSequence = this.checkWinningSequences(playerSymbol);

    //         if (hasWinningSequence) {
    //             alert(`PLAYER '${playerSymbol}' GANHOU!`);
    //             this.gameOver();
    //             return;
    //         }

    //         const boarFinishedFinishedAllSpaces = this.checkBoardFinishedAllWhiteSpaces();

    //         if (boarFinishedFinishedAllSpaces) {
    //             alert('NINGUÉM GANHOU NESSA RODADA.');
    //             this.gameOver();
    //             return;
    //         }
    //     }
    // },

    // executeMove: function(element, playerSymbol) {
    //     const elementById = document.getElementById(element.id);
    //     elementById.innerHTML = playerSymbol;
    //     elementById.classList.add('disabled-selection');
    // },

    // gameOver: function() {
    //     this.gameover = true;
    //     document.querySelector(".button-restart").classList.add('visible');
    //     document.querySelector("#game").classList.add('disabled');
    // },

    // checkBoardFinishedAllWhiteSpaces: function() {
    //     const foundEmptySpace = this.board.find(i => i === '');
    //     const allSpacesIsntEmpty = foundEmptySpace !== '';
    //     return allSpacesIsntEmpty;
    // },

    // checkWinningSequences: function(playerSymbol) {
    //     for (i in this.winningSequences) {
    //         const playerSymbolMatchOnWinningSequences = 
    //             this.board[this.winningSequences[i][0]] === playerSymbol &&
    //             this.board[this.winningSequences[i][1]] === playerSymbol &&
    //             this.board[this.winningSequences[i][2]] === playerSymbol;

    //         if (playerSymbolMatchOnWinningSequences) return true;
    //     }

    //     return false;
    // },

    // startElements: function() {
    //     let content = '';

    //     for (i in this.board) {
    //         content += `<div id="space-${i}" onClick="moveBall.makeAMove(this, ${i})">${this.board[i]}</div>`;
    //     }

    //     this.containerElement.innerHTML = content
    // }
};