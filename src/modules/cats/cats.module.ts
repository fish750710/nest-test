import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entity/cat.entity';
import { dataBaseName } from '../../config/mysql.config';
// import { MongooseModule } from '@nestjs/mongoose'; // mongo 用
// import { Cat, CatSchema } from './schemas/cat.schema'; // mongo 用

@Module({
  imports: [TypeOrmModule.forFeature([Cat], dataBaseName)], // 引入 mysql
  // imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])], // mongodb 註冊 Cat 模型
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], //共享模塊
})
export class CatsModule {}
