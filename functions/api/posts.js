const db = require('../dao/init-firebase').db;
var express = require('express')
var router = express.Router()
const snapshotToArray = require('../utils').snapshotToArray

router.get('/list', (req, res) => {
    // const skip = req.param('skip', 0);
    return db.ref('users').limitToFirst(10).once("value", function (snapshot) {
        return res.send(snapshotToArray(snapshot))
    });
});

router.post('/create', (req, res) => {
    new Post(req.body).create().catch(err => {
        return res.send(400, err)
    })
    return res.send({ status: 'success' });
});

module.exports = router;