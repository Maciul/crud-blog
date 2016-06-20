var findIdByName = function(list, name) {
  for (var i = 0; i < list.length; i++) {
    var thelist = list[i];
    if (name === thelist.username) {
      return thelist.id;
    }
  }
};
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function () {
      return knex('users').select();
    }).then(function(users) {
      return Promise.all([
        // Inserts seed entries
        knex('post').insert({title: 'Hate Life',content: 'This is so difficult, life is the most difficult thing I ever done', users_id: findIdByName(users, 'Bradford') }),
        knex('post').insert({title: 'FML', content: 'Oh my god like I can not even. Literally, wow!', users_id: findIdByName(users, 'Bennett') }),
        knex('post').insert({title: 'Real Struggle', content: 'The struggle of developing is real', users_id: findIdByName(users, 'Pawel') })
      ]);
    });
  };
