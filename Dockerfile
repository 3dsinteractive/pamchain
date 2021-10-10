FROM 3dsinteractive/node:14.15

WORKDIR /app

COPY ./package.json /app
COPY ./yarn.lock /app
RUN yarn

ADD . /app
RUN yarn truffle compile
RUN yarn generate-types
RUN yarn build

EXPOSE 3000
CMD yarn start
