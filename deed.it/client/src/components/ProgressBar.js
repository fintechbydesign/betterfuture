import React from 'react';
import { Line } from 'rc-progress';
import Text from './Text'
import './ProgressBar.css';
import location from "../data/location";

function ProgressBar (props) {
  const { className, color, percent, text } = props;
  const containerProps = {
    className: (className) ? `ProgressBar-container ${className}` : 'ProgressBar-container',
    style: { color }
  };
  const lineProps = {
    percent,
    strokeColor: (color) ? color : '#002E4A'
  };
  return (
    <div {...containerProps} >
      <Line {...lineProps} />
      {text}
    </div>
  );
}

export default ProgressBar;
