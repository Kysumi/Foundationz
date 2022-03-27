
exports.up = function(knex) {
    return knex.schema.alterTable('organization_user', table => {
        table.uuid("organization_id")
            .notNullable();
        table.foreign('organization_id')
            .references('organizations.id');

        table.uuid("user_id")
            .notNullable();
        table.foreign('user_id')
            .references('users.id');
    })
};

exports.down = function(knex) {
  
};
