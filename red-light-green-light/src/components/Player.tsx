import React, {useState, useEffect} from 'react';

interface PlayerProps {
    isMove:boolean;
    isCaught:()=>void;
}

const Player: React.FC<PlayerProps> = ({ isMove, isCaught }) => {
    const [position, setPosition] = useState(0);
  
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (isMove && event.key === 'ArrowRight') {
          setPosition((prev) => prev + 10); 
        }
      };

      window.addEventListener('keydown', handleKeyDown);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [isMove]);

    useEffect(() => {
      if (!isMove && position > 0) {
        isCaught();
      }
    }, [isMove, position, isCaught]);
  
    return (
      <div
        style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'blue',
          position: 'absolute',
          bottom: '0',
          left: `${position}px`,
        }}
      />
    );
  };
  
  export default Player;