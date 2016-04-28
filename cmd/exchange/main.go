package main

import (
    "log"
    "net/http"
    "os"
    "strings"
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
        c.HTML(http.StatusOK, "becc.tmpl.html", nil)
    })

    router.GET("/search", func(c *gin.Context) {
        resp, err := RetrieveQuote(strings.ToUpper(c.Query("symbol")))

        if err != nil {
            c.JSON(http.StatusNotFound, gin.H{ "error": err.Error()})
        } else {
            c.JSON(http.StatusOK, resp)
        }
    })

    router.Run(":" + port)
}
