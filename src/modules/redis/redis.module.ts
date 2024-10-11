import { Module, Global } from '@nestjs/common';
import Redis, { Redis as RedisClient } from 'ioredis';
import { redisConfig, redisName } from 'src/config/redis.config';

@Global()
@Module({
  providers: [
    {
      provide: redisName,
      useFactory: () => {
        const redis: RedisClient = new Redis(redisConfig);
        return redis;
      },
    },
  ],
  exports: [redisName],
})
export class RedisModule {}
