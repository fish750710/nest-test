import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './entity/cat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { dataBaseName } from '../../config/mysql.config';
// import { Cat, CatDocument } from './schemas/cat.schema';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { CreateCatDto } from './dto/create-cat.dto';
import * as Redis from 'ioredis';
import { redisName } from 'src/config/redis.config';

/**
 * insert 不會更新
 * save 找不到會插入和更新
 * find
 * findOne
 * findByInds
 * remove
 * delete
 * count
 * clear
 */

const REDIS_KEY = 'cats';

@Injectable()
export class CatsService {
  // mongodb
  // constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  // mySql
  constructor(
    @Inject(redisName) private readonly redisClient: Redis.Redis, // 引入 Redis
    @InjectRepository(Cat, dataBaseName) // 和 mysql 配置名一致
    private readonly catsRepository: Repository<Cat>,
  ) {}

  // private readonly cats: Cat[] = [];

  async create(cat: Cat) {
    // this.cats.push(cat);
    const newCat = await this.catsRepository.save(cat);
    await this.update();
    return newCat;
  }
  async findAll(): Promise<any> {
    const cache = await this.getValue(REDIS_KEY);
    if (cache) {
      console.log('cache*****');
      return JSON.parse(cache);
    }
    return this.update();
  }

  async update() {
    const catsData = await this.catsRepository.find();
    // 設置 cache
    this.setValue(REDIS_KEY, JSON.stringify(catsData));
    return catsData;
  }

  async setValue(key: string, value: any) {
    await this.redisClient.set(key, value);
  }

  async getValue(key: string) {
    return await this.redisClient.get(key);
  }

  async findName(name: string) {
    // return this.catsRepository.findOne({ select: ['name'], where: { name } }); // 只拿到 name 的欄位，不適整個object

    const cache = await this.getValue(REDIS_KEY);
    if (cache) {
      const data = JSON.parse(cache);
      const result = data.find((item: any) => item.name === name);
      console.log('findName cache*****');
      if (!result) {
        return this.errorMessage(name);
      }
      return result;
    }

    const data = await this.catsRepository.findOne({ where: { name } });
    if (!data) {
      return this.errorMessage(name);
    }
    return data;
  }

  errorMessage(name: string) {
    return {
      message: `Cat with name:${name} not found`,
      error: 'Not Found',
      statusCode: 404,
    };
  }

  // async create(cat: CreateCatDto): Promise<Cat> {
  //   const createdCat = new this.catModel(cat);
  //   return createdCat.save(); // 保存
  // }

  // async findAll(): Promise<Cat[]> {
  //   return this.catModel.find().exec(); // 查找所有
  // }
}
