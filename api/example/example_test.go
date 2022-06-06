package example

import (
	"fmt"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/rg-km/final-project-engineering-9/constant"
	"io"
	"io/ioutil"
	"net/http"
)

var _ = Describe("example test", func() {
	c := http.Client{}

	When("get example index page", func() {
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
})
