# syntax=docker/dockerfile:1

# Build the Angular app (Angular 15 supports Node 14, 16 and 18)
FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
RUN npx ng build --configuration production

# Serve the static files with nginx
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/angular-restaurant-qr-code /usr/share/nginx/html

EXPOSE 80
