FROM node:8-alpine

ENV NODE_ENV=production

# Create app directory
WORKDIR /app
COPY . /app

RUN yarn install

EXPOSE 3000
CMD [ "yarn", "start" ]
