FROM node:20.5.1

RUN apt-get update

WORKDIR /usr/root/backend

COPY . /usr/root/backend/

EXPOSE 4000

RUN npm i

RUN npm run build

ENTRYPOINT [ "npm", "run", "start:prod" ]
