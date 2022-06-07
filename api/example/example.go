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
	example := router.Group("/example")
	{
		example.GET("/", handler.Index)
		example.GET("/all", handler.All)
	}
}

func (h *ExampleHandler) Index(c *gin.Context) {
	c.String(200, "ok")
}

func (h *ExampleHandler) All(c *gin.Context) {
	examples, err := h.repo.FetchAll()
	if err != nil {
		c.JSON(
			400,
			gin.H{
				"message": err.Error(),
			},
		)

		return
	}

	c.JSON(
		200,
		examples,
	)
}
