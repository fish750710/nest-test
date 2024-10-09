import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; // 加載環境變數
@Module({
  // 引入模塊
  imports: [
    // TypeOrmModule.forRoot({
    //   name: 'mysqlCats',
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'nestjs',
    //   entities: [],
    //   synchronize: false, // true 不能用在生產環境
    // }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI), // 配置 mongodb
    CatsModule,
  ],
})
export class AppModule {}
