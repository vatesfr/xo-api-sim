FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY tsconfig.json ./
COPY swagger.json ./
COPY src/ ./src/

RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001

COPY --from=builder --chown=appuser:nodejs /app/dist ./dist
COPY --from=builder --chown=appuser:nodejs /app/swagger.json ./
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts && \
    chown -R appuser:nodejs /app

# Add curl to the image to allow health checks to work properly
RUN apk add --no-cache curl

USER appuser

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["node", "dist/index.js"]
