/* Factory function for creating the gameboard and some basic functions
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
    }
  }

  // marks a slot with the player's token (1 or 2)
  const mark = (row, col, player) => {
    if (board[row][col] === 0) { // if the slot is empty
      board[row][col] = player;
    } else { // if the slot is taken, display error message
      console.log('ERROR - slot already taken, select a different slot');
    }
  }

  return { getBoard, printBoard, resetBoard, mark };
})();