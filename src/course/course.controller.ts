import { AuthGuard } from './../admin/auth.guard';
import { CourseService } from './course.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/createCourse.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Course } from './course.model';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @ApiOperation({ summary: 'Get Courses' })
  @ApiResponse({ status: 200, type: [Course] })
  @Get('/')
  findAllCourses() {
    return this.courseService.findAllCourses();
  }

  @ApiOperation({ summary: 'Get Course' })
  @ApiResponse({ status: 200, type: Course })
  @Get('/:id')
  findOneCourse(@Param('id') id: number) {
    return this.courseService.findOneCourse(id);
  }

  @ApiOperation({ summary: 'Create Course' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Course })
  @ApiBearerAuth()
  @Post('/')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = file.originalname.split('.');
          const f = fileName[0].split(' ').join('-');

          cb(null, `${f}-${Date.now()}.${fileName[1]}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  createCourse(
    @Body() dto: CreateCourseDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return this.courseService.createCourse(dto, img);
  }

  @ApiOperation({ summary: 'Update Course' })
  @ApiResponse({ status: 200, type: Course })
  @ApiBearerAuth()
  @Patch('/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = file.originalname.split('.');
          const f = fileName[0].split(' ').join('-');

          cb(null, `${f}-${Date.now()}.${fileName[1]}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  updateCourse(
    @Param('id') id: number,
    @Body() dto: CreateCourseDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return this.courseService.updateCourse(id, dto, img);
  }

  @ApiOperation({ summary: 'Delete Course' })
  @ApiResponse({ status: 200, type: Course })
  @ApiBearerAuth()
  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteCourse(@Param('id') id: number) {
    return this.courseService.deleteCourse(id);
  }
}
