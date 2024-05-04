// canvas setup
const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 500;
const context = canvas.getContext('2d');
context.font = '25px Helvetica';

let score = 0;
let gameFrame = 0;
let gameSpeed = 1;
let canvasPosition = canvas.getBoundingClientRect();

const bubblesArray = [];
const enemies = [];

const mouseEvent = new MouseEvent(canvas);
const player = new Player(context, canvas, mouseEvent);
const enemy = new Enemy(context, canvas);
const background = new Background(context, canvas);

canvas.addEventListener('mousedown', (event) => {
    mouseEvent.setX(event.x - canvasPosition.left);
    mouseEvent.setY(event.y - canvasPosition.top);
    mouseEvent.setClick(true);
});

canvas.addEventListener('mouseup', (event) => {
    mouseEvent.setClick(false);
});

function handleBubbles() {
    if (gameFrame % 25 === 0) {
        bubblesArray.push(new Bubble(context));
    }

    for (let i = 0; i < bubblesArray.length; i++) {
        bubblesArray[i].update();
        bubblesArray[i].draw();

        if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2) {
            bubblesArray.splice(i, 1);
            i--;
        } else if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius) {
            if (!bubblesArray[i].counted) {

                bubblesArray[i].playSound();

                bubblesArray[i].counted = true;
                score++;
                bubblesArray.splice(i, 1);
                i--;
            }
        }
    }
}

function handleBackground() {
    background.update();
    background.draw();
}

function handleEnemies() {
    enemy.update()
    enemy.draw()
}

function handlePlayer() {
    player.update();
    player.draw();
}

// animation loop
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    handleBackground();
    handleBubbles();
    handleEnemies();
    handlePlayer();

    context.fillStyle = 'black';
    context.fillText(`score: ${score}`, 10, 50);
    
    gameFrame++;

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvasPosition = canvas.getBoundingClientRect();
})