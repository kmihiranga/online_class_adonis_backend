import {rules, schema, validator} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ClassCategory from "App/Models/ClassCategory";

export default class ClassCategoriesController {

  // @desc: index function
  public async index({response}:HttpContextContract) {
    const category = await ClassCategory.all();
    return response.status(200).json({category: category})
  }

  // @desc: store functionality
  public async store({request, response}:HttpContextContract) {

    // validate data
    const categorySchema = schema.create({
      category: schema.string({
        trim: true
      }, [
        rules.required(),
        rules.unique({
          table: 'class_categories',
          column: 'category'
        })
      ])
    })

    await request.validate({
      schema: categorySchema,
        reporter: validator.reporters.api, // 👈 using reporter,
        messages: {
          'category.required': 'The Grade is required',
          'category.unique': 'The Grade is already in use',
        }
    })

    const categoryData = await ClassCategory.create({
      category: request.input('category'),
      short_description: request.input('short_description'),
      status: request.input('status'),
      image: request.input('image')
    })
    if(categoryData.$isPersisted) {
      return response.status(201).json({message: 'Saved Successfully', categoryData: categoryData});
    }
  }

  public async update({request, response, params}:HttpContextContract) {
    const category = await ClassCategory.findOrFail(params.id);
    // validate categories
    const categoryData = schema.create({
      category: schema.string({
        trim: true
      }, [
        rules.unique({
          table: 'class_categories',
          column: 'id'
        })
      ])
    })
    await request.validate({
      schema: categoryData,
        reporter: validator.reporters.api, // 👈 using reporter,
        messages: {
          'category.required': 'The Grade is required',
          'category.unique': 'The Grade is already in use',
        }
    })
    category.category = request.input('category'),
    category.short_description = request.input('short_description'),
    category.image = request.input('image')
    await category.save()
    if(category.$isPersisted) {
      return response.status(200).json({message: 'Updated successfully!', category: category})
    }

  }

  // @desc: delete categories
  public async destroy({response, params}:HttpContextContract) {
    const category = await ClassCategory.findOrFail(params.id)
    await category.delete()
    return response.status(200).json({message: 'deleted successfully', category: category})
  }
}
