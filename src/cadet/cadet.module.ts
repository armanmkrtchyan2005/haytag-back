import { Module } from '@nestjs/common';
import { CadetController } from './cadet.controller';
import { CadetService } from './cadet.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cadet } from './cadet.model';
import { Course } from 'src/course/course.model';

@Module({
  controllers: [CadetController],
  providers: [CadetService],
  imports: [SequelizeModule.forFeature([Cadet, Course])],
})
export class CadetModule {}
