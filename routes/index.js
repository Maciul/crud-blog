var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('users')
    .join('post', 'users.id', 'post.users_id')
  .then(function(result) {
  res.render('index', { result: result});
  });
});

module.exports = router;
