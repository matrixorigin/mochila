FROM node:16
ENV REACT_APP_BACKEND http://127.0.0.1
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

EXPOSE 3000
CMD ["npx", "serve", "build"]
