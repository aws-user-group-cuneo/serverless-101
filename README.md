# AWS User Group - Cuneo

## Serverless 101

Simple Serverless example project to show Lambda/API Gateway/DynamoDB in action.

### Requirements

- [Node.js](https://nodejs.org/en/download/package-manager/) => 8.10.0
- [NPM](https://www.npmjs.com/) => 6.1.0
- [AWS CLI](https://docs.aws.amazon.com/en_us/cli/latest/userguide/cli-chap-install.html)
- [GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Getting Start

### 1 - Clone this repository

```bash
git clone git@<repository name>
```

### 2 - Install NPM dependencies

```bash
npm install
```

### 3 - Configure AWS CLI access

```bash
aws configure
```

Additional you can create a specific profile for this project:

```bash
aws configure --profile awsug-serverless-101
```

### 4 - Configure project

You need to change the frontend bucket name to not collide with other users. Do this change into `serverless.yml` file:

```
custom:
  frontend: 
    bucket: ${self:service}-${self:provider.stage}-<my name or something random> #change this with a different name
    dir: './frontend'
    cacheControl: '0'
    deploy: sync
```

### 5 - Deploy backend services

```bash
npm run deploy
```

### 6 - Configure frontend

Change the API endpoint inside `frontend/index.html` inside script tag;
```javascript
var ENDPOINT = 'https://xxxxxxx.execute-api.eu-west-1.amazonaws.com/test'; // Change this with your endpoint
```

### 7 - Deploy frontend static website

```bash
npm run deploy:frontend
```

### End

If you correctly complete all steps you'll see the static website on: http://your-bucket-name.s3-website-eu-west-1.amazonaws.com 
