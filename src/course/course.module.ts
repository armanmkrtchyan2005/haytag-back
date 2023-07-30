import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from './models/course.model';

@Module({
  providers: [CourseService],
  controllers: [CourseController],
  imports: [SequelizeModule.forFeature([Course])],
})
export class CourseModule {}
