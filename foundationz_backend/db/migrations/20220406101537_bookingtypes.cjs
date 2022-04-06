exports.up = function (knex) {
    return knex.schema.createTable("booking_types", table => {
        table.uuid("id").primary().notNullable();
        table.string("name").notNullable();
        table.string("colour");
        table.timestamps(false, true);
    }).alterTable("allotments", table => {
        table.uuid("type_id").notNullable().references("booking_types.id");
    })

};

exports.down = function (knex) {

};
