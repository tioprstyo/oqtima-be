import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('cardData', (table) => {
    table.specificType('id', 'CHAR(16)').primary();
    table.string('title', 80).notNullable();
    table.string('status', 80).notNullable();
    table.string('caption', 80);
    table.text('description');
    table.string('prioirty', 80);
    table.string('tags', 80);
    table.string('storyPoint', 80);
    table.string('assignee', 80);
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('cardData');
}
