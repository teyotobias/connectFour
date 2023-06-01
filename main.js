


/*----- constants -----*/
const COLORS = {
    '0' : 'white',
    '1' : 'purple',
    '-1' : 'orange'
};

/*----- state variables -----*/
let board; //array of 7 column arrays
let turn; //1 or -1
let winner; //null = no winner; 1 or -1; 'T' = tie


/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const markerElements = [...document.querySelectorAll('#markers > div')];
//spread syntax

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleDrop);


/*----- functions -----*/
init();
//must invoke init() to start
//Initialize all state, then call render()
function init() {
    board = [
        [0,0,0,0,0,0], //col 0
        [0,0,0,0,0,0], //col 1
        [0,0,0,0,0,0], //col 2
        [0,0,0,0,0,0], //col 3
        [0,0,0,0,0,0], //col 4
        [0,0,0,0,0,0], //col 5
        [0,0,0,0,0,0], //col 6
    ];
    turn = 1;
    winner = null;
    render();
}
// In response to user interaction, update all impacted
// states, then call render();
function handleDrop(evt) {
    const colIdx = markerElements.indexOf(evt.target);
    if(colIdx === -1 || winner) return;
    const colArr = board[colIdx]; //shortcut to cols array
    const rowIdx = colArr.indexOf(0); //find idx of first 0 in colArr

    //update the board state with the curr player value (turn)
    colArr[rowIdx] = turn;
    turn *= -1; // switch player turn
    //console.log(colIdx, rowIdx);
    winner = getWinner(); // Check for winner

    render();

}
//check for winner and make necessary updates
function getWinner() {

}
//Visualize all state in DOM
function render() {
    renderBoard();
    renderMessage(); 
    renderControls(); //Hide/Show UI elements

}

function renderBoard() {
    //how does this work? -> never passed collArr or colIdx
    board.forEach(function(colArr, colIdx) {
        //iterate over the cells in the cur column (colArr)
        colArr.forEach(function(cellVal, rowIdx){
            //use template literal to build string
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            cellEl.style.backgroundColor = COLORS[cellVal];
        });
    });

}

function renderMessage() {
    //tie
    if(winner == 'T'){
        messageEl.innerText = "It's a Tie!!!";

    }
    //somebody won
    else if(winner) {
        messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`

    }
    //game still in progress
    else{
        messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`


    }

}

function renderControls() {
    //Ternary expression is the goto when 1 of 2 values needs to be returned
    // playAgainBtn.style.display = 'none'; completely removes from dom
    //in this case, we need visibility attribute
    playAgainBtn.style.visibility = winner ? 'visible': 'hidden';
 //iterate over marker elements to hide/show if column full(no 0's)/ not full 
    markerElements.forEach(function(markerEl, colIdx) {
        const hideMarker = !board[colIdx].includes(0) || winner;
        markerEl.style.visibility = hideMarker ? 'hidden':'visible';

    });
}
    



