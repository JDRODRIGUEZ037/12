# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package configuration and prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Generate the Prisma Client and build the NestJS project
RUN npx prisma generate
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files and prisma directory
COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm ci --only=production

# Copy generated Prisma Client and built application files from stage 1
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/dist ./dist

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Command to run the NestJS server
CMD ["node", "dist/src/main"]
