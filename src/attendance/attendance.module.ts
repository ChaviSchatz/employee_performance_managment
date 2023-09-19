import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceSchema } from 'src/schemas/attendance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Attendance', schema: AttendanceSchema }]) // 3. Setup the mongoose module to use the attendance schema
  ],
  providers: [AttendanceService],
  controllers: [AttendanceController]
})
export class AttendanceModule {}
