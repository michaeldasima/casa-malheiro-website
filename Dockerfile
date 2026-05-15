FROM nginx:1.27-alpine

LABEL casa-malheiro-build="2026-05-15-mobile-gallery-v16"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

EXPOSE 80
