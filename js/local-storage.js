const sortTopWins = (topWins) => {
  topWins.sort((game1, game2) => {
    if (game1.turns === game2.turns) {
      return new Date(game1.date) - new Date(game2.date);
    }
    return game1.turns - game2.turns;
  });
};

const addGameStatsToTop = (turns, date) => {
  const game = { turns, date };
  const topWins = JSON.parse(localStorage.getItem("topWins")) || [];

  topWins.push(game);
  sortTopWins(topWins);

  if (topWins.length > 10) {
    topWins.pop();
  }

  localStorage.topWins = JSON.stringify(topWins);
};

export { addGameStatsToTop };
