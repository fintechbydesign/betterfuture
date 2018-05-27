const S3 = require('aws-sdk/clients/s3');

const defaultParams = {};
const options = {};

const s3 = new S3({
  apiVersion: '2006-03-01',
  region: 'eu-west-1'
});

const uploadImage = (deed, image) => new Promise((resolve, reject) => {
  const fileName = `${deed.id}.png`;
  const params = {
    ...defaultParams,
    Body: image,
    Key: fileName
  };
  const upload = s3.upload(params, options, (err, data) => {
    err ? reject(err) : resolve();
  });
  upload.on('httpUploadProgress', (progress) => {
    const { loaded, total } = progress;
    const msg = total ? `Uploaded ${loaded} of ${total} bytes` : `Uploaded ${loaded} bytes`;
    console.log(msg);
  })
});

export {
  uploadImage
}

