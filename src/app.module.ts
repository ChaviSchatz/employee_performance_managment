import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceModule } from './attendance/attendance.module';
import { ObservationModule } from './observation/observation.moudle';
import { ClassModule } from './class/class.moudle';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ObservationModule,
    EmployeeModule,
    ClassModule,
    AttendanceModule,
    MongooseModule.forRoot('mongodb+srv://AvigailMintz:324947977@cluster0.dlu3tcy.mongodb.net/test'),
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
