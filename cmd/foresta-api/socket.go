package main

import (
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"github.com/googollee/go-socket.io"
	l "github.com/sirupsen/logrus"
)

// GinMiddleware is the middle ware to handle header
func GinMiddleware(allowOrigin string) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", allowOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, X-CSRF-Token, Token, session, Origin, Host, Connection, Accept-Encoding, Accept-Language, X-Requested-With")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Request.Header.Del("Origin")

		c.Next()
	}
}

// ScoreMessage is the structure of the message received by the server from client
type ScoreMessage struct {
	Username string  `json:"username"`
	Score    float64 `json:"score"`
}

// StartSocket is to get the base instance of a socket server
func StartSocket() *socketio.Server {
	server, _ := socketio.NewServer(nil)

	server.OnConnect("/", func(c socketio.Conn) error {
		l.WithFields(l.Fields{
			"Socket-ID": c.ID(),
		}).Info("New Connection")

		c.Join("leaderboard")
		c.SetContext("")
		return nil
	})

	server.OnDisconnect("/", func(c socketio.Conn, reason string) {
		l.WithFields(l.Fields{
			"Socket-ID": c.ID(),
			"Reason":    reason,
		}).Info("Connection Dropped")
	})

	server.OnError("/", func(c socketio.Conn, e error) {
		l.Error("Error in socket connection")
		l.Error(e)
	})

	server.OnEvent("/", "score", func(c socketio.Conn, score ScoreMessage) int64 {
		rank := int64(0)

		if score.Username != "" {
			member := redis.Z{
				score.Score,
				score.Username,
			}

			rdb.ZAdd("player:score", member)
			rank = rdb.ZRevRank("player:score", score.Username).Val()
		}

		// Top rank
		topRank := rdb.ZRevRangeWithScores("player:score", 0, 9)
		server.BroadcastToRoom("/", "leaderboard", "list", topRank.Val())

		return rank
	})

	return server
}
