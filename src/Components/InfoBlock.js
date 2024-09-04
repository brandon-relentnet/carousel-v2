// InfoBlock.js
import React from 'react';

const InfoBlock = ({ game }) => {
  return (
    <div className="info-block" style={styles.block}>
      <h3>{game.team1} vs {game.team2}</h3>
      <p>{game.score1} - {game.score2}</p>
    </div>
  );
};

const styles = {
  block: {
    padding: '10px',
    margin: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '200px',
    textAlign: 'center'
  }
};

export default InfoBlock;
