FROM node:16
ENV OPTIPNG_BINARIES=none
WORKDIR /app
COPY package*.json ./
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    autoconf \
    automake \
    libtool
RUN npm install --ignore-scripts
COPY . .
EXPOSE 3000
CMD ["npm", "run", "serve"]
