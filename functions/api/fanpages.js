const db = require('../dao/init-firebase').db;
var express = require('express')
var router = express.Router()
const snapshotToArray = require('../utils').snapshotToArray
var Fanpage = require('../dao/fanpage')
var common = require('../common/constant')
const request = require('request')

router.get('/list', (req, res) => {
    // const skip = req.param('skip', 0);
    db.ref('fanpages').limitToFirst(10).once("value", function (snapshot) {
        res.send(snapshotToArray(snapshot, true))
    });
});

router.post('/create', (req, res) => {

    const body = req.body
    const fanpageID = body.fanpage_id
    const token = body.token
    request.get(common.getRequestUrl(fanpageID + '/feed'), { qs: { access_token: token } }, (err, response) => {
        if (response.statusCode !== 200) {
            console.log(err)
            return
        }
        response = JSON.parse(response.body)
        response.data.forEach(element => {
            requestComment(fanpageID, element.id)
        });
        if (response.paging.next) {
            requestNextPost(fanpageID, response.paging.next)
        }
    })
    res.send({status:'success'})

});

function requestNextPost(fanpageID, next) {
    request.get(next, (err, response) => {
        if (response.statusCode !== 200) {
            console.log(err)
            return
        }
        response = JSON.parse(response.body)
        response.data.forEach(element => {
            console.log(element.id);
            requestComment(fanpageID, element.id)
        });
    })
}

function requestComment(fanpageID, postID) {
    const token = 'EAAAAUaZA8jlABAB5t11JZCZBeZALZAkhF1aOGZA6QOdbAGLRlbqBP1BN5nI3xu95g1baMgccpMvQaSwGUBfZCTPuSJnGzQ5l0UAjyaK81J2VTmseN8zLbPP0NalKbGR3kVTj4fuYbrZAMoZB96NqopeGPBLbC5Rp0ZAkIZD'
    request.get(common.getRequestUrl(postID + '/comments?access_token=' + token, { qs: { access_token: token } }), (err, response) => {
        if (response.statusCode !== 200) {
            console.log(err, 'error')
            return
        }
        var comment = ''
        response = JSON.parse(response.body)
        var from = []
        var comment = ''
        response.data.forEach(element => {
            var phone = element.message.match(/0[0-9\s.-]{9,13}/gi)
            var email = element.message.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
            if (phone || email) {
                comment += element.message + '&&&'
                element.from.phone = phone
                element.from.phone = email
                element.from.message = element.message
                from.push(element.from)
            }
        });
        new Fanpage(fanpageID, postID, getPhoneFromComment(comment), getEmailFromComment(comment), comment, from).create()
    })
}

function getPhoneFromComment(comment) {
    return comment.match(/0[0-9\s.-]{9,13}/gi)
}

function getEmailFromComment(comment) {
    return comment.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
}

module.exports = router;