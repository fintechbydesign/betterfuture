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

// deeditDeedHierarchy
exports.handler = function (event, ctx, callback) {

  const querySuperdeeds = {
    TableName: 'superdeed'
  };
  const queryDeedTypes = {
    TableName: "deedType",
  };

  docClient.scan(querySuperdeeds, function (err, superdeedsResponse) {
    if (err) {
      callback(err, null);
    } else {
      // Got the superdeeds, now getting deed types
      docClient.scan(queryDeedTypes, function (err, deedTypesResponse) {
        if (err) {
          callback(err, null);
        } else {
          // Merge the data, assign every deedType to its superdeed
          const superDeeds = superdeedsResponse.Items;
          const deedTypes = deedTypesResponse.Items;

          superDeeds.forEach(sd => sd.deedTypes = []);
          deedTypes.forEach(deedType => {
            const superDeedIndex = superDeeds.findIndex(sd => sd.id === deedType.superDeedId);
            if (superDeedIndex > -1) {
              superDeeds[superDeedIndex].deedTypes.push(deedType);
            }
          });

          callback(null, composeResponse(200, JSON.stringify(superDeeds)));
        }
      });
    }
  });
};
