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

    return () => clearInterval(lightInterval);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
      setStats((prev) => ({ ...prev, losses: prev.losses + 1 }));
    }
  }, [timeLeft, isGameOver]);


  useEffect(() => {
    if (playerPosition >= finishLine) {
      setIsGameOver(true);
      const currentTime = 30 - timeLeft; 
      setStats((prev) => ({
        wins: prev.wins + 1,
        losses: prev.losses,
        bestTime: prev.bestTime === null ? currentTime : Math.min(prev.bestTime, currentTime),
      }));
      alert(`Вы выиграли! Время: ${currentTime} сек`);
    }
  }, [playerPosition, timeLeft]);

  const handleCaught = () => {
    setIsGameOver(true);
    setStats((prev) => ({ ...prev, losses: prev.losses + 1 })); 
  };

  const resetGame = () => {
    setIsGameOver(false);
    setTimeLeft(30);
    setPlayerPosition(0);
    setIsGreen(true);
    setIsBlink(false);
  };

  return (
    <div>
      <h1>GreenLightRedLight</h1>
      {isGameOver ? (
         <div>
         <h2>{timeLeft === 0 ? 'Время вышло!' : 'Game over!'}</h2>
         <button onClick={resetGame}>Начать заново</button>
       </div>
      ) : (
        <>
          <Light isGreen={isGreen} isBlink ={isBlink} />
          <Player
            isMove={isGreen}
            isCaught={handleCaught}
            setPlayerPosition={setPlayerPosition}
          />
          <div className="finish-line" style={{ left: `${finishLine}px` }} />
          <div className="timer">Осталось времени: {timeLeft} сек</div>
        </>
        
      )}
      <div className="stats">
        <h3>Статистика:</h3>
        <p>Побед: {stats.wins}</p>
        <p>Поражений: {stats.losses}</p>
        <p>Лучшее время: {stats.bestTime !== null ? `${stats.bestTime} сек` : 'N/A'}</p>
      </div>
    </div>
  );
};

export default GameController;