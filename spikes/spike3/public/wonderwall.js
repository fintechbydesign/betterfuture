const socket = io();

socket.on('photo', (photo) => {
  console.log('photo received: ', photo);
  const image = document.createElement('img');
  image.src = photo.src;
  document.getElementById('photos').appendChild(image);
})
