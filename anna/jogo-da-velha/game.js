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
        this.draw();
        this.gameover = false;
        document.querySelector(".button-restart").classList.toggle('visible');
        document.querySelector("#game").classList.toggle('disabled');
    },

    makeAMove: async function(position) {
        if (this.gameover) return;
        
        if (this.board[position] === '') {
            const playerSymbol = this.player.symbols[this.player.turnIndex];
            this.board[position] = playerSymbol;
            this.draw();

            const hasWinningSequence = this.checkWinningSequences(playerSymbol);

            if (hasWinningSequence) {
                this.gameover = true;
                alert(`PLAYER ${playerSymbol} GANHOU!`);
                document.querySelector(".button-restart").classList.toggle('visible');
                document.querySelector("#game").classList.toggle('disabled');
            }

            this.player.toggleTurn();
        }
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

    draw: function() {
        let content = '';

        for (i in this.board) {
            content += "<div onClick=\"ticTacToe.makeAMove(" + i + ")\">" + this.board[i] + "</div>";
        }

        this.containerElement.innerHTML = content
    }
};