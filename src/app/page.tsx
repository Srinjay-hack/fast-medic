import Link from 'next/link'
import { Store, Truck, Clock } from 'lucide-react'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'

async function getShops() {
  const res = await fetch('http://localhost:8080/api/shops')
  if (!res.ok) {
    throw new Error('Failed to fetch shops')
  }
  return res.json()
}

export default async function Home() {
  const shops = await getShops()

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-indigo-600">Welcome to DeliverEase</h1>
        <p className="text-xl text-gray-600 mb-8">Order from your favorite local shops and get items delivered to your doorstep.</p>
        <div className="flex justify-center space-x-8">
          <div className="flex flex-col items-center">
            <Store className="w-12 h-12 text-indigo-600 mb-2" />
            <span className="text-gray-700">Choose a shop</span>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-12 h-12 text-indigo-600 mb-2" />
            <span className="text-gray-700">Fast delivery</span>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-12 h-12 text-indigo-600 mb-2" />
            <span className="text-gray-700">Track your order</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Available Shops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shops.map((shop: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
            <Link href={`/shop/${shop.id}`} key={shop.id} className="block group">
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">{shop.name}</h3>
                <p className="text-gray-600">{shop.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

