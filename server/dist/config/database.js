import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
const globalForPrisma = global;
// Create simple PostgreSQL connection pool
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});
// Create Prisma adapter
const adapter = new PrismaPg(pool);
export const prisma = globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = prisma;
export async function connectDatabase() {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
}
export async function disconnectDatabase() {
    await prisma.$disconnect();
}
//# sourceMappingURL=database.js.map