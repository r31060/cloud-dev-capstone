# Serverless Chore List for Kids

This is a simple chore list application using AWS Lambda and Serverless framework.

# Functionality of the application

This app will allow creating/removing/updating/fetching chores. Each chore can optionally have an attachment image to help the child doing the chore. Each user only has access to items that he/she has created.

# Chores

The app stores chores with the following fields:

* `itemId` (string) - a unique id for an item
* `createdAt` (string) - date and time when an item was created
* `name` (string) - name of an item (e.g. "A bag of bread")
* `dueDate` (string) - date and time by which an item should be bought
* `done` (boolean) - true if an item was bought, false otherwise
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to an item
* `frequency` (string) - how often the chore should be done
* `credit` (string) - how much allowance the chore is worth
* `rating` (string) - rating of the chore


# Functions

The following functions are implemented and configured in the `serverless.yml` file:

* `Auth` - this function implements a custom authorizer (Auth0) for API Gateway that is added to all other functions.

* `GetTodos` - should return all chores for a current user.

Data returned:

```json
{
  "items": [
    {
      "itemId": "123",
      "createdAt": "2021-04-14T14:00:32Z",
      "name": "Take out the trash",
      "dueDate": "2021-04-14T14:00:32Z",
      "done": false,
      "attachmentUrl": "http://myimage.com/image.png",
      "freqency": "Daily",
      "credit": "$1.00",
      "rating": "5 / 5"
    },
    {
      "itemId": "456",
      "createdAt": "2021-04-14T14:00:32Z",
      "name": "Clean your room",
      "dueDate": "2021-04-14T14:00:32Z",
      "done": true,
      "attachmentUrl": "http://myimage.com/image.png",
      "freqency": "Daily",
      "credit": "$1.00",
      "rating": "5 / 5"
    },
  ]
}
```

* `CreateTodo` - Creates a new item for a current user.

It receives a new item to be created in JSON format that looks like this:

```json
{
  "createdAt": "2021-04-14T14:02:46Z",
  "name": "Take out the trash",
  "dueDate": "2021-04-14T14:02:46Z",
  "done": false,
  "attachmentUrl": "http://myimage.com/image.png",
  "freqency": "Daily",
  "credit": "$1.00",
  "rating": "5 / 5"
}
```

It returns a new item that looks like this:

```json
{
  "item": {
    "itemId": "123",
    "createdAt": "2021-04-14T14:02:46Z",
    "name": "Take out the trash",
    "dueDate": "2021-04-14T14:02:46Z",
    "done": false,
    "attachmentUrl": "http://myimage.com/image.png",
    "freqency": "Daily",
    "credit": "$1.00",
    "rating": "5 / 5"
  }
}
```

* `UpdateTodo` - It updates an item created by a current user.

It receives an object that contains three fields that can be updated in an item:

```json
{
  "name": "Feed the dog",
  "dueDate": "2021-04-14T14:02:46Z",
  "done": true
}
```

The id of an item that should be updated is passed as a URL parameter.

It returns an empty body.

* `DeleteTodo` - it deletes an item created by a current user. Expects an id of an item to remove.

It should return an empty body.

* `GenerateUploadUrl` - returns a pre-signed URL that can be used to upload an attachment file for an item.

It should return a JSON object that looks like this:

```json
{
  "uploadUrl": "https://s3-bucket-name.s3.us-west-2.amazonaws.com/image.png"
}
```


# Frontend

The `client` folder contains a web application that uses the backend API.

This frontend works with the serverless application.

```ts
const apiId = '...' API Gateway id
export const apiEndpoint = `https://${apiId}.execute-api.us-west-2.amazonaws.com/dev`

export const authConfig = {
  domain: '...',    // Domain from Auth0
  clientId: '...',  // Client id from an Auth0 application
  callbackUrl: 'http://localhost:3000/callback'
}
```

## Authentication

Authentication is implemented with an Auth0 application.


# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

```
cd client
npm install
npm run start
```

This will start the local dev FE server with the React application that will interact with the serverless chores application.

