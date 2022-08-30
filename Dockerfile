FROM node:12

WORKDIR /user/src/app

COPY package*.json ./

COPY . .

CMD npm run start:docker:dev