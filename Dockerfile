FROM node:9-alpine

ARG COMPONENT_NAME
ENV COMPONENT_NAME=${COMPONENT_NAME}
ENV NODE_ENV=production

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
COPY common/ /app/common
COPY ${COMPONENT_NAME}/ /app/${COMPONENT_NAME}

RUN yarn install --production

EXPOSE 3000
CMD yarn start:${COMPONENT_NAME}
