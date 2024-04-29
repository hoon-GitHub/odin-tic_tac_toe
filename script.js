/* 
** Factory function for creating the gameboard and some basic functions
** related to managing the gameboard
*/
const board = (function Gameboard() {
  
  // create a 3x3 board and a play counter
  let board = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ];
  let playCount = 0;

  // function for getting the board
  const getBoard = () => board;

  // function for printing (in the console) the board
  const printBoard = () => {
    console.log(board[0][0], board[0][1], board[0][2]);
    console.log(board[1][0], board[1][1], board[1][2]);
    console.log(board[2][0], board[2][1], board[2][2], "Play count: " + playCount);
  }

  // function for resetting the board
  const resetBoard = () => {
    board = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ];
    playCount = 0;
    console.log("Game board has been reset.");
  }

  // marks a slot with the player's token (1 or 2)
  const mark = (row, col, player) => {
    if (board[row][col] === 0) { // if the slot is empty
      board[row][col] = player;
      console.log(`SUCCESS - mark ${player} placed in the slot [${row}][${col}].`);
      playCount++;
      return true;
    } else { // if the slot is taken, display error message
      console.error("ERROR - slot already taken, select a different slot");
      return false;
    }
  }

  const checkWinner = () => {

    // check horizontal rows
    if (board[0][0] === 1 && board[0][1] === 1 && board[0][2] === 1) return "PLAYER 1 WINS";
    if (board[0][0] === 2 && board[0][1] === 2 && board[0][2] === 2) return "PLAYER 2 WINS";
    if (board[1][0] === 1 && board[1][1] === 1 && board[1][2] === 1) return "PLAYER 1 WINS";
    if (board[1][0] === 2 && board[1][1] === 2 && board[1][2] === 2) return "PLAYER 2 WINS";
    if (board[2][0] === 1 && board[2][1] === 1 && board[2][2] === 1) return "PLAYER 1 WINS";
    if (board[2][0] === 2 && board[2][1] === 2 && board[2][2] === 2) return "PLAYER 2 WINS";

    // check vertical columns
    if (board[0][0] === 1 && board[1][0] === 1 && board[2][0] === 1) return "PLAYER 1 WINS";
    if (board[0][0] === 2 && board[1][0] === 2 && board[2][0] === 2) return "PLAYER 2 WINS";
    if (board[0][1] === 1 && board[1][1] === 1 && board[2][1] === 1) return "PLAYER 1 WINS";
    if (board[0][1] === 2 && board[1][1] === 2 && board[2][1] === 2) return "PLAYER 2 WINS";
    if (board[0][2] === 1 && board[1][2] === 1 && board[2][2] === 1) return "PLAYER 1 WINS";
    if (board[0][2] === 2 && board[1][2] === 2 && board[2][2] === 2) return "PLAYER 2 WINS";

    // check diagonals
    if (board[0][0] === 1 && board[1][1] === 1 && board[2][2] === 1) return "PLAYER 1 WINS";
    if (board[0][0] === 2 && board[1][1] === 2 && board[2][2] === 2) return "PLAYER 2 WINS";
    if (board[2][0] === 1 && board[1][1] === 1 && board[0][2] === 1) return "PLAYER 1 WINS";
    if (board[2][0] === 2 && board[1][1] === 2 && board[0][2] === 2) return "PLAYER 2 WINS";

    // no winner and reached 9 plays = draw
    if (playCount === 9) return "DRAW";

    // default - no winner and not yet reached 9 plays
    return null;
  }

  return { getBoard, printBoard, resetBoard, mark, checkWinner };
})();


/* 
** Game controller manages the game flow and state of the game.
*/
const game = (function gameController(player1 = "Player One", player2 = "Player Two") {

  let activePlayer = player1; // player1 plays first

  // new game - reset the game board and player
  const newGame = () => {
    board.resetBoard();
    activePlayper = player1;
    console.log(`New game begins. ${player1} vs. ${player2}.`);
    whoseTurn();
  }

  // function displays board and whose turn it is
  const whoseTurn = () => {
    board.printBoard();
    console.log(`** ${activePlayer}'s turn. **`);
  }

  // function plays a turn for the active player
  const play = (row, col) => {

    // tries to play a turn, and check for validity
    let valid = board.mark(row, col, (activePlayer === player1 ? 1 : 2));

    if (valid) { // SUCCESS
      let winner = board.checkWinner();
      if (winner === null) {
        activePlayer = (activePlayer === player1 ? player2 : player1); // swap active player
        whoseTurn(); // display whose turn it is
      } else {
        console.warn(winner);
        gameOver();
      }
    } else { // ERROR
      console.warn("Please try again.");
      whoseTurn();
    }
  }

  const gameOver = () => {
    console.warn("***** GAME OVER *****");
  }

  newGame(); // initial new game

  return { newGame, whoseTurn, play };
})();