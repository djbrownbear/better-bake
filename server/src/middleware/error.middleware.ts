import type { FastifyError, FastifyRequest, FastifyReply } from 'fastify';

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  console.error(`[ERROR] ${request.method} ${request.url}:`, error);

  reply.status(statusCode).send({
    error: message,
    statusCode,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
}
