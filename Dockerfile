FROM node:10.13.0

WORKDIR /usr/src/cha-hockey-app-server

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]