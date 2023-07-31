import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CadetService } from './cadet.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCadetDto } from './dto/createCadet.dto';
import { Cadet } from './cadet.model';
import { AuthGuard } from 'src/admin/auth.guard';

@ApiTags('Cadets')
@Controller('cadets')
export class CadetController {
  constructor(private cadetService: CadetService) {}

  @ApiOperation({ summary: 'Get Cadets' })
  @ApiResponse({ status: HttpStatus.OK, type: [Cadet] })
  @UseGuards(AuthGuard)
  @Get('/')
  findAll() {
    return this.cadetService.findAll();
  }

  @ApiOperation({ summary: 'Create Cadet' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Cadet })
  @Post('/')
  create(@Body() dto: CreateCadetDto) {
    return this.cadetService.create(dto);
  }
}
