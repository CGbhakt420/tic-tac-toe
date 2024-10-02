const Gameboard = (()=>{
    let gboard = ["","","","","","","","",""];

    const render = ()=>{
        let boardHTML = "";
        gboard.forEach((square, index)=>{
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
    }
    

    return{
        render
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
    return{
        start
    }
    
})();


const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", ()=>{
    Game.start();
})