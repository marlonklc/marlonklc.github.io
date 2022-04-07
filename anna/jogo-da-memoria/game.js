const memoryGame = {
    containerElement: null,
    coverCard: 'pokeball.png',
    firstCardFlipped: null,
    secondCardFlipped: null,
    timeToFlipUnmatchedCards: 1 * 1000, // 1 second
    waitingFlipUnmatchedCards: false,
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

    init: function(element) {
        this.containerElement = element;
        let amountOfCards = localStorage.getItem('game-amount-cards');
        if (!amountOfCards) {
            amountOfCards = 8;
            localStorage.setItem('game-amount-cards', amountOfCards);
        }

        if (!!amountOfCards && this.cards.length < amountOfCards) {
            this.cards = this.cards.slice(0, this.cards.length);
        }
            
        this.cards = this.cards.slice(0, amountOfCards);
    },

    start: function() {
        this.startElements();
    },

    flipCard: function(element) {
        if (this.waitingFlipUnmatchedCards) return;
        if (this.firstCardFlipped === element) return;

        playAudio('assets/audio/card-flip.mp3', VOLUME.LOW);

        element.classList.toggle("hidden-card");

        if (!this.firstCardFlipped) {
            this.firstCardFlipped = element;
            return;
        }

        if (!this.secondCardFlipped) {
            this.secondCardFlipped = element;
        }

        const isMatchedCards = this.checkMatchCards();

        isMatchedCards ? this.disabledCards() : this.flipUnmatchedCards();
    },

    checkMatchCards: function() {       
        if (!this.firstCardFlipped && !this.secondCardFlipped) return false;

        return this.firstCardFlipped.dataset.card === this.secondCardFlipped.dataset.card;
    },

    flipUnmatchedCards: function() {
        this.waitingFlipUnmatchedCards = true;
        setTimeout(() => {
            this.firstCardFlipped.classList.add('hidden-card');
            this.secondCardFlipped.classList.add('hidden-card');
            this.cleanCardsState();
        }, this.timeToFlipUnmatchedCards)
    },

    disabledCards: function() {
        this.firstCardFlipped.classList.remove('hidden-card');
        this.secondCardFlipped.classList.remove('hidden-card');
        this.firstCardFlipped.attributes.removeNamedItem('onclick');
        this.secondCardFlipped.attributes.removeNamedItem('onclick');
        document.getElementById('matched-animation').classList.toggle('display');
        playAudio('assets/audio/pikachu-voice4.wav', VOLUME.HIGH);

        setTimeout(() => {
            document.getElementById('matched-animation').classList.toggle('display');
        }, 2000);

        this.cleanCardsState();
    },

    cleanCardsState: function() {
        [this.firstCardFlipped, this.secondCardFlipped, this.waitingFlipUnmatchedCards] = [null, null, false];
    },

    startElements: function() {
        let content = '';

        for (i in this.cards) {
            content += `
                <div class="card hidden-card" data-card="card-${i}" onClick="memoryGame.flipCard(this)">
                    <div class="card-back-face">
                        <img src="assets/images/pokemons/${this.cards[i].image}"/>
                        <p>${this.cards[i].name}</p>
                    </div>
                    <div class="card-front-face">
                        <p>POKÉMON</p>
                        <img src="assets/images/${this.coverCard}"/>
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