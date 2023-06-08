# Dockerfile for Vue client

# Build Vue client
FROM node:19-alpine

# Working directory be app
WORKDIR /usr/src/app


COPY package*.json ./

COPY yarn.lock ./

###  Installing dependencies
RUN npm install --silent

# copy local files to app folder
COPY . .

ENV VUE_APP_BACKEND_URL=http://localhost:3000

EXPOSE 8081

CMD ["npm","run", "serve"]