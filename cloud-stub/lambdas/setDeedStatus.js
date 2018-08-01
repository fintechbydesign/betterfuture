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

function getDeedById(id) {
  return new Promise((resolve, reject) => {
    const queryDeed = {
      TableName : 'deeds',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      }
    };

    docClient.query(queryDeed, function (err, deed) {
      if (err) {
        reject(err);
      } else {
        resolve(deed.Items[0]);
      }
    });
  });
}

async function isUserPreApproved(deedId) {
  try {
    const deed = await getDeedById(deedId);
    console.log('DEED', deed);
    return deed.nickname === '6catsofMercury';
  } catch (error) {
    console.log('ERROR CATCH', error);
    return false;
  }
}

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
        Value: `${Date.now()}`
      },
      isCompleted: {
        Action: 'PUT',
        Value: (deedStatus === 'completed') ? 1 : 0
      }
    };

    const preApprove = isUserPreApproved(deedId) && deedStatus === 'unapproved';
    if (preApprove) {
      AttributeUpdates.completedTimestamp = { Action: 'PUT', Value: `${Date.now()}` };
      AttributeUpdates.deedStatus.Value = 'completed';
      AttributeUpdates.isCompleted.Value = 1;
    }

    Object.keys(extraAttribs).forEach(attrib => {
      if (eventBody[attrib] !== "") {
        AttributeUpdates[attrib] = { Action: 'PUT', Value: eventBody[attrib] };
      }
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

