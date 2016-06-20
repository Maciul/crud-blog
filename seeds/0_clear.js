exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment').del()
  .then(function () {
  return knex('post').del();
})
  .then(function (){
  return knex('users').del();
  });
};
