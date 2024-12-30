package main

import (
	"github.com/Srinjay-hack/delivery-app-backend/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"} // Update this with your frontend URL
	r.Use(cors.New(config))

	// Initialize routes
	r.GET("/api/shops", handlers.GetShops)
	r.GET("/api/shops/:id", handlers.GetShop)
	r.GET("/api/orders", handlers.GetOrders)
	r.POST("/api/orders", handlers.CreateOrder)
	r.PATCH("/api/orders/:id", handlers.UpdateOrderStatus)

	// Start the server
	r.Run(":8080")
}
