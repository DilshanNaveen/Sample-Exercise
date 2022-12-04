package main

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

type book struct {
	ID       string `json: "id"`
	Title    string `json: "title"`
	Author   string `json: "author"`
	Quantity int    `json: "quantity"`
}

var books = []book{
	{ID: "1", Title: "title 1", Author: "author 1", Quantity: 1},
	{ID: "2", Title: "title 2", Author: "author 2", Quantity: 2},
	{ID: "3", Title: "title 3", Author: "author 3", Quantity: 3},
}

func handleResponse(c *gin.Context, status int, response any) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
	c.IndentedJSON(status, response)
}

func getBooks(c *gin.Context) {
	handleResponse(c, http.StatusOK, books)
}

func createNewBook(c *gin.Context) {
	var newBook book

	if err := c.BindJSON(&newBook); err != nil {
		return
	}

	books = append(books, newBook)
	handleResponse(c, http.StatusCreated, newBook)
}

func getBookById(id string) (*book, error) {
	for i, b := range books {
		if b.ID == id {
			return &books[i], nil
		}
	}

	return nil, errors.New("book not found")
}

func bookById(c *gin.Context) {
	id := c.Param("id")
	book, error := getBookById(id)

	if error != nil {
		handleResponse(c, http.StatusNotFound, gin.H{"message: ": "Book not found"})
		return
	}

	handleResponse(c, http.StatusOK, book)
}

func checkoutBook(c *gin.Context) {
	id, isIdExist := c.GetQuery("id")

	if !isIdExist {
		handleResponse(c, http.StatusBadRequest, gin.H{"message": "Id is required"})
	}

	book, err := getBookById(id)

	if err != nil {
		handleResponse(c, http.StatusNotFound, gin.H{"message: ": "Book not found"})
		return
	}

	if book.Quantity <= 0 {
		handleResponse(c, http.StatusBadRequest, gin.H{"message: ": "Book not available"})
		return
	}

	book.Quantity -= 1
	handleResponse(c, http.StatusOK, book)
}

func checkIn(c *gin.Context) {
	id, isIdExist := c.GetQuery("id")

	if !isIdExist {
		handleResponse(c, http.StatusBadRequest, gin.H{"message": "Id is required"})
	}

	book, err := getBookById(id)

	if err != nil {
		handleResponse(c, http.StatusNotFound, gin.H{"message: ": "Book not found"})
		return
	}

	book.Quantity += 1
	handleResponse(c, http.StatusOK, book)
}

func main() {
	router := gin.Default()

	router.GET("/books", getBooks)
	router.GET("/book/:id", bookById)
	router.POST("/book", createNewBook)
	router.GET("/checkout", checkoutBook)
	router.GET("/check-in", checkIn)

	router.Run(":8080")
}
