package example

import (
	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-9/repository"
)

type ExampleHandler struct {
	repo *repository.ExampleRepository
}

func NewExampleHandler(repo *repository.ExampleRepository) *ExampleHandler {
	return &ExampleHandler{repo: repo}
}

func SetupRouter(router *gin.Engine, handler *ExampleHandler) {
	router.GET("/example", handler.Index)
}

func (h *ExampleHandler) Index(c *gin.Context) {
	c.String(200, "ok")
}
