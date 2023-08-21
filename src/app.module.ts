import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './organization/organization.module';
import { EmployeeModule } from './employee/employee.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [ 
    OrganizationModule,
     EmployeeModule,
     MongooseModule.forRoot('mongodb://127.0.0.1:27017/test')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
