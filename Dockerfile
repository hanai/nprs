FROM node:9.8.0
ARG NPM_REGISTRY
ADD . /code
WORKDIR /code
RUN npm config set registry https://registry.npm.taobao.org
RUN PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 yarn install
