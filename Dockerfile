FROM node:8-alpine

ARG COMPONENT_NAME
ENV NODE_ENV=production

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
COPY common/ /app
COPY ${COMPONENT_NAME}/ /app

RUN yarn install --production

EXPOSE 3000
CMD yarn start:${COMPONENT_NAME}
