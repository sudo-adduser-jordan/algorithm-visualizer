FROM node:latest as node
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

FROM golang:latest as golang
WORKDIR /app
COPY --from=node /app .
RUN cd server && go mod download
RUN cd server && go build cmd/main.go 
EXPOSE 8080
CMD [ "/app/server/main" ]