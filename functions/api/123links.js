
var express = require('express')
var router = express.Router()
router.get('/token/generate', (req, res) => {
    const uid = req.param('uid', 0);

});
const random = 'AaBbCcDdEeGgHh0123456789EeKkJjLlMmNnBbVvCcXxZz'
function genToken(uid = '') {
    let result = ''
    for (let i = 0; i < uid.length; i++) {
        result = uid[i] + random[Number.parseInt(Math.random() * 10)]
    }
    return result
}