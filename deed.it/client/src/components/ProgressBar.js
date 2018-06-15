import React from 'react';
import { Line } from 'rc-progress';
import './ProgressBar.css';

function ProgressBar (props) {
  const { className, color, percent, text } = props;
  const divClassName = (className) ? `ProgressBar-container ${className}` : 'ProgressBar-container';
  const strokeColor = (color) ? color : '#002E4A';
  return (
    <div className={divClassName} >
      <Line percent={percent} strokeColor={strokeColor} />
    </div>
  );
}

export default ProgressBar;
