import React from 'react';

function Photo(props) {
  return (<img src={props.src} alt='deed evidence' onClick={props.onClick}/>);
}

export default Photo;