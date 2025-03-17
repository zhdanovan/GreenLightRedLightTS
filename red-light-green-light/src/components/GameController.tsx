import React, { useState, useEffect } from 'react';
import Light from './Light';
import Player from './Player';

const GameController: React.FC = () => {
  const [isGreen, setIsGreen] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isBlink, setIsBlink] = useState(false);
  const [timeLeft,setTimeLeft] = useState(30);



  useEffect(() => {
    const lightInterval = setInterval(() => {
      setIsBlink(true); 
      setTimeout(() => {
        setIsGreen((prev) => !prev);
        setIsBlink(false);
      }, 2000); 
    }, 5000); 

    useEffect(() => {
      if (timeLeft > 0 && !isGameOver) {
        const timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
      } else if (timeLeft === 0) {
        setIsGameOver(true); 
      }
    }, [timeLeft, isGameOver]);

    
    return () => clearInterval(lightInterval);
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
          <Light isGreen={isGreen} isBlink ={isBlink} />
          <Player isMove={isGreen} isCaught={handleCaught} />
        </>
      )}
    </div>
  );
};

export default GameController;