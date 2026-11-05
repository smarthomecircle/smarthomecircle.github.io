# Sale / Deals product data

Add products to the AliExpress and Amazon sale pages by editing:

- **`aliexpress.js`** → shown on `/sale/aliexpress`
- **`amazon.js`** → shown on `/sale/amazon`

Both pages are rendered by `components/SalePage.js` and show one product table per category.

## Page shape

Each file exports an object. Every top-level key is optional.

| Field        | Description                                                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `imageUrl`   | Cover image shown when the page is shared on Twitter, Facebook, etc., like `imageUrl` in a blog post's front matter. Falls back to the site's default banner. Aim for about 1200×630. |
| `event`      | Sale banner: `{ name, start, end, url, badge }`. `badge` (e.g. `'11.11'`) is the image tag for products without their own badge or discount.                                          |
| `codes`      | Discount codes table: `[{ code, discount, minSpend, url }]`. `url` (optional) adds a "Shop" button with the code's landing link.                                                      |
| `codesNote`  | Short note shown above the codes table                                                                                                                                                |
| `categories` | Page sections, each rendered as one product table: `[{ id, title, description, products }]`                                                                                           |

Categories with no products are hidden. The category `id` is used as the anchor (`/sale/aliexpress#zigbee`).

## Product shape

| Field           | Required | Description                                                                                                      |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `id`            | Yes      | Unique string (e.g. `'raspberry-pi-case'`)                                                                       |
| `name`          | Yes      | Product title                                                                                                    |
| `image`         | Yes      | Path under `/static/` (e.g. an image already used in a blog post) or full image URL                              |
| `url`           | Yes\*    | Your affiliate / deal link (\*or use `links`)                                                                    |
| `links`         | No       | Several buttons: `[{ label, url }]`. On Amazon, one link per store: `'Amazon US'`, `'Amazon DE'`, `'Amazon UK'`. |
| `specs`         | No       | Short tags under the name, e.g. `['USB-C', 'Zigbee']`                                                            |
| `description`   | No       | One-line description under the specs                                                                             |
| `post`          | No       | Link to the blog post featuring the product: `{ label: 'Read my review', href: '/post-slug' }`                   |
| `price`         | No       | Display price, e.g. `'$19.99'`. The price column is hidden for a category when none of its products has a price. |
| `originalPrice` | No       | Struck-through price, e.g. `'$29.99'`                                                                            |
| `badge`         | No       | Tag on the image, e.g. `'Deal'`. Defaults to the % off when both prices are set, then to `event.badge`.          |

## Example

```js
{
  id: 'zigbee',
  title: 'Zigbee & Thread',
  description: 'Coordinators and sensors that work locally.',
  products: [
    {
      id: 'sonoff-dongle-max',
      name: 'Sonoff Dongle Max',
      specs: ['PoE / Wi-Fi / USB', 'Zigbee/Thread'],
      image: '/static/images/2026/sonoff-dongle-max/dongle-max.jpg',
      links: [
        { label: 'Amazon US', url: 'https://amzn.to/your-us-link' },
        { label: 'Amazon DE', url: 'https://amzn.to/your-de-link' },
      ],
      post: { label: 'Read my review', href: '/sonoff-dongle-max-features-and-home-assistant-setup' },
    },
  ],
}
```

## Images

Reuse product photos from `public/static/images/` where a post already has one. Otherwise put images in **`public/static/sales/`** and reference them as `/static/sales/filename.jpg`, or use `placeholder.svg` until you have a real image.
