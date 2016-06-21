var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

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

router.get('/:id/edit', function(req,res,next) {
  knex('users')
        .join('post', 'users.id', 'post.users_id').select('post.id', 'post.title', 'post.content', 'post.users_id',
        'users.username').where({'post.id': req.params.id}).first()
  .then(function(result) {
    console.log(result);
    res.render('edit', { result: result });
  });
});

router.post('/:id/edit', function(req, res, next) {
  knex('users').where({id: req.body.users_id}).update({username: req.body.username})
  .then(function() {
    return knex('post').where({id: req.params.id})
    .update({
      title: req.body.title,
      content: req.body.content});
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
  knex('post')
  .join('comment', 'post.id', 'comment.post_id')
  .leftJoin('users', 'users.id', 'comment.users_id')
  .select( 'comment.message', 'users.username', 'comment.id as comment_id').where({'post.id': req.params.id})
  .then(function(result) {
    console.log(result);
    res.render('comment', {result: result, result1: req.params.id});
  });
});

router.get('/:id/delete-comment', function(req,res,next) {
  knex('comment').where({id: req.params.id}).del().then(function() {
    res.redirect('back');
  });
});


router.post('/:id/add-comment', function(req, res, next) {
  knex('users').first().returning('id').insert({username: req.body.username})
  .then(function(userid) {
    return knex('comment').insert({message: req.body.message, post_id: req.body.post_id, users_id: userid[0]});
}).then(function() {
    res.redirect('/post/'+req.params.id+'/comment');
}).catch( function(error) {
  });
});

module.exports = router;
