package handler

import (
	"context"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
	"url-shortner/db"

	"github.com/jackc/pgx/v5"
	"github.com/matoous/go-nanoid/v2"
)

func ShortenUrl(res http.ResponseWriter, req *http.Request) {
	var body struct {
		URL string `json:"url"`
	}

	json.NewDecoder(req.Body).Decode(&body)

	alphabet := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

	code, err := gonanoid.Generate(alphabet, 6)

	if err != nil {
		http.Error(res, "Server Error", http.StatusBadRequest)
		return
	}

	var result struct {
		ID   int
		Code string
	}
	err = db.Conn.QueryRow(context.Background(), "INSERT INTO short_urls (code, original_url, expires_at) VALUES ($1, $2, $3) RETURNING id, code;", code, body.URL, time.Now().AddDate(0, 0, 7)).Scan(&result.ID, &result.Code)

	if err != nil {
		http.Error(res, "Server Error", http.StatusBadRequest)
		return
	}

	res.Header().Set("Content-Type", "application/json")
	json.NewEncoder(res).Encode(result)

}

func BulkShortenUrl(res http.ResponseWriter, req *http.Request) {
	if err := req.ParseMultipartForm(10 << 20); err != nil {
		http.Error(res, "Failed to parse multipart form", http.StatusBadRequest)
		return
	}

	file, _, err := req.FormFile("file")
	if err != nil {
		http.Error(res, "Invalid file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Read CSV file instead of JSON
	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		http.Error(res, "Failed to read CSV file", http.StatusBadRequest)
		return
	}

	// Skip header row if present, and extract URLs
	var urls []string
	startIdx := 0

	// Check if first row is a header (doesn't look like a URL)
	if len(records) > 0 && len(records[0]) > 0 {
		firstCell := records[0][0]
		if !strings.HasPrefix(strings.ToLower(firstCell), "http") {
			startIdx = 1
		}
	}

	// Extract URLs from first column
	for i := startIdx; i < len(records); i++ {
		if len(records[i]) > 0 && records[i][1] != "" {
			print(records[i][1])
			urls = append(urls, records[i][1])
		}
	}

	if len(urls) == 0 {
		http.Error(res, "No URLs found in CSV", http.StatusBadRequest)
		return
	}

	baseURL := os.Getenv("API_URL")
	if baseURL == "" {
		baseURL = "http://localhost:4000"
	}
	baseURL = strings.TrimRight(baseURL, "/")

	type resultRow struct {
		ID        int
		Code      string
		ShortURL  string
		SourceURL string
	}

	results := make([]resultRow, 0, len(urls))
	alphabet := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

	for _, sourceURL := range urls {
		code, err := gonanoid.Generate(alphabet, 6)
		if err != nil {
			http.Error(res, "Failed to generate short code", http.StatusInternalServerError)
			return
		}

		var id int
		err = db.Conn.QueryRow(
			context.Background(),
			`INSERT INTO short_urls (code, original_url, expires_at)
			 VALUES ($1, $2, $3)
			 RETURNING id`,
			code,
			sourceURL,
			time.Now().AddDate(0, 0, 7),
		).Scan(&id)

		if err != nil {
			http.Error(res, "Database insert failed", http.StatusInternalServerError)
			return
		}

		results = append(results, resultRow{
			ID:        id,
			Code:      code,
			ShortURL:  baseURL + "/" + code,
			SourceURL: sourceURL,
		})
	}

	res.Header().Set("Content-Type", "text/csv")
	res.Header().Set("Content-Disposition", "attachment; filename=shortened_urls.csv")

	writer := csv.NewWriter(res)
	defer writer.Flush()

	// Write header
	if err := writer.Write([]string{"ID", "Code", "ShortURL", "OriginalURL"}); err != nil {
		http.Error(res, "Failed to write CSV header", http.StatusInternalServerError)
		return
	}

	// Write data rows
	for _, r := range results {
		if err := writer.Write([]string{
			strconv.Itoa(r.ID),
			r.Code,
			r.ShortURL,
			r.SourceURL,
		}); err != nil {
			http.Error(res, "Failed to write CSV row", http.StatusInternalServerError)
			return
		}
	}
}

func RedirectHandler(res http.ResponseWriter, req *http.Request) {

	id := req.URL.Path[1:]
	if id == "" {
		res.WriteHeader(http.StatusBadRequest)
		res.Write([]byte("Missing short code"))
		return
	}

	var response struct {
		ID          string    `json:"id"`
		Code        string    `json:"code"`
		OriginalUrl string    `json:"original_url"`
		ExpiresAt   time.Time `json:"expires_at"`
	}

	err := db.Conn.QueryRow(
		context.Background(),
		"select id, code, expires_at, original_url from short_urls where code = $1 limit 1",
		id,
	).Scan(&response.ID, &response.Code, &response.ExpiresAt, &response.OriginalUrl)
	if err != nil {
		if err == pgx.ErrNoRows {
			res.WriteHeader(http.StatusNotFound)
			res.Write([]byte("URL not found"))
			return
		}

		fmt.Printf("DB query error: %v", err)
		res.WriteHeader(http.StatusInternalServerError)
		res.Write([]byte("Internal server error"))
		return
	}

	print("Hi")


	http.Redirect(res, req, response.OriginalUrl, http.StatusFound)

}
