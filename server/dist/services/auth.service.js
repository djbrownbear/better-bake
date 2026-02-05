import bcrypt from 'bcrypt';
import { prisma } from '../config/database.js';
const SALT_ROUNDS = 10;
export async function hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}
export async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}
export function sanitizeUser(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
export async function registerUser(input) {
    const { email, password, name, avatarURL } = input;
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }
    // Hash password
    const hashedPassword = await hashPassword(password);
    // Create user
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            avatarURL: avatarURL || null,
        },
    });
    return sanitizeUser(user);
}
export async function loginUser(input) {
    const { email, password } = input;
    // Find user
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    // Verify password
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
        throw new Error('Invalid email or password');
    }
    return sanitizeUser(user);
}
export async function getUserById(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        return null;
    }
    return sanitizeUser(user);
}
//# sourceMappingURL=auth.service.js.map