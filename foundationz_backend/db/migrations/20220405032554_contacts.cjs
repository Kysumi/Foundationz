exports.up = function (knex) {

    return knex.schema.createTable("contacts", table => {
        table.uuid("id").notNullable().primary();
        table.string("first_name");
        table.string("surname");
        table.timestamps(false, true);
        table.uuid("organization_id").notNullable().references("organizations.id");

    }).alterTable("bookings", table => {
        table.dropColumn("name");
        table.uuid("contact_id").notNullable().references("contacts.id");
        table.uuid("organization_id").references("organizations.id");

    }).alterTable("allotments", table => {
        table.timestamps(false, true);
        table.uuid("organization_id").references("organizations.id");
    }).alterTable("booking_resource", table => {
        table.renameColumn("booking_id", "resource_id");
        table.renameColumn("project_id", "booking_id");
    }).alterTable("allotment_rebook", table => {
        table.timestamps(false, true);
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable("bookings", table => {
            table.dropColumn("contact_id");
            table.dropColumn("organization_id");
            table.string("name");
        }
    ).alterTable("allotments", table => {
            table.dropColumn("organization_id");
            table.dropColumn("created_at");
            table.dropColumn("updated_at");
        }
    ).dropTable("contacts")
        .alterTable("booking_resource", table => {
            table.renameColumn("booking_id", "project_id");
            table.renameColumn("resource_id", "booking_id");
        });
};
