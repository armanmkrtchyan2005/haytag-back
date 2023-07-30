import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './admin.model';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { LoginAdminDto } from './dto/loginAdmin.dto';
import * as bcrypt from 'bcrypt';
import { EditAdminDto } from './dto/editAdmin.dto';

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

  async find(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findByPk(id, {
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

  async adminLogin(session: Record<string, any>, dto: LoginAdminDto) {
    if (!session.count) {
      session.count = 0;
    }

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

    if (admin.isBlocked) {
      throw new HttpException('Admin is blocked', HttpStatus.FORBIDDEN);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, admin.password);

    if (!isPasswordValid) {
      session.count += 1;

      if (session.count === 3) {
        admin.isBlocked = true;
        await admin.save();

        setTimeout(() => {});
      }

      throw new HttpException(
        'Email or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await this.jwtService.signAsync({ id: admin.id });

    return { token };
  }

  async edit(id: number, dto: EditAdminDto) {
    const admin = await this.adminRepository.findByPk(id, {
      include: { all: true },
    });

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    await admin.update({ password: hashedPassword });

    return { message: 'Admin successfully updated' };
  }
}
