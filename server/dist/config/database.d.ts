import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.js';
export declare const prisma: PrismaClient;
export declare function connectDatabase(): Promise<void>;
export declare function disconnectDatabase(): Promise<void>;
//# sourceMappingURL=database.d.ts.map