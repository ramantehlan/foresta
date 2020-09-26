FROM golang:1.14-alpine

WORKDIR $GOPATH/src/github.com/ramantehlan/foresta/

COPY . .

RUN go mod init
RUN go mod download

# Download all the dependencies
RUN go build -o ./foresta-api

EXPOSE 3001

CMD ["./foresta-api"]
