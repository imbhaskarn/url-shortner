package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"strings"

	"url-shortner/db"
	"url-shortner/handler"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Enviornment variables not loaded")
	}

	ctx := context.Background()
	db.InitDB(ctx)
	defer db.Conn.Close()

	http.HandleFunc("/url-shortner", handler.ShortenUrl)
	http.HandleFunc("/bulk-shortener", handler.BulkShortenUrl)
	http.HandleFunc("/", handler.RedirectHandler)

	log.Print(os.Getenv("PORT"))

	port := strings.TrimSpace(os.Getenv("PORT"))
	if port == "" {
		port = "4000"
	}

	log.Printf("Http server running on port %s \nhttp://localhost:%s", port, port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
