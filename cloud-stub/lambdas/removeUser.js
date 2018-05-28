'use strict';
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

const composeResponse = (statusCode, body) => ({
  isBase64Encoded: false,
  headers: {
    'Content-Type': 'application/json'
  },
  body,
  statusCode
});

function deleteUser(username) {
  return new Promise((resolve, reject) => {
    const deleteParams = {
      TableName: 'users',
      Key:{
        username
      }
    };

    docClient.delete(deleteParams, function (err, deleteUserResponse) {
      if (err) {
        reject(err);
      } else {
        resolve(deleteUserResponse);
      }
    });
  });
}

const updateDeedsParams = (deedId) => ({
  TableName: 'deeds',
  Key: {
    id: deedId
  },
  AttributeUpdates: {
    username: {
      Action: 'PUT',
      Value: 'Anonymous'
    }
  }
});

function anonymizeUserDeeds(username) {
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
        const deedsToAnonymize = userDeeds.Items;
        deedsToAnonymize.forEach(deed => {
          docClient.update(updateDeedsParams(deed.id), function (err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      }
    });
  });
}

const deleteEvent = (eventId) => ({
  TableName: 'events',
  Key:{
    id: eventId
  }
});

function deleteUserEvents(username) {
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
        const eventsToDelete = userEvents.Items;
        eventsToDelete.forEach(event => {
          docClient.delete(deleteEvent(event.id), function (err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      }
    });
  });
}

exports.handler = async function (event, ctx, callback) {
  const eventBody = JSON.parse(event.body);
  const { username } = eventBody;

  // Ignoring any other non mandatory field
  if (username) {
    try {
      await deleteUser(username);
      await anonymizeUserDeeds(username, callback);
      await deleteUserEvents(username, callback);
      callback(null, composeResponse(200, "user deleted"));
    } catch (error) {
      callback(null, composeResponse(500, error.message));
    }
  } else {
    callback(null, composeResponse(404, 'Missing parameter username'));
  }
};
