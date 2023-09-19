import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {Document, ObjectId} from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {
  @Prop({type: Date, trim: true})
  in_time: Date

  @Prop({type: Date, unique: true, trim: true})
  out_time: Date | null

  @Prop()
  duration: Number | null

  @Prop({type: mongoose.Schema.Types.ObjectId, required: true})
  employee_id: ObjectId

//   @Prop({required: true})
//   class: Number
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);