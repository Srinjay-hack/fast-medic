import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'

async function getShop(id: string) {
  const res = await fetch(`http://localhost:8080/api/shops/${id}`)
  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error('Failed to fetch shop')
  }
  return res.json()
}

export default async function ShopPage({ params }: { params: { id: string } }) {
  const shop = await getShop(params.id)

  if (!shop) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-2 text-indigo-600">{shop.name}</h1>
      <p className="text-xl text-gray-600 mb-8">{shop.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shop.items.map((item: { id: any; name: any; price: any }) => (
          <div key={item.id} className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
            <AddToCartButton item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

