import {useState, useEffect} from 'react';

interface LightProps {
    isGreen:boolean;
}

const Light : React.FC<LightProps> = ({isGreen}) => {
    return (
        <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: isGreen ? 'green' : 'red',
          margin: '20px auto',
        }}
      />
    );
  };

  export default Light;
