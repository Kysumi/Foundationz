exports.up = function (knex) {
    return knex.schema
        .createTable("users", table => {
            table.uuid("id").primary().notNullable();
            table.string("first_name");
            table.string("surname");
            table.string("email");
            table.string("password");
            table.string("salt");
            table.timestamps(false, true);
        })
        .createTable("organizations", table => {
            table.uuid("id").primary().notNullable();
            table.string("name");
            table.string("email");
            table.timestamps(false, true);
        })
        .createTable("organization_user", table => {
            table.increments("id").primary();
            table.timestamps(false, true);

            table.uuid("organization_id")
                .notNullable();
            table.foreign('organization_id')
                .references('organizations.id');

            table.uuid("user_id")
                .notNullable();
            table.foreign('user_id')
                .references('users.id');
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable("company_user")
        .dropTable("organization")
        .dropTable("users");
};

