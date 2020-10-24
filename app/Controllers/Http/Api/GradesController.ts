import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Grade from "App/Models/Grade";

export default class GradesController {

  // @desc: getting all grades
  public async index({response}:HttpContextContract) {
    const grades = await Grade.all();
    return response.status(200).json({grades: grades});
  }

  // @desc: create a grade type
  public async store({request, response}: HttpContextContract) {
    const gradeData = await Grade.create({
      grade_type:request.input('grade_type'),
      short_description:request.input('short_description'),
      slug:request.input('grade_type')
    })
    if(gradeData.$isPersisted) {
      return response.status(201).json({message: 'Saved Successfully', gradeData: gradeData});
    }
  }

  // @desc: update a grade type
  public async update({request, response, params}:HttpContextContract) {
    const grade = await Grade.findOrFail(params.id)
    grade.grade_type = request.input('grade_type')
    grade.short_description = request.input('short_description')
    grade.slug = request.input('grade_type')
    await grade.save();
    if(grade.$isPersisted) {
      return response.json({message: 'Updated successfully!', grade: grade})
    }
  }

  // @desc: delete a grade type
  public async delete({response, params}) {
    const grade = await Grade.findOrFail(params.id)
    await grade.delete()
    return response.status(200).json({message: 'deleted successfully!'});
  }

 }
