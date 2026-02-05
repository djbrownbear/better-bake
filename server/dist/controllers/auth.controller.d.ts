import type { FastifyRequest, FastifyReply } from 'fastify';
import type { LoginInput, RegisterInput } from '../types/index.js';
interface LoginBody {
    Body: LoginInput;
}
interface RegisterBody {
    Body: RegisterInput;
}
export declare function register(request: FastifyRequest<RegisterBody>, reply: FastifyReply): Promise<void>;
export declare function login(request: FastifyRequest<LoginBody>, reply: FastifyReply): Promise<void>;
export declare function getMe(request: FastifyRequest, reply: FastifyReply): Promise<void>;
export {};
//# sourceMappingURL=auth.controller.d.ts.map