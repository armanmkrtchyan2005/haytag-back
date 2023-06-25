import { CourseService } from './course.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { CreateCourseDto } from './dto/createCourse.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get('/')
  findAllCourses() {
    return this.courseService.findAllCourses();
  }

  @UseInterceptors(FileInterceptor('img'))
  @Post('/')
  createCourse(
    @Body() dto: CreateCourseDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return this.courseService.createCourse(dto, img);
  }

  @Get('/categories')
  findAllCategories() {
    return this.courseService.findAllCategories();
  }

  @Get('/categories/:id')
  findOneCategory(@Param('id') id: number) {
    return this.courseService.findOneCategory(id);
  }

  @Post('/categories')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.courseService.createCategory(dto);
  }

  @Patch('/categories/:id')
  updateCategory(@Param('id') id: number, @Body() dto: CreateCategoryDto) {
    return this.courseService.updateCategory(id, dto);
  }

  @Delete('/categories/:id')
  deleteCategory(@Param('id') id: number) {
    return this.courseService.deleteCategory(id);
  }

  @Get('/:id')
  findOneCourse(@Param('id') id: number) {
    return this.courseService.findOneCourse(id);
  }
}
