import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './models/course.model';
import { CreateCourseDto } from './dto/createCourse.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course) private courseRepository: typeof Course) {}

  async findAllCourses(): Promise<Course[]> {
    const courses = await this.courseRepository.findAll();

    return courses;
  }

  async findOneCourse(id: number): Promise<Course> {
    const course = await this.courseRepository.findByPk(id, {
      include: { all: true },
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  async createCourse(dto: CreateCourseDto, img: Express.Multer.File) {
    const course = await this.courseRepository.create({
      ...dto,
      img: `/uploads/${img.filename}`,
    });

    return course;
  }

  async updateCourse(
    id: number,
    dto: CreateCourseDto,
    img: Express.Multer.File,
  ) {
    const course = await this.courseRepository.findByPk(id);

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const fileName = course.img.split('/')[2];

    fs.rmSync(path.resolve('uploads', fileName), { force: true });

    const updatedCourse = await course.update({
      ...dto,
      img: `/uploads/${img.filename}`,
    });

    return updatedCourse;
  }

  async deleteCourse(id: number) {
    const course = await this.courseRepository.findByPk(id);

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const fileName = course.img.split('/')[2];

    fs.rmSync(path.resolve('uploads', fileName), { force: true });

    const deletedCourse = await course.destroy();

    return deletedCourse;
  }
}
