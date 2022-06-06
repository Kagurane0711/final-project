package repository

import (
	"fmt"
	"github.com/rg-km/final-project-engineering-9/model"
	"gorm.io/gorm"
)

type ExampleRepository struct {
	db *gorm.DB
}

func NewTestRepository(db *gorm.DB) *ExampleRepository {
	return &ExampleRepository{db: db}
}

func (r *ExampleRepository) Test() {
	hello := &model.Example{Message: "hello"}

	r.db.Create(&hello)

	fmt.Println("Hello world")
}

func (r *ExampleRepository) Print() {
	rows := make([]model.Example, 0)

	r.db.Find(&rows)

	fmt.Println(rows)
}
