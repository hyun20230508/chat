import dotenv from 'dotenv';

dotenv.config();

function getValue(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;

  if (!value) {
    throw new Error('There is no value in Process variable');
  } else {
    return value;
  }
}

export const config = {
  db: {
    database: getValue('DB_DATABASE'),
    host: getValue('DB_HOST'),
    username: getValue('DB_USERNAME'),
    password: getValue('DB_PASSWORD'),
  },
  redis: {
    url: getValue('REDIS_URL'),
    username: getValue('REDIS_USERNAME'),
    password: getValue('REDIS_PASSWORD'),
  },
  jwt: {
    SecretKey: getValue('JWT_SECRET_KEY'),
    ExpiresIn: getValue('JWT_EXPIRES_IN', '1h'),
  },
  server: {
    port: getValue('PORT', '3000'),
  },
  bcrypt: {
    salt: getValue('BCRYPT_SALT', '2adwqe2313sa'),
  },
};
