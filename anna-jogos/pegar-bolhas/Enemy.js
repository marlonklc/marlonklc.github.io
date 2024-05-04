class Enemy {
    constructor(context, canvas) {
        this.canvas = canvas;
        this.context = context;

        this.x = this.canvas.width + 200;
        this.y = Math.random() * (this.canvas.height - 150) + 90;
        this.radius = 60;
        this.speed = Math.random() * 2 + 2;
        this.frame = 0;
        this.frameX = 1;
        this.frameY = 1;
        this.spriteWidth = 512;
        this.spriteHeight = 510;

        this.image = new Image();
        this.image.src = 'images/enemy1.png';
    }

    draw() {
        // this.context.fillStyle = 'red';
        // this.context.beginPath();
        // this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // this.context.fill();
        // this.context.closePath();
        // this.context.stroke();
        
        this.context.drawImage(this.image,
            512,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.radius * 2.2,
            this.radius * 2.2
        );
    }

    update() {
        this.x -= this.speed;

        if (this.x < 0 - this.radius * 2) {
            this.x = this.canvas.width + 200;
            this.y = Math.random() * (this.canvas.height - 150) + 90;
            this.speed = Math.random() * 2 + 2;
        }
    }
}