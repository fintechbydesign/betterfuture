'use strict';
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

const parametersError = {
  isBase64Encoded: false,
  statusCode: 422,
  headers: {
    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
  },
  body: 'Missing id, username, nickname, eventType or src'
};

exports.handler = function (event, ctx, callback) {
  const eventBody = JSON.parse(event.body);
  const { id, username, nickname, eventType, src } = eventBody;

  // Ignoring any other non mandatory field
  if (id && username && nickname && eventType && src) {
    const putParams = {
      Item: {
        id,
        username,
        nickname,
        eventType,
        src,
        eventTimestamp: `${Date.now()}`
      },
      TableName: 'events'
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
