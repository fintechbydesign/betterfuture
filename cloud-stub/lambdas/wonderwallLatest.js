'use strict';
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

const HOUR = 3600000;
const composeResponse = (statusCode, body) => ({
  isBase64Encoded: false,
  headers: {
    'Content-Type': 'application/json'
  },
  body,
  statusCode
});

const generateTile = ({username, src, timestamp, type}) => ({username, src, timestamp, type});
const timestampNewToOld = (a, b) => b.timestamp - a.timestamp;

function createWonderwall(completedDeeds, recentNews, recentBadges) {
  const videos = completedDeeds
    .filter(deed => deed.evidenceType === 'video')
    .map(deed => generateTile({ ...deed, timestamp: deed.completedTimestamp, type: 'video' }));

  const photos = completedDeeds
    .filter(deed => deed.evidenceType === 'photo')
    .map(deed => generateTile({ ...deed, timestamp: deed.completedTimestamp, type: 'photo' }));

  const news = recentNews
    .map(event => generateTile({ ...event, timestamp: event.eventTimestamp, type: 'news' }));

  const badges = recentBadges
    .map(event => generateTile({ ...event, timestamp: event.eventTimestamp, type: 'badge' }));

  const results = [ ...videos, ...photos, ...news, ...badges].sort(timestampNewToOld);
  return results;
}

// deeditWonderwallLatest
exports.handler = function (event, ctx, callback) {
  const oldestTimestamp = `${Date.now() - (HOUR * 24)}`;
  const queryCompletedDeeds = {
    TableName : 'deeds',
    IndexName: 'deedStatus-index',
    KeyConditionExpression: 'deedStatus = :deedStatus',
    ExpressionAttributeValues: {
      ':deedStatus': 'completed'
    }
  };
  const queryRecentNews = {
    TableName : 'events',
    IndexName: 'eventType-eventTimestamp-index',
    KeyConditionExpression: 'eventType = :eventType AND eventTimestamp > :oldestTS',
    ExpressionAttributeValues: {
      ':eventType': 'news',
      ':oldestTS': oldestTimestamp
    }
  };

  docClient.query(queryCompletedDeeds, function (err, completedDeedsResponse) {
    if (err) {
      callback(err, null);
    } else {
      docClient.query(queryRecentNews, function (err, recentNewsResponse) {
        if (err) {
          callback(err, null);
        } else {
          // Merge the result
          const completedDeeds = completedDeedsResponse.Items;
          const recentNews = recentNewsResponse.Items;
          const wonderwall = createWonderwall(completedDeeds, recentNews, []);

          callback(null, composeResponse(200, JSON.stringify(wonderwall)));
        }
      });
    }
  });
};
