From nginx:1.16-alpine

ENV NGINX_PORT=80

COPY config/nginx.conf /etc/nginx/nginx.conf