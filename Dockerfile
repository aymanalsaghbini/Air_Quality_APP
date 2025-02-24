FROM node:20.10-alpine AS base

# Install dependencies only when needed
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy and install the dependencies for the project
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable NextJS telemetry during the build
ENV NEXT_TELEMETRY_DISABLED 1

# Setting build time variables
ARG NEXT_PUBLIC_ENVIRONMENT
ARG NEXT_PUBLIC_UAT_BASE_URL
ARG NEXT_PUBLIC_PROD_BASE_URL
ARG NEXT_PUBLIC_CLIENT_ID
ARG NEXT_PUBLIC_AUTHORITY
ARG NEXT_PUBLIC_REDIRECT_URI

# Check if the variables are set correctly
# RUN echo "Value for NEXT_PUBLIC_ENVIRONMENT: $NEXT_PUBLIC_ENVIRONMENT"

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1

# Using the non-root user to run the application
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]