import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import slug from 'slug';

export default class Grade extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public grade_type: string

  @column()
  public short_description: string

  @column()
  public status: boolean

  @column()
  public slug: string

  @column()
  public image: string

  // define beforesave hook for create slug using from grade type
  @beforeSave()
  public static async slugUrl(grade: Grade) {
    grade.slug = slug(grade.slug)
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
