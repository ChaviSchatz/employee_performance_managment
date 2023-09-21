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
  import { AttendanceService } from './attendance.service';
import { CreateAttendanceDTO, Logout } from './create-attendance-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) {}
    
    @Post()
    async create(@Body() attendanceData: CreateAttendanceDTO){
      return this.attendanceService.create(attendanceData);
    }

    @Post(':id')
    async logout(@Param('id') id: string, @Body() logout: Logout){
        return this.attendanceService.logout(id, logout.out_time);
    }
    
    @Get(':emp_id')
    async findAll(@Param('emp_id') emp_id: string) {
      return this.attendanceService.findAll(emp_id);
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.attendanceService.findOne(id);
    }
    
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() attendanceData: CreateAttendanceDTO,
    ): Promise<CreateAttendanceDTO> {
      return this.attendanceService.update(id, attendanceData);
    }
    
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
      return this.attendanceService.remove(id);
    }
  }
  