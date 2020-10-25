import {rules, schema, validator} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Grade from "App/Models/Grade";

export default class GradesController {

  // @desc: getting all grades
  public async index({response}:HttpContextContract) {
    const grades = await Grade.all();
    const data = grades.map(grade => grade.serialize({fields:['id', 'grade_type', 'short_description', 'status', 'created_at']}))
    return response.status(200).json({grades: data});
  }

  // @desc: change grade status
  public async status({response, params}:HttpContextContract) {
    const grade = await Grade.findOrFail(params.id)
    grade.status = !grade.status
    grade.save()
    if(grade.$isPersisted) {
      return response.status(200).json({message: 'Status changed!', status: grade.$isPersisted});
    }
  }

  // @desc: create a grade type
  public async store({request, response}: HttpContextContract) {

    // validate the requests
    const gradesSchema = schema.create({
      grade_type: schema.string({
        trim: true
      }, [
        rules.required(),
        rules.unique({
          table: 'grades',
          column: 'grade_type'
        })
      ])
    })

    await request.validate({
        schema: gradesSchema,
        reporter: validator.reporters.api, // 👈 using reporter,
        messages: {
          'grade_type.required': 'The Grade is required',
          'grade_type.unique': 'The Grade is already in use',
        }
    })

    const gradeData = await Grade.create({
      grade_type:request.input('grade_type'),
      short_description:request.input('short_description'),
      slug:request.input('grade_type'),
      image: request.input('image'),
      color: request.input('color')
    })
    if(gradeData.$isPersisted) {
      return response.status(201).json({message: 'Saved Successfully', gradeData: gradeData});
    }
  }

  // @desc: update a grade type
  public async update({request, response, params}:HttpContextContract) {

    const grade = await Grade.findOrFail(params.id)
    // validate the requests
    const gradesSchema = schema.create({
      grade_type: schema.string({
        trim: true
      }, [
        rules.required(),
        rules.unique({
          table: 'grades',
          column: 'id',
        })
      ])
    })

    await request.validate({
        schema: gradesSchema,
        reporter: validator.reporters.api, // 👈 using reporter,
        messages: {
          'grade_type.required': 'The Grade is required',
          'grade_type.unique': 'The Grade is already in use',
        }
    })

    grade.grade_type = request.input('grade_type')
    grade.short_description = request.input('short_description')
    grade.slug = request.input('grade_type')
    grade.image = request.input('image')
    grade.color = request.input('color')
    await grade.save();
    if(grade.$isPersisted) {
      return response.status(200).json({message: 'Updated successfully!', grade: grade})
    }
  }

  // @desc: delete a grade type
  public async destroy({response, params}) {
    const grade = await Grade.findOrFail(params.id)
    await grade.delete()
    return response.status(200).json({message: 'deleted successfully!', grade: grade});
  }

 }
