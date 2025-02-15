FROM node:23.8.0-alpine3.20 AS build
WORKDIR /usr
COPY package.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:23.8.0-alpine3.20
WORKDIR /usr
COPY package.json ./
RUN sed -i 's/"prepare": "husky"/"prepare": ""/g' package.json
RUN npm install --only=production
COPY --from=build /usr/dist ./dist
EXPOSE 3200
CMD ["npm", "run", "start:prod"]
