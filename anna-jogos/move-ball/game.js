const moveBall = {
    ballTypes: {
        YELLOW: { id: 'YELLOW', class: 'yellow' },
        RED: { id: 'RED', class: 'red' },
        BLUE: { id: 'BLUE', class: 'blue' },
        GREEN: { id: 'GREEN', class: 'green' },
        EMPTY: { id: 'EMPTY', class: 'disabled' }
    },
    board: Array(9).fill(''),
    templateBoard: Array(9).fill(''),
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
    timer: 0.0,
    timerInterval: undefined,

    init: function(container) {
        this.containerElement = container;
        this.bellAudio = document.createElement('audio');
        this.bellAudio.src = './bell-sound.mp3';
        this.ballMovementAudio = document.createElement('audio');
        this.ballMovementAudio.src = './ball-movement.mp3';
    },

    start: function() {
        this.startBoard();
        this.generateTemplate();
        this.startTimer();
    },

    startBoard: function() {
        const shuffledBalls = this.randomizeBalls();
        for (i in shuffledBalls) {
            this.board[i] = shuffledBalls[i];
        }
        this.updateBoard();
    },

    startTimer: function() {
        this.timer = 0.0;

        // (function loop() {
        //     this.timer += 0.1;

        //     console.log(this)
            
        //     document.querySelector("#timer").innerHTML = `${this.timer.toFixed(1)}s`;

        //     setTimeout(loop, 100);
        // })();

        //timerTimeout(this.timer);
    },

    generateTemplate: function() {
        const shuffledBalls = this.randomizeBalls();

        let content = '';

        for (i in shuffledBalls) {
            const boardElement = shuffledBalls[i];

            content += `<div class="${boardElement.class} disabled"></div>`;
        }

        this.templateBoard = shuffledBalls;

        document.querySelector("#templateBoard").innerHTML = content;
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

        return parseInt(emptyIndex);
    },

    moveBall: function(element, position) {
        this.ballMovementAudio.play();

        const emptyIndex = this.getEmptyBallIndex();

        // swap from ball to empty space
        [this.board[Math.min(emptyIndex, position)], this.board[Math.max(emptyIndex, position)]] = [this.board[Math.max(emptyIndex, position)], this.board[Math.min(emptyIndex, position)]]

        this.updateBoard();
    },

    hoverInBall: function(element, position) {
        element.classList.add('disable-animation');

        const emptyElementIndex = this.getEmptyBallIndex();
        const emptyElement = document.querySelector("#" + this.ballTypes.EMPTY.id);

        if (position + 1 === emptyElementIndex) emptyElement.innerHTML = '→';
        if (position - 1 === emptyElementIndex) emptyElement.innerHTML = '←';
        if (position - 1 > emptyElementIndex) emptyElement.innerHTML = '↑';
        if (position + 1 < emptyElementIndex) emptyElement.innerHTML = '↓';
    },

    hoverOutBall: function(element, position) {
        const emptyElement = document.querySelector("#" + this.ballTypes.EMPTY.id);
        emptyElement.innerHTML = '';

        element.classList.remove('disable-animation');
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

    tapBell: function() {
        this.bellAudio.play();        

        let ballsPositionLikeTemplate = true;

        for (i in this.board) {

            const boardElement = this.board[i];
            const templateElement = this.templateBoard[i];

            if (boardElement.id !== templateElement.id) {
                ballsPositionLikeTemplate = false;
            }
        }

        alert(ballsPositionLikeTemplate ? 'ACERTOU!!!' : 'ERROU');

        this.start();
    }
};