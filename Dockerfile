From nginx:1.16-alpine

ENV NGINX_PORT=80
ENV HOME /opt/calendar

WORKDIR ${HOME}

COPY config/nginx.conf /etc/nginx/nginx.conf
COPY package.json ${HOME}/package.json

RUN apk update && apk add nodejs npm
RUN npm install brunch@2.10.17

