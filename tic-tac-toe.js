let gameBoard=(()=>{
    let gameArray=[];
    let gameBoardDiv=document.querySelectorAll(".squarebox");
    let restartButton=document.querySelector('#restart');
    return {
        gameArray,
        gameBoardDiv,
        restartButton
    }
})()
let players=()=>{
    let renderContent=(i,marker)=>{
        gameBoard.gameArray.push(marker);
        gameBoard.gameBoardDiv[i].textContent=`${marker}`
    }
    let point=0;
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
    let _clickCount=(column_row_name,play,a,b,c,marker)=>{
        count[column_row_name]+=1;
        if (count[column_row_name]%3===0){
            play.check_if_winner(a,b,c,marker);
        }
    }
    let clickCount=(i,play,marker,a,b)=>{
        (a>b)?marker==="x":marker==="O"    
        switch(i){
            case 0:
                _clickCount('row1',play,0,2,1,`${marker}`);
                _clickCount('column1',play,0,6,3,`${marker}`);
                _clickCount('rightCross',play,0,8,4,`${marker}`)
                break;
            case 3:
                _clickCount('row2',play,3,5,1,`${marker}`);
                _clickCount('column1',play,0,6,3,`${marker}`);
                break;
            case 6:
                _clickCount('row3',play,6,8,1,`${marker}`);
                _clickCount('column1',play,0,6,3,`${marker}`);
                _clickCount('leftCross',play,2,6,2,`${marker}`);
                break;
            case 1:
                _clickCount('row1',play,0,2,1,`${marker}`);
                _clickCount('column2',play,1,7,3,`${marker}`)
                break;
            case 4:
                _clickCount('row2',play,3,5,1,`${marker}`);
                _clickCount('column2',play,1,7,3,`${marker}`);
                _clickCount('rightCross',play,0,8,4,`${marker}`);
                _clickCount('leftCross',play,2,4,6,`${marker}`);
                break;
            case 7:
                _clickCount('row3',play,6,8,1,`${marker}`);
                _clickCount('column2',play,1,7,3,`${marker}`);
                break;
            case 2:
                _clickCount('row1',play,0,2,1,`${marker}`);
                _clickCount('column3',play,2,8,3,`${marker}`);
                _clickCount('leftCross',play,2,6,2,`${marker}`);
                break;
            case 5:
                _clickCount('row2',play,3,5,1,`${marker}`);
                _clickCount('column3',play,2,8,3,`${marker}`)
                break;
            case 8:
                _clickCount('row3',play,6,8,1,`${marker}`);
                _clickCount('column3',play,2,8,3,`${marker}`);
                _clickCount('rightCross',play,0,8,4,`${marker}`);
                break;
        }   
}
    return {
        renderContent,
        clickCount,
        point
    }
}
let playerX=players();
let playerO=players();
let play=(()=>{
    let check_if_winner=(a,b,c,marker)=>{
        for (let i=a;i<=b;i+=c){
            if (marker==='x' && gameBoard.gameBoardDiv[i].textContent===`${marker}`){
                playerX.point+=1;
            }
            else if (marker==='o' && gameBoard.gameBoardDiv[i].textContent===`${marker}`){
                playerO.point+=1;
            }
        }
        if (playerX.point==3 || playerO.point==3){
            alert(`Player ${marker} Win`)
        }    
    }
    return {
    	check_if_winner
    }
})()
let displayController=(()=>{
    let a=1;
    let b=0;
    let addLisetener=()=>{
        for (let i=0;i<gameBoard.gameBoardDiv.length;i++){
            gameBoard.gameBoardDiv[i].addEventListener('click',()=>{
                if (a>b && gameBoard.gameBoardDiv[i].textContent=="" && (playerX.point!=3 && playerO.point!=3)){
                    playerX.renderContent(i,"x")
                    playerX.clickCount(i,play,"x",a,b);
                    b++;
                }
                else if (b==a && gameBoard.gameBoardDiv[i].textContent=="" && (playerX.point!=3 && playerO.point!=3)) {
                    playerO.renderContent(i,"o")
                    playerO.clickCount(i,play,"o",a,b);
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