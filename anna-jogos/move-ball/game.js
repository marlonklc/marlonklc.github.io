const moveBall = {
    ballTypes: {
        YELLOW: { id: 'YELLOW', class: 'yellow' },
        RED: { id: 'RED', class: 'red' },
        BLUE: { id: 'BLUE', class: 'blue' },
        GREEN: { id: 'GREEN', class: 'green' },
        PURPLE: { id: 'PURPLE', class: 'purple' },
        PURPLE: { id: 'PURPLE', class: 'purple' },
        EMPTY: { id: 'EMPTY', class: 'disabled' }
    },
    gridSizeXY: 3,
    board: Array(9).fill(''),
    templateBoard: Array(9).fill(''),
    containerElement: null,
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
        this.board = Array(this.gridSizeXY * this.gridSizeXY).fill('');
        this.templateBoard = Array(this.gridSizeXY * this.gridSizeXY).fill('');

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

    changeGrid: function(element) {
        const selectedOption = element.selectedOptions[0];

        document.querySelector("#game").className = selectedOption.value + document.querySelector("#game").className.replaceAll('grid3x3', '').replaceAll('grid4x4', '');
        document.querySelector("#gameTemplate").className = selectedOption.value + document.querySelector("#game").className.replaceAll('grid3x3', '').replaceAll('grid4x4', '');

        this.gridSizeXY = parseInt(selectedOption.ariaValueText);

        this.start();
    },

    generateTemplate: function() {
        const shuffledBalls = this.randomizeBalls();

        let content = '';

        for (i in shuffledBalls) {
            const boardElement = shuffledBalls[i];

            content += `<div class="${boardElement.class} disabled"></div>`;
        }

        this.templateBoard = shuffledBalls;

        document.querySelector("#gameTemplate").innerHTML = content;
    },

    randomizeBalls: function() {
        const grid3x3 = [
            this.ballTypes.YELLOW, this.ballTypes.YELLOW,
            this.ballTypes.RED, this.ballTypes.RED,
            this.ballTypes.EMPTY,
            this.ballTypes.BLUE, this.ballTypes.BLUE,
            this.ballTypes.GREEN, this.ballTypes.GREEN,
        ];

        const grid4x4 = [
            this.ballTypes.YELLOW, this.ballTypes.YELLOW,this.ballTypes.YELLOW,
            this.ballTypes.RED, this.ballTypes.RED, this.ballTypes.RED,
            this.ballTypes.EMPTY,
            this.ballTypes.BLUE, this.ballTypes.BLUE,this.ballTypes.BLUE,
            this.ballTypes.GREEN, this.ballTypes.GREEN,this.ballTypes.GREEN,
            this.ballTypes.PURPLE, this.ballTypes.PURPLE,this.ballTypes.PURPLE,
        ];

        let balls = grid3x3;

        if (this.gridSizeXY === 4) balls = grid4x4;

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

    moveBall: function(element, currentIndex) {
        this.ballMovementAudio.play();

        const emptyIndex = this.getEmptyBallIndex();

        // swap from ball to empty space
        [this.board[Math.min(emptyIndex, currentIndex)], this.board[Math.max(emptyIndex, currentIndex)]] = [this.board[Math.max(emptyIndex, currentIndex)], this.board[Math.min(emptyIndex, currentIndex)]]

        this.updateBoard();
    },

    hoverInBall: function(element, currentIndex) {
        element.classList.add('disable-animation');

        const emptyElementIndex = this.getEmptyBallIndex();
        const emptyElement = document.querySelector("#" + this.ballTypes.EMPTY.id);

        if (currentIndex + 1 === emptyElementIndex) emptyElement.innerHTML = '→';
        if (currentIndex - 1 === emptyElementIndex) emptyElement.innerHTML = '←';
        if (currentIndex - 1 > emptyElementIndex) emptyElement.innerHTML = '↑';
        if (currentIndex + 1 < emptyElementIndex) emptyElement.innerHTML = '↓';
    },

    hoverOutBall: function(element, currentIndex) {
        const emptyElement = document.querySelector("#" + this.ballTypes.EMPTY.id);
        emptyElement.innerHTML = '';

        element.classList.remove('disable-animation');
    },

    updateBoard: function() {
        let content = '';

        const emptyIndex = this.getEmptyBallIndex();

        for (i in this.board) {
            const currentIndex = parseInt(i);

            const isEnabledIndex = (currentIndex - 1 === emptyIndex && currentIndex % this.gridSizeXY !== 0) || 
                (currentIndex + 1 === emptyIndex && emptyIndex % this.gridSizeXY !== 0) || 
                currentIndex - this.gridSizeXY === emptyIndex || currentIndex + this.gridSizeXY === emptyIndex;
            
            const boardElement = this.board[i];

            content += `<div 
                id="${boardElement.id !== this.ballTypes.EMPTY.id ? `${boardElement.id}-${i}` : this.ballTypes.EMPTY.id}"
                class="${boardElement.class} ${isEnabledIndex ? 'ball-allow-movement' : 'disabled'}" 
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