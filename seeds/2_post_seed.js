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
        knex('post').insert({title: 'Weather',content: 'Step 1: Dress accordingly. Step 2: Don’t feel inclined to complain about chilly weather in the winter.I mean, the later months even give you fair warning in their names – Octoburr, Novemburr, Decemburr.', users_id: findIdByName(users, 'Bradford') }),
        knex('post').insert({title: '40 hour jobs', content: 'ESPECIALLY those who are granted a Monday-Friday, 9-5 schedule. You could have no job at all, you could work on weekends, you could be fighting for 25 hours at a retail store that has ruined wearing red and khaki for an eternity. It could be worse.', users_id: findIdByName(users, 'Bennett') }),
        knex('post').insert({title: 'The toilets', content: 'You can take 0.3 seconds to put it down yourself or 45+ minutes arguing/giving a lecture on your preferred condition of the porcelain throne upon arrival.', users_id: findIdByName(users, 'Pawel') })
      ]);
    });
  };
