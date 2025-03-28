import {useState, useEffect} from 'react';
import '../styles.css'

interface LightProps {
    isGreen:boolean;
    isBlink:boolean;
}

const Light : React.FC<LightProps> = ({isGreen, isBlink}) => {

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isBlink) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isBlink]);

    return (
      <div className={`light ${isGreen ? 'green' : 'red'} ${isAnimating ? 'blink' : ''}`}>
      <span className="light-text">
        {isGreen ? 'Можно двигаться' : 'СТОП!'}
      </span>
      <div className="light-icon">
        {isGreen ? '🚦' : '✋'}
      </div>
    </div>
    );
  };

  export default Light;
