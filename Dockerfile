FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build --workspace=standalone

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/apps/standalone/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]