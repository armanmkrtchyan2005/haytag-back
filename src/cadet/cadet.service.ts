import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cadet } from './cadet.model';
import { CreateCadetDto } from './dto/createCadet.dto';
import { Course } from 'src/course/course.model';

@Injectable()
export class CadetService {
  constructor(
    @InjectModel(Cadet) private cadetModel: typeof Cadet,
    @InjectModel(Course) private courseModel: typeof Course,
  ) {}
  async findAll() {
    const cadets = await this.cadetModel.findAll({
      include: { all: true },
      order: [['createdAt', 'DESC']],
    });

    return cadets;
  }

  async create(dto: CreateCadetDto) {
    const course = await this.courseModel.findByPk(dto.courseId);

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.BAD_REQUEST);
    }
    const cadet = await this.cadetModel.create(dto, { include: { all: true } });

    return cadet;
  }
}
