# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

ENV NODE_ENV docker

RUN npm run build

EXPOSE 3002

ENTRYPOINT ["npm", "start"]

USER node
