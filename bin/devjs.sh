#!env bash

docker run -v ~/dev/events/web:/home/calendar -p 3000:3000 -it events-web-js:dev  vite --host
