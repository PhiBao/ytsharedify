# Stage 1: Build the React application
FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ARG REACT_APP_API_URL
ARG REACT_APP_TOKEN_KEY
ARG REACT_APP_CABLE_ENDPOINT

RUN REACT_APP_API_URL=$REACT_APP_API_URL \
  REACT_APP_TOKEN_KEY=$REACT_APP_TOKEN_KEY \
  REACT_APP_CABLE_ENDPOINT=$REACT_APP_CABLE_ENDPOINT \
  npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:1.19

COPY --from=build /app/build /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
