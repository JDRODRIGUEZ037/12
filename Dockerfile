# Stage 1: Build the NestJS application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY ["app version 2/server/package.json", "./"]
COPY ["app version 2/server/package-lock.json", "./"]
COPY ["app version 2/server/prisma", "./prisma/"]

# Install all dependencies
RUN npm install

# Copy the rest of the server code
COPY ["app version 2/server", "./"]

# Generate the Prisma Client and build the NestJS project
RUN npx prisma generate
RUN npm run build

# Remove development dependencies to slim down the image
RUN npm prune --production

# Stage 2: Create the production runner image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files
COPY ["app version 2/server/package.json", "./"]

# Copy compiled dist and optimized node_modules from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Command to run the NestJS server
CMD ["node", "dist/main"]
