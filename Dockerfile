FROM node:16-alpine
LABEL Author="Saeed Shariati"

WORKDIR /app
COPY package.json package-lock.json openapi-ui.js /app/
COPY sample/urls.yaml /app/config/urls.yaml
RUN npm ci --prod
CMD ["node", "openapi-ui.js"]

