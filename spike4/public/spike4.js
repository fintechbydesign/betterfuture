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

const createIdMessage = () => getId() ? `(Existing ID is ${getId()})` : `(New ID is ${createId()})`;
document.getElementById('idMsg').textContent = createIdMessage();


/* TAKING A PHOTO */

// with thanks to https://www.html5rocks.com/en/tutorials/getusermedia/intro/

const enablePhoto = () => {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const photo = document.getElementById('photo');
  const send = document.getElementById('send');
  const remove = document.getElementById('remove');

  const show = (...elements) => {
    for (element of elements) {
      element.classList.remove('hide');
    }
  };

  const hide = (...elements) => {
    for (element of elements) {
      element.classList.add('hide');
    }
  };

  const takePhoto = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/png');
    photo.src = dataURL;
    return dataURL;
  };

  const showVideo = () => {
    hide(photo, send, remove);
    send.onclick = undefined;
    show(video);
  }

  const showPhoto = () => {
    const dataURL = takePhoto();
    hide(video);
    show(photo, send, remove);
    send.onclick = () => {
      sendPhoto(dataURL);
      showVideo();
    };
  };

  video.onclick = showPhoto;
  remove.onclick = showVideo;

  const constraints = { video: true };
  const handleSuccess = (stream) => video.srcObject = stream;
  const handleError = (error) => console.error(error);
  navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
}

enablePhoto();



/* SEND DATA */

const sendPhoto = (dataURL) => {
  const url = '/photo';
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
