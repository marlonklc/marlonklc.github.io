const memoryGame = {
    containerElement: null,
    state: {
        firstCardFlipped: null,
        secondCardFlipped: null,
        waitingFlipUnmatchedCards: false,
        matchedCards: 0,
    },
    config: {
        coverCard: 'pokeball.png',
        timeToFlipUnmatchedCards: 1 * 1000, // 1 second,
        cards: [
            { image: 'abra.png', name: 'abra' },
            { image: 'aipom.png', name: 'aipom' },
            { image: 'bulbasaur.png', name: 'bulbasaur' },
            { image: 'butterfree.png', name: 'butterfree' },
            { image: 'charmander.png', name: 'charmander' },
            { image: 'chikorita.png', name: 'chikorita' },
            { image: 'pikachu.png', name: 'pikachu' },
            { image: 'dratini.png', name: 'dratini' },
            { image: 'eevee.png', name: 'eevee' },
            { image: 'jigglypuff.png', name: 'jigglypuff' },
            { image: 'mudkip.png', name: 'mudkip' },
            { image: 'phanpy.png', name: 'phanpy' },
            { image: 'pichu.png', name: 'pichu' },
            { image: 'pidgey.png', name: 'pidgey' },
            { image: 'psyduck.png', name: 'psyduck' },
            { image: 'seel.png', name: 'seel' },
            { image: 'slowpoke.png', name: 'slowpoke' },
            { image: 'squirtle.png', name: 'squirtle' },
        ],
        amountOfCardsInGame: 8,
    },

    init: function(element) {
        this.containerElement = element;
        
        let amountOfCardsInLocalStorage = localStorage.getItem('game-amount-cards');
        if (!!amountOfCardsInLocalStorage && this.config.cards.length < amountOfCardsInLocalStorage) {
            this.config.amountOfCardsInGame = amountOfCardsInLocalStorage;
        } else {
            localStorage.setItem('game-amount-cards', this.config.amountOfCardsInGame);
        }

        this.config.cards = this.config.cards.slice(0, this.config.amountOfCardsInGame);
    },

    start: function() {
        this.cleanCardsState();
        this.state.matchedCards = 7;
        this.startElements();
    },

    flipCard: function(element) {
        if (this.state.waitingFlipUnmatchedCards) return;
        if (this.state.firstCardFlipped === element) return;

        playAudio('assets/audios/card-flip.mp3', VOLUME.LOW);

        element.classList.toggle("hidden-card");

        if (!this.state.firstCardFlipped) {
            this.state.firstCardFlipped = element;
            return;
        }

        if (!this.state.secondCardFlipped) {
            this.state.secondCardFlipped = element;
        }

        const isMatchedCards = this.checkMatchCards();

        isMatchedCards ? this.whenMatchedCards() : this.flipUnmatchedCards();
    },

    checkMatchCards: function() {       
        if (!this.state.firstCardFlipped && !this.state.secondCardFlipped) return false;

        return this.state.firstCardFlipped.dataset.card === this.state.secondCardFlipped.dataset.card;
    },

    whenMatchedCards: function() {
        this.disableMatchedCards();
        this.cleanCardsState();
        this.state.matchedCards++;

        if (this.state.matchedCards === this.config.amountOfCardsInGame) {
            this.doFinalAnimation();
        } else {
            this.doAnimationWhenMatchedCards();
        }
    },

    flipUnmatchedCards: function() {
        this.state.waitingFlipUnmatchedCards = true;
        setTimeout(() => {
            this.state.firstCardFlipped.classList.add('hidden-card');
            this.state.secondCardFlipped.classList.add('hidden-card');
            this.cleanCardsState();
        }, this.config.timeToFlipUnmatchedCards)
    },

    doFinalAnimation: function() {
        document.getElementById('final-animation').classList.toggle('display-flex');
        const audio = new Audio('assets/audios/claps1.mp3');
        audio.volume = .5;
        audio.loop = true;
        audio.play();

        setTimeout(() => {
            audio.pause();
            delete audio;
        }, 90 * 1000) // 90 secs
    },

    doAnimationWhenMatchedCards: function() {
        document.getElementById('matched-animation').classList.toggle('display');
        playAudio('assets/audios/pikachu-voice4.wav', VOLUME.HIGH);
        
        setTimeout(() => {
            document.getElementById('matched-animation').classList.toggle('display');
        }, 2000);
    },

    disableMatchedCards: function() {
        this.state.firstCardFlipped.classList.remove('hidden-card');
        this.state.secondCardFlipped.classList.remove('hidden-card');
        this.state.firstCardFlipped.attributes.removeNamedItem('onclick');
        this.state.secondCardFlipped.attributes.removeNamedItem('onclick');        
    },

    cleanCardsState: function() {
        [
            this.state.firstCardFlipped, 
            this.state.secondCardFlipped, 
            this.state.waitingFlipUnmatchedCards
        ] = [null, null, false];
    },

    startElements: function() {
        let content = '';

        for (i in this.config.cards) {
            content += `
                <div class="card hidden-card" data-card="card-${i}" onClick="memoryGame.flipCard(this)">
                    <div class="card-back-face">
                        <img src="assets/images/pokemons/${this.config.cards[i].image}"/>
                        <p>${this.config.cards[i].name}</p>
                    </div>
                    <div class="card-front-face">
                        <p>POKÉMON</p>
                        <img src="assets/images/${this.config.coverCard}"/>
                    </div>
                </div>
            `;
        }

        this.containerElement.innerHTML = content + content;
        this.shuffleCards();
    },

    shuffleCards: function() {
        const sizeOfChildren = this.containerElement.children.length * 5;

        Array.from(this.containerElement.children).forEach(child => {
            let randomPosition = Math.floor(Math.random() * sizeOfChildren);
            child.style.order = randomPosition;
        });
    },
};

const VOLUME = {
    HIGH: .3,
    LOW: .1,
};

function playAudio(path, volume) {
    const audio = new Audio(path);
    audio.volume = volume;
    audio.play();
}