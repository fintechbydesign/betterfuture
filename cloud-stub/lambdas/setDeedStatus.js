'use strict';
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

const parametersError = {
  isBase64Encoded: false,
  statusCode: 422,
  headers: {
    'Content-Type': 'application/json'
  },
  body: 'Missing deedId or deedStatus'
};

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

