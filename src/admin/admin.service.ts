import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './admin.model';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { LoginAdminDto } from './dto/loginAdmin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  static TIMER = 1000 * 60 * 60;

  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private jwtService: JwtService,
  ) {}
  async findAll(): Promise<Admin[]> {
    const admins = await this.adminRepository.findAll();

    return admins;
  }

  async find(adminPayload): Promise<Admin> {
    const admin = await this.adminRepository.findByPk(adminPayload.id, {
      include: { all: true },
    });

    if (!admin) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }

    return admin;
  }

  async create(adminDto: CreateAdminDto) {
    const admin = await this.adminRepository.findOne({
      where: { email: adminDto.email },
    });

    if (admin) {
      throw new HttpException(
        'Admin from this email already used',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(adminDto.password, 10);

    await this.adminRepository.create({
      email: adminDto.email,
      password: hashedPassword,
    });

    return { message: 'Admin successfully updated' };
  }

  async adminLogin(dto: LoginAdminDto) {
    const admin = await this.adminRepository.findOne({
      attributes: { include: ['password'] },
      where: { email: dto.email },
    });

    if (!admin) {
      throw new HttpException(
        'Email or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordValid = await bcrypt.compare(dto.password, admin.password);

    if (!isPasswordValid) {
      throw new HttpException(
        'Email or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await this.jwtService.signAsync({ id: admin.id });

    return { token };
  }
}
