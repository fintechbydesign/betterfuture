import React from 'react';
import './Popup.css';

// const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//
// const format00 = (value) => ("0" + value).substr(-2);
//
// function timestampToString(timestamp){
//   const date = new Date(Number(timestamp));
//   const year = date.getFullYear();
//   const month = months[date.getMonth()];
//   const day = format00(date.getDate());
//   const hours = format00(date.getHours());
//   const minutes = format00(date.getMinutes());
//   const seconds = format00(date.getSeconds());
//
//   return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
// }
//
// function getTimeLabel(label, time) {
//   if (time === 0) {
//     return null;
//   }
//   return (
//     <div className='Popup_information'>
//       <div className='Popup_time-label'>{label}</div>
//       <div className='Popup_time-value'>{timestampToString(time)}</div>
//     </div>);
// }

function Popup (props) {
  const { content = null, menuVisible, setPopupContent } = props;

  if (menuVisible || content === null) {
    return null;
  }

  // The tile is passed through the images or videos (tech debt but...)
  const { tile = {} } = content.props;
  const { deedTypeId = '', nickname = '' } = tile;
  const closePopup = setPopupContent.bind(null, null);
  return (
    <div className='Popup' onClick={closePopup}>
      <div className='Popup_deed-type'>{deedTypeId}</div>
      {content}
      {/*<div className='Popup_time-labels'>*/}
        {/*{getTimeLabel('Started on:', createdTimestamp)}*/}
        {/*{getTimeLabel('Completed on:', completedTimestamp)}*/}
      {/*</div>*/}
      <div className='Popup_nickname'>{nickname}</div>
    </div>
  );
}

export default Popup;
