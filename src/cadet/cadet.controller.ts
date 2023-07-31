import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { CadetService } from './cadet.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCadetDto } from './dto/createCadet.dto';
import { Cadet } from './cadet.model';

@ApiTags('Cadets')
@Controller('cadets')
export class CadetController {
  constructor(private cadetService: CadetService) {}

  @ApiOperation({ summary: 'Get Cadets' })
  @ApiResponse({ status: HttpStatus.OK, type: [Cadet] })
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
