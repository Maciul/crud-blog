
exports.up = function(knex, Promise) {
  knex.schema.createTable('comment', function(table) {
    table.increments();
    table.text('content');
    table.integer('post_id').references('post.id');
    table.integer('user_id').references('user.id');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('comment');
};
