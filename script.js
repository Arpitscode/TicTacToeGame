var boxes = document.querySelectorAll('.box');
var rstGame = document.querySelector('.btn');
var newGame=document.querySelector('.new-btn');
var msg=document.querySelector('.msg');


let turnO = true;
let count=0;

const winPattern = [[0, 1, 2],
[0, 3, 6],
[0, 4, 8],
[1, 4, 7],
[2, 5, 8],
[2, 4, 6],
[3, 4, 5],
[6, 7, 8]];

const drawGame=()=>{
msg.innerText="Game Was Draw. Play Again...";
msg.classList.remove('hide');
rstGame.classList.add('hide');
newGame.classList.remove("hide");
disableBoxes();
}

const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msg.classList.add('hide');
    newGame.classList.add("hide");
    rstGame.classList.remove('hide');
}


const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}


const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const showWinner=(winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msg.classList.remove("hide");
    newGame.classList.remove('hide');
    rstGame.classList.add('hide');
    disableBoxes();
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color="red";
            turnO = false;
        }
        else {
            box.innerText = "X";
            box.style.color="green";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner= chechWinner();
        if(count===9 && !isWinner){
            drawGame();
        }
    });

});

const chechWinner = () => {
    for (const pattern of winPattern) {
        const pos1Val = boxes[pattern[0]].innerText;
        const pos2Val = boxes[pattern[1]].innerText;
        const pos3Val = boxes[pattern[2]].innerText;
        // console.log(pos1Val,pos2Val,pos3Val)
        if (pos1Val!="" && pos2Val!=""&& pos3Val!="") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newGame.addEventListener('click',resetGame);
rstGame.addEventListener('click',resetGame);