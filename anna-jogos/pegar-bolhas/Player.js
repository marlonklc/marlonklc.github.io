class Player {
    constructor(context, canvas, mouseEvent) {
        this.context = context;
        this.canvas = canvas;
        this.mouseEvent = mouseEvent;

        this.x = 0;
        this.y = this.canvas.height / 2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 498;
        this.spriteHeight = 327;
        this.speed = 30;
        
        this.playerLeft = new Image();
        this.playerLeft.src = 'images/fish_sprite.png';
        
        this.playerRight = new Image();
        this.playerRight.src = 'images/fish_sprite2.png';
    }

    update() {
        const dx = this.x - this.mouseEvent.x;
        const dy = this.y - this.mouseEvent.y;
        let theta = Math.atan2(dy, dx);
        this.angle = theta;

        if (this.mouseEvent.x !== this.x) {
            this.x -= dx / this.speed;
        }

        if (this.mouseEvent.y !== this.y) {
            this.y -= dy / this.speed;
        }
    }

    draw() {
        if (this.mouseEvent.click) {
            this.context.lineWidth = 0.2;
            this.context.beginPath();
            this.context.moveTo(this.x, this.y);
            this.context.lineTo(this.mouseEvent.x, this.mouseEvent.y);
            this.context.stroke();
        }
        // this.context.fillStyle = 'red'
        // this.context.beginPath()
        // this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        // this.context.fill()
        // this.context.closePath()
        // this.context.fillRect(this.x, this.y, this.radius, 10)

        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate(this.angle);

        if (this.x >= this.mouseEvent.x) {
            this.context.drawImage(this.playerLeft,
                this.frameX * this.spriteWidth,
                this.frameY * this.spriteHeight,
                this.spriteWidth,
                this.spriteHeight,
                -60,
                -45,
                this.spriteWidth / 4,
                this.spriteHeight / 4
            );
        } else {
            this.context.drawImage(this.playerRight,
                this.frameX * this.spriteWidth,
                this.frameY * this.spriteHeight,
                this.spriteWidth,
                this.spriteHeight,
                -60,
                -45,
                this.spriteWidth / 4,
                this.spriteHeight / 4
            );
        }

        this.context.restore();
    }
}