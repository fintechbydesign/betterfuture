var REGION ='eu-west-1';
var IDENTITY_POOL_ID = 'eu-west-1:38d36f69-6926-4e31-9d57-b56861af58b6';
var BUCKET = 'deedit-evidence-upload';

function uploadImageToS3(file) {
  // getting an STS token
  AWS.config.update({
    region: REGION,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IDENTITY_POOL_ID
    })
  });
  // getting an S3 client with the STS token
  var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: BUCKET }
  });

  var uploadParams = {
    Key: file.name,
    Body: file,
    ACL: 'public-read'
  };
  s3.upload(uploadParams, function(err, data) {
    if (err) {
      return alert('There was an error uploading the image: ', err.message);
    }
    alert('Successfully uploaded image.');
  });
}

//Loads selected image for using with the API
function processImage(elementId) {
  var control = document.getElementById(elementId);
  var file = control.files[0];
  uploadImageToS3(file);
}
