#!env bash

docker run -v ~/dev/events/web/app:/opt/calendar/app -v ~/dev/events/web/test:/opt/calendar/test -it events-web-js:dev sh
