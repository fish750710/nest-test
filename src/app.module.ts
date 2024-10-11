import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from './config/mysql.config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config'; // 加載環境變數
@Module({
  // 引入模塊
  imports: [
    TypeOrmModule.forRoot(database), // mySql 配置資料庫設置
    // ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.MONGO_URI), // 配置 mongodb
    CatsModule,
  ],
})
export class AppModule {}
