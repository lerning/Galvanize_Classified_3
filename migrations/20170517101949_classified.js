
exports.up = function(knex, Promise) {
   return knex.schema.createTable('classifieds', table => {
     table.increments()
     table.string("title", 255).notNullable()
     table.string("description", 255).notNullable()
     table.decimal("price").notNullable()
     table.string("item_image", 255).notNullable()
     table.timestamp("created_at").notNullable().defaultTo(knex.raw('now()'))
     table.timestamp("updated_at").notNullable().defaultTo(knex.raw('now()'))

});
}

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('classifieds');
};
