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

// deeditUserProfile?username=xxx
exports.handler = function (event, ctx, callback) {
  const username = event.queryStringParameters.username;

  if (username) {
    const queryUser = {
      TableName: 'users',
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username
      }
    };
    const queryUserDeeds = {
      TableName : 'deeds',
      IndexName: 'username-index',
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username
      }
    };
    const queryUserEvents = {
      TableName : 'event',
      IndexName: 'username-index',
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username
      }
    };

    docClient.query(queryUser, function(err, userResponse){
      if (err) {
        callback(err, null);
      } else if (userResponse.Count !== 1) {
        callback(null, composeResponse(404, 'No unique data found for username'));
      } else {
        // Got the user, now getting its deeds
        docClient.query(queryUserDeeds, function(err, deedsResponse){
          if (err) {
            callback(err, null);
          } else {
            // now getting its events
            docClient.query(queryUserEvents, function(err, eventsResponse){
              if (err) {
                callback(err, null);
              } else {
                // merging the response
                const response = {
                  user: userResponse.Items[0],
                  deeds: deedsResponse.Items,
                  events: eventsResponse.Items
                };
                callback(null, composeResponse(200, JSON.stringify(response)));
              }
            });
          }
        });
      }
    });
  }
  else {
    callback(null, composeResponse(404, 'No username provided'));
  }
};
