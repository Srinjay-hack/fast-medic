package middleware

import (
	"github.com/gin-gonic/gin"
)

// AuthMiddleware is a placeholder for future authentication middleware
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO: Implement authentication logic
		c.Next()
	}
}