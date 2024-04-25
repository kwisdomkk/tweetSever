# 베이스 이미지
FROM node:20

# 워크디렉토리 설정
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm","start"]