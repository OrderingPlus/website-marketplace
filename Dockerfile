FROM node:18.19-slim AS development
WORKDIR /website-marketplace
COPY package.json .
RUN npm install --ignore-scripts --force
COPY . .
EXPOSE 3000
CMD ["npm", "run", "serve-docker"]
