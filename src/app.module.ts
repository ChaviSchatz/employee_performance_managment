import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ProductModule } from './product/product.module';
import { OrganizationModule } from './organization/organization.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [ OrganizationModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
