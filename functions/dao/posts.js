const db = require('./init-firebase').db;
class Post {
  constructor(body) {
    this.title = body.title;
    this.content = body.content;
    this.author = body.author;
  }

  create() {
    if (!this.author) {
      return Promise.reject('author must be not empty');
    }
    if (!this.title) {
      return Promise.reject('title must be not empty');
    }
    if (!this.content) {
      return Promise.reject('content must be not empty');
    }
    var newPostKey = db.ref().child('posts').push().key;
    var updates = {};
    updates['/posts/' + newPostKey] = this;
    return db.ref().update(updates)
  }
}
module.exports = Post