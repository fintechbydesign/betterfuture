'use strict';
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

const composeResponse = (statusCode, body) => ({
  isBase64Encoded: false,
  headers: {
    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
  },
  body,
  statusCode
});

// setDeedStatus
exports.handler = function (event, ctx, callback) {
  const eventBody = JSON.parse(event.body);
  const { deedId, deedStatus, ...extraAttribs } = eventBody;

  if (deedId && deedStatus) {
    // The basic attributes update is are status
    const AttributeUpdates = {
      deedStatus: {
        Action: 'PUT',
        Value: deedStatus
      },
      [`${deedStatus}Timestamp`]: {
        Action: 'PUT',
        Value: Date.now()
      }
    };
    Object.keys(extraAttribs).forEach(attrib => {
      AttributeUpdates[attrib] = { Action: 'PUT', Value: eventBody[attrib] };
    });

    const updateParams = {
      TableName: 'deeds',
      Key: {
        id: deedId
      },
      AttributeUpdates
    };

    docClient.update(updateParams, function (error, data) {
      if (error) {
        callback(null, composeResponse(500, error.message));
      } else {
        callback(null, composeResponse(200, JSON.stringify(data)));
      }
    });
  } else {
    callback(null, composeResponse(422, 'Missing deedId or deedStatus'));
  }
};

