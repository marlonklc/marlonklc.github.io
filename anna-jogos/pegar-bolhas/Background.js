class Background {
    constructor(context, canvas) {
        this.context = context;
        this.canvas = canvas;

        this.x1 = 0;
        this.x2 = this.canvas.width;
        this.y = 0;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.image = new Image();
        this.image.src = 'images/background1.png';
    }

    update() {
        this.x1 -= 1
        this.x2 -= 1
        
        if (this.x1 < -this.width) {
            this.x1 = this.width;
        }
        
        if (this.x2 < -this.width) {
            this.x2 = this.width;
        }
    }

    draw() {
        this.context.drawImage(this.image, 
            this.x1, 
            this.y, 
            this.width,
            this.height
        );
    
        this.context.drawImage(this.image, 
            this.x2,
            this.y, 
            this.width,
            this.height
        );
    }
}