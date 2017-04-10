FROM mhart/alpine-node:6

ARG buildno=n/a
ENV BUILD_NO=$buildno

RUN apk add --update bash git \
    && rm -rf /var/cache/apk/*

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
CMD npm run prod
