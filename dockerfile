FROM node:18-alpine as builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . /app
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./src/nginx/default.conf /etc/nginx/conf.d/default.conf
ENV VITE_BASE_URL=a4172b64968904b5982f9ca31f389a84-1576877609.eu-central-1.elb.amazonaws.com/erp
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]