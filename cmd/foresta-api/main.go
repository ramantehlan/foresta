package main

import (
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
)

const (
	// ClientPort is the port for client
	ClientPort = ":3000"
	// ServerPort is the port for server
	ServerPort = ":3001"
)

// Connect to redis
var rdb = redis.NewClient(&redis.Options{
	Addr:     "localhost:6379",
	Password: "",
	DB:       0,
})

func main() {
	router := gin.New()
	server := StartSocket()

	go server.Serve()
	defer server.Close()

	router.Use(GinMiddleware("http://localhost" + ClientPort))
	router.GET("/socket.io/*any", gin.WrapH(server))
	router.POST("/socket.io/*any", gin.WrapH(server))

	go router.Run(ServerPort)

	select {}
}
