ARG base_image=git.enterity.com:4567/community-calendar/web:develop
From $base_image

ENV HOME /opt/calendar

WORKDIR ${HOME}

COPY app               ${HOME}/app
COPY test              ${HOME}/test
