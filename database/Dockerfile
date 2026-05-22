# Base image matching Supabase standard Postgres 15 environment
FROM supabase/postgres:15.6.1.138

# Copy SQL schema definition to auto-initialize on container startup
COPY schema.sql /docker-entrypoint-initdb.d/00-schema.sql

# Set default credentials for local and deployment settings (can be overridden at runtime)
ENV POSTGRES_DB=postgres
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

# Healthcheck to verify database readiness before dependent services connect
HEALTHCHECK --interval=5s --timeout=5s --retries=5 \
  CMD pg_isready -U postgres -d postgres

EXPOSE 5432
