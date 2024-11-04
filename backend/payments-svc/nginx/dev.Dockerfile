FROM nginx:1.25.0-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY dev.nginx.conf /etc/nginx/conf.d

EXPOSE 80