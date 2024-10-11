import { Injectable } from '@nestjs/common';
import { Cat } from './entity/cat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { dataBaseName } from '../../config/mysql.config';
// import { Cat, CatDocument } from './schemas/cat.schema';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  // mongodb
  // constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  // mySql
  constructor(
    @InjectRepository(Cat, dataBaseName) // 和 mysql 配置名一致
    private readonly catsRepository: Repository<Cat>,
  ) {}

  // private readonly cats: Cat[] = [];

  create(cat: Cat) {
    // this.cats.push(cat);
    return this.catsRepository.save(cat);
  }
  findAll(): any {
    return this.catsRepository.find();
  }

  // async create(cat: CreateCatDto): Promise<Cat> {
  //   const createdCat = new this.catModel(cat);
  //   return createdCat.save(); // 保存
  // }

  // async findAll(): Promise<Cat[]> {
  //   return this.catModel.find().exec(); // 查找所有
  // }
}
