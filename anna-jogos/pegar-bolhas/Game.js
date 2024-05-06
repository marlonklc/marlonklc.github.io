// setup
const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 500;
const context = canvas.getContext('2d');
context.font = '25px Helvetica';

let gameOver = false;
let score = 0;
let gameFrame = 0;
let gameSpeed = 1;
let canvasPosition = canvas.getBoundingClientRect();

const bubblesArray = [];
const enemiesArray = [];

const mouseEvent = new MouseEvent(canvas);
const player = new Player(context, canvas, mouseEvent);
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
    if (gameFrame % 55 === 0) {
        bubblesArray.push(new Bubble(context, player));
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
    if (gameFrame % 600 === 0) {
        enemiesArray.push(new Enemy(context, canvas, player));
    }

    for (let i = 0; i < enemiesArray.length; i++) {
        enemiesArray[i].update();
        enemiesArray[i].draw();

        let enemyDisappered = enemiesArray[i].y < 0 - enemiesArray[i].radius;
        if (enemyDisappered) {
            enemiesArray.splice(i, 1);
            i--;
        }
        
        let enemyCollided = enemiesArray[i].distance < enemiesArray[i].radius + player.radius;
        let enemyHasNotCollision = !enemiesArray[i].hadCollision;
        if (enemyCollided && enemyHasNotCollision) {
            enemiesArray[i].hadCollision = true;
            enemiesArray.splice(i, 1);
            i--;

            gameOver = true;
        }
    }
}

function handlePlayer() {
    player.update();
    player.draw();
}

// animation loop
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (gameOver) {
        context.fillStyle = 'red';
        context.fillText('GAME OVER', 350, 250);
        context.fillStyle = 'white';
        context.fillText(`Pontuação Final: ${score}`, 320, 290);

        const button = document.createElement("button");
        button.innerHTML = 'JOGAR NOVAMENTE';
        button.style = `
            position: absolute; 
            top: ${canvasPosition.bottom - 150}px; 
            left: ${canvasPosition.left + 330}px;
            padding: 20px;
        `;

        button.addEventListener('click', (event) => {
            window.location.reload();
        });

        document.body.appendChild(button);
        
        return;
    }

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