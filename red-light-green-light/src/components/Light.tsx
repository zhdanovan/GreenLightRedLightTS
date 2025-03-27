import {useState, useEffect} from 'react';
import '../styles.css'

interface LightProps {
    isGreen:boolean;
    isBlink:boolean;
}

const Light : React.FC<LightProps> = ({isGreen, isBlink}) => {
    return (
        <div
        className={`light ${isGreen ? 'green' : 'red'} ${isBlink ? 'blink' : ''}`}
      />
    );
  };

  export default Light;
