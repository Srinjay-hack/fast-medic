'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const handleAddToCart = (event: CustomEvent<{ id: number; name: string; price: number }>) => {
      const item = event.detail
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.id === item.id)
        if (existingItem) {
          return prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        } else {
          return [...prevItems, { ...item, quantity: 1 }]
        }
      })
    }

    window.addEventListener('addToCart', handleAddToCart as EventListener)
    return () => window.removeEventListener('addToCart', handleAddToCart as EventListener)
  }, [])

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId))
  }

  const updateQuantity = (itemId: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const placeOrder = async () => {
    const userId = 1 // In a real app, you'd get this from the authenticated user
    const orderItems = cartItems.map((item) => ({
      itemId: item.id,
      quantity: item.quantity,
    }))

    try {
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, items: orderItems }),
      })

      if (response.ok) {
        const order = await response.json()
        console.log('Order placed:', order)
        setCartItems([])
        setIsOpen(false)
        alert('Order placed successfully!')
      } else {
        console.error('Failed to place order')
        alert('Failed to place order. Please try again.')
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert('An error occurred. Please try again.')
    }
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {cartItems.length}
          </span>
        )}
      </Button>
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white border rounded-lg p-4 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <Button onClick={() => setIsOpen(false)} variant="ghost" size="sm">
              <X className="w-5 h-5" />
            </Button>
          </div>
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center py-4">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => updateQuantity(item.id, -1)}
                        variant="outline"
                        size="sm"
                        className="p-1"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        onClick={() => updateQuantity(item.id, 1)}
                        variant="outline"
                        size="sm"
                        className="p-1"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => removeFromCart(item.id)}
                        variant="destructive"
                        size="sm"
                        className="p-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center font-semibold mb-4">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button onClick={placeOrder} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Place Order
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

