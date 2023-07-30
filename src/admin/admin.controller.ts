import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
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
  @ApiUnauthorizedResponse({
    schema: { example: { status: 401, message: 'Unauthorized' } },
  })
  @ApiBearerAuth()
  @Post('/')
  @UseGuards(AuthGuard)
  createAdmin(@Body() adminDto: CreateAdminDto) {
    return this.adminService.create(adminDto);
  }

  @ApiOperation({ summary: 'Login admin' })
  @ApiResponse({ status: 201 })
  @Post('/login')
  adminLogin(
    @Session() session: Record<string, any>,
    @Body() adminDto: LoginAdminDto,
  ) {
    return this.adminService.adminLogin(session, adminDto);
  }

  @ApiOperation({ summary: 'Get admins' })
  @ApiResponse({ status: 200, type: [Admin] })
  @ApiBearerAuth()
  @Get('/')
  @UseGuards(AuthGuard)
  getAdmins() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get admin' })
  @ApiResponse({ status: 200, type: Admin })
  @ApiBearerAuth()
  @Get('/:id')
  @UseGuards(AuthGuard)
  getAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.find(id);
  }

  @ApiOperation({ summary: 'Edit admin password' })
  @ApiResponse({ status: 200, type: Admin })
  @ApiBearerAuth()
  @Patch('/:id')
  @UseGuards(AuthGuard)
  editAdmin(@Param('id', ParseIntPipe) id: number, @Body() dto: EditAdminDto) {
    return this.adminService.edit(id, dto);
  }
}
