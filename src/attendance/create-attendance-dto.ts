import { ObjectId } from "mongoose";
import { Type } from 'class-transformer';


export class CreateAttendanceDTO {
    in_time: Date;
    out_time: Date | null;
    employee_id: ObjectId;
    duration: Number | null;
    // class: enum
  }

export class Logout{
    @Type(() => Date)
    out_time: Date;
}