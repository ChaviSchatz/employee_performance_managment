import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })
  email_address: string

  @Prop({required: true, match: /^\d{10}$/ })
  phone_number: string

//   @Prop()
//   class: Class

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);