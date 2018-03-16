const socket = io();

socket.on('meta', (meta) => {
  console.log('metadata received: ', meta);
  const span = "<span style='color: darkgrey'>";
  const address = `http${span}s</span>://${meta.ip}:${meta.port}${span}1</span>`;
  document.getElementById('takePhotos').innerHTML = `Take photos at ${address}`;
  document.getElementById('viewPhotos').innerHTML = `View them at ${address}/wonderwall.html`;
});

socket.on('photo', (photo) => {
  console.log('photo received: ', photo);
  const image = document.createElement('img');
  image.src = photo.src;
  document.getElementById('photos').appendChild(image);
})
