const canvas = document.getElementById("snake")
const ctx = canvas.getContext("2d")

//Create the unit
const box = 32

//Load the images
const ground = new Image()
ground.src ="../img/ground.png"

const foodImg = new Image()
foodImg.src = "../img/food.png"

//Load audio files
const dead = new Audio()
const eat = new Audio()
const right = new Audio()
const left = new Audio()
const up = new Audio()
const down = new Audio()

dead.src = "../audio/dead.mp3"
eat.src = "../audio/eat.mp3"
up.src = "../audio/up.mp3"
down.src = "../audio/down.mp3"
right.src = "../audio/right.mp3"
left.src = "../audio/left.src"


//Create the snake
let snake = []
snake[0] = {
    x: 9*box,
    y: 10*box
}

//Create the food
let food = {
    x: Math.floor(Math.random() *17 +1)*box,
    y: Math.floor(Math.random() *15 +3)*box
}

//Create the score variable
let score = 0

let d

//Control the snake
document.addEventListener("keydown", direction)

function direction (event) {
    if(event.keyCode == 37 && d !== "RIGHT"){
        left.play()
        d = "LEFT"
    }
    else if(event.keyCode == 38 && d !== "DOWN"){
        up.play()
        d = "UP"
    }
    else if(event.keyCode == 39 && d !== "LEFT"){
        right.play()
        d = "RIGHT"
    }
    else if(event.keyCode == 40 && d !== "UP"){
        up.play()
        d = "DOWN"
    }
}

function collision (head, array)
{
    for(let i=0; i<array.length; i++)
    {
        if(head.x == array[i].x && head.y == array[i].y)
        {
            return true
        }
    }
    return  false
}

//Draw on canvas
function draw() {
    ctx.drawImage(ground, 0 ,0)

    for(i=0; i<snake.length; i++) 
    {
        ctx.fillStyle = (i===0) ? "green" : "white"
        ctx.fillRect(snake[i].x, snake[i].y, box, box)

        ctx.strokeStyle = "red"
        ctx.strokeRect(snake[i].x, snake[i].y, box, box)
    }

    ctx.drawImage(foodImg, food.x, food.y)

    //Old head position
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    //Which direction
    if(d === "LEFT") snakeX -= box
    if(d === "UP") snakeY -= box
    if(d === "RIGHT") snakeX += box
    if(d === "DOWN") snakeY += box

    //If snake eats the food
    if(snakeX == food.x && snakeY == food.y) 
    {
        score++
        eat.play()
        food = {
            x: Math.floor(Math.random() *17 +1)*box,
            y: Math.floor(Math.random() *15 +3)*box
        }
    }// We do not remove the tail
    else
    {
            //Remove the tail
        snake.pop()
    }

    //Add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //Game over
    if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)) 
    {
        clearInterval(game)
        dead.play()
    }

    snake.unshift(newHead)

    ctx.fillStyle = "white"
    ctx.font = "45px Ariel"
    ctx.fillText(score, 2*box, 1.6*box)
}

//Call draw function every 10 ms
let game = setInterval(draw, 100)


