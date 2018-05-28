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

function getUser(username) {
  return new Promise((resolve, reject) => {
    const queryUser = {
      TableName: 'users',
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username
      }
    };

    docClient.query(queryUser, function(err, userResponse){
      if (err) {
        reject(err);
      } else {
        resolve(userResponse.Items[0]);
      }
    });
  });
}

function createUserDeed(user, deedTypeId) {
  return new Promise((resolve, reject) => {
    const { username, nickname } = user;
    const putParams = {
      Item: {
        id: uuid.v4(),
        deedTypeId,
        username,
        nickname,
        deedStatus: 'created',
        createdTimestamp: Date.now()
      },
      TableName: 'deeds'
    };

    docClient.put(putParams, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(putParams.Item);
      }
    });
  });
}

//deeditCreateUserDeed
exports.handler = async function (event, ctx, callback) {
  const eventBody = JSON.parse(event.body);
  const { username, deedTypeId } = eventBody;

  // Ignoring any other non mandatory field
  if (username && deedTypeId) {
    try {
      const user = await getUser(username);
      const deed = await createUserDeed(user, deedTypeId);

      callback(null, composeResponse(200, JSON.stringify(deed)));
    } catch (error) {
      callback(null, composeResponse(500, error.message));
    }
  } else {
    callback(null, composeResponse(422, 'Missing username or deedTypeId'));
  }
};
