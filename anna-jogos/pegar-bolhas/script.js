// canvas setup
const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
canvas.width = 800
canvas.height = 500

let score = 0;
let gameFrame = 0;

let FISH_SPEED = 30;

context.font = '25px Helvetica'
let gameSpeed = 1

// mouse interactivity
let canvasPosition = canvas.getBoundingClientRect()
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}

canvas.addEventListener('mousedown', (event) => {
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
})

canvas.addEventListener('mouseup', (event) => {
    mouse.click = false
})

// player
const playerLeft = new Image()
playerLeft.src = 'fish_sprite.png'
const playerRight = new Image()
playerRight.src = 'fish_sprite2.png'

class Player {
    constructor() {
        this.x = 0
        this.y = canvas.height / 2
        this.radius = 50
        this.angle = 0
        this.frameX = 0
        this.frameY = 0
        this.frame = 0
        this.spriteWidth = 498
        this.spriteHeight = 327
    }

    update() {
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        let theta = Math.atan2(dy, dx)
        this.angle = theta
        if (mouse.x !== this.x) {
            this.x -= dx / FISH_SPEED
        }
        if (mouse.y !== this.y) {
            this.y -= dy / FISH_SPEED
        }
    }

    draw() {
        if (mouse.click) {
            context.lineWidth = 0.2
            context.beginPath()
            context.moveTo(this.x, this.y)
            context.lineTo(mouse.x, mouse.y)
            context.stroke()
        }
        // context.fillStyle = 'red'
        // context.beginPath()
        // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        // context.fill()
        // context.closePath()
        //context.fillRect(this.x, this.y, this.radius, 10)

        context.save()
        context.translate(this.x, this.y)
        context.rotate(this.angle)

        if (this.x >= mouse.x) {
            context.drawImage(playerLeft,
                this.frameX * this.spriteWidth,
                this.frameY * this.spriteHeight,
                this.spriteWidth,
                this.spriteHeight,
                -60,
                -45,
                this.spriteWidth / 4,
                this.spriteHeight / 4
            )
        } else {
            context.drawImage(playerRight,
                this.frameX * this.spriteWidth,
                this.frameY * this.spriteHeight,
                this.spriteWidth,
                this.spriteHeight,
                -60,
                -45,
                this.spriteWidth / 4,
                this.spriteHeight / 4
            )
        }

        context.restore()
    }
}

const player = new Player()

// bubbles
const bubblesArray = []
const bubbleImage = new Image()
bubbleImage.src = 'bubble_pop_frame_01.png'
class Bubble {
    constructor() {
        this.x = Math.random() * canvasPosition.width
        this.y = canvas.height + 100
        this.radius = 50
        this.speed = Math.random() * 5 + 1
        this.distance
        this.counted = false
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2'
    }

    update() {
        this.y -= this.speed
        const dx = this.x - player.x
        const dy = this.y - player.y
        this.distance = Math.sqrt(dx * dx + dy * dy)
    }

    draw() {
        // context.fillStyle = 'blue'
        // context.beginPath()
        // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        // context.fill()
        // context.closePath()
        // context.stroke()
        context.drawImage(bubbleImage, 
            this.x - 65, 
            this.y - 65, 
            this.radius * 2.6,
            this.radius * 2.6
        )
    }
}

const bubbleSound1 = document.createElement('audio')
bubbleSound1.src = 'bubble-sound1.wav'
const bubbleSound2 = document.createElement('audio')
bubbleSound2.src = 'bubble-sound2.wav'

function handleBubbles() {
    if (gameFrame % 25 === 0) {
        bubblesArray.push(new Bubble())
    }

    for (let i = 0; i < bubblesArray.length; i++) {
        bubblesArray[i].update()
        bubblesArray[i].draw()

        if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2) {
            bubblesArray.splice(i, 1)
            i--
        } else if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius) {
            if (!bubblesArray[i].counted) {

                if (bubblesArray[i].sound == 'sound1') {
                    bubbleSound1.play()
                } else {
                    bubbleSound2.play()
                }

                bubblesArray[i].counted = true
                score++
                bubblesArray.splice(i, 1)
                i--
            }
        }
    }
}

// repeating backgrounds
const background = new Image()
background.src = 'background1.png'

const BACKGROUND = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function handleBackground() {
    BACKGROUND.x1 -= 1
    if (BACKGROUND.x1 < -BACKGROUND.width) BACKGROUND.x1 = BACKGROUND.width
    BACKGROUND.x2 -= 1
    if (BACKGROUND.x2 < -BACKGROUND.width) BACKGROUND.x2 = BACKGROUND.width
    context.drawImage(background, 
        BACKGROUND.x1, 
        BACKGROUND.y, 
        BACKGROUND.width,
        BACKGROUND.height
    )

    context.drawImage(background, 
        BACKGROUND.x2,
        BACKGROUND.y, 
        BACKGROUND.width,
        BACKGROUND.height
    )
}

// Enemies
const enemyImage = new Image()
enemyImage.src = 'enemy1.png'

class Enemy {
    constructor() {
        this.x = canvas.width + 200
        this.y = Math.random() * (canvas.height - 150) + 90
        this.radius = 60
        this.speed = Math.random() * 2 + 2
        this.frame = 0
        this.frameX = 1
        this.frameY = 1
        this.spriteWidth = 512
        this.spriteHeight = 510
    }

    draw() {
        // context.fillStyle = 'red'
        // context.beginPath()
        // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        // context.fill()
        // context.closePath()
        // context.stroke()
        context.drawImage(enemyImage,
            512,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.radius * 2.2,
            this.radius * 2.2
        )
    }

    update() {
        this.x -= this.speed
        if (this.x < 0 - this.radius * 2) {
            this.x = canvas.width + 200
            this.y = Math.random() * (canvas.height - 150) + 90
            this.speed = Math.random() * 2 + 2
        }
    }
}

const enemies = []
const enemy1 = new Enemy()

function handleEnemies() {
    enemy1.update()
    enemy1.draw()

}


// animation loop
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground()
    handleBubbles()
    handleEnemies()
    player.update()
    player.draw()
    context.fillStyle = 'black'
    context.fillText(`score: ${score}`, 10, 50)
    gameFrame++

    requestAnimationFrame(animate)
}

animate()

window.addEventListener('resize', () => {
    canvasPosition = canvas.getBoundingClientRect()
})