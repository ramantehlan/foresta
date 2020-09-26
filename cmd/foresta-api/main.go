package main

import (
	"github.com/gin-gonic/gin"
)

const (
	// ClientPort is the port for client
	ClientPort = ":3000"
	// ServerPort is the port for server
	ServerPort = ":3001"
)

func main() {
	router := gin.New()
	server := StartSocket()

	go server.Serve()
	defer server.Close()

	router.Use(GinMiddleware("http://localhost" + ClientPort))
	router.GET("/socket.io/*any", gin.WrapH(server))
	router.POST("/socket.io/*any", gin.WrapH(server))

	go router.Run(ServerPort)

	//server.BroadcastToRoom("/", "leaderboard", "list", "data")

	select {}
}
