'use strict';
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

const composeResponse = (statusCode, body) => ({
  isBase64Encoded: false,
  headers: {
    'Content-Type': 'application/json'
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

function getUserDeeds(username) {
  return new Promise((resolve, reject) => {
    const queryUserDeeds = {
      TableName: 'deeds',
      IndexName: 'username-index',
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username
      }
    };

    docClient.query(queryUserDeeds, function (err, userDeeds) {
      if (err) {
        reject(err);
      } else {
        resolve(userDeeds.Items);
      }
    });
  });
}

function getUserEvents(username) {
  return new Promise((resolve, reject) => {
    const queryUserEvents = {
      TableName : 'events',
      IndexName: 'username-index',
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username
      }
    };

    docClient.query(queryUserEvents, function (err, userEvents) {
      if (err) {
        reject(err);
      } else {
        resolve(userEvents.Items);
      }
    });
  });
}

// deeditUserProfile?username=xxx
exports.handler = async function (event, ctx, callback) {
  const username = event.queryStringParameters.username;

  if (username) {
    try {
      const user = await getUser(username);
      const deeds = await getUserDeeds(username);
      const events = await getUserEvents(username);

      // merging the response
      const response = { user, deeds, events };
      callback(null, composeResponse(200, JSON.stringify(response)));
    } catch (error) {
      callback(null, composeResponse(500, error.message));
    }
  }
  else {
    callback(null, composeResponse(404, 'No username provided'));
  }
};
