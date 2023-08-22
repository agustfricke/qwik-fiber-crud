package handler

import (
	"github.com/agustfricke/qwik-fiber-crud/database"
	"github.com/agustfricke/qwik-fiber-crud/model"
	"github.com/gofiber/fiber/v2"
)

func GetItems(c *fiber.Ctx) error {
	db := database.DB
	var items []model.Item
	db.Find(&items)
	return c.JSON(items)
}

func GetSoloItem(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
	var item model.Item
	db.Find(&item, id)
	return c.JSON(item)
}

func CreateItem(c *fiber.Ctx) error {
	db := database.DB
	item := new(model.Item)
	if err := c.BodyParser(item); err != nil {
		return c.Status(500).JSON(err)
	}
	db.Create(&item)
	return c.JSON(item)
}

func UpdateItem(c *fiber.Ctx) error {
    id := c.Params("id")
    db := database.DB

    var item model.Item
    if err := db.First(&item, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{
            "message": "Item not found",
        })
    }

    updatedItem := new(model.Item)
    if err := c.BodyParser(updatedItem); err != nil {
        return c.Status(400).JSON(fiber.Map{
            "message": "Invalid input data",
        })
    }

    item.Body = updatedItem.Body

    db.Save(&item)

    return c.JSON(item)
}

func DeleteItem(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB

	var item model.Item
	db.First(&item, id)
	db.Delete(&item)
	return c.JSON(fiber.Map{"status": "success", "message": "Item successfully deleted", "data": nil})
}

