import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ClassCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category: string

  @column()
  public short_description: string

  @column()
  public status: boolean

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
