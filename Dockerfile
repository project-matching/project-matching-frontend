FROM node:16.15.0

WORKDIR /frontend

COPY ["package.json", "yarn.lock", "/frontend/"]

EXPOSE 3000

RUN yarn

COPY ./ /frontend/

CMD yarn run dev --port 3000