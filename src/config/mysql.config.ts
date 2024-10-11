import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cat } from '../modules/cats/entity/cat.entity';

export const dataBaseName = 'mysqlCats';

export const database: TypeOrmModuleOptions = {
  name: dataBaseName,
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'nestdb', // 對應 mysql 資料庫名稱
  entities: [Cat], // 加入實體
  synchronize: false, // true 不能用在生產環境 (自動同步數據庫)
};
