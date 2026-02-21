/**
 * Amazon sale / deal products.
 * Add items here to show on /sale/amazon.
 *
 * Fields:
 *   id            - unique string
 *   name          - product title
 *   description   - short description (1–2 sentences)
 *   image         - path under /static/sales/ or full URL
 *   url           - affiliate / deal link (Amazon)
 *   price         - optional, e.g. '$29.99'
 *   originalPrice - optional (shown struck through)
 *   badge         - optional, e.g. 'Prime Day' or 'Deal'
 */
module.exports = [
  {
    id: 'sample-1',
    name: 'Echo Dot (5th Gen)',
    description: 'Compact smart speaker with Alexa. Use for smart home control, music, and routines.',
    image: '/static/sales/cover.png',
    url: 'https://www.amazon.com/dp/your-affiliate-tag',
    price: '$24.99',
    originalPrice: '$49.99',
    badge: '50% off',
  },
  {
    id: 'sample-2',
    name: 'Smart Plug 4-Pack',
    description: 'WiFi smart plugs with energy monitoring. Works with Alexa, Google Home, and Home Assistant.',
    image: '/static/sales/cover.png',
    url: 'https://www.amazon.com/dp/your-affiliate-tag',
    price: '$19.99',
    badge: 'Deal',
  },
]
