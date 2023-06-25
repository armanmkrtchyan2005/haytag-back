import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './models/course.model';
import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CreateCourseDto } from './dto/createCourse.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private courseRepository: typeof Course,
    @InjectModel(Category) private categoryRepository: typeof Category,
  ) {}

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
    return {
      ...dto,
      img,
    };
  }

  async findAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();

    return categories;
  }

  async findOneCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findByPk(id, {
      include: { all: true },
    });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  async createCategory(dto: CreateCategoryDto) {
    const newCategory = await this.categoryRepository.create(dto);

    return newCategory;
  }

  async updateCategory(id: number, dto: CreateCategoryDto) {
    const category = await this.categoryRepository.findByPk(id);

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const updatedCategory = await category.update(dto);

    return updatedCategory;
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.findByPk(id);

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const deletedCategory = await this.categoryRepository.describe();

    return deletedCategory;
  }
}
