/*----- constants -----*/ 
const COLORS = {
    '0': 'grey',
    '1': 'Black',
    '-1': 'Yellow'
};
/*----- app's state (variables) -----*/ 
let board, turn, winner, moves, turnPicker, previousWinner, blackTotalScore = 0, yellowTotalScore = 0;

let winningCombos = [
       [0,1,2],
       [1,4,7],
       [0,4,8],
       [0,3,6],
       [3,4,5],
       [6,4,2],
       [6,7,8],
       [2,5,8]
 ];

//  let player1 = [];
//  let player2 = [];
//  let winningArr = [];

/*----- cached element references -----*/ 
/*----- event listeners -----*/ 
document.querySelector("section.board").addEventListener('click', handleClick);
document.getElementById("reset").addEventListener('click', resetBoard);
//opted to not use a reset button, felt like there's more flow to the game just restarting instead of having to press a button to play again.
/*----- functions -----*/
function init(){
    board = [   
        0,0,0,
        0,0,0,
        0,0,0
    ];
    // turnPicker = (Math.floor(Math.random() * 3)-1)
    // if(turnPicker !== 0){
    //     turn = turnPicker;
    // }else{
        
    // } trying to randomize who goes first
    turn = 1;
    
    
    
    if(previousWinner === 1 && (winner !== 'T')){
        blackTotalScore += 1;
        turn = -1;
        
    }else if(previousWinner === -1 && (winner !== 'T')){
        yellowTotalScore += 1;
        turn = 1;
        
    }
    alert(`Total score is now Black: ${blackTotalScore} vs Yellow: ${yellowTotalScore}`);
    winner = null;
    moves = 0;
    render();   
    
}
init();

function render() {
    board.forEach(function(c,cIdx){
            let div = document.getElementById(`c${cIdx}`);
            div.style.backgroundColor = COLORS[c];
    });
    if (winner === 'T') {
        alert(`Cat's game!`);
        
        
        
      } else if (winner) {
          alert(`${COLORS[winner]} has won!`);
          previousWinner = winner;
          
          
        } else {
            alert(`${COLORS[turn]}'s Turn`);
            
        }
        
        
        
    }
    
    function handleClick(evt){
        let idx = parseInt(evt.target.id.replace('c', ''));
        if(board[idx] || winner) return;
        board[idx] = turn;
        //This is where I would push each turn's index into an array. This part worked.
        
        // if(turn === 1){
            //     player1.push(idx)
            // }
            // else if(turn === -1){
                //     player2.push(idx)
                // }
                turn *= -1;
                moves ++;
                winner = getWinner();
                render();
                if(winner){
                    resetBoard();
                }   
                
            }
            
        function resetBoard(){
            board.forEach(function(c,cIdx){
                let div = document.getElementById(`c${cIdx}`);
                div.style.backgroundColor = COLORS[0];
            });
            alert(`Let's play again!`)
            init();
}

function getWinner(){
    //loops through winngCombos two-dimeionsla array
    for (var i = 0; i < winningCombos.length; i++) {
        if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) 
        return board[winningCombos[i][0]];
      }
      if (board.includes(0)) return 0;
      return 'T';
      
//code I tried to make work but couldn't get right so I opted for the solution code. 
//Originally my idea was to see if there was a way to push each player's moves in an array then check that array with 
//an array holding combinations of winning combinations.
    



// for(var i=0;i< winningCombinations.length;i++){
    //     for(var m=0;m<winningCombinations[i].length;m++){
    //         winningArr.push(winningCombinations[i][m]);        
    //     }
    // }
    
    //     if(player1 === winningArr && player2 !== winningArr){
    //         alert('player 1 has won');
    //     }else if(player2 === winningArr && player1 !== winningArr){
    //         alert('player 2 has won');
    //     }
    
    //     else if(player1 !== winningArr && player2 !== winningArr){
    //         alert('The game was a tie');
    //     }
    
}