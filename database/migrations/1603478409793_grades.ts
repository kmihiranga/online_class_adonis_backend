import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Grades extends BaseSchema {
  protected tableName = 'grades'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.string('grade_type').notNullable()
      table.string('short_description').nullable()
      table.boolean('status').defaultTo(true)
      table.string('slug').unique().notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
