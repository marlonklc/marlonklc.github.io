const memoryGame = {
    containerElement: null,
    coverCard: 'pokebola.png',
    firstCardFlipped: null,
    secondCardFlipped: null,
    timeToFlipUnmatchedCards: 1 * 1000, // 1 second
    waitingFlipUnmatchedCards: false,
    images: [
        'abra.png',
        'aipom.png',
        'bulbasaur.png',
        'butterfree.png',
        'charmander.png',
        'chikorita.png',
        'dratini.png',
        'eevee.png',
        // 'jigglypuff.png',
        // 'mudkip.png',
        // 'phanpy.png',
        // 'pichu.png',
        // 'pidgey.png',
        // 'pikachu.png',
        // 'psyduck.png',
        // 'seel.png',
        // 'slowpoke.png',
        // 'squirtle.png',
    ],

    init: function(element) {
        this.containerElement = element;
    },

    start: function() {
        this.startElements();
    },

    flipCard: function(element) {
        if (this.waitingFlipUnmatchedCards) return;
        if (this.firstCardFlipped === element) return;

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
        this.cleanCardsState();
    },

    cleanCardsState: function() {
        [this.firstCardFlipped, this.secondCardFlipped, this.waitingFlipUnmatchedCards] = [null, null, false];
    },

    startElements: function() {
        let content = '';

        for (i in this.images) {
            content += `
                <div class="card hidden-card" data-card="card-${i}" onClick="memoryGame.flipCard(this)">
                    <img class="card-back-face" src="images/pokemons/${this.images[i]}"/>
                    <img class="card-front-face" src="images/${this.coverCard}"/>
                </div>
            `;
        }

        this.containerElement.innerHTML = content + content;
        this.shuffleCards();
    },

    shuffleCards: function() {
        const sizeOfChildren = this.containerElement.children.length * 2;

        Array.from(this.containerElement.children).forEach(child => {
            let randomPosition = Math.floor(Math.random() * sizeOfChildren);
            child.style.order = randomPosition;
        });
    },
};