import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClassCategories extends BaseSchema {
  protected tableName = 'class_categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.string('category').notNullable()
      table.string('short_description').nullable()
      table.boolean('status').defaultTo(true)
      table.string('image').nullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
