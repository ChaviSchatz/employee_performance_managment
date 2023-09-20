import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Observation, ObservationDocument } from 'src/schemas/observation.schema';
import { CreateObservationDTO } from './create-observation.dto';
@Injectable()
export class ObservationService {
  constructor(
    @InjectModel(Observation.name) private observationModel: Model<ObservationDocument>,
  ) { }

  async create(observationData: any): Promise<Observation> {
    const newObservation = {
      employee_id: observationData.employee_id,
      proper: observationData.proper,
      date: new Date(observationData.date),
      class: observationData.class
    }

    const createdObservation = new this.observationModel(newObservation);
    return createdObservation.save();
  }

  async filterObservationsByQuery(query: any): Promise<Observation[]> {
    const conditions = Object.keys(query).filter((key) => query[key] !== "");

    return this.observationModel.find({
      "$and": conditions.map((condition) => ({ [condition]: query[condition] })),
    }).exec();
  }


  async findAll(): Promise<Observation[]> {
    return this.observationModel.find().exec();
  }

  async findOne(id: string): Promise<Observation> {
    const observation = await this.observationModel.findById(id).exec();
    if (!observation) {
      throw new HttpException(`Observation with ID ${id} not found`, HttpStatus.NOT_FOUND)

    } 
    return observation;
  }

  async update(id: string, observationData: CreateObservationDTO): Promise<Observation> {
    const updatedObservation = await this.observationModel
      .findByIdAndUpdate(id, observationData, { new: true })
      .exec();
    if (!updatedObservation) {
      throw new HttpException(`Observation with ID ${id} not found`, HttpStatus.NOT_FOUND)
    }
    return updatedObservation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.observationModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new HttpException(`Observation with ID ${id} not found`, HttpStatus.NOT_FOUND)
    }
  }
}
