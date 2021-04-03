let gameBoard=(()=>{
    let gameArray=[];
    let gameBoardDiv=document.querySelectorAll(".squarebox");
    let showWinner=document.querySelector('#show_winner');
    let restartButton=document.querySelector('#restart');
    return {
        gameArray,
        gameBoardDiv,
        showWinner,
        restartButton
    }
})()
let players=()=>{
    let renderContent=(i,marker)=>{
        gameBoard.gameArray.push(marker);
        gameBoard.gameBoardDiv[i].textContent=`${marker}`
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
    let _clickCount=(column_row_name,_a,_b,marker,check_draw)=>{
        count[column_row_name]+=1;
        if (count[column_row_name]%3===0){
            gameBoard.showWinner.textContent=`${marker} won`            
        }
        else if(gameBoard.gameArray.length===9 && check_draw==='true' && gameBoard.showWinner.textContent===''){
            gameBoard.showWinner.textContent="Draw"
        }
    }
    let clickCount=(i,marker,_a,_b)=>{
        (_a>_b)?marker==="x":marker==="O"    
        switch(i){
            case 0:
                _clickCount('row1',0,2,`${marker}`);
                _clickCount('column1',0,6,`${marker}`);
                _clickCount('rightCross',0,8,`${marker}`,'true')
                break;
            case 3:
                _clickCount('row2',3,5,`${marker}`);
                _clickCount('column1',0,6,`${marker}`,'true');
                break;
            case 6:
                _clickCount('row3',6,8,`${marker}`);
                _clickCount('column1',0,6,`${marker}`);
                _clickCount('leftCross',2,6,`${marker}`,'true');
                break;
            case 1:
                _clickCount('row1',0,2,`${marker}`);
                _clickCount('column2',1,7,`${marker}`,'true')
                break;
            case 4:
                _clickCount('row2',3,5,`${marker}`);
                _clickCount('column2',1,7,`${marker}`);
                _clickCount('rightCross',0,8,`${marker}`);
                _clickCount('leftCross',2,4,`${marker}`,'true');
                break;
            case 7:
                _clickCount('row3',6,8,`${marker}`);
                _clickCount('column2',1,7,`${marker}`,'true');
                break;
            case 2:
                _clickCount('row1',0,2,`${marker}`);
                _clickCount('column3',2,8,`${marker}`);
                _clickCount('leftCross',2,6,`${marker}`,'true');
                break;
            case 5:
                _clickCount('row2',3,5,`${marker}`);
                _clickCount('column3',2,8,`${marker}`,'true')
                break;
            case 8:
                _clickCount('row3',6,8,`${marker}`);
                _clickCount('column3',2,8,`${marker}`);
                _clickCount('rightCross',0,8,`${marker}`,'true');
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
    let a=1;
    let b=0;
    let addLisetener=()=>{
        for (let i=0;i<gameBoard.gameBoardDiv.length;i++){
            gameBoard.gameBoardDiv[i].addEventListener('click',()=>{
                if (a>b && gameBoard.gameBoardDiv[i].textContent=="" && gameBoard.showWinner.textContent===""){
                    playerX.renderContent(i,"x")
                    playerX.clickCount(i,"x",a,b);
                    b++;
                }
                else if (b==a && gameBoard.gameBoardDiv[i].textContent=="" && gameBoard.showWinner.textContent==="") {
                    playerO.renderContent(i,"o")
                    playerO.clickCount(i,"o",a,b);
                    a++;
                }
            })
        }
    }
    let enableRestartButton=()=>{
        gameBoard.restartButton.addEventListener('click',()=>{
            for (let i=0;i<gameBoard.gameBoardDiv.length;i++){
                gameBoard.gameBoardDiv[i].textContent='';
                a=1;
                b=0;
                playerX=players();
                playerO=players();
                gameBoard.gameArray=[];
                gameBoard.showWinner.textContent=""  
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