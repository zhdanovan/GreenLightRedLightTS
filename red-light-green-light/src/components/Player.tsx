import React, { useState, useEffect } from 'react';
import { GAME_CONFIG } from './constant';

interface PlayerProps {
  isMovementAllowed: boolean;
  onPositionChange: (position: number) => void;
  onViolation: () => void;
}

const Player: React.FC<PlayerProps> = ({ 
  isMovementAllowed, 
  onPositionChange,
  onViolation
}) => {
  const [position, setPosition] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIsMoving(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIsMoving(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (isMoving && isMovementAllowed) {
      const interval = setInterval(() => {
        setPosition(prev => {
          const newPosition = prev + GAME_CONFIG.PLAYER.SPEED;
          onPositionChange(newPosition);
          return newPosition;
        });
      }, GAME_CONFIG.PLAYER.MOVE_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [isMoving, isMovementAllowed]);

  useEffect(() => {
    if (isMoving && !isMovementAllowed) {
      onViolation();
    }
  }, [isMoving, isMovementAllowed]);

  return (
    <div 
      className="player"
      style={{ left: `${position}px` }}
    />
  );
};

export default Player;