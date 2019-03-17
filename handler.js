'use strict';

const TABLE_NAME = process.env.TABLE_TODO;

const AWS = require('aws-sdk');
AWS.config.logger = console;
const documentClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

/**
 * Get all todos
 */
module.exports.get = async (event, context) => {

  console.log(JSON.stringify(event));

  const response = await documentClient.scan({
    TableName: TABLE_NAME
  }).promise()

  return response.Items || [];
};

/**
 * Create new todo
 */
module.exports.put = async (event, context) => {

  console.log(JSON.stringify(event));

  const newTodo = event.body;

  if (newTodo.title === undefined || newTodo.title.trim() === '') {
    throw 'Property title is required';
  }
  newTodo.id = (new Date().getTime());

  await documentClient.put({
    TableName: TABLE_NAME,
    Item: newTodo
  }).promise()

}

/**
 * Update todo
 */
module.exports.update = async (event, context) => {

  console.log(JSON.stringify(event));

  const todoId = parseInt(event.path.id);

  const response = await documentClient.get({
    TableName: TABLE_NAME,
    Key: {
      id: todoId
    }
  }).promise()

  if (response.Item === undefined) {
    throw 'Todo not found';
  }

  const todo = event.body;
  todo.id = todoId; // prevent new object creation

  await documentClient.put({
    TableName: TABLE_NAME,
    Item: todo
  }).promise()

}

/**
 * Delete todo
 */
module.exports.delete = async (event, context) => {

  console.log(JSON.stringify(event));

  const todoId = parseInt(event.path.id);

  const response = await documentClient.get({
    TableName: TABLE_NAME,
    Key: {
      id: todoId
    }
  }).promise()

  if (response.Item === undefined) {
    throw 'Todo not found';
  }
  await documentClient.delete({
    TableName: TABLE_NAME,
    Key: {
      id: todoId
    }
  }).promise()

}
