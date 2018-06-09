FROM node:8-alpine

# Node
WORKDIR /app
COPY nodejs/public .
COPY nodejs/package*.json ./
ENV PORT 9090
# For production #
# ENV NODE_ENV production
# RUN npm install --only production
RUN npm install


# Vue
WORKDIR /app/assets
COPY vuejs/dist .

WORKDIR /app
EXPOSE 9090

CMD ["npm", "start"]
