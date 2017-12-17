FROM node:8-alpine
WORKDIR /srv
COPY . .
RUN mkdir uploads
RUN yarn install --production
EXPOSE 8888
CMD [ "node", "index.js" ]