import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Admin } from './admin.model';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { AuthGuard } from 'src/admin/auth.guard';
import { LoginAdminDto } from './dto/loginAdmin.dto';
import { EditAdminDto } from './dto/editAdmin.dto';

@ApiTags('Admins')
@Controller('admins')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @ApiOperation({ summary: 'Create admin' })
  @ApiResponse({ status: 201, type: Admin })
  // @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('/')
  createAdmin(@Body() adminDto: CreateAdminDto) {
    return this.adminService.create(adminDto);
  }

  @ApiOperation({ summary: 'Login admin' })
  @ApiResponse({ status: 201 })
  @Post('/login')
  adminLogin(@Body() adminDto: LoginAdminDto) {
    return this.adminService.adminLogin(adminDto);
  }

  @ApiOperation({ summary: 'Get admins' })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/')
  getAdmins() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get admin' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/:id')
  getAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.find(id);
  }

  @ApiOperation({ summary: 'Edit admin password' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  editAdmin(@Param('id', ParseIntPipe) id: number, @Body() dto: EditAdminDto) {
    return this.adminService.edit(id, dto);
  }
}
