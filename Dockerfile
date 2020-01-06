FROM node:alpine
WORKDIR /usr/vyshnavnodeapp
COPY ./ ./
RUN npm install
CMD ["npm","start"]