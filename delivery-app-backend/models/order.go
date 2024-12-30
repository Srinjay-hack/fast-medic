package models

import (
	"errors"
	"sync"
)

type OrderItem struct {
	ItemID   int `json:"itemId"`
	Quantity int `json:"quantity"`
}

type Order struct {
	ID     int         `json:"id"`
	UserID int         `json:"userId"`
	Items  []OrderItem `json:"items"`
	Total  float64     `json:"total"`
	Status string      `json:"status"`
}

var (
	orders      []Order
	ordersMutex sync.RWMutex
	nextOrderID = 1
)

func CreateOrder(userID int, items []OrderItem) (Order, error) {
	ordersMutex.Lock()
	defer ordersMutex.Unlock()

	total, err := calculateTotal(items)
	if err != nil {
		return Order{}, err
	}

	order := Order{
		ID:     nextOrderID,
		UserID: userID,
		Items:  items,
		Total:  total,
		Status: "pending",
	}

	orders = append(orders, order)
	nextOrderID++

	return order, nil
}

func GetOrdersByUserID(userID int) []Order {
	ordersMutex.RLock()
	defer ordersMutex.RUnlock()

	var userOrders []Order
	for _, order := range orders {
		if order.UserID == userID {
			userOrders = append(userOrders, order)
		}
	}
	return userOrders
}

func UpdateOrderStatus(orderID int, status string) (Order, error) {
	ordersMutex.Lock()
	defer ordersMutex.Unlock()

	for i, order := range orders {
		if order.ID == orderID {
			orders[i].Status = status
			return orders[i], nil
		}
	}
	return Order{}, errors.New("order not found")
}

func calculateTotal(items []OrderItem) (float64, error) {
	var total float64
	for _, item := range items {
		shopItem, found := GetItemByID(item.ItemID)
		if !found {
			return 0, errors.New("item not found")
		}
		total += shopItem.Price * float64(item.Quantity)
	}
	return total, nil
}