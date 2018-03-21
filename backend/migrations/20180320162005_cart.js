
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('cart', (table) => {
        table.increments('id').primary()
        table.string('title').unique().notNullable()
        table.integer('price').notNullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cart')
}; 
