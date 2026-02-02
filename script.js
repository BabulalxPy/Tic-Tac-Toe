//Gameboard where play happens
const Gameboard = (() => {
    //initial gamebaord as empty
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => gameboard;

    //marking the board
    let activePlayer = "X";

    const playTurn = (index) =>{
        //check if the board index is empty or not
        if(gameboard[index] === ""){
            gameboard[index] = activePlayer;
            console.log(gameboard);
        }else{
            return;
        }
        //For next turn, marker changes for other player
        if(activePlayer === "X"){
            activePlayer = "O";
        }else if(activePlayer === "O"){
            activePlayer = "X";
        };
    };
    //resets the board
    const resetBoard = () => {
        gameboard = ["", "", "", "", "", "", "", "", ""];
    }

    return {playTurn, getBoard, resetBoard};
})();

//Creating players
const createPlayer = (name, marking) =>{
    score = 0;
    
};

//winning logic here
const GameOver = (() => {

    winCombos = [[0,1,2],[3,4,5],[6,7,8],
                 [0,3,6],[1,4,7],[2,5,8],
                 [0,4,8],[2,4,6]];

    const checkWin = () =>{

        let winner = "";

        winCombos.forEach((array) => {

            const currentBoard = Gameboard.getBoard();

            if(currentBoard[array[0]] === currentBoard[array[1]] && 
               currentBoard[array[1]] === currentBoard[array[2]] && 
               currentBoard[array[0]] !== "" && currentBoard[array[2]] !== ""){
                winner = currentBoard[array[0]];
                //console.log("winner is " + winner);
            }
        });
        return winner;
    }

    const checkDraw = () => {

        const currentBoard = Gameboard.getBoard();
        console.log(currentBoard);
        
        const isBoardFull = currentBoard.every((cell) => {
            return cell !== "";
        });
        if(isBoardFull){
            console.log("draw");
            return "draw";
        };

    };
    
    return {checkWin, checkDraw};
    
})();

//Gameboard.playTurn(1);
//Gameboard.playTurn(2);
//Gameboard.playTurn(3);
//Gameboard.playTurn(5);
//Gameboard.playTurn(4);
//Gameboard.playTurn(6);
//Gameboard.playTurn(7);
//Gameboard.playTurn(8);

//GameEnd result
const GameResult = () =>{
    const winner_player = GameOver.checkWin();
    console.log(winner_player);
    let status = "";
    if(winner_player === "X" || winner_player === "O"){

        console.log("winner is " + winner_player);
        status = winner_player + " Player Won";
    }else{
        GameOver.checkDraw();
        status = "DRAW";
    };
    return status;
};



function grid(){

    const container = document.querySelector("div");

    const player = document.createElement("div");
    player.classList.add("player");
    player.textContent = "Player X Turn";

    const grid = document.createElement("div");
    grid.classList.add("grid");

    for(let i = 0; i < 9; i++){
        const box = document.createElement("button");
        box.classList.add("cell");
        box.addEventListener("click", () =>{
        
            Gameboard.playTurn(i);
            
            if(Gameboard.getBoard()[i] === "X"){
                player.textContent = "Player O's Turn";
            }else{
                player.textContent = "Players X's Turn";
            }
            
            box.textContent = Gameboard.getBoard()[i];
        });
        grid.appendChild(box);
    }
    
    const disp_status = document.createElement("h2");
    disp_status.classList.add("dis_status");
    disp_status.textContent = GameResult();
    
    container.appendChild(disp_status);
    container.appendChild(player);
    container.appendChild(grid);

};

grid();
