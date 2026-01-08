ARG NODE_VERSION=24.12.0

FROM node:${NODE_VERSION}-alpine AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json .
RUN npm ci

COPY frontend/ .

RUN npm run build

FROM node:${NODE_VERSION}-alpine AS backend-build

WORKDIR /backend

COPY backend/package*.json .
RUN npm ci

COPY backend/ .

FROM node:${NODE_VERSION}-alpine

WORKDIR /

COPY --from=backend-build /backend/src ./src
COPY --from=backend-build /backend/package.json .
COPY --from=backend-build /backend/package-lock.json .
COPY --from=frontend-build /backend/dist ./dist

RUN npm ci

USER node

EXPOSE 3000

CMD ["npm", "start"]