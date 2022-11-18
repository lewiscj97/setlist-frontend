FROM node:18 as app-build

WORKDIR /app
COPY package.json /app/

RUN npm install --omit=dev

COPY src/ /app/src/
RUN npm run build

FROM nginx:1.23-alpine

RUN rm /usr/share/nginx/html/index.html
COPY --from=app-build /app/src/ /usr/share/nginx/html/app/
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
