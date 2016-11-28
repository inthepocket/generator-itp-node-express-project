FROM docker.itpservices.be/itp/node6-<% if (nativeDocker) { %>native-<% } %>alpine

ADD . .

RUN npm install

ENV PORT 80

EXPOSE 80
