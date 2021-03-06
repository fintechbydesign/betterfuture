'use strict';
const AWS = require("aws-sdk");
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
  const { id, deedId, username, nickname, eventType, src } = eventBody;

  // Ignoring any other non mandatory field
  if (id && deedId && username && nickname && eventType && src) {
    const putParams = {
      Item: {
        id,
        deedId,
        username,
        nickname,
        eventType,
        src,
        eventTimestamp: `${Date.now()}`
      },
      TableName: 'events'
    };

    docClient.put(putParams, function (error, data) {
      if (error) {
        callback(null, composeResponse(500, error.message));
      } else {
        callback(null, composeResponse(200, JSON.stringify(data)));
      }
    });
  } else {
    callback(null, composeResponse(422, 'Missing id, deedId, username, nickname, eventType or src'));
  }
};
