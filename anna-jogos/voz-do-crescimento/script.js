const images = [
    { name: 'bulbasaur', path: 'images/bulbasaur.svg'},
    { name: 'charmander', path: 'images/charmander.svg'},
    { name: 'meowth', path: 'images/meowth.svg'},
    { name: 'mew', path: 'images/mew.svg'},
    { name: 'pikachu', path: 'images/pikachu2.svg'},
    { name: 'snorlax', path: 'images/snorlax.svg'},
    { name: 'squirtle', path: 'images/squirtle.svg'},
];

const buttonMenu = document.querySelector(".button-menu");

buttonMenu.addEventListener('click', (event) => {

    const imagesSelector = document.querySelector('.images-selector');
    imagesSelector.classList.add('images-selector__show');

    event.target.classList.add('button-menu__hide');
});

class Microphone {
    constructor(fftSize) {
        this.initialized = false;
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then( function(stream) {
                    this.audioContext = new AudioContext();
                    this.microphone = this.audioContext.createMediaStreamSource(stream);
                    this.analyser = this.audioContext.createAnalyser();
                    this.analyser.fftSize = fftSize;
                    const bufferLength = this.analyser.frequencyBinCount;
                    this.dataArray = new Uint8Array(bufferLength);
                    this.microphone.connect(this.analyser);
                    this.initialized = true;
                }.bind(this)
            ).catch(function(err) {
                alert(err);
            });
    }

    getSamples() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normSamples = [...this.dataArray].map(e => e / 128 - 1);
      
        return normSamples;
    }

    getVolume() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        let normSamples = [...this.dataArray].map(e => e / 128 - 1);
        let sum = 0;

        for (let i = 0; i < normSamples.length; i++) {
            sum += normSamples[i] * normSamples[i];
        }

        let volume = Math.sqrt(sum / normSamples.length);
        
        return volume;
    }
}

let fftSize = 512;
const microphone = new Microphone(fftSize);

setInterval(function() {
    if (microphone.initialized) {
        
        const volume = microphone.getVolume();

        const imageGrowth = document.querySelector("#image-growth img");

        if (volume > 0.01) {
            const scale = 1 + volume * 20;

            imageGrowth.style = `transform: scale(${scale}, ${scale})`;
        }
    }
}, 50);

window.onload = function () {
    const imagesSelector = document.querySelector('.images-container');

    images.forEach(i => {
        img = new Image();
        img.src = i.path;

        img.addEventListener('click', (event) => {
            const imageGrowth = document.querySelector('#image-growth img');
            imageGrowth.src = event.target.src;

            document.querySelector('.images-selector').classList.remove('images-selector__show');
            
            document.querySelector('.button-menu').classList.remove('button-menu__hide');
        });

        imagesSelector.appendChild(img);
    })

}