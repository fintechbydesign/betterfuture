const positionsObject = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const getLocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (err) => {
        console.log(`Position error: ${err.code} : ${err.message}`);
        resolve(null);
      },
      positionsObject
    );
  }
);

const noService = () => Promise.resolve(null);

export default navigator.geolocation ? getLocation : noService;