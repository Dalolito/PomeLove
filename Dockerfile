FROM node:18-alpine

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --only=production

RUN npx prisma generate

COPY . .

RUN mkdir -p public/uploads

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "sleep 10 && npx prisma migrate deploy && npm start"]
