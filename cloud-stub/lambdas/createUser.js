'use strict';
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

const parametersError = {
  isBase64Encoded: false,
  statusCode: 422,
  headers: {
    'Content-Type': 'application/json'
  },
  body: 'Missing username, country or ageRange'
};

exports.handler = function (event, ctx, callback) {
  const eventBody = JSON.parse(event.body);
  const { username, country, ageRange } = eventBody;

  // Ignoring any other non mandatory field
  if (username && country && ageRange) {
    const putParams = {
      Item: {
        username,
        country,
        ageRange,
        creationTimestamp: Date.now()
      },
      TableName: 'users'
    };

    docClient.put(putParams, function (err, data) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  } else {
    callback(null, parametersError);
  }
};
