import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/category/category.model';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}
  async findAll() {
    const categories = await this.categoryModel.findAll({
      include: { all: true },
    });

    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id, {
      include: { all: true },
    });

    if (!category) {
      throw new HttpException('Category Not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  async create(dto: CreateCategoryDto) {
    const category = await this.categoryModel.create(dto);

    return category;
  }
}
