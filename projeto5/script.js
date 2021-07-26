//Initial Data
let currentColor = 'black';

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

let canDraw = false;
let mouseX = 0;
let mouseY = 0;

//Events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

/*
Passo a passo
- quando o click do mouse abaixar, ative o modo desenho
- quando o mouse mover, se o modo desenho estiver ativado, desenhe
- quando o click do mouse levantar, desative o modo desenho
*/

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

document.querySelector('.clear').addEventListener('click', clearScreen);

//Functions
function colorClickEvent(e){
    let color = e.target.getAttribute('data-color');
    currentColor = color;
    
    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e){
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e){
    if(canDraw){
        draw(e.pageX, e.pageY);
    }
}

function draw(x,y){
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    //desenhar
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function mouseUpEvent(){
    canDraw = false;
}

function clearScreen(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}