const gameboard=document.getElementById('gameboard');
const context=gameboard.getContext('2d');
const WIDTH=gameboard.width;
const HEIGHT=gameboard.height;
const UNIT=25;
let foodx;
let foody;
let snake=[{x:UNIT*3,y:0},{x:UNIT*2,y:0},{x:UNIT,y:0},{x:0,y:0}];
let xvel=25;
let yvel=0;
let score=0;
let active=false;
let started=false;
let pause=false;
window.addEventListener('keydown',keypress)

startgame();

function startgame(){
    context.fillStyle='black';
    context.fillRect(0,0,WIDTH,HEIGHT);
    createfood();
    displayfood();
    drawsnake();
   
}
function clearboard(){
    context.fillStyle='black';
    context.fillRect(0,0,WIDTH,HEIGHT);
}
function createfood(){
    foodx=Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foody=Math.floor(Math.random()*WIDTH/UNIT)*UNIT;

}
function displayfood(){
    context.fillStyle='red';
    context.fillRect(foodx,foody,UNIT,UNIT);
}
function drawsnake(){
    context.fillStyle='aqua';
    context.strokeStyle='black';
    snake.forEach(snakepart=>{
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT);
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT);

    })

}

function movesnake(){
    const head={x:snake[0].x+xvel,y:snake[0].y+yvel};
    snake.unshift(head);
    if(snake[0].x==foodx && snake[0].y==foody){
      createfood();
      score++;
      document.getElementById('scoreval').innerHTML=score;
    }
    else{
        snake.pop();
    }
  
}
function nextick(){
    if(!active ){
        if(score<10){
            setTimeout(()=>{
                clearboard();
                displayfood();
                drawsnake();
                movesnake();
                checkgameover();
                nextick();
            },350)
        }
        else if(score>=10){
            setTimeout(()=>{
                clearboard();
                displayfood();
                drawsnake();
                movesnake();
                checkgameover();
                nextick();
            },150)
        }
       
    }
   
    else{
        clearboard();
        context.fillStyle='white';
        context.font='bold 40px serif';
        context.textAlign='center';
        context.fillText('Game Over!',WIDTH/2,HEIGHT/2);
    }
   
}
function keypress(event){
    if(!started){
        started=true;
        nextick();
    }
    
    const left=37;
    const up=38;
    const right=39;
    const down=40;
    
    switch(true){
        case(event.keyCode==left && xvel!=UNIT):
        xvel=-UNIT;
        yvel=0;
        break;
        case(event.keyCode==up && yvel!=UNIT):
        xvel=0;
        yvel=-UNIT;
        break;
        case(event.keyCode==right && xvel!=-UNIT):
        xvel=UNIT;
        yvel=0;
        break;
        case(event.keyCode==down && yvel!=-UNIT):
        xvel=0;
        yvel=UNIT;
        break;
    }

}
function checkgameover(){
    switch(true){
        case(snake[0].x<-UNIT):
        case(snake[0].x>WIDTH):
        case(snake[0].y<-UNIT):
        case(snake[0].y>HEIGHT):
        active=true;
        break;
    }
}