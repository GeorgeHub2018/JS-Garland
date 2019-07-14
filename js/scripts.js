const COLORS = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'dodgerblue', 'lime'];
const DEFAULT_BALL_SIZE = 30
const DEFAULT_WIDTH = 7
const DEFAULT_HEIGHT = 7
const DEFAULT_INTERVAL = 500


var fieldWidth  = DEFAULT_WIDTH
var fieldHeight = DEFAULT_HEIGHT
var ballSize    = DEFAULT_BALL_SIZE
var interval    = DEFAULT_INTERVAL
var colorsCount = COLORS.length

var FIELD = {
    width:  ballSize * fieldWidth,
    height: ballSize * fieldHeight
}

var intervalId;
var balls = []
var round = true
var rootElem     = document.getElementById('field')
var controlsElem = document.getElementById('controls')

function refreshColor(value) {
    colorCount = document.getElementById('colorCount')
    colorCount.innerHTML = value;
    colorsCount = value

    for (let index in balls) {
        ball = balls[index]
        ball.color = index % colorsCount
        ballElem = document.getElementById(ball.id)

        ballElem.style.transitionProperty = "background";
        ballElem.style.timingFunction = "linear";
        ballElem.style.transitionDuration = "1s";
        ballElem.style.setProperty('background', COLORS[ball.color])
    }    
} 

function refreshWidth(value) {
    colorCount = document.getElementById('fieldWidth')
    colorCount.innerHTML = value;
    fieldWidth = value
    FIELD.width = ballSize*fieldWidth
    refreshGarland()
} 

function refreshHeight(value) {
    colorCount = document.getElementById('fieldHeight')
    colorCount.innerHTML = value;
    fieldHeight = value
    FIELD.height = ballSize*fieldHeight
    refreshGarland()
} 

function refreshInterval(value) {
    moveInterval = document.getElementById('moveInterval')
    moveInterval.innerHTML = value;
    interval = value

    clearInterval(intervalId);
    startInterval(interval);
}

function refreshRound() {
    for (let ball in balls) {
        ballElem = document.getElementById(balls[ball].id)

        ballElem.style.transitionProperty = "border-radius";
        ballElem.style.timingFunction = "linear";
        ballElem.style.transitionDuration = "2s";
        ballElem.style.setProperty('border-radius', round ? '50%' : '0%')
    }
}

function changeRound() {
    round = !round
    refreshRound()
}

function refreshGarland() {
    rootElem.style.setProperty('width', FIELD.height+'px');
    rootElem.style.setProperty('height', FIELD.width+'px');
    balls = [];
    var ballCount = FIELD.height/ballSize*2 + 
        FIELD.width/ballSize*2 - 4

    for (var i = ballCount; i < 36; i++) {
        ballElem = document.getElementById(i)
        if (ballElem)
            rootElem.removeChild(ballElem)
    }

    for (var i = 0; i < ballCount; i++) {
        var ball = {
            id: i,
            x: ballSize*i,
            y: 0,
            color: i % colorsCount
        }
        // left
         if (ball.x > FIELD.width*2+FIELD.height - 3*ballSize) {
            ball.y = FIELD.height - ballSize + (FIELD.width*2+FIELD.height- 3*ballSize) - ball.x
            ball.x = 0
        } else 
        // bottom
        if (ball.x > FIELD.width+FIELD.height - 2*ballSize) {
            ball.y = FIELD.height-ballSize
            ball.x = FIELD.width-ballSize + (FIELD.width+FIELD.height - 2*ballSize) - ball.x
        } else
        // right
        if (ball.x > FIELD.width - ballSize) {
            ball.y = ball.x - (FIELD.width - ballSize)
            ball.x = FIELD.width-ballSize
        }
        balls.push(ball);
    }
}

function moveBall(ball) {
    if (ball.y == 0) { // top
        if (ball.x-ballSize <= -1)
            ball.y += ballSize
        else
            ball.x -= ballSize
    } else
    if (ball.y+ballSize == FIELD.height) { // bottom
        if (ball.x+ballSize >= FIELD.width)
            ball.y -= ballSize
        else
            ball.x += ballSize
    } else
    if (ball.x == 0) { //left
        if (ball.y+ballSize >= FIELD.height)
            ball.x += ballSize
        else
            ball.y += ballSize
    } else { // right
        if (ball.y-ballSize <= -1)
            ball.x -= ballSize
        else
            ball.y -= ballSize
    }

    /*clockwise
    if (ball.y == 0) { // top
        if (ball.x+ballSize >= FIELD.width)
            ball.y += ballSize
        else
            ball.x += ballSize
    } else
    if (ball.y == FIELD.height) { // bottom
        if (ball.x-ballSize <= -1)
            ball.y -= ballSize
        else
            ball.x -= ballSize
    } else
    if (ball.x == 0) { //left
        if (ball.y-ballSize <= -1)
            ball.x += ballSize
        else
            ball.y -= ballSize
    } else { // right
        if (ball.y+ballSize >= FIELD.height)
            ball.x -= ballSize
        else
            ball.y += ballSize
    } */
}   

function drawBall(ball) {
    ballElem = document.getElementById(ball.id)
    if (!ballElem) {
        ballElem = document.createElement('div')
        ballElem.id = ball.id

        ballElem.style.setProperty('width', ballSize+'px');
        ballElem.style.setProperty('height', ballSize+'px');
        rootElem.appendChild(ballElem);
        ballElem.className = 'garland-ball'

        ballElem.style.setProperty('border-radius', round ? '50%' : '0%')
    }
    
    x = controlsElem.clientWidth + ball.x
    ballElem.style.setProperty("left", x+'px');
    ballElem.style.setProperty("top", ball.y+'px');
    ballElem.style.background = COLORS[ball.color]
}

function startInterval(_interval) {
    intervalId = setInterval(function() {
        for (let ball in balls) {
            moveBall(balls[ball])
            drawBall(balls[ball])
        }
    }, _interval);
  }

refreshGarland()
startInterval(interval)
