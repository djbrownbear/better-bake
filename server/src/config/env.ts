import 'dotenv/config';

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

export const serverConfig = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  productionUrl: process.env.PRODUCTION_URL || 'https://aaron.aaronandanita.com/better-bake',
  trustProxy: process.env.TRUST_PROXY === 'true' || process.env.NODE_ENV === 'production',
};

export const corsOrigins = [
  serverConfig.frontendUrl,
  serverConfig.productionUrl,
  'http://localhost:5173',
  'http://localhost:3000',
];
