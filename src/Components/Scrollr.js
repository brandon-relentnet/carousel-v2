// Scrollr.js
import React from 'react';
import Carousel from './Carousel';

const Scrollr = () => {
  // Example NFL scores data
  const games = [
    { team1: 'Patriots', score1: 24, team2: 'Jets', score2: 21 },
    { team1: 'Giants', score1: 17, team2: 'Eagles', score2: 20 },
    { team1: 'Cowboys', score1: 31, team2: 'Redskins', score2: 28 },
    { team1: 'Rams', score1: 27, team2: '49ers', score2: 24 },
    { team1: 'Bears', score1: 23, team2: 'Packers', score2: 30 },
    { team1: 'Chiefs', score1: 34, team2: 'Raiders', score2: 29 },
    { team1: 'Broncos', score1: 21, team2: 'Chargers', score2: 27 },
    { team1: 'Seahawks', score1: 17, team2: 'Cardinals', score2: 24 },
    { team1: 'Dolphins', score1: 31, team2: 'Bills', score2: 34 },
    { team1: 'Vikings', score1: 21, team2: 'Lions', score2: 18 },
    { team1: 'Texans', score1: 17, team2: 'Titans', score2: 13 },
    { team1: 'Panthers', score1: 20, team2: 'Saints', score2: 19 },
    { team1: 'Falcons', score1: 24, team2: 'Buccaneers', score2: 28 },
    { team1: 'Ravens', score1: 27, team2: 'Steelers', score2: 30 },
    { team1: 'Colts', score1: 35, team2: 'Jaguars', score2: 31 }
  ];

  return (
    <div className="scrollr">
      <h2>NFL Scores Carousel</h2>
      <Carousel games={games} />
    </div>
  );
};

export default Scrollr;
