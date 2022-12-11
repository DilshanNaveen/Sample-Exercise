# build environment
FROM node:alpine as react_build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

#prepare nginx
FROM nginx:stable-alpine
COPY --from=react_build /app/build /usr/share/nginx/html
COPY --from=react_build /app/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]