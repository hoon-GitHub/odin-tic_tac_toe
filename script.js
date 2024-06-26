/* 
** Factory function for creating the gameboard and some basic functions
** related to managing the gameboard
*/
const board = (function Gameboard() {
  
  // create the game board and a play counter
  let board = [];
  let playCount = 0;

  // function for resetting the board
  const resetBoard = () => {
    board = [ [' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' '] ];
    playCount = 0;
    render();
  }

  // render the contents of game board
  const render = () => {
    const DOM_cells = document.querySelectorAll('.cell');
    DOM_cells[0].innerText = board[0][0];
    DOM_cells[1].innerText = board[0][1];
    DOM_cells[2].innerText = board[0][2];
    DOM_cells[3].innerText = board[1][0];
    DOM_cells[4].innerText = board[1][1];
    DOM_cells[5].innerText = board[1][2];
    DOM_cells[6].innerText = board[2][0];
    DOM_cells[7].innerText = board[2][1];
    DOM_cells[8].innerText = board[2][2];
  }

  // marks a slot with the player's token (1 or 2)
  const mark = (row, col, player) => {
    if (board[row][col] === ' ') { // if the slot is empty
      board[row][col] = player;
      console.log(`SUCCESS - mark ${player} placed in the slot [${row}][${col}].`);
      playCount++;
      render();
      return true;
    } else { // if the slot is taken, display error message
      console.error("ERROR - slot already taken, select a different slot");
      return false;
    }
  }

  // checks if there's a winner (after each play)
  const checkWinner = () => {

    // check horizontal rows
    if (board[0][0] === 'X' && board[0][1] === 'X' && board[0][2] === 'X') return "1";
    if (board[0][0] === 'O' && board[0][1] === 'O' && board[0][2] === 'O') return "2";
    if (board[1][0] === 'X' && board[1][1] === 'X' && board[1][2] === 'X') return "1";
    if (board[1][0] === 'O' && board[1][1] === 'O' && board[1][2] === 'O') return "2";
    if (board[2][0] === 'X' && board[2][1] === 'X' && board[2][2] === 'X') return "1";
    if (board[2][0] === 'O' && board[2][1] === 'O' && board[2][2] === 'O') return "2";

    // check vertical columns
    if (board[0][0] === 'X' && board[1][0] === 'X' && board[2][0] === 'X') return "1";
    if (board[0][0] === 'O' && board[1][0] === 'O' && board[2][0] === 'O') return "2";
    if (board[0][1] === 'X' && board[1][1] === 'X' && board[2][1] === 'X') return "1";
    if (board[0][1] === 'O' && board[1][1] === 'O' && board[2][1] === 'O') return "2";
    if (board[0][2] === 'X' && board[1][2] === 'X' && board[2][2] === 'X') return "1";
    if (board[0][2] === 'O' && board[1][2] === 'O' && board[2][2] === 'O') return "2";

    // check diagonals
    if (board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X') return "1";
    if (board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O') return "2";
    if (board[2][0] === 'X' && board[1][1] === 'X' && board[0][2] === 'X') return "1";
    if (board[2][0] === 'O' && board[1][1] === 'O' && board[0][2] === 'O') return "2";

    // no winner and reached 9 plays = draw
    if (playCount === 9) return "3";

    // default - no winner and not yet reached 9 plays
    return null;
  }

  return { resetBoard, render, mark, checkWinner };
})();


/* 
** Game controller manages the game flow and state of the game.
*/
const game = (function gameController(player1 = "Player One", player2 = "Player Two") {

  let activePlayer;
  let gameIsActive = false;

  // some DOM pointers
  const display = document.querySelector('.display');
  const newGameButton = document.querySelector('.newGameButton');
  const DOM_players = document.querySelectorAll('.playersInner');
  const DOM_turn = document.querySelectorAll('.playersTurn');
  const DOM_cells = document.querySelectorAll('.cell');
  const playerNamesDialog = document.querySelector('dialog');
  const playButton = document.querySelector('#play');
  
  // new game - get player names and reset the game board
  const newGame = () => {
    playerNamesDialog.showModal();
    playButton.addEventListener('click', (e) => {
      e.preventDefault();
      const p1 = document.getElementById('player1');
      const p2 = document.getElementById('player2');
      player1 = (p1.value === "" ? "Player One" : p1.value);
      player2 = (p2.value === "" ? "Player Two" : p2.value);
      display.style.fontSize = '1em';
      display.innerText = `New game begins. ${player1} vs. ${player2}.`;
      const p1nameDP = document.getElementById('p1name');
      const p2nameDP = document.getElementById('p2name');
      p1nameDP.innerText = player1;
      p2nameDP.innerText = player2;
      playerNamesDialog.close();

      board.resetBoard();
      activePlayer = player1;
      switchTurn();
      gameIsActive = true;
    });
  }

  newGameButton.addEventListener('click', newGame);

  // switch turns and indicate whose turn it is
  const switchTurn = () => {
    if (activePlayer === player1) {
      DOM_players[1].classList.remove('selected');
      DOM_turn[1].style.visibility = 'hidden';
      DOM_players[0].classList.add('selected');
      DOM_turn[0].style.visibility = '';
    } else {
      DOM_players[0].classList.remove('selected');
      DOM_turn[0].style.visibility = 'hidden';
      DOM_players[1].classList.add('selected');
      DOM_turn[1].style.visibility = '';
    }
  }

  // function plays a turn for the active player
  const play = (row, col) => {

    if (gameIsActive) {
      // tries to play a turn, and check for validity
      let valid = board.mark(row, col, (activePlayer === player1 ? 'X' : 'O'));

      if (valid) { // SUCCESS
        let winner = board.checkWinner();
        if (winner === null) {
          activePlayer = (activePlayer === player1 ? player2 : player1); // swap active player
          switchTurn(); // display whose turn it is
          display.innerText = "Success";
        } else if (winner === "1") {
          display.style.fontSize = '1.5em';
          display.innerText = `Game over! ${player1} wins!`;
          gameIsActive = false;
        } else if (winner === "2") {
          display.style.fontSize = '1.5em';
          display.innerText = `Game over! ${player2} wins!`;
          gameIsActive = false;
        } else if (winner === "3") {
          display.style.fontSize = '1.5em';
          display.innerText = `Game over! DRAW!`;
          gameIsActive = false;
        } else {
          return;
        }
      } else { // ERROR
        display.innerText = "Cell is already taken. Please try again.";
      }
    } else {
      return; // if game is not active, do nothing
    }
  }

  newGame(); // initial new game

  // cell event listeners
  DOM_cells[0].addEventListener('click', () => { return play(0, 0) });
  DOM_cells[1].addEventListener('click', () => { return play(0, 1) });
  DOM_cells[2].addEventListener('click', () => { return play(0, 2) });
  DOM_cells[3].addEventListener('click', () => { return play(1, 0) });
  DOM_cells[4].addEventListener('click', () => { return play(1, 1) });
  DOM_cells[5].addEventListener('click', () => { return play(1, 2) });
  DOM_cells[6].addEventListener('click', () => { return play(2, 0) });
  DOM_cells[7].addEventListener('click', () => { return play(2, 1) });
  DOM_cells[8].addEventListener('click', () => { return play(2, 2) });

  return { newGame, switchTurn, play };
})();