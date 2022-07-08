FROM node:14.15.5

   WORKDIR /app 
    COPY package.json .
    RUN npm install
    RUN  npm config set "strict-ssl" false
    RUN npm rebuild node-sass
    COPY . .
    EXPOSE 3000
    CMD ["npm","start"]