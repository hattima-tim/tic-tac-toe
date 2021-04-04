let gameBoard=(()=>{
    let gameArray=[];
    let gameBoardButton=document.querySelectorAll(".squareboxes");
    let showWinner=document.querySelector('#show_winner');
    let restartButton=document.querySelector('#restart');
    return {
        gameArray,
        gameBoardButton,
        showWinner,
        restartButton
    }
})()
let players=()=>{
    let renderContent=(i,marker)=>{
        gameBoard.gameArray.push(marker);
        gameBoard.gameBoardButton[i].textContent=`${marker}`;
    }
    let count={
        column1:0,
        column2:0,
        column3:0,
        row1:0,
        row2:0,
        row3:0,
        rightCross:0,
        leftCross:0
    };
    let _clickCount=(column_row_name,marker,check_draw)=>{
        count[column_row_name]+=1;
        if (count[column_row_name]===3){
            gameBoard.showWinner.textContent=`Player ${marker} Won The Game`;            
        }
        else if(gameBoard.gameArray.length===9 && check_draw==='true' && (gameBoard.showWinner.textContent==="Player O's Turn" || gameBoard.showWinner.textContent==="Player X's Turn")){
            gameBoard.showWinner.textContent="Tie!";
        }
    }
    let clickCount=(i,marker)=>{
        (gameBoard.showWinner.textContent==="Player X's Turn")?marker==="X":marker==="O";    
        switch(i){
            case 0:
                _clickCount('row1',`${marker}`);
                _clickCount('column1',`${marker}`);
                _clickCount('rightCross',`${marker}`,'true');
                break;
            case 3:
                _clickCount('row2',`${marker}`);
                _clickCount('column1',`${marker}`,'true');
                break;
            case 6:
                _clickCount('row3',`${marker}`);
                _clickCount('column1',`${marker}`);
                _clickCount('leftCross',`${marker}`,'true');
                break;
            case 1:
                _clickCount('row1',`${marker}`);
                _clickCount('column2',`${marker}`,'true');
                break;
            case 4:
                _clickCount('row2',`${marker}`);
                _clickCount('column2',`${marker}`);
                _clickCount('rightCross',`${marker}`);
                _clickCount('leftCross',`${marker}`,'true');
                break;
            case 7:
                _clickCount('row3',`${marker}`);
                _clickCount('column2',`${marker}`,'true');
                break;
            case 2:
                _clickCount('row1',`${marker}`);
                _clickCount('column3',`${marker}`);
                _clickCount('leftCross',`${marker}`,'true');
                break;
            case 5:
                _clickCount('row2',`${marker}`);
                _clickCount('column3',`${marker}`,'true');
                break;
            case 8:
                _clickCount('row3',`${marker}`);
                _clickCount('column3',`${marker}`);
                _clickCount('rightCross',`${marker}`,'true');
                break;
        }   
}
    return {
        renderContent,
        clickCount
    }
}
let playerX=players();
let playerO=players();
let displayController=(()=>{
    let addLisetener=()=>{
        for (let i=0;i<gameBoard.gameBoardButton.length;i++){
            gameBoard.gameBoardButton[i].addEventListener('click',()=>{
                if (gameBoard.gameBoardButton[i].textContent=="" && gameBoard.showWinner.textContent==="Player X's Turn"){
                    gameBoard.showWinner.textContent="Player O's Turn";
                    playerX.renderContent(i,"X");
                    playerX.clickCount(i,"X");
                }
                else if (gameBoard.gameBoardButton[i].textContent=="" && gameBoard.showWinner.textContent==="Player O's Turn") {
                    gameBoard.showWinner.textContent="Player X's Turn";
                    playerO.renderContent(i,"O");
                    playerO.clickCount(i,"O");
                }
            })
        }
    }
    let enableRestartButton=()=>{
        gameBoard.restartButton.addEventListener('click',()=>{
            for (let i=0;i<gameBoard.gameBoardButton.length;i++){
                gameBoard.gameBoardButton[i].textContent='';
                playerX=players();
                playerO=players();
                gameBoard.gameArray=[];
                gameBoard.showWinner.textContent="Player X's Turn";
            }
        })
    }
    return {
        addLisetener,
        enableRestartButton
    }
})()
displayController.enableRestartButton();
displayController.addLisetener();