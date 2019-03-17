'use strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

module.exports.hello = async (event, context) => {

  const response = await documentClient.scan({
    TableName: 'serverless-101-test-ToDo'
  }).promise()

  return {
    statusCode: 200,
    body: response
  };
  
};
