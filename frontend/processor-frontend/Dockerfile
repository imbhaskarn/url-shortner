# Stage 1: Build the React app
FROM node:18-alpine as build

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock /app/
RUN yarn install

COPY . /app/
RUN yarn build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE 3000

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
