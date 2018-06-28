const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const functions = require('firebase-functions');
var userApi = require('./api/users')
var postApi = require('./api/posts')
var http = require('http');
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send(albums);
// });
const app = express();
app.use(bodyParser.json());
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use('/users', userApi);
app.use('/posts', postApi);
app.get('/website-speed', function (req, res) {
    const website = req.param('website');
    const start = new Date().getTime()
    http.request(website, (response) => {
        const timing = new Date().getTime() - start;
        return res.send({timing:timing});
    })
    return res.send({error:'unknown'});
})
app.listen(4000);
// exports.api = functions.https.onRequest(app);
