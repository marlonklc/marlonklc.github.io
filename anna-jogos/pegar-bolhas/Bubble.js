class Bubble {
    
    constructor(context) {
        this.context = context;
        this.x = Math.random() * canvasPosition.width;
        this.y = canvas.height + 100;
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance = 0;
        this.counted = false;
        this.bubbleImage = new Image();
        this.bubbleImage.src = 'images/bubble_pop_frame_01.png';

        var soundPath = Math.random() <= 0.5 ? 'sounds/bubble-sound1.wav' : 'sounds/bubble-sound2.wav';
        
        this.sound = document.createElement('audio');
        this.sound.src = soundPath;
    }

    update() {
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }

    draw() {
        // this.context.fillStyle = 'blue'
        // this.context.beginPath()
        // this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        // this.context.fill()
        // this.context.closePath()
        // this.context.stroke()
        this.context.drawImage(this.bubbleImage, 
            this.x - 65, 
            this.y - 65, 
            this.radius * 2.6,
            this.radius * 2.6
        );
    }

    playSound() {
        this.sound.play();
    }
}