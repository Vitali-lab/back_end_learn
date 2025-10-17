FROM node:10

WORKDIR /usr/src/app

COPY . .

RUN npm i

EXPOSE 4000

CMD ['npm','dev']

