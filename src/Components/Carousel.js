// Carousel.js
import React, { useState } from 'react';
import InfoBlock from './InfoBlock';

const Carousel = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 8; // Number of items to show at a time

  const handleNext = () => {
    // Move forward by 1
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % games.length
    );
  };

  const handlePrev = () => {
    // Move backward by 1
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + games.length) % games.length
    );
  };

  // Logic to display games in a circular manner
  const currentGames = [];
  for (let i = 0; i < itemsPerPage; i++) {
    currentGames.push(games[(currentIndex + i) % games.length]);
  }

  return (
    <div className="carousel" style={styles.carousel}>
      <button onClick={handlePrev} style={styles.button}>Previous</button>
      <div style={styles.blocksContainer}>
        {currentGames.map((game, index) => (
          <InfoBlock key={index} game={game} />
        ))}
      </div>
      <button onClick={handleNext} style={styles.button}>Next</button>
    </div>
  );
};

const styles = {
  carousel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blocksContainer: {
    display: 'flex',
    overflow: 'hidden',
    width: '80%', // Adjust width to fit 8 blocks
  },
  button: {
    margin: '0 10px',
    padding: '10px',
  }
};

export default Carousel;
