const ticTacToe = {
    board: ['', '', '', '', '', '', '', '', ''],
    player: {
        symbols: ['X', 'O'],
        turnIndex: 1,
        toggleTurn: function() {
            this.turnIndex = this.turnIndex === 0 ? 1 : 0;
        }
    },
    containerElement: null,
    gameover: false,
    winningSequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    init: function(container) {
        this.containerElement = container;
    },

    start: function() {
        this.board.fill('');
        this.startElements();
        this.gameover = false;
        document.querySelector(".button-restart").classList.remove('visible');
        document.querySelector("#game").classList.remove('disabled');
    },

    makeAMove: async function(element, position) {
        if (this.gameover) return;

        if (this.board[position] === '') {
            const playerSymbol = this.player.symbols[this.player.turnIndex];
            this.board[position] = playerSymbol;
            this.executeMove(element, playerSymbol);
            this.player.toggleTurn();

            const hasWinningSequence = this.checkWinningSequences(playerSymbol);

            if (hasWinningSequence) {
                alert(`PLAYER '${playerSymbol}' GANHOU!`);
                this.gameOver();
                return;
            }

            const boarFinishedFinishedAllSpaces = this.checkBoardFinishedAllWhiteSpaces();

            if (boarFinishedFinishedAllSpaces) {
                alert('NINGUÉM GANHOU NESSA RODADA.');
                this.gameOver();
                return;
            }
        }
    },

    executeMove: function(element, playerSymbol) {
        const elementById = document.getElementById(element.id);
        elementById.innerHTML = playerSymbol;
        elementById.classList.add('disabled-selection');
    },

    gameOver: function() {
        this.gameover = true;
        document.querySelector(".button-restart").classList.add('visible');
        document.querySelector("#game").classList.add('disabled');
    },

    checkBoardFinishedAllWhiteSpaces: function() {
        const foundEmptySpace = this.board.find(i => i === '');
        const allSpacesIsntEmpty = foundEmptySpace !== '';
        return allSpacesIsntEmpty;
    },

    checkWinningSequences: function(playerSymbol) {
        for (i in this.winningSequences) {
            const playerSymbolMatchOnWinningSequences = 
                this.board[this.winningSequences[i][0]] === playerSymbol &&
                this.board[this.winningSequences[i][1]] === playerSymbol &&
                this.board[this.winningSequences[i][2]] === playerSymbol;

            if (playerSymbolMatchOnWinningSequences) return true;
        }

        return false;
    },

    startElements: function() {
        let content = '';

        for (i in this.board) {
            content += `<div id="space-${i}" onClick="ticTacToe.makeAMove(this, ${i})">${this.board[i]}</div>`;
        }

        this.containerElement.innerHTML = content
    }
};