import React, { useState, useEffect } from 'react';
import Light from './Light';
import Player from './Player';

interface GameStats {
  wins: number;
  losses: number;
  bestTime: number | null;
}

const GAME_DURATION = 30;
const FINISH_LINE = 800;
const LIGHT_INTERVAL = 5000;
const BLINK_DURATION = 2000;

const GameController: React.FC = () => {
  const [gameState, setGameState] = useState({
    isGreen: true,
    isBlinking: false,
    isGameOver: false,
    timeLeft: GAME_DURATION,
    playerPosition: 0,
    isPlayerMoving: false
  });

  const [stats, setStats] = useState<GameStats>({ 
    wins: 0, 
    losses: 0, 
    bestTime: null 
  });


  const handleCaught = () => {
    setGameState(prev => ({ ...prev, isGameOver: true }));
    setStats(prev => ({ ...prev, losses: prev.losses + 1 }));
  };

  const handleWin = () => {
    const currentTime = GAME_DURATION - gameState.timeLeft;
    setStats(prev => ({
      wins: prev.wins + 1,
      losses: prev.losses,
      bestTime: prev.bestTime ? Math.min(prev.bestTime, currentTime) : currentTime
    }));
    alert(`Вы выиграли! Время: ${currentTime} сек`);
  };

  const resetGame = () => {
    setGameState({
      isGreen: true,
      isBlinking: false,
      isGameOver: false,
      timeLeft: GAME_DURATION,
      playerPosition: 0,
      isPlayerMoving: false
    });
  };


  useEffect(() => {
    const lightInterval = setInterval(() => {
      setGameState(prev => ({ ...prev, isBlinking: true }));
      
      setTimeout(() => {
        const newLightState = !gameState.isGreen;
        setGameState(prev => ({ 
          ...prev, 
          isGreen: newLightState,
          isBlinking: false 
        }));

        if (!newLightState && gameState.isPlayerMoving) {
          setTimeout(handleCaught, 300);
        }
      }, BLINK_DURATION);
    }, LIGHT_INTERVAL);

    return () => clearInterval(lightInterval);
  }, [gameState.isGreen, gameState.isPlayerMoving]);


  useEffect(() => {
    if (gameState.timeLeft > 0 && !gameState.isGameOver) {
      const timer = setInterval(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearInterval(timer);
    } else if (gameState.timeLeft === 0) {
      handleCaught();
    }
  }, [gameState.timeLeft, gameState.isGameOver]);


  useEffect(() => {
    if (gameState.playerPosition >= FINISH_LINE && !gameState.isGameOver) {
      setGameState(prev => ({ ...prev, isGameOver: true }));
      handleWin();
    }
  }, [gameState.playerPosition, gameState.isGameOver]);

  return (
    <div className="game-container">
      <h1>GreenLightRedLight</h1>
      
      {gameState.isGameOver ? (
        <div className="game-over">
          <h2>{gameState.timeLeft === 0 ? 'Время вышло!' : 'Game over!'}</h2>
          <button onClick={resetGame}>Начать заново</button>
        </div>
      ) : (
        <>
          <Light isGreen={gameState.isGreen} isBlink={gameState.isBlinking} />
          
          <Player
            canMove={gameState.isGreen}
            onCaught={handleCaught}
            onPositionChange={(position, isMoving) => 
              setGameState(prev => ({ ...prev, playerPosition: position, isPlayerMoving: isMoving }))
            }
          />
          
          <div className="finish-line" style={{ left: `${FINISH_LINE}px` }} />
          <div className="timer">Осталось времени: {gameState.timeLeft} сек</div>
        </>
      )}
      
      <GameStats stats={stats} />
    </div>
  );
};

const GameStats: React.FC<{ stats: GameStats }> = ({ stats }) => (
  <div className="stats">
    <h3>Статистика:</h3>
    <p>Побед: {stats.wins}</p>
    <p>Поражений: {stats.losses}</p>
    <p>Лучшее время: {stats.bestTime !== null ? `${stats.bestTime} сек` : 'N/A'}</p>
  </div>
);

export default GameController;