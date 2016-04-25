package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be set")
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.LoadHTMLGlob("templates/*.tmpl.html")
	router.Static("/static", "static")

	router.GET("/", func(c *gin.Context) {
		w := c.Writer
		w.Header().Set("Access-Control-Allow-Origin", "data.benzinga.com")
		c.HTML(http.StatusOK, "becc.tmpl.html", nil)
	})

	router.Run(":" + port)
}
