import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from '@/components/Link'

export default function SaleRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/sale/aliexpress')
  }, [router])

  return (
    <div className="pt-6 pb-8">
      <p className="text-gray-500 dark:text-gray-400">
        Redirecting to <Link href="/sale/aliexpress" className="text-primary-600 dark:text-primary-400 underline">AliExpress Deals</Link>…
      </p>
    </div>
  )
}
