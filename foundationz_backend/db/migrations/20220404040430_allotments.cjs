exports.up = function (knex) {
    return knex.schema.createTable("allotments", table => {
        table.uuid("id").primary().notNullable();
        table.uuid("booking_id")
            .references('bookings.id');
        table.datetime("start_date");
        table.datetime("end_date");
    }).createTable("allotment_rebook", table => {
        table.uuid("id").primary().notNullable();
        table.uuid("allotment_id").notNullable()
            .references('allotments.id');
        table.datetime("start_date");
        table.datetime("end_date");
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("allotments").dropTable("allotment_rebook");
};
