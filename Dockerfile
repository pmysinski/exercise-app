FROM node:19

WORKDIR /app
RUN chown node:node ./
USER node

ENV NODE_ENV production

COPY package.json package-lock.json* ./

RUN npm ci && npm cache clean --force
COPY ./server ./server
COPY ./db ./db
COPY ./config ./config
COPY ./knexfile.js ./knexfile.js

ENV PORT 3000
EXPOSE ${PORT}

CMD ["node", "./server/index.js"]