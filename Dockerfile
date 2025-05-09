FROM node:22-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "build/src/index.js"]
