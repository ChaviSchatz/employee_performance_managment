import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ObservationDocument = Observation & Document;

@Schema()
export class Observation {
  @Prop({ required: true })
  employee_id: string;


  @Prop({ required: true })
  proper: boolean

  @Prop({ required: true })
  date: Date
  @Prop()
  class: String

}

export const ObservationSchema = SchemaFactory.createForClass(Observation);