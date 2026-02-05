FROM node:22.12-slim

WORKDIR /app

# Install OpenSSL (required by Prisma)
RUN apt-get update -y && apt-get install -y openssl

# Copy package files AND prisma schema before npm ci
COPY package*.json ./
COPY prisma ./prisma

RUN npm ci

# Copy the rest of the application
COPY . .

RUN npm run build

CMD ["npm", "start"]