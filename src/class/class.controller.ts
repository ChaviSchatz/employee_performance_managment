import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassDocument, Class } from '../schemas/class.schema';
import { CreateClassDTO } from './create-class.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('classes')
export class ClassController {
  constructor(private classService: ClassService) {}

  @Get()
  async getAllClasses(): Promise<Class[]> {
    return await this.classService.getAllClasses();
  }

  @Get(':id')
  async getClassById(@Param('id') id: string): Promise<Class | null> {
    return await this.classService.getClassById(id);
  }

  @Post()
  async createClass(@Body() classDto: CreateClassDTO): Promise<Class > {
    return await this.classService.createClass(classDto);
  }

  @Put(':id')
  async updateClass(
    @Param('id') id: string,
    @Body() classDto: Class,
  ): Promise<Class | null> {
    return await this.classService.updateClass(id, classDto);
  }

  @Delete(':id')
  async deleteClass(@Param('id') id: string): Promise<void> {
    await this.classService.deleteClass(id);
  }
}
