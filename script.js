//game varible
let inputDir={x:0,y:0};
const foodSound=new Audio('/music/food.mp3');
const gameOverSound=new Audio('/music/gameover.mp3');
const moveSound=new Audio('/music/move.mp3');
const musicSound=new Audio('/music/music.mp3');
let speed=5;
let score=0;
let lastPaintTime=0;
let snakeArr=[
        { x:13,
          y:15
        }
];
food={x:13,y:5};
//game fuctions
function main(ctime)
{
  window.requestAnimationFrame(main);
//   console.log(ctime);
  if((ctime-lastPaintTime)/1000 < 1/speed)
 { return;}
  lastPaintTime=ctime;
  gameEngine();
}

function isCollide(sarr)
{
        for(let i=1;i<snakeArr.length;i++)
        {
                if(snakeArr[0].x===snakeArr[i].x&&snakeArr[0].y===snakeArr[i].y)
                return true;
        }
        if(snakeArr[0].x>=18||snakeArr[0].x<=0)
        return true;

        if(snakeArr[0].y>=18||snakeArr[0].y<=0)
        return true;

        return false;
}
function gameEngine()
{
        //part1 -updating the snake array and food

        if(isCollide())
        {
                gameOverSound.play();
                musicSound.pause();
                inputDir={x:0,y:0};
                alert("game over");
                snakeArr=[{x:13,y:15}];
                musicSound.play();
                score=0;
        }

        //if it eat food
        if(snakeArr[0].x===food.x && snakeArr[0].y===food.y)
        {        foodSound.play();
                snakeArr.unshift({x:snakeArr[0].x +inputDir.x,y:snakeArr[0].y +inputDir.y});
                let a=2;
                let b=16;
                score+=1;
                scoreBox.innerHTML="Score :"+score;
                food={x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())};
        }

        //to move snake
        for(let i=snakeArr.length-2;i>=0;i--)
        {       
                snakeArr[i+1]={...snakeArr[i]};
        }
        snakeArr[0].x+=inputDir.x;
        snakeArr[0].y+=inputDir.y;
        //part2 -dispaly the snake and Food
        //dispaly snake
      
        board.innerHTML="";
        snakeArr.forEach((e,index)=>{
                snakeElement=document.createElement('div');
                snakeElement.style.gridRowStart =e.y;
                snakeElement.style.gridColumnStart =e.x;
              
                if(index===0)
                {
                        snakeElement.classList.add('head');
                }
                else{
                        snakeElement.classList.add('snake');
                }
                
                board.appendChild(snakeElement);
        });
        //dispaly food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart =food.y;
        foodElement.style.gridColumnStart =food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}


//main logic
musicSound.play();
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
        moveSound.play();
        inputDir={x:0,y:1};
       

        switch (e.key) {
                case "ArrowUp":
                     console.log("ArrowUP");   
                     inputDir.x=0;
                     inputDir.y=-1;
                        break;

                 case "ArrowDown":
                        console.log("ArrowDown"); 
                        inputDir.x=0;
                        inputDir.y=1;  
                       break;

                 case "ArrowLeft":
                    console.log("ArrowLeft");  
                    inputDir.x=-1;
                    inputDir.y=0; 
                         break;

                  case "ArrowRight":
                 console.log("ArrowRight");  
                 inputDir.x=1;
                 inputDir.y=0; 
                      break;
                   
                default:
                        break;
        }
        
})