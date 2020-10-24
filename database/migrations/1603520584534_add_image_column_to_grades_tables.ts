import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Grades extends BaseSchema {
  protected tableName = 'grades'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('image').nullable()
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('image')
    })
  }
}
