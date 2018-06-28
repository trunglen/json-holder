const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');
var userApi = require('./api/users')
var postApi = require('./api/posts')
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send(albums);
// });


const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use('/users', userApi);
app.use('/posts', postApi);


exports.api = functions.https.onRequest(app);
