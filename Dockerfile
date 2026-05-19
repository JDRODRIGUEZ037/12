# Stage 1: Build the NestJS application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files from the subfolder (Separated to prevent Docker edge cases with spaces in paths)
COPY ["app version 2/server/package.json", "./"]
COPY ["app version 2/server/package-lock.json", "./"]
COPY ["app version 2/server/prisma", "./prisma/"]

# Install all dependencies
RUN npm install

# Copy the rest of the server code from the subfolder
COPY ["app version 2/server", "./"]

# Generate the Prisma Client and build the NestJS project
RUN npx prisma generate
RUN npm run build

# Stage 2: Create the production runner image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files and prisma directory
COPY ["app version 2/server/package.json", "./"]
COPY ["app version 2/server/package-lock.json", "./"]
COPY ["app version 2/server/prisma", "./prisma/"]

# Install only production dependencies
RUN npm install --omit=dev

# Copy generated Prisma Client and built application files from builder stage
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/dist ./dist

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Command to run the NestJS server
CMD ["node", "dist/main"]
