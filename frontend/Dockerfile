FROM node:18

RUN apt-get update

WORKDIR /usr/root/frontend

COPY . /usr/root/frontend/

EXPOSE 4242

RUN npm i

ENTRYPOINT [ "npm", "run", "dev" ]
