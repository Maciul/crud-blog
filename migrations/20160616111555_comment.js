
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', function(table) {
    table.increments();
    table.text('message');
    table.integer('post_id').references('post.id').onDelete('CASCADE');
    table.integer('users_id').references('users.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comment');
};
