package router

import (
	"github.com/agustfricke/qwik-fiber-crud/handler"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/api/get/items", handler.GetItems)
    app.Get("/api/get/solo/item/:id", handler.GetSoloItem)
	app.Post("/api/create/items", handler.CreateItem)
    app.Put("/api/update/items/:id", handler.UpdateItem)
    app.Delete("/api/delete/items/:id", handler.DeleteItem)

}
