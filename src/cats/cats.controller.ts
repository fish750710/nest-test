import {
  Controller,
  Get,
  // Req,
  Post,
  // HttpCode,
  // Header,
  // Redirect,
  Param,
  Body,
  Delete,
  UsePipes,
} from '@nestjs/common';
// import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
// import { Cat } from './entity/cat.entity';
import { Cat } from './schemas/cat.schema';
import { ValidationPipe } from '../common/pipe/validate.pipe';

@Controller('cats')
export class CatsController {
  // 依賴注入 service
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UsePipes(new ValidationPipe()) // 綁定驗證管道
  // @HttpCode(204)
  // @Header('Cache-Control', 'none')
  // @Redirect('https://docs.nestjs.com', 302)
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  // http://localhost:3000/cats/
  @Get()
  async findAll(): Promise<Cat[]> {
    // { name: 'Hans', age: 18, breed: 'Persian' }
    return this.catsService.findAll();
  }

  // http://localhost:3000/cats/123
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
