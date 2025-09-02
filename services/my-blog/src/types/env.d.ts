// src/types/env.d.ts
declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: 'development' | 'production' | 'test';
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    JWT_SECRET: string;
    JWT_EXPIRE: string;
    BCRYPT_SALT_ROUNDS: string;
  }
}