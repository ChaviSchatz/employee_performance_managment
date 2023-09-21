import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards
} from '@nestjs/common';
import { ObservationService } from './observation.service'
import { CreateObservationDTO } from './create-observation.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('observations')
export class ObservationController {
    constructor(private readonly observationService: ObservationService) { }

    @Post()
    async create(@Body() observationData: CreateObservationDTO) {
        return this.observationService.create(observationData);
    }

    @Get()
    async getObservationsByQuery(@Query() conditions: any) {    
        // ugly code!!! 
        // check what is the correct way to write it.    
     if (Object.keys(conditions).length === 0){
        return this.findAll();
     }
       const observations = await this.observationService.filterObservationsByQuery(conditions);
       return observations;
     }
    @Get()
    async findAll() {
        return this.observationService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.observationService.findOne(id);
    }
  
      
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() observationData: CreateObservationDTO,
    ): Promise<CreateObservationDTO> {
        return this.observationService.update(id, observationData);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.observationService.remove(id);
    }
}
