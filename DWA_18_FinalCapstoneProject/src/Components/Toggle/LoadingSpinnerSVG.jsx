/* eslint-disable no-unused-vars */
import React from 'react';

export default function LoadingSpinnerSVG() {
  return (
    <div style={{ display: 'inline-block', position: 'relative', width: '80px', height: '80px' }}>
      <div style={{
        position: 'absolute',
        border: '4px solid #fff',
        opacity: '1',
        borderRadius: '50%',
        animation: 'lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite',
      }}></div>
      <div style={{
        position: 'absolute',
        border: '4px solid #fff',
        opacity: '1',
        borderRadius: '50%',
        animation: 'lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        animationDelay: '-0.5s',
      }}></div>
    </div>
  );
}
