From alpine:latest

ENV HOME /home/calendar
ENV PATH=$PATH:$HOME/node_modules/.bin


COPY ./package.json /package.json

RUN apk update && apk add nodejs npm
RUN npm install
RUN rm /package.json

WORKDIR ${HOME}
