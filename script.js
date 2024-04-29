/* 
** Factory function for creating the gameboard and some basic functions
** related to managing the gameboard
*/
const board = (function Gameboard() {
  
  // create a 3x3 board
  const board = [];
  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i][j] = 0;
    }
  }

  // function for getting the board
  const getBoard = () => board;

  // function for printing (in the console) the board
  const printBoard = () => {
    console.log(board[0][0], board[0][1], board[0][2]);
    console.log(board[1][0], board[1][1], board[1][2]);
    console.log(board[2][0], board[2][1], board[2][2]);
  }

  // function for resetting the board
  const resetBoard = () => {
    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for (let j = 0; j < 3; j++) {
        board[i][j] = 0;
      }
    };
    console.log("Game board has been reset.");
  }

  // marks a slot with the player's token (1 or 2)
  const mark = (row, col, player) => {
    if (board[row][col] === 0) { // if the slot is empty
      board[row][col] = player;
      console.log(`SUCCESS - mark ${player} placed in the slot [${row}][${col}].`);
      return true;
    } else { // if the slot is taken, display error message
      console.log("ERROR - slot already taken, select a different slot");
      return false;
    }
  }

  return { getBoard, printBoard, resetBoard, mark };
})();


/* 
** Game controller manages the game flow and state of the game.
*/
function gameController(player1 = "Player One", player2 = "Player Two") {

  // reset the game board and ready for a new game
  board.resetBoard();
  console.log(`New game begins. ${player1} vs ${player2}.`);

  let activePlayer = player1; // player1 plays first

  // function displays whose turn it is
  const whoseTurn = () => {
    board.printBoard();
    console.log(`** ${activePlayer}'s turn. **`);
  }

  // function plays a turn for the active player
  const play = (row, col) => {

    // plays a turn, and check the validity
    let valid = board.mark(row, col, (activePlayer === player1 ? 1 : 2));

    if (valid) {
      activePlayer = (activePlayer === player1 ? player2 : player1); // swap active player
      whoseTurn(); // display whose turn it is
    } else {
      console.log("Please try again.");
    }
  }

  // initial turn announcement
  whoseTurn();

  return { whoseTurn, play };
}

const game = gameController();