import React, { useEffect } from 'react';
import '../styles.css';

type LightState = 'green' | 'red' | 'blinking';

interface LightProps {
  state: LightState;
}

const Light: React.FC<LightProps> = ({ state }) => {
  const getLightContent = () => {
    switch(state) {
      case 'green': 
        return { text: 'Можно двигаться', icon: '🚦', className: 'green' };
      case 'red':
        return { text: 'СТОП!', icon: '✋', className: 'red' };
      case 'blinking':
        return { text: 'Внимание!', icon: '⚠️', className: 'blinking' };
    }
  };

  const { text, icon, className } = getLightContent();

  return (
    <div className={`light ${className}`}>
      <span className="light-text">{text}</span>
      <div className="light-icon">{icon}</div>
    </div>
  );
};

export default Light;