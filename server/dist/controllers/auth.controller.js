import { registerUser, loginUser, getUserById } from '../services/auth.service.js';
import { jwtConfig } from '../config/env.js';
export async function register(request, reply) {
    try {
        const user = await registerUser(request.body);
        const token = request.server.jwt.sign({ userId: user.id }, { expiresIn: jwtConfig.expiresIn });
        const response = {
            token,
            user,
        };
        reply.status(201).send(response);
    }
    catch (error) {
        reply.status(400).send({ error: error.message });
    }
}
export async function login(request, reply) {
    try {
        const user = await loginUser(request.body);
        const token = request.server.jwt.sign({ userId: user.id }, { expiresIn: jwtConfig.expiresIn });
        const response = {
            token,
            user,
        };
        reply.send(response);
    }
    catch (error) {
        reply.status(401).send({ error: error.message });
    }
}
export async function getMe(request, reply) {
    try {
        const userId = request.userId;
        if (!userId) {
            reply.status(401).send({ error: 'Unauthorized' });
            return;
        }
        const user = await getUserById(userId);
        if (!user) {
            reply.status(404).send({ error: 'User not found' });
            return;
        }
        reply.send(user);
    }
    catch (error) {
        reply.status(500).send({ error: error.message });
    }
}
//# sourceMappingURL=auth.controller.js.map