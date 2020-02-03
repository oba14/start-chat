[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/oba14/start-chat/blob/master/LICENSE) [![react version](https://img.shields.io/badge/react-16.12-blue)](https://www.npmjs.com/package/react) [![socket.io](https://img.shields.io/badge/socket.io-2.3.0-blue)](https://www.npmjs.com/package/socket.io) [![npm](https://img.shields.io/npm/v/npm)](https://nodejs.org/en/download/package-manager/) [![redux](https://img.shields.io/badge/redux-4.04-blue)](https://www.npmjs.com/package/redux) [![express](https://img.shields.io/badge/express-4.17.1-blue)](https://www.npmjs.com/package/express) [![mongodb](https://img.shields.io/badge/mongoDB-3.4.1-blue)](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)

<h1 align="center">
Chat app build using socket.io and react with redux.
  </h1>
<p> 
A chat app to display how we can store forms data (input fields, multiple attachments) to mongodb using multer and gridfs. GridFS is a specification for storing and retrieving files that exceed the BSON-document size limit of 16 MB and multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. For frontend we are using react and for state management redux is used. Forms are created using react hook form and uploaded to mongodb atlas through an express server. Users can create, update and delete form data. 
</p>

<h3> Features summary of Walletdroid</h3>
<ul>
<li>User sign in and sign up using JSON web token (JWT) and passport.</li>
<li>User details are saved in mongodb ATLAS.</li>
<li>Sends received messages to all connected clients (no rooms)</li>
<li>If a client is silent for more than a certain (configurable) amount of time, it is disconnected; a message about the event (e.g. "John was disconnected due to inactivity") is sent to all connected clients.</li>
<li>If a client is disconnected, but not due to inactivity, a different message is sent (e.g. "John left the chat, connection lost" instead.) </li>
<li>Doesn't allow multiple active users with the same nickname.
<li>Validates data received over the network.</li>
<li>Terminates gracefully upon receiving SIGINT or SIGTERM signals.</li>
<li>Provide readable logging solution.</li>
<li>Expense Analytics are also provided using graphs.</li>

## Prerequirements
- [Node](https://nodejs.org/en/download/) ^16.12.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client  
$ npm i       // install pacakges
$ npm start  // start the server
```
## Server-side usage(PORT: 5000)
```terminal
$ cd server   // go to server folder
$ npm i       // npm install pacakges
$ npm sart    // run it locally

add mongodb uri and port to environment variable. 
```

### License
[MIT](https://github.com/oba14/forms-MERN-stack/blob/master/LICENSE)
