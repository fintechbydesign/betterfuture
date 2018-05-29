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
  const { username, nickname, country, age } = eventBody;

  // Ignoring any other non mandatory field
  if (username && nickname && country && age) {
    const putParams = {
      Item: {
        username,
        nickname,
        country,
        age,
        creationTimestamp: `${Date.now()}`
      },
      TableName: 'users'
    };

    docClient.put(putParams, function (error, data) {
      if (error) {
        callback(null, composeResponse(500, error.message));
      } else {
        callback(null, composeResponse(200, JSON.stringify(data)));
      }
    });
  } else {
    callback(null, composeResponse(422, 'Missing username, nickname, country or age'));
  }
};
