import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observation, ObservationDocument } from 'src/schemas/observation.schema';
import { CreateObservationDTO } from './create-observation.dto';
@Injectable()
export class ObservationService {
  constructor(
    @InjectModel(Observation.name) private observationModel: Model<ObservationDocument>,
  ) {}

  async create(observationData: any): Promise<Observation> {
    const newObservation ={
        employee_id: observationData.employee_id,
        proper:observationData.proper,
        date: new Date(observationData.date),
        class: observationData.class
    }

    const createdObservation = new this.observationModel(newObservation);
    return createdObservation.save();
  }

  async findAll(): Promise<Observation[]> {
    return this.observationModel.find().exec();
  }

  async findOne(id: string): Promise<Observation> {
    const observation = await this.observationModel.findById(id).exec();
    if (!observation) {
      throw new NotFoundException(`Observation with ID ${id} not found`);
    }
    return observation;
  }

  async update(id: string, observationData: CreateObservationDTO): Promise<Observation> {
    const updatedObservation = await this.observationModel
      .findByIdAndUpdate(id, observationData, { new: true })
      .exec();
    if (!updatedObservation) {
      throw new NotFoundException(`Observation with ID ${id} not found`);
    }
    return updatedObservation;
  }

  async remove(id: string): Promise<void> {
    const result = await this.observationModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Observation with ID ${id} not found`);
    }
  }
}
