const db = require('./init-firebase').db
const firebase = require('firebase');
const userRef = db.ref('users')
// var ref = db.ref("server/saving-data/fireblog");
class User {
  constructor(body) {
    this.user_name = body.user_name;
    this.full_name = body.full_name;
  }

  create(user) {
    if (!this.user_name) {
      return Promise.reject('user_name must be not empty');
    }
    if (!this.full_name) {
      return Promise.reject('full_name must be not empty');
    }
    var newUserKey = db.ref().child('users').push().key;
    var updates = {};
    updates['/users/' + newUserKey] = this;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
    return db.ref().update(updates)
  }

  lits() {
    return userRef.once("value", function (snapshot) {
      return res.send(snapshotToArray(snapshot))
    });
  }

}

module.exports = User