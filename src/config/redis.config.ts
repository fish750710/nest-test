import { RedisModuleOptions } from 'nestjs-redis';

export const redisName = 'REDIS_CLIENT';

export const redisConfig: RedisModuleOptions = {
  host: 'localhost', // Redis 服务器的 IP
  port: 6379, // 默认端口
};

/** ubuntu
 * 運行: redis-server
 * 確認運行狀況 PONG正常 : redis-cli ping
 * redis-cli
 * 查詢 Keys: SCAN 0
 * 刪除 Key: DEL myKey
 * 清除當前數據庫: FLUSHDB
 * 設置過期時效 秒: EXPIRE myKey 60
 */
