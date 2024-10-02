const Gameboard = (()=>{
    let gboard = ["","","","","","","","",""];

    const render = ()=>{
        let boardHTML = "";
        gboard.forEach((square, index)=>{
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
        const squares = document.querySelectorAll(".square");
        squares.forEach((square)=>{
            square.addEventListener("click", Game.handleClick);
        })
        
    }

    const update = (index, value) => {
        gboard[index] = value;
        render();

    }
    
    const getGBoard = () => gboard;

    return{
        render, update, getGBoard
    }

})();

const createPlayer = (name, mark) =>{
    return { name, mark}
}

const Game = (()=>{
    let players = [];
    let currentplayerindex;
    let gameover;

    const start = ()=>{
        players = [createPlayer(document.querySelector("#player1").value, "X"), createPlayer(document.querySelector("#player2").value, "O")];
        currentplayerindex = 0;
        gameover = false;
        Gameboard.render();

    }

    const handleClick = (event) =>{
        let index = parseInt(event.target.id.split("-")[1]);
        //alert(index);

        if(Gameboard.getGBoard()[index] !== ""){
            return;
        }
        Gameboard.update(index, players[currentplayerindex].mark);

        

        currentplayerindex = currentplayerindex ===0 ? 1 : 0;
        if(checkforWin(Gameboard.getGBoard(), players[currentplayerindex].mark)){
            gameover = true;
            setTimeout(function(){
                alert(`${players[currentplayerindex].name} won!`)

            },400)
        }

        else if(checkforTie(Gameboard.getGBoard())){
            gameover = true;
            setTimeout(function(){
                alert(`Its a Tie!`)

            },400)
        }

    }

    const restart = ()=>{
        for(let i=0; i<9; i++){
            Gameboard.update(i, "");
        }
        Gameboard.render();
    }

    return{
        start, handleClick, restart
    }
    
})();

function checkforWin(board) {
    const wincombo = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let i=0; i<wincombo.length; i++){
        const [a,b,c] = wincombo[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]){  //board[a] to check if a!=empty because we dont want win with empty cells
            return true;
        }
    }
    return false;

}

function checkforTie(board){
    return board.every(cell=>cell!=="")
}


const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", ()=>{
    Game.start();
})

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", ()=>{
    Game.restart();
})