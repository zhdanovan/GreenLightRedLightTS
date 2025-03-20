import React, { useState, useEffect } from 'react';
import Light from './Light';
import Player from './Player';


interface Stats {
  wins: number;
  losses: number;
  bestTime: number | null;
}

const GameController: React.FC = () => {
  const [isGreen, setIsGreen] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isBlink, setIsBlink] = useState(false);
  const [timeLeft,setTimeLeft] = useState(30);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [stats, setStats] = useState<Stats>({ wins: 0, losses: 0, bestTime: null });
  const finishLine = 800; 




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

    useEffect(() => {
      if (playerPosition >= finishLine) {
        setIsGameOver(true);
        alert('Win!'); 
      }
    }, [playerPosition]);


    return () => clearInterval(lightInterval);
  }, []);


  const handleCaught = () => {
    setIsGameOver(true);
    setStats((prev) => ({ ...prev, losses: prev.losses + 1 }));
  };

  return (
    <div>
      <h1>GreenLightRedLight</h1>
      {isGameOver ? (
        <h2>Game over</h2>
      ) : (
        <>
          <Light isGreen={isGreen} isBlink ={isBlink} />
          <Player isMove={isGreen} isCaught={handleCaught} setPlayerPosition={setPlayerPosition} />
        </>
      )}
    </div>
  );
};

export default GameController;