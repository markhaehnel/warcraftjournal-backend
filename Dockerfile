FROM node:8-alpine

# Create app directory
WORKDIR /app
COPY . /app

RUN yarn install

EXPOSE 3000
CMD [ "yarn", "start" ]
