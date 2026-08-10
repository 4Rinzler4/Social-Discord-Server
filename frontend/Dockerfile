
FROM node:22-slim AS base
WORKDIR /app

COPY package.json package-lock.json .npmrc ./

RUN npm ci \ 
    && npm rebuild esbuild --ignore-scripts=false

FROM base AS dev

ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN chown -R node:node /app
USER node
EXPOSE 3000

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]


FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build