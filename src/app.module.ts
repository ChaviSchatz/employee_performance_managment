import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ObservationModule } from './observation/observation.moudle';
@Module({
  imports: [
    ObservationModule,
    EmployeeModule,
    MongooseModule.forRoot('mongodb+srv://AvigailMintz:324947977@cluster0.dlu3tcy.mongodb.net/test')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
