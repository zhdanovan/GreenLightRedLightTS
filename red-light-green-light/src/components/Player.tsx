import React, { useState, useEffect } from 'react';

interface PlayerProps {
  canMove: boolean;
  onCaught: () => void;
  onPositionChange: (position: number, isMoving: boolean) => void;
}

const Player: React.FC<PlayerProps> = ({ canMove, onCaught, onPositionChange }) => {
  const [position, setPosition] = useState(0);
  const [isKeyPressed, setIsKeyPressed] = useState(false);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setIsKeyPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setIsKeyPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);


  useEffect(() => {
    if (isKeyPressed && canMove) {
      const interval = setInterval(() => {
        setPosition(prev => prev + 5);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isKeyPressed, canMove]);

  useEffect(() => {
    onPositionChange(position, isKeyPressed);
    
    if (!canMove && isKeyPressed) {
      onCaught();
    }
  }, [position, isKeyPressed, canMove, onPositionChange, onCaught]);

  return (
    <div 
      className="player"
      style={{ left: `${position}px` }}
    />
  );
};

export default Player;