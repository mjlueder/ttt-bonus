/*-------------------------------- Constants --------------------------------*/


const winningCombos = [
  [0, 1, 4],
  [0, 2, 6],
  [0, 3, 8],
  [1, 2, 3],
  [4, 5, 6],
  [5, 6, 7],
  [6, 7, 8]
]

/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner, tie

/*------------------------ Cached Element References ------------------------*/
  
const squareEls = document.querySelectorAll('.square')
// console.dir(squareEls);
const messageEl = document.getElementById('message')
// console.log(messageEl);
const boardEl = document.querySelector('.board')
// console.log(boardEl);
const resetBtnEl = document.querySelector('.reset')
// console.log(resetBtnEl);

/*----------------------------- Event Listeners -----------------------------*/

boardEl.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', init)


/*-------------------------------- Functions --------------------------------*/

function init(){
  board = [null, null, null, null, null, null, null, null, null]
  turn = -1
  winner = false
  tie = false
  render()
  squareEls.forEach(function(sqr){
    if (sqr.classList.contains('animate__animated', 'animate__flash'))
    sqr.classList.remove('animate__animated', 'animate__flash')
  })
}

init()  

function render(){
  updateBoard()
  updateMessage()
}

function updateBoard(){
  board.forEach(function(sqr, idx){
    // console.dir(sqr);
    // console.log(idx);
    // console.log(squareEls[idx]);
    if (sqr === null) { squareEls[idx].textContent = ''} 
    if (sqr === 1) { squareEls[idx].textContent = '🌙' }
    if (sqr === -1) { squareEls[idx].textContent = '🐺' }
  })
}

function updateMessage() {
  let letter
  if (turn === -1) letter = '🐺'
  if (turn === 1) letter = '🌙'
  if (winner === false && tie === false){
    messageEl.textContent = `It's ${letter}'s turn`
  } else if (winner === false && tie === true) {
    messageEl.textContent = `It's a tie! 🌕`
  } else {
    messageEl.textContent = `Player ${letter} won!`
  }
}

// winner = true
// tie = true
// updateMessage()

function handleClick(evt){
  // console.log(evt.target.id[2]);
  // console.dir(evt.target);
  // console.log(evt.target.textContent);
  let sqIdx = evt.target.id[2]
  // console.log(board[sqIdx]);
  if (board[sqIdx] !== null) {
    evt.target.classList.add('animate__animated', 'animate__headShake')
    return
  }
  if (winner === true) return
  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
}

function placePiece(idx) {
  board[idx] = turn
  // console.log('board idx', idx, board[idx]);
}

function checkForTie(){
  let checkTie = board.every(function(value){
    return value !== null
  })
  tie = checkTie
  // console.log(tie);
}

// checkForTie()
// console.log(tie);

function checkForWinner(){
    winningCombos.forEach(function(combo){
      let sum = 0
      combo.forEach(function(sqr){
        // console.log(board[sqr])
        sum += board[sqr]
      })
      sum = Math.abs(sum)
      // console.log(squareEls[sqr]);
      if (sum === 3) {
        winner = true
        combo.forEach(function(sqr){
          squareEls[sqr].classList.add('animate__animated', 'animate__flash')
        })
      }
      // console.log('sum ', sum);
      // console.log('abs ', sum);
      // console.log(winner);
        
      
    })
  }

// checkForWinner()

function switchPlayerTurn(){
  if (winner === true) return
  turn = turn * -1
  // console.log(turn);
}

