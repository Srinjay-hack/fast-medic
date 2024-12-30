type Item = {
    id: number;
    name: string;
    price: number;
  };
  
  type Shop = {
    id: number;
    name: string;
    description: string;
    items: Item[];
  };
  
  type Order = {
    id: number;
    userId: number;
    items: { itemId: number; quantity: number }[];
    total: number;
    status: 'pending' | 'processing' | 'delivered';
  };
  
  let shops: Shop[] = [
    {
      id: 1,
      name: 'Grocery Store',
      description: 'Fresh produce and everyday essentials',
      items: [
        { id: 1, name: 'Apples', price: 2.99 },
        { id: 2, name: 'Bread', price: 3.49 },
        { id: 3, name: 'Milk', price: 4.99 },
      ],
    },
    {
      id: 2,
      name: 'Electronics Shop',
      description: 'Latest gadgets and accessories',
      items: [
        { id: 4, name: 'Headphones', price: 59.99 },
        { id: 5, name: 'Phone Charger', price: 19.99 },
        { id: 6, name: 'Bluetooth Speaker', price: 39.99 },
      ],
    },
    {
      id: 3,
      name: 'Bakery',
      description: 'Freshly baked goods and pastries',
      items: [
        { id: 7, name: 'Croissant', price: 2.49 },
        { id: 8, name: 'Baguette', price: 3.99 },
        { id: 9, name: 'Chocolate Cake', price: 24.99 },
      ],
    },
  ];
  
  let orders: Order[] = [];
  let nextOrderId = 1;
  
  export function getShops(): Shop[] {
    return shops;
  }
  
  export function getShop(id: number): Shop | undefined {
    return shops.find(shop => shop.id === id);
  }
  
  export function getItem(itemId: number): Item | undefined {
    for (const shop of shops) {
      const item = shop.items.find(item => item.id === itemId);
      if (item) return item;
    }
    return undefined;
  }
  
  export function createOrder(userId: number, items: { itemId: number; quantity: number }[]): Order {
    const order: Order = {
      id: nextOrderId++,
      userId,
      items,
      total: calculateTotal(items),
      status: 'pending',
    };
    orders.push(order);
    return order;
  }
  
  export function getOrders(userId: number): Order[] {
    return orders.filter(order => order.userId === userId);
  }
  
  export function updateOrderStatus(orderId: number, status: 'pending' | 'processing' | 'delivered'): Order | undefined {
    const order = orders.find(order => order.id === orderId);
    if (order) {
      order.status = status;
      return order;
    }
    return undefined;
  }
  
  function calculateTotal(items: { itemId: number; quantity: number }[]): number {
    return items.reduce((total, { itemId, quantity }) => {
      const item = getItem(itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  }
  
  