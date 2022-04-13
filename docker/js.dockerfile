From alpine:latest

ENV HOME /opt/calendar
ENV PATH "${HOME}/node_modules/.bin:${PATH}"

WORKDIR ${HOME}

COPY ./package.json ${HOME}/package.json

RUN apk update && apk add nodejs npm
RUN npm install --save-dev
RUN rm ${HOME}/package.json