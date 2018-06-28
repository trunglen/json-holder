var express = require('express')
const snapshotToArray = require('../utils').snapshotToArray
var router = express.Router()
const db = require('../dao/init-firebase').db;
var User = require('../dao/users')
router.get('/users/list', (req, res) => {
    return db.ref('users').once("value", function (snapshot) {
        return res.send(snapshotToArray(snapshot))
    });
});

router.post('/users/create', (req, res) => {
    return new User(req).create().catch(err => {
        res.send(400, { error: err });
    })
    return res.send({ status: 'success' });
});

module.exports = router