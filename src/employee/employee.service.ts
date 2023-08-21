import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from '../schemas/employee.schema';
import { CreateEmployeeDTO } from './create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(employeeData: CreateEmployeeDTO): Promise<Employee> {
    const createdEmployee = new this.employeeModel(employeeData);
    return createdEmployee.save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: string, employeeData: CreateEmployeeDTO): Promise<Employee> {
    const updatedEmployee = await this.employeeModel
      .findByIdAndUpdate(id, employeeData, { new: true })
      .exec();
    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return updatedEmployee;
  }

  async remove(id: string): Promise<void> {
    const result = await this.employeeModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}
