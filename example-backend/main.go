package main

import (
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowMethods: []string{"*"},
	}))
	type OptionsResponse struct {
		Options []string `json:"options"`
	}
	e.GET("/main-options", func(c echo.Context) error {
		var response = OptionsResponse{
			Options: []string{"1", "2", "3"},
		}
		return c.JSON(200, &response)
	})

	type SubOptionsRequest struct {
		Selected string `json:"selected"`
	}
	e.POST("/sub-options", func(c echo.Context) error {
		var subOptionsRequest SubOptionsRequest
		c.Bind(&subOptionsRequest)
		var options []string
		if subOptionsRequest.Selected == "1" {
			options = []string{"1.1", "1.2", "1.3"}
		} else if subOptionsRequest.Selected == "2" {
			options = []string{"2.1", "2.2", "2.3", "2.4"}
		} else if subOptionsRequest.Selected == "3" {
			options = []string{"3.1", "3.2"}
		}
		var response = OptionsResponse{
			Options: options,
		}
		return c.JSON(200, &response)
	})
	type SubmitRequest struct {
		MainOptions string `json:"mainOptions"`
		SubOptions  string `json:"subOptions"`
	}
	e.POST("/submit", func(c echo.Context) error {
		var submitRequest SubmitRequest
		c.Bind(&submitRequest)
		fmt.Println("Main Options : ", submitRequest.MainOptions)
		fmt.Println("Sub Options : ", submitRequest.SubOptions)
		return c.JSON(201, nil)
	})
	e.Start(":3001")
}
