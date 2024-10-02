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

        if(checkforWin(Gameboard.getGBoard(), players[currentplayerindex].mark)){
            gameover = true;
            alert(`${players[currentplayerindex].name} won!`)
        }

        currentplayerindex = currentplayerindex ===0 ? 1 : 0;

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




const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", ()=>{
    Game.start();
})

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", ()=>{
    Game.restart();
})