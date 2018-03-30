

const socket = io();

socket.on('meta', (meta) => {
  console.log('metadata received: ', meta);
  const address = `http://${meta.ip}:${meta.port}`;
  document.getElementById('takePhotos').textContent = `Take photos at ${address}`;
  document.getElementById('viewPhotos').textContent = `View them at ${address}/wonderwall.html`;
});

socket.on('photo', (photo) => {
  console.log('photo received: ', photo);
  const image = document.createElement('img');
  image.src = photo.src;
  document.getElementById('photos').appendChild(image);
})
