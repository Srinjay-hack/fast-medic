'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Check } from 'lucide-react'

export default function AddToCartButton({ item }: { item: { id: number; name: string; price: number } }) {
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)

    const event = new CustomEvent('addToCart', { detail: item })
    window.dispatchEvent(event)
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdded}
      className={`w-full transition-all ${
        isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
      }`}
    >
      {isAdded ? (
        <>
          <Check className="w-5 h-5 mr-2" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  )
}

