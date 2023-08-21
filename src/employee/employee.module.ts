import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeSchema } from 'src/schemas/employee.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]) // 3. Setup the mongoose module to use the employee schema
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController]
})
export class EmployeeModule {}
