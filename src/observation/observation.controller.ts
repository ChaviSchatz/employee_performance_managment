import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { ObservationService } from './observation.service'
import { CreateObservationDTO } from './create-observation.dto';
@Controller('observations')
export class ObservationController {
    constructor(private readonly observationService: ObservationService) { }

    @Post()
    async create(@Body() observationData: CreateObservationDTO) {
        return this.observationService.create(observationData);
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
