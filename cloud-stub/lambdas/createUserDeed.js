'use strict';
const AWS = require("aws-sdk");
const uuid = require('uuid');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

const parametersError = {
  isBase64Encoded: false,
  statusCode: 422,
  headers: {
    'Content-Type': 'application/json'
  },
  body: 'Missing username or deedTypeId'
};

//deeditCreateUserDeed
exports.handler = function (event, ctx, callback) {
  const eventBody = JSON.parse(event.body);
  const { username, deedTypeId } = eventBody;

  // Ignoring any other non mandatory field
  if (username && deedTypeId) {
    const putParams = {
      Item: {
        id: uuid.v4(),
        deedTypeId,
        username,
        status: 'created',
        createdTimestamp: Date.now()
      },
      TableName: 'deeds'
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
