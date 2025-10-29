FROM node:20-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS dev-deps
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=dev-deps /app/node_modules /app/node_modules
COPY . .
RUN pnpm run build

FROM base AS prod-deps
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile --prod

FROM node:20-alpine AS runner
RUN corepack enable
WORKDIR /app

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY package.json pnpm-lock.yaml ./

EXPOSE 3000
CMD ["pnpm", "start"]