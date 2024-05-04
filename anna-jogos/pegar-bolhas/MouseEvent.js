class MouseEvent {
    constructor(canvas) {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2,
        this.click = false;
    }

    setX(value) {
        this.x = value;
    }

    setY(value) {
        this.y = value;
    }

    setClick(value) {
        this.click = value;
    }
}