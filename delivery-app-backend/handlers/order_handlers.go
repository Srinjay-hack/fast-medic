package handlers

import (
	"net/http"
	"strconv"

	"github.com/Srinjay-hack/delivery-app-backend/models"
	"github.com/gin-gonic/gin"
)

func GetOrders(c *gin.Context) {
	userIDStr := c.Query("userId")
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	orders := models.GetOrdersByUserID(userID)
	c.JSON(http.StatusOK, orders)
}

func CreateOrder(c *gin.Context) {
	var orderRequest struct {
		UserID int                `json:"userId"`
		Items  []models.OrderItem `json:"items"`
	}

	if err := c.ShouldBindJSON(&orderRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	order, err := models.CreateOrder(orderRequest.UserID, orderRequest.Items)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, order)
}

func UpdateOrderStatus(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid order ID"})
		return
	}

	var statusUpdate struct {
		Status string `json:"status"`
	}

	if err := c.ShouldBindJSON(&statusUpdate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedOrder, err := models.UpdateOrderStatus(id, statusUpdate.Status)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, updatedOrder)
}
