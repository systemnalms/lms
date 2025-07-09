# ===== STAGE 1: BUILD =====
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# ===== STAGE 2: RUNTIME =====
FROM node:18-alpine AS runner

WORKDIR /app

# ✅ Install curl in runtime image (needed for health checks)
RUN apk add --no-cache curl

# Copy only compiled code and runtime deps
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --omit=dev

# CMD will be overridden by docker-compose
CMD ["node", "dist/main.js"]
