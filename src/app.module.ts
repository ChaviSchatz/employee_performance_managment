import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceModule } from './attendance/attendance.module';
@Module({
  imports: [ 
     MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
     EmployeeModule,
     AttendanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
