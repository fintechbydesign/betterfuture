'use strict';
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

const parametersError = {
  isBase64Encoded: false,
  statusCode: 422,
  headers: {
    'Content-Type': 'application/json'
  },
  body: 'Missing deedId or status'
};

// setDeedStatus
exports.handler = function (event, ctx, callback) {
  const eventBody = JSON.parse(event.body);
  const { deedId, status } = eventBody;

  if (deedId && status) {
    const AttributeUpdates = {
      status: {
        Action: 'PUT',
        Value: status
      },
      [`${status}Timestamp`]: {
        Action: 'PUT',
        Value: Date.now()
      }
    };

    const updateParams = {
      TableName: 'deeds',
      Key: {
        id: deedId
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

