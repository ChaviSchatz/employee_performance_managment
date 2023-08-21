import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
  } from '@nestjs/common';
  import { EmployeeService } from './employee.service';
  import { Employee } from '../schemas/employee.schema';
  
  @Controller('employees')
  export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}
  
    @Post()
    async create(@Body() employeeData: Employee): Promise<Employee> {
      return this.employeeService.create(employeeData);
    }
  
    @Get()
    async findAll(): Promise<Employee[]> {
      return this.employeeService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Employee> {
      return this.employeeService.findOne(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() employeeData: Employee,
    ): Promise<Employee> {
      return this.employeeService.update(id, employeeData);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
      return this.employeeService.remove(id);
    }
  }
  