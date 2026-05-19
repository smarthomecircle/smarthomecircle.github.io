import { PageSEO } from '@/components/SEO'
import SaleProductCard from '@/components/SaleProductCard'
import aliexpressProducts from '@/data/sales/aliexpress'

export default function SaleAliExpress() {
  return (
    <>
      <PageSEO
        title="AliExpress Deals | Smart Home & SBC"
        description="Curated AliExpress deals on smart home gear, single board computers, and electronics. Affiliate links help support the site."
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Hero */}
        <div className="pt-6 pb-8 space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            AliExpress Deals
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            Deals on Raspberry Pi cases, ESP32/ESP8266 boards, sensors, and smart home parts. Links are affiliate links.
          </p>
        </div>

        {/* Product grid */}
        <div className="py-12">
          {aliexpressProducts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No deals at the moment. Check back during sale events.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {aliexpressProducts.map((product) => (
                <SaleProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  url={product.url}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  badge={product.badge}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
