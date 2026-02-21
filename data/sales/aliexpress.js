/**
 * AliExpress sale / deal products.
 * Add items here to show on /sale/aliexpress.
 *
 * Fields:
 *   id          - unique string (e.g. 'raspberry-pi-case')
 *   name        - product title
 *   description - short description (1–2 sentences)
 *   image       - path under /static/sales/ or full URL
 *   url         - affiliate / deal link (AliExpress)
 *   price       - optional, e.g. '$12.99'
 *   originalPrice - optional, e.g. '$24.99' (shown struck through)
 *   badge       - optional, e.g. '50% off' or 'Deal'
 */
module.exports = [
  {
    id: 'sample-1',
    name: 'Raspberry Pi 4 Case with Fan',
    description: 'Compact aluminum case with dual cooling fans. Great for 24/7 home server or Pi 5 projects.',
    image: '/static/sales/placeholder.svg',
    url: 'https://s.click.aliexpress.com/your-affiliate-link',
    price: '$8.99',
    originalPrice: '$14.99',
    badge: '40% off',
  },
  {
    id: 'sample-2',
    name: 'ESP32-CAM Development Board',
    description: 'WiFi camera module with OV2640. Perfect for ESPHome, Home Assistant, or DIY security.',
    image: '/static/sales/placeholder.svg',
    url: 'https://s.click.aliexpress.com/your-affiliate-link',
    price: '$6.49',
    originalPrice: '$9.99',
    badge: 'Deal',
  },
]
