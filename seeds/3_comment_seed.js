var helper = require('../helper');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then(function () {
      return Promise.all([
        knex('users').select(),
        knex('post').select()
      ]);
    }).then(function(data) {
      var users = data[0];
      var post = data[1];

        return Promise.all([
        // Inserts seed entries
        knex('comment').insert({message:'Hey Bradford, just hang in there man! and you will be a rich man!!!', post_id: helper.findIdByTitle(post, 'Hate Life'), users_id:helper.findIdByName(users, 'Kyle')}),
        knex('comment').insert({message:'Bennett you are the man! BOOOM! It will get better!', post_id: helper.findIdByTitle(post, 'FML'), users_id: helper.findIdByName(users, 'Kyle')}),
        knex('comment').insert({message:'Pawel... die already, please....', post_id: helper.findIdByTitle(post, 'Real Struggle'), users_id: helper.findIdByName(users, 'Kyle')}),
        knex('comment').insert({message:'You suck!!!', post_id: helper.findIdByTitle(post, 'Real Struggle'), users_id: helper.findIdByName(users, 'Kyle')})
      ]);
    });
};
