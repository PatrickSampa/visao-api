FROM node:18

WORKDIR /user/src/app
COPY . .
RUN apt-get update && apt-get install -y python3 python3-pip

WORKDIR /user/src/app/python
RUN apt-get update && apt-get install -y \
    python3 \
    python3-requests \
    python3-bs4

# Volte para o diretório raiz
WORKDIR /user/src/app



RUN npm install
RUN yarn add cors morgan

CMD npm run serve