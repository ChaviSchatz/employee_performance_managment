import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop()
  name: string;

  @Prop()
  email_address: string

  @Prop()
  phone_number: string

//   @Prop()
//   class: Class

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);