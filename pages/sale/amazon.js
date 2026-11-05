import SalePage from '@/components/SalePage'
import amazonSale from '@/data/sales/amazon'

export default function SaleAmazon() {
  return (
    <SalePage
      seoTitle="Amazon Deals | Smart Home & Tech"
      seoDescription="Curated Amazon deals on smart home devices, single board computers, and home lab gear. Affiliate links help support the site."
      title="Amazon Deals"
      intro="The smart home gear, boards, and home lab parts I use, with links for Amazon US, Germany, and the UK where available. We use affiliate links—same price for you, small support for us."
      sale={amazonSale}
      emptyMessage="No deals at the moment. Check back during Prime Day and seasonal sales."
    />
  )
}
