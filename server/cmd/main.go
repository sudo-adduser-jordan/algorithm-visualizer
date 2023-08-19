package main

import (
	"fmt"

	"main/routes"

	"github.com/sudo-adduser-jordan/Go-Packages/styles"
)

func main() {
	fmt.Println()
	fmt.Print(styles.BlueLabel(" Go 1.20 "))

	routes.SetupRoutes()
}