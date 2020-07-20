FROM node

ENV MONGODB_URI="ADD_URL_HERE"

EXPOSE 3001

COPY  . .

RUN npm install 

CMD ["npm", "start"]