package routes

import (
	"fmt"
	"net/http"

	"github.com/sudo-adduser-jordan/Go-Packages/styles"
)

func SetupRoutes() {
	const local = "./public"
	const docker = "/app/public"

	http.Handle("/", http.FileServer(http.Dir(docker)))

	fmt.Println()
	fmt.Print(styles.GreenText("=> http server started on "))
	fmt.Print("http://localhost:8080")

	http.ListenAndServe(":8080", nil)
}
