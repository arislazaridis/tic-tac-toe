(() => {
  window.addEventListener("load", () => {
    //Initial states and variables

    //Array with X|0 states in squares
    let gameState = ["", "", "", "", "", "", "", "", ""];

    //initial state for the first player
    const state = {
      whoPlaysNow: "X",
      playerWins: {
        'X': 0,
        'O': 0
      },
      winnerExists: false
    }

    //Functions

    //Display function for the Winner (X or O player)
    const winningMessage = () => `Player ${state.whoPlaysNow} has won!`;

    //Message for draw
    const drawMessage = "Game ended in a draw";
    //Players Turn Message
    const currentPlayerTurn = () => `It's ${state.whoPlaysNow}'s turn`;

    //Message Player's X wins
    const messageWinsPlayer = (player) => `Player's ${player} wins : ${state.playerWins[player]}`;

    //changing value (x|o) for the next Player
    const setWhoPlaysNowToNext = () => {
      //change players state
      state.whoPlaysNow = state.whoPlaysNow === "X" ? "O" : "X";
      statusDisplay.innerText = currentPlayerTurn();
    };

    //Clicked function for every square
    const handleCellClick = (index) => {
      //Check if the button was clicked again
      if (gameState[index] === "" && state.winnerExists === false) {
        handleCellPlayed(index);
        handleResultValidation(state.winnerExists);
      }
    };

    const handleCellPlayed = (index) => {
      gameState[index] = state.whoPlaysNow;
      document.querySelector(`[data-cellIndex="${index}"]`).innerHTML = state.whoPlaysNow;
      setWhoPlaysNowToNext();
    };

    //Check for winner or draw
    const handleResultValidation = () => {
        //Array with the numbers of indexes which must have the same value to winning
      const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i <= 7; i++) {
        const winningCondition = winningConditions[i]; // ex. 0 =  [0, 4, 8]

        let indexForWin1 = gameState[winningCondition[0]]; //stoixeio stin thesi 0
        let indexForWin2 = gameState[winningCondition[1]]; //stoixeio stin thesi 4
        let indexForWin3 = gameState[winningCondition[2]]; //stoixeio stin thesi 8

        if (indexForWin1 == "" || indexForWin2 == "" || indexForWin3 == "") {
          continue;
        }
        if (indexForWin1 == indexForWin2 && indexForWin2 == indexForWin3) {
          state.playerWins[indexForWin1]++;

          state.winnerExists = true;

          state.whoPlaysNow = indexForWin1; //Change state to display the winner in winningMessage()

          statusDisplay.innerText = winningMessage();

          restartBtn.classList.remove("display-none");
          btnStats.classList.remove("display-none"); //statistics

          break;
        }
      }

      if (!gameState.includes("") && !state.winnerExists) {
        statusDisplay.innerText = drawMessage;
        state.winnerExists = false;
        restartBtn.classList.remove("display-none");
        btnStats.classList.remove("display-none"); //statistics

        state.whoPlaysNow = state.whoPlaysNow === "X" ? "O" : "X";
        return;
      }
    };

    //Create Dom Elements

    const conteiner = document.createElement("div");
    conteiner.id = "gameContainer";
    document.getElementById("root").append(conteiner);

    for (let i = 0; i < 9; i++) {
      const square = document.createElement("div");
      square.className = "cell";
      square.setAttribute("data-cellIndex", i);
      square.addEventListener('click', () => handleCellClick(i))
      document.getElementById("gameContainer").appendChild(square);
    }

    //H3 for display the winner's result
    const statusDisplay = document.createElement("h3");
    statusDisplay.className = "displayResult";
    document.getElementById("root").append(statusDisplay);
    statusDisplay.innerHTML = currentPlayerTurn(); //Display player's turn

    //Restart button
    const restartBtn = document.createElement("button");
    restartBtn.className = "game-restart";
    restartBtn.innerHTML = "Restart Game";
    document.getElementById("root").append(restartBtn);
    restartBtn.classList.add("display-none");

    //Statistics button
    const btnStats = document.createElement("button");
    btnStats.className = "game-statistics";
    btnStats.innerHTML = "Statistics";
    document.getElementById("root").append(btnStats);
    btnStats.classList.add("display-none");

    //Statistics function for wins : X|O
    const handlePlayersWins = () => {
      playerXstats.innerText = messageWinsPlayer('X');
      playerOstats.innerText = messageWinsPlayer('O');
    };
    document
      .querySelector(".game-statistics")
      .addEventListener("click", handlePlayersWins);

    //h4 for statistics playerX
    const playerXstats = document.createElement("h4");
    playerXstats.className = "player-stats";
    document.getElementById("root").append(playerXstats);

    //h4 for statistics playerX
    const playerOstats = document.createElement("h4");
    playerOstats.className = "player-stats";
    document.getElementById("root").append(playerOstats);

    //Restart Game - function
    const handleRestartGame = () => {
      document
        .querySelectorAll(".cell")
        .forEach((cell) => cell.innerHTML = ""); //clear the fields of squares

      document
        .querySelectorAll(".player-stats")
        .forEach((stats) => (stats.innerHTML = ""));

      state.winnerExists = false; //Begin again the game
      gameState = gameState.map(() => "");

      statusDisplay.innerHTML = "";
      restartBtn.classList.add("display-none");

      state.whoPlaysNow = state.whoPlaysNow === "X" ? "O" : "X";
      statusDisplay.innerHTML = currentPlayerTurn();

      restartBtn.classList.add("display-none");
      btnStats.classList.add("display-none");
    };

    document
      .querySelector(".game-restart")
      .addEventListener("click", handleRestartGame);
  });
})();
