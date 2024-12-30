package handlers

import (
	"net/http"
	"strconv"

	"github.com/Srinjay-hack/delivery-app-backend/models"
	"github.com/gin-gonic/gin"
)

func GetShops(c *gin.Context) {
	shops := models.GetAllShops()
	c.JSON(http.StatusOK, shops)
}

func GetShop(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid shop ID"})
		return
	}

	shop, found := models.GetShopByID(id)
	if !found {
		c.JSON(http.StatusNotFound, gin.H{"error": "Shop not found"})
		return
	}

	c.JSON(http.StatusOK, shop)
}
