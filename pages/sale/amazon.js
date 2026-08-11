import { PageSEO } from '@/components/SEO'
import SaleProductCard from '@/components/SaleProductCard'
import amazonProducts from '@/data/sales/amazon'

export default function SaleAmazon() {
  return (
    <>
      <PageSEO
        title="Amazon Deals | Smart Home & Tech"
        description="Curated Amazon deals on smart home devices, speakers, and tech. Affiliate links help support the site."
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Hero */}
        <div className="pt-6 pb-8 space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            Amazon Deals
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            Smart speakers, plugs, and home tech on sale. We use affiliate links—same price for you, small support for us.
          </p>
        </div>

        {/* Product grid */}
        <div className="py-12">
          {amazonProducts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No deals at the moment. Check back during Prime Day and seasonal sales.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {amazonProducts.map((product) => (
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
