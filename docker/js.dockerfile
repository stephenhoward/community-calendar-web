From alpine:latest

ENV NGINX_PORT=80
ENV HOME /opt/calendar
ENV PATH "${HOME}/node_modules/.bin:${PATH}"

WORKDIR ${HOME}

COPY package.json      ${HOME}/package.json
COPY brunch-config.js  ${HOME}/brunch-config.js

RUN apk update && apk add nodejs npm
RUN npm install --save-dev
