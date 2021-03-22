let gameBoard=(()=>{
    let markerArray=[];
    let gameBoardDiv=document.querySelectorAll(".squarebox");
    renderContent=(marker)=>{
        markerArray.push(marker);
        for (let i=0;i<markerArray.length;i++){
            gameBoardDiv[i].textContent=markerArray[i];
        }
    }
    return {
        renderContent,
        gameBoardDiv
    }
})()
gameBoard.renderContent()
let d=0;
function displayController(is){
        for (let i=0;i<=2;i++){
            if (gameBoard.gameBoardDiv[i].textContent=="x"){
                d+=1;
            }
        }
        if (d==3){
            alert("you win")
        }
    }

let a=1;
let b=0;
let count=0;
function play(){
    for (let i=0;i<gameBoard.gameBoardDiv.length;i++){
        gameBoard.gameBoardDiv[i].addEventListener('click',()=>{
            if (gameBoard.gameBoardDiv[i].textContent==""){
                if (a>b){
                    gameBoard.gameBoardDiv[i].textContent="x";
                    b++;
                    if (i>=0 && i<=2){
                        count+=1;
                        if (count==3){
                            displayController(i);
                        }
                    }
                }
                else {
                    gameBoard.gameBoardDiv[i].textContent="o"
                    a++;
                }
            }
        })
    }
}
play()