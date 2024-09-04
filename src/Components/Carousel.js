// Carousel.js
import React, { useState, useEffect, useRef } from 'react';
import InfoBlock from './InfoBlock';

const Carousel = ({ games }) => {
  const itemsPerPage = 8; // Number of items to show at a time
  const scrollDelay = 2000; // 2 seconds delay
  const totalGames = games.length;
  const [currentIndex, setCurrentIndex] = useState(itemsPerPage); // Start with the duplicated first set
  const [isAnimating, setIsAnimating] = useState(false); // Handle animation states
  const [isAuto, setIsAuto] = useState(false); // Auto/Manual mode
  const totalItems = totalGames + itemsPerPage * 2; // Include duplicated items
  const autoScrollInterval = useRef(null);

  // Create duplicated games at the start and end
  const duplicatedGames = [
    ...games.slice(totalGames - itemsPerPage), // Duplicating the last 8 items at the start
    ...games,
    ...games.slice(0, itemsPerPage) // Duplicating the first 8 items at the end
  ];

  // Move forward by 1
  const handleNext = () => {
    if (isAnimating) return; // Prevent clicks during animation
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Move backward by 1
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Auto-scrolling logic
  useEffect(() => {
    if (isAuto) {
      autoScrollInterval.current = setInterval(() => {
        handleNext();
      }, scrollDelay);
    } else {
      clearInterval(autoScrollInterval.current);
    }

    return () => clearInterval(autoScrollInterval.current);
  }, [isAuto]);

  // Check for index wrapping around
  useEffect(() => {
    if (isAnimating) {
      if (currentIndex === totalItems - itemsPerPage) {
        // If at the end of the list (duplicated set at the end), jump back to the real start
        setTimeout(() => {
          setIsAnimating(false);
          setCurrentIndex(itemsPerPage); // Jump back to start of the real data
        }, 500); // Ensure the transition is completed
      } else if (currentIndex === 0) {
        // If at the beginning of the list (duplicated set at the start), jump to the real end
        setTimeout(() => {
          setIsAnimating(false);
          setCurrentIndex(totalGames); // Jump to the real end
        }, 500); // Ensure the transition is completed
      } else {
        setTimeout(() => setIsAnimating(false), 500); // End animation
      }
    }
  }, [currentIndex, totalGames, totalItems]);

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
        <div
          style={{
            ...styles.slidingContainer,
            transform: `translateX(-${(currentIndex / totalItems) * 100}%)`,
            transition: isAnimating ? 'transform 0.5s ease-in-out' : 'none' // Only animate if it's not a jump reset
          }}
        >
          {duplicatedGames.map((game, index) => (
            <InfoBlock key={index} game={game} />
          ))}
        </div>
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
    overflow: 'hidden',
    width: '80%', // Adjust width to fit 8 blocks
  },
  slidingContainer: {
    display: 'flex',
    transition: 'transform 0.5s ease-in-out', // Smooth transition for scrolling
    width: 'fit-content',
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
