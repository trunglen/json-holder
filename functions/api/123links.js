
var express = require('express')
var router = express.Router()
const request = require('request')
router.get('/token/generate', (req, res) => {
    const uid = req.param('uid', 0);
    request.get('https://123link.co/api?api=555b4e5419214f7825a381e19bfa5fe0ec92e2c8&url=yourdestinationlink.com', (er, response, html) => {
        html = html + ''
        console.log(html.substring(0,10000))
        console.log(html.match(/meta property="al:android:url".*refer/gi));
        console.log(/content="fb:\/\/page\/[0-9]+/g.exec(html));
    })
    res.send(genToken(uid))
});
router.get('/token/check', (req, res) => {
    const uid = req.param('uid', 0);
    const token = req.param('token', 0);
    if (checkToken(uid, token)) {
        res.send({ status: 'ok' })
    } else {
        res.status(400).send({ err: 'Không hợp lệ' })
    }
});
const random = 'AaBbCcDdEeGgHh0123456789EeKkJjLlMmNnBbVvCcXxZz'
let globalToken = {}

function genToken(uid = '') {
    let result = ''
    for (let i = 0; i < uid.length; i++) {
        result += (uid[i] + random[Number.parseInt(Math.random() * 10)])
    }
    return result
}

function checkToken(uid = '', token = '') {
    if ((globalToken[uid]) === token) {
        return false
    }
    globalToken[uid] = token
    for (let i = 0; i < token.length; i++) {
        if (i % 2 == 0) {
            if (token[i] !== uid[i / 2]) {
                return false
            }
        }
    }
    return true
}

module.exports = router;