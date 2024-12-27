import { plainToClass } from 'class-transformer';
import { DBType, Mode } from './env.interface';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';
import { Languages } from 'src/typings/common';

class Env {
  @IsEnum(Mode)
  MODE: Mode;

  @IsNumber()
  @Min(1000)
  PORT: number;

  @IsNumber()
  @Min(2)
  @Max(50)
  BCRYPT_SALT: number;

  @IsEnum(DBType)
  DB_TYPE: DBType;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  @MinLength(4)
  DB_HOST: string;

  @IsString()
  @MinLength(1)
  DB_DATABASE: string;

  @IsString()
  @MinLength(1)
  DB_USERNAME: string;

  @IsString()
  @MinLength(2)
  DB_PASSWORD: string;

  @IsBoolean()
  DB_SYNCHRONIZE: true;

  @IsString()
  @MinLength(1)
  DB_SCHEMA: string;

  @IsEnum(Languages)
  FALLBACK_LANGUAGE: Languages;
}

export default function (config: Record<string, unknown>) {
  const parsed = plainToClass(Env, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(parsed);
  if (errors.length) throw new Error(errors.toString());

  const {
    PORT,
    MODE,
    DB_TYPE,
    DB_PORT,
    DB_HOST,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_SYNCHRONIZE,
    DB_SCHEMA,
    BCRYPT_SALT,
    FALLBACK_LANGUAGE,
  } = parsed;

  return {
    PORT,
    MODE,
    BCRYPT_SALT,
    FALLBACK_LANGUAGE,
    DB: {
      DB_TYPE,
      DB_PORT,
      DB_HOST,
      DB_DATABASE,
      DB_USERNAME,
      DB_PASSWORD,
      DB_SYNCHRONIZE,
      DB_SCHEMA,
    },
  };
}
