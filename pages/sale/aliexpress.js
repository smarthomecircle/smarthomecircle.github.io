import SalePage from '@/components/SalePage'
import aliexpressSale from '@/data/sales/aliexpress'

export default function SaleAliExpress() {
  return (
    <SalePage
      seoTitle="AliExpress Deals | Smart Home & SBC"
      seoDescription="Curated AliExpress deals on smart home gear, single board computers, and electronics. Affiliate links help support the site."
      title="AliExpress Deals"
      intro="Deals on Raspberry Pi cases, ESP32/ESP8266 boards, sensors, and smart home parts. Links are affiliate links."
      sale={aliexpressSale}
      emptyMessage="No deals at the moment. Check back during sale events."
    />
  )
}
