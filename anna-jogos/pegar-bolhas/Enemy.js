class Enemy {
    constructor(context, canvas, player) {
        this.canvas = canvas;
        this.context = context;
        this.player = player;

        this.x = this.canvas.width + 200;
        this.y = Math.random() * (this.canvas.height - 150) + 90;
        this.radius = 60;
        this.speed = Math.random() * 2 + 2;
        this.frame = 0;
        this.frameX = 1;
        this.frameY = 0;
        this.spriteWidth = 512;
        this.spriteHeight = 510;
        this.hadCollision = false;

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
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x - 80,
            this.y - 75,
            this.radius * 2.5,
            this.radius * 2.5
        );
    }

    update() {
        this.x -= this.speed;

        if (this.x < 0 - this.radius * 2) {
            this.x = this.canvas.width + 200;
            this.y = Math.random() * (this.canvas.height - 140) + 80;
            this.speed = Math.random() * 2 + 2;
        }

        const dx = this.x - this.player.x;
        const dy = this.y - this.player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }
}