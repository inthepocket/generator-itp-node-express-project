FROM docker.itpservices.be/itp/node6-native-alpine

ADD . .

# Install modules & move them to the root (avoids them being overwritten when
# mounting a volume)
RUN npm install && mv node_modules /node_modules

ENV PORT 80

EXPOSE 80
