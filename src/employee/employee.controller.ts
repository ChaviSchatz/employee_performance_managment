import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
  } from '@nestjs/common';
  import { EmployeeService } from './employee.service';
import { CreateEmployeeDTO } from './create-employee.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
  
  @UseGuards(JwtAuthGuard)
  @Controller('employees')
  export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}
  
    @Post()
    async create(@Body() employeeData: CreateEmployeeDTO){
      return this.employeeService.create(employeeData);
    }
  
    @Get()
    async findAll() {
      return this.employeeService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.employeeService.findOne(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() employeeData: CreateEmployeeDTO,
    ): Promise<CreateEmployeeDTO> {
      return this.employeeService.update(id, employeeData);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
      return this.employeeService.remove(id);
    }
  }
  