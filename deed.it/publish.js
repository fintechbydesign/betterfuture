const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const REGION = 'eu-west-1';
const IDENTITY_POOL_ID = 'eu-west-1:38d36f69-6926-4e31-9d57-b56861af58b6';

function publish (srcFolder, targetBucket){

// getting an STS token
  AWS.config.update({
    region: REGION,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IDENTITY_POOL_ID
    })
  });
// getting an S3 client with the STS token
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: targetBucket}
  });

  const knownContentTypes = {
    'html': 'text/html',
    'json': 'application/json',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'ico': 'image/x-icon',
    'map': 'text/plain',
    'css': 'text/css',
    'js': 'application/javascript',
    'svg': 'image/svg+xml'
  };

  function uploadFileToS3(file) {
    fs.readFile(file, function (err, data) {
      if (err) {
        throw err;
      }

      // const base64data = new Buffer(data, 'binary');
      const s3FileName = file.replace(srcFolder + '/', '');
      const fileExtension = s3FileName.split('.').pop();
      const ContentType = knownContentTypes[fileExtension] || 'text/plain';

      console.log('s3FileName', s3FileName);
      s3.putObject({
        Bucket: targetBucket,
        Key: s3FileName,
        Body: data,
        ACL: 'public-read',
        ContentType
      }, function (resp) {
        console.log(arguments);
        console.log('Successfully uploaded, ', file);
      })
    });
  }

  const walkSync = (dir, fileList = []) => {
    fs.readdirSync(dir).forEach(file => {

      fileList = fs.statSync(path.join(dir, file)).isDirectory()
        ? walkSync(path.join(dir, file), fileList)
        : fileList.concat(path.join(dir, file));

    });
    return fileList;
  };

// read all the files in PUBLISH_FOLDER recursively
  const fileList = walkSync(srcFolder);

// upload the files to S3
  const numFiles = fileList.length;
  if (numFiles > 0) {
    for (let i = 0; i < numFiles; i++) {
      uploadFileToS3(fileList[i]);
    }
  }
}

////////////////////////////////////////////////////////////////
// EXECUTION STARTS HERE
////////////////////////////////////////////////////////////////

const args = process.argv;
if (args.length != 4) {
  console.error('Invalid args; expect src folder and bucket name')
} else {
  console.log(`Publishing from source folder: ${args[2]} to bucket ${args[3]}`);
  publish(args[2], args[3]);
}
