import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance, AttendanceDocument } from 'src/schemas/attendance.schema';
import { CreateAttendanceDTO } from './create-attendance-dto';
import mongoose from 'mongoose';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>,
  ) {}

  async create(attendanceData: CreateAttendanceDTO): Promise<Attendance> {
    const createdAttendance = new this.attendanceModel(attendanceData);
    return createdAttendance.save();
  }
  async logout(id: string, out_time: Date): Promise<Attendance>{
    ///to change to one access to db.
    const attendance = await this.attendanceModel.findById(id).exec();
    if (!attendance) {
      throw new HttpException(`Attendence with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    out_time = new Date(out_time)
    console.log("in_time: ", attendance.in_time.getTime(), "out_time: ", out_time)
    var hours = Math.abs(attendance.in_time.getTime() - out_time.getTime()) / 36e5;
    console.log("hours: ", hours)
    var update = {
        out_time: out_time,
        duration: hours
    }
    const updatedAttendance = await this.attendanceModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    return updatedAttendance
  }

  async findAll(id: string): Promise<Attendance[]> {
    return this.attendanceModel.find({employee_id: id}).exec();
  }

  async findOne(id: string): Promise<Attendance> {
    const attendance = await this.attendanceModel.findById(id).exec();
    if (!attendance) {
      throw new HttpException(`Attendence with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return attendance;
  }

  async update(id: string, attendanceData: CreateAttendanceDTO): Promise<Attendance> {
    const updatedAttendance = await this.attendanceModel
      .findByIdAndUpdate(id, attendanceData, { new: true })
      .exec();
    if (!updatedAttendance) {
      throw new HttpException(`Attendence with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return updatedAttendance;
  }

  async remove(id: string): Promise<void> {
    const result = await this.attendanceModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new HttpException(`Attendence with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
  }
}
