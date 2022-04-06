exports.up = function (knex) {
    return knex.schema.renameTable("projects", "bookings")
        .renameTable("project_resource", "booking_resource")
        .alterTable("booking_resource", table => {
            table.renameColumn("resource_id", "booking_id")
        });
};

exports.down = function (knex) {
    return knex.schema.renameTable("bookings", "projects")
        .renameTable("booking_resource", "project_resource")
        .alterTable("project_resource", table => {
            table.renameColumn("booking_id", "resource_id")
        });
};
