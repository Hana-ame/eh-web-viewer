package main

import (
	"log"
	"testing"

	"github.com/eh-web-viewer/eh-web-viewer/mycurl"
)

func TestMain(t *testing.T) {
	mycurl.SetClient(mycurl.PROXY) // TODO: curl with different ip

	// set mycurl before this line
	app := App()
	err := app.Listen(API_ADDR)
	log.Println(err)
}
