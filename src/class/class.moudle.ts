import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { ClassSchema } from 'src/schemas/class.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Class', schema: ClassSchema }])
  ],
  providers: [ClassService],
  controllers: [ClassController]
})
export class ClassModule {}
