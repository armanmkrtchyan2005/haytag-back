import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from 'src/course/models/category.model';
import { CreateCategoryDto } from './dto/createCategory.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @ApiOperation({ summary: 'Get categories' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get('/')
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Get category by id' })
  @ApiResponse({ status: 200, type: Category })
  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 201, type: Category })
  @Post('/:id')
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }
}
