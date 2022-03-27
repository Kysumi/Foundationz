
exports.up = function(knex) {
     return knex.schema.createTable("users", table => {
        table.uuid("id").primary().notNullable();
        table.string("first_name");
        table.string("surname");
        table.string("email");
        table.string("password");
        table.string("salt");
        table.timestamps(false, true);
    }).createTable("organizations", table => {
        table.uuid("id").primary().notNullable();
        table.string("name");
        table.string("email");
        table.timestamps(false, true);
    }).createTable("organization_user", table => {
        table.increments("id").primary();
        table.timestamps(false, true );
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("company_user")
        .dropTable("organization")
        .dropTable("users");
};

