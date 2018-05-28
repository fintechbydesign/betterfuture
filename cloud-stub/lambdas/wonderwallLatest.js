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

function createWonderwall(recentDeeds, deedStatus, recentNews, recentBadges) {
  const videos = recentDeeds.filter(deed => deed.evidenceType === 'video')
    .map(deed => generateTile({ ...deed, timestamp: deed[`${deedStatus}Timestamp`], type: 'video' }));

  const photos = recentDeeds.filter(deed => deed.evidenceType === 'photo')
    .map(deed => generateTile({ ...deed, timestamp: deed[`${deedStatus}Timestamp`], type: 'photo' }));

  const news = recentNews
    .map(event => generateTile({ ...event, timestamp: event.eventTimestamp, type: 'news' }));

  const badges = recentBadges
    .map(event => generateTile({ ...event, timestamp: event.eventTimestamp, type: 'badge' }));

  return [ ...videos, ...photos, ...news, ...badges].sort(timestampNewToOld);
}

function getRecentDeeds(deedStatus, oldestTimestamp) {
  return new Promise((resolve, reject) => {
    const queryRecentCompletedDeeds = {
      TableName : 'deeds',
      IndexName: `deedStatus-${deedStatus}Timestamp-index`,
      KeyConditionExpression: `deedStatus = :deedStatus AND ${deedStatus}Timestamp > :oldestTS`,
      ExpressionAttributeValues: {
        ':deedStatus': deedStatus,
        ':oldestTS': oldestTimestamp
      }
    };

    docClient.query(queryRecentCompletedDeeds, function (err, recentCompletedDeeds) {
      if (err) {
        reject(err);
      } else {
        resolve(recentCompletedDeeds.Items);
      }
    });
  });
}


function getRecentEvents(eventType, oldestTimestamp) {
  return new Promise((resolve, reject) => {
    const queryRecentNews = {
      TableName : 'events',
      IndexName: 'eventType-eventTimestamp-index',
      KeyConditionExpression: 'eventType = :eventType AND eventTimestamp > :oldestTS',
      ExpressionAttributeValues: {
        ':eventType': eventType,
        ':oldestTS': oldestTimestamp
      }
    };

    docClient.query(queryRecentNews, function (err, recentEvents) {
      if (err) {
        reject(err);
      } else {
        resolve(recentEvents.Items);
      }
    });
  });
}

// deeditWonderwallLatest?oldestTimestamp=12341234123?deedStatus=pending
exports.handler = async function (event, ctx, callback) {
  let oldestTimestamp = `${Date.now() - (HOUR * 24)}`;
  let deedStatus = 'completed';

  if (event.queryStringParameters) {
    if (event.queryStringParameters.oldestTimestamp) {
      oldestTimestamp = event.queryStringParameters.oldestTimestamp;
    }
    if (event.queryStringParameters.deedStatus) {
      deedStatus = event.queryStringParameters.deedStatus;
    }
  }

  try {
    const deeds = await getRecentDeeds(deedStatus, oldestTimestamp);
    const recentNews = await getRecentEvents('news', oldestTimestamp);
    const recentBadges = await getRecentEvents('badge', oldestTimestamp);
    const wonderwall = createWonderwall(deeds, deedStatus, recentNews, recentBadges);

    callback(null, composeResponse(200, JSON.stringify(wonderwall)));
  } catch (error) {
    callback(null, composeResponse(500, error.message));
  }
};
