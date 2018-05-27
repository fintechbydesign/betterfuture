const apiVersion = '2006-03-01';
const region = 'eu-west-1';
const IdentityPoolId = 'eu-west-1:38d36f69-6926-4e31-9d57-b56861af58b6';
const Bucket = 'deedit-evidence-upload';

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

const uploadImage = (deed, image) => new Promise((resolve, reject) => {
  const fileName = `${deed.id}.png`;
  const params = {
    ACL: 'public-read',
    Body: image,
    Key: fileName
  };
  loadS3().then(S3 => {
    const upload = S3.upload(params, (err, data) => {
      err ? reject(err) : resolve();
    });
    upload.on('httpUploadProgress', (progress) => {
      const { loaded, total } = progress;
      const msg = total ? `Uploaded ${loaded} of ${total} bytes` : `Uploaded ${loaded} bytes`;
      console.log(msg);
    })
  })
});

const prepareUpload = async(deed, image) => {
  const fileName = `${deed.id}.png`;
  const params = {
    ACL: 'public-read',
    Body: image,
    Key: fileName
  };
  const S3 = await loadS3();
  return S3.upload(params);
}

export {
  loadS3,
  prepareUpload,
  uploadImage
};

