# frontend/Dockerfile

FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 정적 파일 nginx로 서빙
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# SPA 라우팅을 위해 index.html 기본
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
