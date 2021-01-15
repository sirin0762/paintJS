const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE; 
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let isPainting = false;
let isFilling = false;

function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;
    if(!isPainting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function startPainting(){
    isPainting = true;
}

function stopPainting(){
    isPainting = false;
}

function handleColor(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(e){
    ctx.lineWidth = e.target.value;
}

function changeMode(e){
    if(isFilling === true){
        mode.innerText = 'Fill';
        isFilling = false;
    }
    else{
        mode.innerText = "Paint";
        isFilling = true;
    }
}

function handleCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(e){
    e.preventDefault();
}

function saveImage(e){
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

function init(){
    if(canvas){
        // offset : canvas 내의 x, y 좌표, client : 윈도우 내의 x, y 좌표
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("click", handleCanvasClick);
        canvas.addEventListener("contextmenu", handleCM);
    }
    
    Array.from(colors).forEach(color => {
        color.addEventListener('click', handleColor);
    })
    
    if(range){
        range.addEventListener("input", handleRangeChange);
    }
    
    if(mode){
        mode.addEventListener('click', changeMode);
    }

    if(saveBtn){
        saveBtn.addEventListener('click', saveImage);
    }
}

init();