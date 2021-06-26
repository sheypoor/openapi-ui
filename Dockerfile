FROM node:16-alpine
LABEL Author="Saeed Shariati"

WORKDIR /app
COPY package.json package-lock.json openapi-ui.js /app/
COPY config /app/config/
RUN npm ci --prod
CMD ["node", "openapi-ui.js"]

