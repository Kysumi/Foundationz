exports.up = function (knex) {
    return knex.schema.createTable("resources", table => {
        table.uuid("id")
            .primary()
            .notNullable();
        table.timestamps(false, true);

        table.uuid("product_id");
        table.uuid("location_id");
        table.uuid("employee_id");
    })
        .raw(`
            alter table "resources"
            add constraint "exactlyOneResourceType" check(
                ("product_id" is not null and "location_id" is null and "employee_id" is null)
                or
                ("product_id" is null and "location_id" is not null and "employee_id" is null)
                or
                ("product_id" is null and "location_id" is null and "employee_id" is not null)
            )
        `)
        .createTable("projects", table => {
            table.uuid("id")
                .primary()
                .notNullable();
            table.string("name");
            table.timestamps(false, true);
        })
        .createTable("project_resource", table => {
            table.increments("id")
                .primary();
            table.timestamps(false, true);

            table.uuid("project_id")
                .notNullable();
            table.uuid("resource_id")
                .notNullable()

            table.foreign('resource_id')
                .references('resources.id');
            table.foreign('project_id')
                .references('projects.id');
        })
        .createTable("locations", table => {
            table.uuid("id")
                .primary()
                .notNullable();

            table.timestamps(false, true);
        })
        .createTable("employees", table => {
            table.uuid("id")
                .primary()
                .notNullable();

            table.timestamps(false, true);
            table.string("name");
        })
        .createTable("products", table => {
            table.uuid("id")
                .primary()
                .notNullable();

            table.timestamps(false, true);
            table.string("name");

            table.uuid("organization_id");
            table.foreign('organization_id')
                .references('organizations.id');
        })
        .alterTable("resources", (table) => {
            table.foreign('product_id')
                .references('products.id');
            table.foreign('location_id')
                .references('locations.id');
            table.foreign('employee_id')
                .references('employees.id');
        });
};

exports.down = function (knex) {

};

