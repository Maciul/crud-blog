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

router.get('/add', function(req, res, next) {
  res.render('add', {title: 'add page'});
});

router.post('/add', function(req, res, next) {
  knex('users').first().returning('id').insert({username: req.body.username})
  .then(function(userid) {
    return knex('post').insert({title: req.body.title, content: req.body.content, users_id: userid[0]});
}).then(function() {
    res.redirect('/');
}).catch( function(error) {
  });
});

router.get('/:id', function(req,res,next) {
  knex('post').where({id: req.params.id}).first().then(function(posts) {
    res.render('edit');
  });
});

router.get('/:id/edit', function(req,res,next) {
  knex('users')
        .join('post', 'users.id', 'post.users_id').select('post.id', 'post.title', 'post.content', 'post.users_id',
        'users.username').where({'post.id': req.params.id}).first()
  .then(function(result) {
  res.render('edit', { result: result });
});
});

router.post('/:id/edit', function(req, res, next) {
  knex('users').where({id: req.body.users_id}).update({username: req.body.username})
  .then(function() {
    return knex('post').where({id: req.params.id}).update({title: req.body.title, content: req.body.content});
}).then(function() {
    res.redirect('/');
}).catch( function(error) {
  });
});

router.get('/:id/delete', function(req,res,next) {
  knex('post').where({id: req.params.id}).del().then(function () {
    res.redirect('/');
  });
});
// SELECT * FROM post left outer JOIN comment ON (post.id = comment.post_id) left JOIN users ON (users.id = comment.users_id) WHERE post.id=1
router.get('/:id/comment', function(req, res, next) {
  console.log(req.params.id);
  knex('post')
  .leftOuterJoin('comment', 'post.id', 'comment.post_id')
  .leftJoin('users', 'users.id', 'comment.users_id')
  .select('post.id', 'comment.message', 'users.username', 'comment.id as comment_id').where({'post.id': req.params.id})
  .then(function(result) {
    res.render('comment', {result: result, result1: result[0].id});
  });
});

router.get('/:id/delete-comment', function(req,res,next) {
  knex('comment').where({id: req.params.id}).del().then(function () {
    res.redirect('back');
  });
});


router.post('/add-comment', function(req, res, next) {
  knex('users').first().returning('id').insert({username: req.body.username})
  .then(function(userid) {
    console.log(userid);
    return knex('comment').insert({message: req.body.message, post_id: req.body.post_id, users_id: userid[0]});
}).then(function() {
    res.redirect('back');
}).catch( function(error) {
  });
});

module.exports = router;
