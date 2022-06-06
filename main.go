package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/rg-km/final-project-engineering-9/api/example"
	"github.com/rg-km/final-project-engineering-9/constant"
	"github.com/rg-km/final-project-engineering-9/model"
	"github.com/rg-km/final-project-engineering-9/repository"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		fmt.Println(err.Error())
	}

	err = db.AutoMigrate(
		&model.Example{},
	)
	if err != nil {
		fmt.Println(err.Error())

		return
	}

	route := gin.Default()

	// example
	exampleRepository := repository.NewTestRepository(db)
	example.SetupRouter(route, example.NewTestHandler(exampleRepository))

	// run
	err = route.Run(constant.BaseUrl)
	if err != nil {
		fmt.Println(err.Error())
		return
	}
}
