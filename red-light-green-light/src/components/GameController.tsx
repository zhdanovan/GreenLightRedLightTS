import React, { useState, useEffect } from 'react';
import Light from './Light';
import Player from './Player';
import { GAME_CONFIG } from './constant';

interface GameStats {
  wins: number;
  losses: number;
  bestTime: number | null;
}

const GameController: React.FC = () => {
  const [lightState, setLightState] = useState<'green' | 'red'>('green');
  const [isWarning, setIsWarning] = useState(false);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.DURATION);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [stats, setStats] = useState<GameStats>({ wins: 0, losses: 0, bestTime: null });

  //Обработчики игровых событий
  const endGame = (result: 'won' | 'lost') => {
    setGameStatus(result);
    if (result === 'won') {
      const currentTime = GAME_CONFIG.DURATION - timeLeft;
      setStats(prev => ({
        wins: prev.wins + 1,
        losses: prev.losses,
        bestTime: prev.bestTime ? Math.min(prev.bestTime, currentTime) : currentTime
      }));
    } else {
      setStats(prev => ({ ...prev, losses: prev.losses + 1 }));
    }
  };

  const resetGame = () => {
    setLightState('green');
    setIsWarning(false);
    setGameStatus('playing');
    setTimeLeft(GAME_CONFIG.DURATION);
    setPlayerPosition(0);
  };

  //Логика светофора
  useEffect(() => {
    const changeLight = () => {
      setIsWarning(true);
      
      setTimeout(() => {
        setLightState(prev => prev === 'green' ? 'red' : 'green');
        setIsWarning(false);
      }, GAME_CONFIG.LIGHT.BLINK_DURATION);
    };

    const lightTimer = setInterval(changeLight, 
      lightState === 'green' 
        ? GAME_CONFIG.LIGHT.GREEN_DURATION 
        : GAME_CONFIG.LIGHT.RED_DURATION
    );

    return () => clearInterval(lightTimer);
  }, [lightState]);

  //Таймер 
  useEffect(() => {
    if (gameStatus !== 'playing') return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame('lost');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStatus]);

  //Проверка победы
  useEffect(() => {
    if (playerPosition >= GAME_CONFIG.FINISH_LINE && gameStatus === 'playing') {
      endGame('won');
    }
  }, [playerPosition, gameStatus]);

  return (
    <div className="game-container">
      <h1>GreenLightRedLight</h1>
      
      {gameStatus !== 'playing' ? (
        <div className="game-over">
          <h2>{gameStatus === 'won' ? 'Победа!' : 'Игра окончена!'}</h2>
          <button onClick={resetGame}>Начать заново</button>
        </div>
      ) : (
        <>
          <Light state={isWarning ? 'blinking' : lightState} />
          
          <Player
            isMovementAllowed={lightState === 'green'}
            onPositionChange={setPlayerPosition}
            onViolation={() => lightState === 'red' && endGame('lost')}
          />
          
          <div className="timer">Осталось времени: {timeLeft} сек</div>
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