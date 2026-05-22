# Supabase PostgreSQL Database Image

This folder contains the Docker configuration to containerize and deploy your PostgreSQL database, mirroring the Supabase database stack. It pre-loads the latest SQL schema generated from the application's Prisma models.

## Structure

*   `Dockerfile`: Configures the PostgreSQL image using the official `supabase/postgres` release, sets up auto-initialization, default credentials, and healthchecks.
*   `schema.sql`: Contains the database schema generated from Prisma (`User`, `SocialAccount`, `AuditLog` tables, foreign keys, and indexes).

## Local Development and Testing

### 1. Build the Docker Image
To build the image locally, navigate to the `database` folder (or run from root with path specified):
```bash
docker build -t supabase-db:latest .
```

### 2. Run the Container
Start the container and map the port 5432 to your host system:
```bash
docker run -d \
  --name supabase-db-local \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=your_secure_password \
  supabase-db:latest
```

### 3. Verify Connection and Schema
Once running, the database will automatically initialize using `schema.sql`. You can verify this using any PostgreSQL client or pgAdmin:
*   **Host**: `localhost`
*   **Port**: `5432`
*   **Database**: `postgres`
*   **Username**: `postgres`
*   **Password**: `your_secure_password`

## CI/CD Pipeline & Registry
When changes are pushed to the `main` branch, GitLab CI/CD builds this Dockerfile and pushes it to the GitLab Container Registry.

### Connect to the GitLab Hosted Image
You can pull the built image directly from your GitLab Container Registry:
```bash
docker pull registry.gitlab.com/<username>/<repository-name>/supabase-db:latest
```
