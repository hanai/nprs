FROM node:9.8.0
ARG NPM_REGISTRY
ADD . /code
WORKDIR /code
RUN npm config set registry $NPM_REGISTRY
RUN yarn install