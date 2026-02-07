# URL Shortener

A simple URL shortening service built with Go.

## Features

- Shorten long URLs to compact, unique codes
- Redirect shortened URLs to original destinations
- Fast and lightweight implementation
- Simple REST API

## Installation

```bash
git clone https://github.com/imbhaskarn/url-shortner.git
cd url-shortner
go build
```

## Usage

```bash
./url-shortner
```

The service will start on `http://localhost:8080`

## API Endpoints

- `POST /shorten` - Create a shortened URL
- `GET /:code` - Redirect to original URL

## Requirements

- Go 1.16 or higher

## License

MIT
