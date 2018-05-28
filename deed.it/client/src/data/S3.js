const apiVersion = '2006-03-01';
const region = 'eu-west-1';
const IdentityPoolId = 'eu-west-1:38d36f69-6926-4e31-9d57-b56861af58b6';
const Bucket = 'deedit-evidence-upload';

let loadedS3;

const loadS3 = () => import (/* webpackChunkName: "aws" */ 'aws-sdk').then(AWS => {
  AWS.config.update({
    region,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId
    })
  });
  return new AWS.S3({
    apiVersion,
    params: { Bucket }
  });
});

const initS3 = async() => {
  if (!loadedS3) {
    loadedS3 = await loadS3();
  }
  return loadedS3;
}

// with thanks to https://stackoverflow.com/questions/13198131/how-to-save-an-html5-canvas-as-an-image-on-a-server
const b64ToUint8Array = async(image) => {
  const img = atob(image.split(',')[1]);
  const imgBuffer = [];
  for (let i=0 ; i < img.length; i++) {
    imgBuffer.push(img.charCodeAt(i));
  }
  return new Uint8Array(imgBuffer);
}

const prepareUpload = async(deed, image) => {
  const [S3, Body] = await Promise.all([initS3(), b64ToUint8Array(image)]);
  const params = {
    ACL: 'public-read',
    Body,
    Key: `${deed.id}.png`
  };
  return S3.upload(params);
}

export {
  initS3,
  prepareUpload
};

