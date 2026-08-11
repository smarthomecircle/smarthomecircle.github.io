# Sale / Deals product data

Add products to the AliExpress and Amazon sale pages by editing:

- **`aliexpress.js`** → shown on `/sale/aliexpress`
- **`amazon.js`** → shown on `/sale/amazon`

## Product shape

Each item in the array can have:

| Field           | Required | Description |
|----------------|----------|-------------|
| `id`           | Yes      | Unique string (e.g. `'raspberry-pi-case'`) |
| `name`         | Yes      | Product title |
| `description`  | Yes      | Short description (1–2 sentences) |
| `image`       | Yes      | Path like `/static/sales/my-product.jpg` or full image URL. Put images in `public/static/sales/`. |
| `url`         | Yes      | Your affiliate / deal link |
| `price`       | No       | Display price, e.g. `'$19.99'` |
| `originalPrice` | No     | Struck-through price, e.g. `'$29.99'` |
| `badge`       | No       | Label on the image, e.g. `'50% off'` or `'Deal'` |

## Example

```js
{
  id: 'esp32-cam',
  name: 'ESP32-CAM Module',
  description: 'WiFi camera for ESPHome and Home Assistant.',
  image: '/static/sales/esp32-cam.jpg',
  url: 'https://s.click.aliexpress.com/your-link',
  price: '$6.49',
  originalPrice: '$9.99',
  badge: '35% off',
}
```

## Images

Place product images in **`public/static/sales/`** and reference them as `/static/sales/filename.jpg`. Use a placeholder (e.g. `placeholder.svg`) until you have real images.
