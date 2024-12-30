package models

import "sync"

type Item struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

type Shop struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Items       []Item `json:"items"`
}

var (
	shops      []Shop
	shopsMutex sync.RWMutex
)

func init() {
	shops = []Shop{
		{
			ID:          1,
			Name:        "Grocery Store",
			Description: "Fresh produce and everyday essentials",
			Items: []Item{
				{ID: 1, Name: "Apples", Price: 2.99},
				{ID: 2, Name: "Bread", Price: 3.49},
				{ID: 3, Name: "Milk", Price: 4.99},
			},
		},
		{
			ID:          2,
			Name:        "Electronics Shop",
			Description: "Latest gadgets and accessories",
			Items: []Item{
				{ID: 4, Name: "Headphones", Price: 59.99},
				{ID: 5, Name: "Phone Charger", Price: 19.99},
				{ID: 6, Name: "Bluetooth Speaker", Price: 39.99},
			},
		},
		{
			ID:          3,
			Name:        "Bakery",
			Description: "Freshly baked goods and pastries",
			Items: []Item{
				{ID: 7, Name: "Croissant", Price: 2.49},
				{ID: 8, Name: "Baguette", Price: 3.99},
				{ID: 9, Name: "Chocolate Cake", Price: 24.99},
			},
		},
	}
}

func GetAllShops() []Shop {
	shopsMutex.RLock()
	defer shopsMutex.RUnlock()
	return shops
}

func GetShopByID(id int) (Shop, bool) {
	shopsMutex.RLock()
	defer shopsMutex.RUnlock()
	for _, shop := range shops {
		if shop.ID == id {
			return shop, true
		}
	}
	return Shop{}, false
}

func GetItemByID(itemID int) (Item, bool) {
	shopsMutex.RLock()
	defer shopsMutex.RUnlock()
	for _, shop := range shops {
		for _, item := range shop.Items {
			if item.ID == itemID {
				return item, true
			}
		}
	}
	return Item{}, false
}
