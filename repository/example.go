package repository

import (
	"fmt"
	. "github.com/rg-km/final-project-engineering-9/model"
	"gorm.io/gorm"
)

type ExampleRepository struct {
	db *gorm.DB
}

func NewExampleRepository(db *gorm.DB) *ExampleRepository {
	return &ExampleRepository{db: db}
}

func (r *ExampleRepository) Test() {
	hello := &Example{Message: "hello"}

	r.db.Create(&hello)

	fmt.Println("Hello world")
}

func (r *ExampleRepository) Print() {
	rows := make([]Example, 0)

	r.db.Find(&rows)

	fmt.Println(rows)
}

func (r *ExampleRepository) FetchAll() (rows *[]Example, err error) {
	r.db.Find(&rows)

	fmt.Println(rows)

	return
}
