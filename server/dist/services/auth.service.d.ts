import type { RegisterInput, LoginInput, UserResponse } from '../types/index.js';
export declare function hashPassword(password: string): Promise<string>;
export declare function comparePassword(password: string, hash: string): Promise<boolean>;
export declare function sanitizeUser(user: any): UserResponse;
export declare function registerUser(input: RegisterInput): Promise<UserResponse>;
export declare function loginUser(input: LoginInput): Promise<UserResponse>;
export declare function getUserById(userId: string): Promise<UserResponse | null>;
//# sourceMappingURL=auth.service.d.ts.map