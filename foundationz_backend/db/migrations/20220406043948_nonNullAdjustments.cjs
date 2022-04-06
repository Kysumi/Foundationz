exports.up = function (knex) {
    return knex.schema.alterTable("allotment_rebook", table => {
        table.uuid("allotment_id").notNullable().alter();
    }).alterTable("contacts", table => {
        table.uuid("organization_id").notNullable().alter();
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable("allotment_rebook", table => {
        table.uuid("allotment_id").alter();
    }).alterTable("contacts", table => {
        table.uuid("organization_id").alter();
    })
};
