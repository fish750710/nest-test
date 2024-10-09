import { Injectable } from '@nestjs/common';
// import { Cat } from './entity/cat.entity';
import { Cat, CatDocument } from './schemas/cat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  // mongodb
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  // private readonly cats: Cat[] = [];

  // create(cat: Cat) {
  //   this.cats.push(cat);
  // }
  // findAll(): Cat[] {
  //   return this.cats;
  // }

  async create(cat: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(cat);
    return createdCat.save(); // 保存
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec(); // 查找所有
  }
}
