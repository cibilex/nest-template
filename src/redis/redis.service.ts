import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  redis: Redis;

  constructor() {
    // Redis client will be initialized once when the app starts
    this.redis = new Redis({
      host: 'localhost', // Redis host
      port: 6379, // Redis port
      password: 'redis_password', // Optional if Redis requires authentication
    });
  }

  // Example common method (you can add more as needed)
  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async exists(key: string): Promise<number> {
    return this.redis.exists(key);
  }

  async ttl(key: string): Promise<number> {
    return this.redis.ttl(key);
  }

  async expire(key: string, seconds: number): Promise<number> {
    return this.redis.expire(key, seconds);
  }

  async persist(key: string): Promise<number> {
    return this.redis.persist(key);
  }

  // Called when the module is initialized
  onModuleInit() {
    console.log('Redis client connected');
  }

  // Called when the module is destroyed
  onModuleDestroy() {
    this.redis.quit(); // Properly close the Redis connection when the app stops
  }
}
