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
        knex('comment').insert({message:'Totally agree with you on that one, what the hell is wrong with people!!!!', post_id: helper.findIdByTitle(post, 'The toilets'), users_id:helper.findIdByName(users, 'Kyle')}),
        knex('comment').insert({message:'I think stuff is weird, que pasa que!?', post_id: helper.findIdByTitle(post, 'Weather'), users_id: helper.findIdByName(users, 'Kyle')}),
        knex('comment').insert({message:'Why dont we complain about Bradford already?', post_id: helper.findIdByTitle(post, '40 hour jobs'), users_id: helper.findIdByName(users, 'Kyle')}),
        knex('comment').insert({message:'Extra comment added here.', post_id: helper.findIdByTitle(post, '40 hour jobs'), users_id: helper.findIdByName(users, 'Kyle')})
      ]);
    });
};
