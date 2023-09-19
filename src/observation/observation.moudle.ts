import { Module } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { ObservationController } from './observation.controller';
import { ObservationSchema } from 'src/schemas/observation.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Observation', schema: ObservationSchema }]) // 3. Setup the mongoose module to use the employee schema
  ],
  providers: [ObservationService],
  controllers: [ObservationController]
})
export class ObservationModule {}
