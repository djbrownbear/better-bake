FROM node:22.12-slim

WORKDIR /app

# Install OpenSSL (required by Prisma)
RUN apt-get update -y && apt-get install -y openssl

# Copy package files AND prisma schema before npm ci
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm ci

# Generate Prisma Client (must be before build)
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Build TypeScript (Prisma Client must be generated first)
RUN npm run build

# Start server (migrations handled by Railway pre-deploy command)
CMD ["npm", "start"]