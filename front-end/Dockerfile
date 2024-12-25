FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY ./ .

RUN npm run build

FROM nginx:1.25.2-alpine as production-stage

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone/ ./
COPY --from=builder /app/.next/static ./.next/static

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN apk add --no-cache nodejs

EXPOSE 80

EXPOSE ${FE_PORT}

COPY start.sh /start.sh

RUN chmod +x /start.sh

CMD ["/start.sh"]

