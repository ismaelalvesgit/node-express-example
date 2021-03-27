FROM node:carbon

LABEL maintainer="Carlos"
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Porta
EXPOSE 3000

# Healthcheck
# HEALTHCHECK --interval=60s --timeout=20s CMD curl --fail http://localhost:3000/system/healthcheck || exit 1

CMD [ "npm", "start" ]