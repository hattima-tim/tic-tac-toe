let gameBoard=(()=>{
    let gameArray=[];
    let gameBoardDiv=document.querySelectorAll(".squarebox");
    return {
        gameArray,
        gameBoardDiv
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
        row4:0
    };
    let clickCount=(column_row_name,play,a,b,c,marker)=>{
        count[column_row_name]+=1;
        if (count[column_row_name]==3){
            play.check_if_winner(a,b,c,marker);
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
            if (gameBoard.gameBoardDiv[i].textContent=="x"){
                playerX.point+=1;
            }
        }
        if (playerX.point==3){
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
            if (a>b && gameBoard.gameBoardDiv[i].textContent==""){
                playerX.renderContent(i,"x")
                if (i==0){
                    playerX.clickCount('row1',play,0,2,1,"x")
                    playerX.clickCount('column1',play,0,6,3,"x")
                }
                else if (i==3){
                   playerX.clickCount('row2',play,3,5,1,"x")
                   playerX.clickCount('column1',play,0,6,3,"x")
                }
			    else if (i==6){
                    playerX.clickCount('row3',play,6,8,1,'x');
                    playerX.clickCount('column1',play,0,6,3,"x")
                }
                else if (i===1){
                    playerX.clickCount('row1',play,0,2,1,"x");
                    playerX.clickCount('column2',play,1,7,3,"x")
                }
                else if (i===4){
                    playerX.clickCount('row2',play,3,5,1,"x");
                    playerX.clickCount('column2',play,1,7,3,"x")
                }
                else if (i===7){
                    playerX.clickCount('row3',play,6,8,1,"x");
                    playerX.clickCount('column2',play,1,7,3,"x");
                }
                else if (i===2){
                    playerX.clickCount('row1',play,0,2,1,"x");
                    playerX.clickCount('column3',play,2,8,3,"x")
                }
                else if (i===5){
                    playerX.clickCount('row2',play,3,5,1,"x");
                    playerX.clickCount('column3',play,2,8,3,"x")
                }
                else if (i===8){
                    playerX.clickCount('row3',play,6,8,1,"x");
                    playerX.clickCount('column3',play,2,8,3,"x");
                }                        
                b++;
            }
            else if (b==a && gameBoard.gameBoardDiv[i].textContent=="") {
                gameBoard.gameBoardDiv[i].textContent="o"
                a++;
            }
            })
        }
    }
    return {
        addLisetener
    }
})()
displayController.addLisetener();