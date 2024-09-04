// Carousel.js
import React, { useState, useEffect } from 'react';
import InfoBlock from './InfoBlock';

const Carousel = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAuto, setIsAuto] = useState(false); // Auto/Manual mode
  const itemsPerPage = 8; // Number of items to show at a time
  const scrollDelay = 2000; // 2 seconds delay

  // Function to scroll to the next block
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  // Function to scroll to the previous block
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length);
  };

  // Auto-scrolling logic
  useEffect(() => {
    if (isAuto) {
      const interval = setInterval(() => {
        handleNext();
      }, scrollDelay);

      return () => clearInterval(interval); // Clean up on component unmount
    }
  }, [isAuto, currentIndex]);

  // Circular logic to display games
  const currentGames = [];
  for (let i = 0; i < itemsPerPage; i++) {
    currentGames.push(games[(currentIndex + i) % games.length]);
  }

  // Toggle between Auto and Manual mode
  const handleModeChange = () => {
    setIsAuto((prevIsAuto) => !prevIsAuto);
  };

  return (
    <div className="carousel" style={styles.carousel}>
      <div style={styles.modeToggle}>
        <label>
          <input
            type="checkbox"
            checked={isAuto}
            onChange={handleModeChange}
          />
          Auto Scroll
        </label>
      </div>
      
      {/* Only show manual buttons if not in auto mode */}
      {!isAuto && (
        <>
          <button onClick={handlePrev} style={styles.button}>Previous</button>
        </>
      )}

      <div style={styles.blocksContainer}>
        {currentGames.map((game, index) => (
          <InfoBlock key={index} game={game} />
        ))}
      </div>

      {!isAuto && (
        <>
          <button onClick={handleNext} style={styles.button}>Next</button>
        </>
      )}
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
    transition: 'transform 0.5s ease-in-out', // Add smooth transition for auto-scroll
    overflow: 'hidden',
    width: '80%', // Adjust width to fit 8 blocks
  },
  button: {
    margin: '0 10px',
    padding: '10px',
  },
  modeToggle: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  }
};

export default Carousel;
