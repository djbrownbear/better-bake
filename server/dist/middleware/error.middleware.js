export async function errorHandler(error, request, reply) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    console.error(`[ERROR] ${request.method} ${request.url}:`, error);
    reply.status(statusCode).send({
        error: message,
        statusCode,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    });
}
//# sourceMappingURL=error.middleware.js.map