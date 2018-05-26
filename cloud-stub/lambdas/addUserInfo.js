'use strict';
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

const parametersError = {
  isBase64Encoded: false,
  statusCode: 422,
  headers: {
    'Content-Type': 'application/json'
  },
  body: 'Missing username'
};

// deeditAddUserInfo/:username
exports.handler = function (event, ctx, callback) {
  const eventBody = JSON.parse(event.body);
  const username = event.queryStringParameters.username;

  if (username) {
    const AttributeUpdates = {};
    Object.keys(eventBody).forEach(attrib => {
      AttributeUpdates[attrib] = { Action: 'PUT', Value: eventBody[attrib] };
    });

    const updateParams = {
      TableName: 'users',
      Key: {
        username
      },
      AttributeUpdates
    };

    docClient.update(updateParams, function (err, data) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
  else {
    callback(null, parametersError);
  }
};
