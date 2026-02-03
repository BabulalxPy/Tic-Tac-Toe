//Gameboard where play happens
const Gameboard = (() => {
    //initial gamebaord as empty
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    //function to transfer board to other factories
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

//winning logic here
const GameOver = (() => {
    //winning combos to set the logic
    let winCombos = [[0,1,2],[3,4,5],[6,7,8],
                 [0,3,6],[1,4,7],[2,5,8],
                 [0,4,8],[2,4,6]];
    //function to check the winner and who is it
    const checkWin = () =>{
        //variable to store winner
        let winner = "";

        winCombos.forEach((array) => {
            // getting board from Gameboard
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
        //function with .every to check the draw situation only if not winner
        const isBoardFull = currentBoard.every((cell) => {
            return cell !== "";
        });
        if(isBoardFull){
            //sconsole.log("draw");
            return "draw";
        };

    };
    
    return {checkWin, checkDraw};
    
})();

//GameEnd result
const GameResult = () =>{

    //variable to store winner got from checkWin function
    const winner_player = GameOver.checkWin();
    //console.log(winner_player);
    //status var to return the winner or draw
    let status = "";
    if(winner_player === "X" || winner_player === "O"){

        console.log("winner is " + winner_player);
        status = winner_player + " Player Won";
    }else{
        status = GameOver.checkDraw();

    };
    return status;
};
// DOM function here

const displayController = (() =>{
    
    const container = document.querySelector("div");

    const playbox = () =>{
        //player turn display
        const player = document.createElement("div");
        player.classList.add("player");
        player.textContent = "Player X Turn";
        // grid box
        const grid = document.createElement("div");
        grid.classList.add("grid");
        //displaying status of game after game over
        const disp_status = document.createElement("h2");
        disp_status.classList.add("disp_status");

        let stopper = false;
        // loop for button creation
        for(let i = 0; i < 9; i++){

            const box = document.createElement("button");
            box.classList.add("cell");

            box.addEventListener("click", clickhandler);
            function clickhandler(){

                if(stopper)return;
            
                Gameboard.playTurn(i);
                
                if(Gameboard.getBoard()[i] === "X"){
                    player.textContent = "Player O's Turn";
                }else{
                    player.textContent = "Players X's Turn";
                }
                
                box.textContent = Gameboard.getBoard()[i];
                disp_status.textContent = GameResult();
                
                //stopping the function to play ahead after winner or draw
                console.log(disp_status.textContent);
                if(disp_status.textContent === Gameboard.getBoard()[i] +" Player Won"){
                    console.log("game stops");
                    stopper = true;
                    console.log(stopper);
                    player.textContent = "Game Over";
                    
                };
            };
            grid.appendChild(box);
        };

        container.appendChild(player);
        container.appendChild(grid);
        container.appendChild(disp_status);

    };
    
    const resetthegame = () =>{
        const reset_btn = document.createElement("button");
        reset_btn.classList.add("reset");
        reset_btn.textContent = "RESET THE GAME";
        reset_btn.addEventListener("click", () =>{
           Gameboard.resetBoard();
           container.textContent = "";
           playbox();
           resetthegame();
        
    });
    
    
    container.appendChild(reset_btn);
    };

    return {playbox, resetthegame};

})();

displayController.playbox();
displayController.resetthegame();


