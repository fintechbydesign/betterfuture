'use strict';
const AWS = require("aws-sdk");
const uuid = require('uuid');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

const composeResponse = (statusCode, body) => ({
  isBase64Encoded: false,
  headers: {
    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
  },
  body,
  statusCode
});

exports.handler = function (event, ctx, callback) {
  const eventBody = JSON.parse(event.body);
  const { error, info, userAgent } = eventBody;

  if (error && info && userAgent) {
    const putParams = {
      Item: {
        id: uuid.v4(),
        userAgent,
        error,
        info,
        eventTimestamp: `${Date.now()}`
      },
      TableName: 'errors'
    };

    docClient.put(putParams, function (error, data) {
      if (error) {
        callback(null, composeResponse(500, error.message));
      } else {
        callback(null, composeResponse(200, JSON.stringify(data)));
      }
    });
  } else {
    callback(null, composeResponse(422, 'Missing error or info'));
  }
};
