package example

import (
	"encoding/json"
	"fmt"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/rg-km/final-project-engineering-9/constant"
	"github.com/rg-km/final-project-engineering-9/model"
	"io"
	"io/ioutil"
	"net/http"
)

var _ = Describe("example test", func() {
	c := http.Client{}

	When("GET /example", func() {
		It("should return ok", func() {
			r, err := c.Get(constant.BaseUrlHttp + "/example")
			if err != nil {
				fmt.Println(err.Error())
			}

			defer func(Body io.ReadCloser) {
				err := Body.Close()
				if err != nil {
					fmt.Println(err.Error())
				}
			}(r.Body)

			b, err := ioutil.ReadAll(r.Body)

			Expect(string(b)).To(Equal("ok"))
			Expect(err).ToNot(HaveOccurred())
		})
	})

	When("GET /example/all", func() {
		It("should have items", func() {
			r, err := c.Get(constant.BaseUrlHttp + "/example/all")
			if err != nil {
				fmt.Println(err.Error())
			}

			defer func(Body io.ReadCloser) {
				err := Body.Close()
				if err != nil {
					fmt.Println(err.Error())
				}
			}(r.Body)

			b, err := ioutil.ReadAll(r.Body)

			res := make([]model.Example, 0)

			json.Unmarshal(b, &res)

			Expect(len(res)).To(Equal(2))
			Expect(err).ToNot(HaveOccurred())
		})
	})
})
