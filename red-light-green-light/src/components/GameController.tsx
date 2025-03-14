import React, { useState, useEffect } from 'react';
import Light from './Light';
import Player from './Player';

const GameController: React.FC = () => {
  const [isGreen, setIsGreen] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGreen((prev) => !prev);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  const handleCaught = () => {
    setIsGameOver(true);
  };

  return (
    <div>
      <h1>GreenLightRedLight</h1>
      {isGameOver ? (
        <h2>Game over</h2>
      ) : (
        <>
          <Light isGreen={isGreen} />
          <Player isMove={isGreen} isCaught={handleCaught} />
        </>
      )}
    </div>
  );
};

export default GameController;