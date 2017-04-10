FROM mhart/alpine-node:6

ARG buildno=n/a
ENV BUILD_NO=$buildno

RUN apk add --update bash git \
    && rm -rf /var/cache/apk/*

RUN npm install -g pm2

ADD package.json /tmp/package.json

RUN cd /tmp \
    && npm install

RUN mkdir -p /apps \
    && cp -a /tmp/node_modules /apps


WORKDIR /apps
ADD . /apps
RUN npm run build && npm prune --production

ARG buildno=n/a
ENV BUILD_NO=$buildno

EXPOSE 3000
ADD start.sh /start.sh
RUN chmod 766 /start.sh
CMD ["/start.sh"]
