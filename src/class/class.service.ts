import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassDocument, Class } from '../schemas/class.schema';
import { CreateClassDTO } from './create-class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
  ) {}

  async getAllClasses(): Promise<Class[]> {
    return await this.classModel.find().exec();
  }

  async getClassById(id: string): Promise<Class | null> {
    return await this.classModel.findById(id).exec();
  }

  async createClass(classDto: CreateClassDTO): Promise<Class> {
    const newClass = new this.classModel(classDto);
    return await newClass.save();
  }

  async updateClass(id: string, classDto: Class): Promise<Class | null> {
    const updatedClass = await this.classModel.findByIdAndUpdate(id, classDto, {
      new: true,
    }).exec();
    return updatedClass;
  }

  async deleteClass(id: string): Promise<void> {
    await this.classModel.findByIdAndDelete(id).exec();
  }
}
