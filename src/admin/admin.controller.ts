import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Admin } from './admin.model';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { AuthGuard } from 'src/admin/auth.guard';
import { LoginAdminDto } from './dto/loginAdmin.dto';
import { Request } from 'express';

@ApiTags('Admins')
@Controller('admins')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @ApiOperation({ summary: 'Create admin' })
  @ApiResponse({ status: 201, type: Admin })
  @ApiBearerAuth()
  @Post('/')
  @UseGuards(AuthGuard)
  createAdmin(@Body() adminDto: CreateAdminDto) {
    return this.adminService.create(adminDto);
  }

  @ApiOperation({ summary: 'Login admin' })
  @ApiResponse({ status: 201 })
  @Post('/login')
  adminLogin(@Body() adminDto: LoginAdminDto) {
    return this.adminService.adminLogin(adminDto);
  }

  @ApiOperation({ summary: 'Get admin' })
  @ApiResponse({ status: 200, type: Admin })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/')
  getAdmin(@Req() req: Request) {
    return this.adminService.find(req['admin']);
  }
}
