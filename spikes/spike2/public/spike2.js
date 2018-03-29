/* GENERATING ID's ON DEVICE */

// thanks to https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#2117523
const uuidv4 = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(
  /[018]/g, 
  c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
);

const getId = () => localStorage.bfId;

const createId = () => {
  const bfId = uuidv4();
  localStorage.bfId = bfId;
  return bfId;
};

const createIdMessage = () => getId() ? `Existing ID is ${getId()}` : `New ID is ${createId()}`;

document.getElementById('idMsg').textContent = createIdMessage();


/* GETTING LOCATION FROM DEVICE */

const displayLocation = (position) => {
  const positionElement = document.getElementById('positionMsg');
  if (!position) {
    positionElement.textContent = 'No location available from your device';
  } else {
    const { latitude, longitude } = position.coords;
    positionElement.textContent = `Position is latitude ${latitude}, longitude ${longitude}`;
    const img = new Image();
    img.src = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=300x300&sensor=false`;
    positionElement.appendChild(img);
  }
};

navigator.geolocation.getCurrentPosition(displayLocation);


/* TAKING A PHOTO */

// with thanks to https://www.html5rocks.com/en/tutorials/getusermedia/intro/

const enablePhoto = () => {
  const button = document.getElementById('takePhoto');
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const photo = document.getElementById('photo');
  
  button.onclick = () => {
    canvas.width = video.videoWidth/2;
    canvas.height = video.videoHeight/2;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/png');
    photo.src = dataURL;
    sendPhoto(dataURL);
  }

  const constraints = { video: true };
  const handleSuccess = (stream) => video.srcObject = stream;
  const handleError = (error) => console.error(error);

  navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
}

enablePhoto();



/* SEND DATA */

const sendPhoto = (dataURL) => {
  const url = 'http://localhost:1971/photo';
  const report = (msg) => document.getElementById('sendResult').textContent = msg;
  const data = {
    id: getId(),
    src: dataURL
  }
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  };
  fetch(url, options)
    .then(() => report('Photo sent successfully,'))
    .catch((error) => report(`Photo failed to send: ${error}`));

}
