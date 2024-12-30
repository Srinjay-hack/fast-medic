import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
          DeliverEase
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</Link>
          <Link href="/orders" className="text-gray-600 hover:text-indigo-600 transition-colors">My Orders</Link>
        </div>
      </nav>
    </header>
  )
}

