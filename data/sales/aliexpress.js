/**
 * AliExpress sale / deal data, shown on /sale/aliexpress.
 * See README.md in this folder for the full field reference.
 *
 * imageUrl   - optional cover image used when the page is shared (og:image / twitter:image)
 * event      - optional sale banner (name, start, end, url, badge)
 *              `badge` is the image tag for products without their own badge or discount
 * codes      - optional discount codes table ({ code, discount, minSpend, url })
 * codesNote  - optional note shown under the codes heading
 * categories - sections of the page, each rendered as one product table:
 *   id          - anchor id, e.g. 'zigbee'
 *   title       - section heading
 *   description - optional intro paragraph
 *   products    - array of products:
 *     id            - unique string
 *     name          - product title
 *     specs         - optional short tags, e.g. ['USB-C', 'Zigbee']
 *     description   - optional one-liner
 *     image         - path under /static/ or full URL
 *     url           - affiliate / deal link (or use `links` for several)
 *     links         - optional [{ label, url }] for multiple stores/variants
 *     post          - optional { label, href } link to the blog post featuring it
 *     price         - optional, e.g. '$12.99'
 *     originalPrice - optional, e.g. '$24.99' (shown struck through)
 *     badge         - optional tag on the image; defaults to the % off, then event.badge
 */
module.exports = {
  imageUrl: '/static/sales/aliexpress-cover.webp',
  event: {
    name: '11.11 Singles Day Sale',
    start: 'Nov 1, 2026',
    end: 'Nov 18, 2026',
    url: 'https://s.click.aliexpress.com/e/_c4kEnvDN',
    badge: '11.11',
  },
  codesNote:
    'US only (orders shipped to the US). Valid Nov 1 – Nov 18, 2026. Apply at checkout once your cart passes the minimum spend; shipping does not count.',
  codes: [
    {
      code: 'USAFF5',
      discount: '$5.00',
      minSpend: '$29.00',
      url: 'https://s.click.aliexpress.com/e/_c4kEnvDN',
    },
    {
      code: 'USAFF6',
      discount: '$6.00',
      minSpend: '$35.00',
      url: 'https://s.click.aliexpress.com/e/_c3pck67d',
    },
    {
      code: '15USAFF',
      discount: '$15.00',
      minSpend: '$80.00',
      url: 'https://s.click.aliexpress.com/e/_c307nA7z',
    },
    {
      code: 'USAFF21',
      discount: '$21.00',
      minSpend: '$119.00',
      url: 'https://s.click.aliexpress.com/e/_c35gOfJt',
    },
    {
      code: 'USAFF25',
      discount: '$25.00',
      minSpend: '$139.00',
      url: 'https://s.click.aliexpress.com/e/_c4T6989Z',
    },
    {
      code: 'USAFF27',
      discount: '$27.00',
      minSpend: '$150.00',
      url: 'https://s.click.aliexpress.com/e/_c43ZH7Lt',
    },
    {
      code: 'USAFF32',
      discount: '$32.00',
      minSpend: '$170.00',
      url: 'https://s.click.aliexpress.com/e/_c3L5GL2R',
    },
    {
      code: 'USAFF38',
      discount: '$38.00',
      minSpend: '$200.00',
      url: 'https://s.click.aliexpress.com/e/_c3fOQ42L',
    },
    {
      code: 'USAFF50',
      discount: '$50.00',
      minSpend: '$249.00',
      url: 'https://s.click.aliexpress.com/e/_c3rJeHbZ',
    },
    {
      code: 'USAFF55',
      discount: '$55.00',
      minSpend: '$299.00',
      url: 'https://s.click.aliexpress.com/e/_c3zf08qb',
    },
    {
      code: 'USAFF70',
      discount: '$70.00',
      minSpend: '$349.00',
      url: 'https://s.click.aliexpress.com/e/_c4dSi9g3',
    },
    {
      code: 'USAFF75',
      discount: '$75.00',
      minSpend: '$399.00',
      url: 'https://s.click.aliexpress.com/e/_c3CbofPZ',
    },
    {
      code: 'USAFF90',
      discount: '$90.00',
      minSpend: '$459.00',
      url: 'https://s.click.aliexpress.com/e/_c4F61vk3',
    },
    {
      code: 'USAFF95',
      discount: '$95.00',
      minSpend: '$500.00',
      url: 'https://s.click.aliexpress.com/e/_c33FO93Z',
    },
    {
      code: 'USAFF110',
      discount: '$110.00',
      minSpend: '$629.00',
      url: 'https://s.click.aliexpress.com/e/_c3AgwhML',
    },
    {
      code: 'USAFF120',
      discount: '$120.00',
      minSpend: '$650.00',
      url: 'https://s.click.aliexpress.com/e/_c3EH9hcj',
    },
    {
      code: 'USAFF155',
      discount: '$155.00',
      minSpend: '$859.00',
      url: 'https://s.click.aliexpress.com/e/_c3oLdMOL',
    },
  ],
  categories: [
    {
      id: 'zigbee-smart-home',
      title: 'Zigbee & Smart Home',
      description:
        'Coordinators, switches, plugs, and sensors I have paired with Home Assistant, all controllable locally.',
      products: [
        {
          id: 'sonoff-dongle-max',
          name: 'Sonoff Dongle Max',
          specs: ['PoE / Wi-Fi / USB', 'Zigbee/Thread'],
          image: '/static/images/2026/sonoff-dongle-max/dongle-max.jpg',
          url: 'https://s.click.aliexpress.com/e/_c3kHBYyn',
          post: {
            label: 'Read my review',
            href: '/sonoff-dongle-max-features-and-home-assistant-setup',
          },
        },
        {
          id: 'sonoff-zigbee-3-dongle-plus',
          name: 'Sonoff Zigbee 3.0 USB Dongle Plus',
          specs: ['USB', 'Zigbee 3.0'],
          image:
            '/static/images/2023/sonoff-zigbee-3-dongle-home-assistant/sonoff-zigbee-3-dongle-plus-image.webp',
          url: 'https://s.click.aliexpress.com/e/_DemtGJ9',
          post: {
            label: 'See my Zigbee2MQTT guide',
            href: '/install-zigbee2mqtt-with-home-assistant',
          },
        },
        {
          id: 'zigbee-plug',
          name: 'Zigbee Smart Plug',
          specs: ['Zigbee', 'Smart plug'],
          image: '/static/images/2023/sonoff-zigbee-3-dongle-home-assistant/zigbee-plug.webp',
          url: 'https://s.click.aliexpress.com/e/_DchhTXp',
          post: {
            label: 'See my setup guide',
            href: '/connect-zigbee-device-using-sonoff-zigbee-3-dongle-plus-to-home-assistant',
          },
        },
        {
          id: 'tuya-wifi-plug',
          name: 'Tuya Wi-Fi Smart Plug',
          specs: ['Wi-Fi', 'Energy monitoring', 'Tuya Local'],
          image: '/static/images/2026/tuya-local-setup/tuya-plug.png',
          url: 'https://s.click.aliexpress.com/e/_c4SlJNBl',
          post: {
            label: 'See my Tuya Local guide',
            href: '/home-assistant-tuya-local-control-setup',
          },
        },
        {
          id: 'tuya-4-button-scene-switch',
          name: 'Tuya 4-Button Smart Scene Switch',
          specs: ['4 buttons', 'Zigbee'],
          image: '/static/images/2023/tuya-smart-scene-switch/Tuya-ZigBee-Smart-Switch.webp',
          url: 'https://s.click.aliexpress.com/e/_DmPgWRR',
          post: {
            label: 'See my setup guide',
            href: '/connect-automate-tuya-zigbee-smart-scene-switch-with-home-assistant',
          },
        },
        {
          id: 'moes-zigbee-knob',
          name: 'MOES Zigbee Smart Knob',
          specs: ['Rotary', 'Zigbee'],
          image: '/static/images/2023/moes-zigbee-smart-knob/moes-smart-knob.webp',
          url: 'https://s.click.aliexpress.com/e/_DkdrcSv',
          post: { label: 'See my setup guide', href: '/moes-zigbee-smart-knob-with-homeassistant' },
        },
        {
          id: 'xiaomi-lywsd03mmc',
          name: 'Xiaomi Temperature & Humidity Sensor (LYWSD03MMC)',
          specs: ['Bluetooth', 'Temp/Humidity'],
          image: '/static/images/2023/xiaomi-temp-humidity-sensor/xiaomi-temp-humidity-sensor.png',
          url: 'https://s.click.aliexpress.com/e/_DkrUrzT',
          post: {
            label: 'See my setup guide',
            href: '/connect-xiaomi-temperature-and-humidity-bluetooth-sensor-to-home-assistant',
          },
        },
      ],
    },
    {
      id: 'displays-voice',
      title: 'Smart Displays & Voice Assistants',
      description:
        'ESP32 displays I turned into Home Assistant dashboards and controllers, and local voice assistant hardware.',
      products: [
        {
          id: 'elecrow-esp32-p4-10',
          name: 'Elecrow CrowPanel 10" ESP32-P4 Display',
          specs: ['ESP32-P4', '10" touch', 'ESPHome'],
          image: '/static/images/2026/elecrow-esp32-p4-display/panel-display.webp',
          url: 'https://s.click.aliexpress.com/e/_c35xo2QH',
          post: {
            label: 'See my dashboard build',
            href: '/elecrow-10-inch-esp32-p4-esphome-lvgl-home-assistant-dashboard',
          },
        },
        {
          id: 'elecrow-rotary-2-1',
          name: 'Elecrow CrowPanel 2.1" ESP32 Rotary Display',
          specs: ['ESP32-S3', '480x480 round', 'Rotary knob'],
          image: '/static/images/2025/elecrow-rotatory-display/elecrow-rotatory-display.webp',
          url: 'https://s.click.aliexpress.com/e/_c4B9jfHR',
          post: {
            label: 'Read my review',
            href: '/elecrow-2-1-rotary-display-esphome-home-assistant-controller',
          },
        },
        {
          id: 'respeaker-xvf3800',
          name: 'Seeed Studio ReSpeaker XVF3800',
          specs: ['XMOS XVF3800', 'Mic array'],
          image: '/static/images/2026/respeaker-xvf3800/respeaker-front.webp',
          url: 'https://s.click.aliexpress.com/e/_c3v77jId',
          post: {
            label: 'Read my review',
            href: '/respeaker-xvf3800-home-assistant-voice-assistant',
          },
        },
        {
          id: 'respeaker-lite',
          name: 'ReSpeaker Lite Voice Assistant Kit',
          specs: ['XIAO ESP32S3', 'Local voice'],
          image: '/static/images/2024/respeaker-lite/Voice-Assistant.jpg',
          url: 'https://s.click.aliexpress.com/e/_oCuVeir',
          post: {
            label: 'See my voice assistant build',
            href: '/local-voice-assistant-with-seeed-studio-respeaker-lite',
          },
        },
      ],
    },
    {
      id: 'esp32-diy',
      title: 'ESP32 & DIY Electronics',
      description:
        'Boards, audio modules, LEDs, and sensors from my ESPHome projects: voice assistants with wake word, WLED strips, and an air quality monitor.',
      products: [
        {
          id: 'esp32-s3-devkit',
          name: 'ESP32-S3 Dev Board (N8R2 / N16R8)',
          specs: ['ESP32-S3', 'PSRAM', 'Wi-Fi + BLE'],
          image: '/static/images/components/esp32-s3-n8r2.webp',
          url: 'https://s.click.aliexpress.com/e/_DFopt57',
          post: {
            label: 'See my voice assistant build',
            href: '/How-I-created-my-voice-assistant-with-on-device-wake-word-using-home-assistant',
          },
        },
        {
          id: 'esp32-wroom',
          name: 'ESP32 WROOM Dev Board',
          specs: ['ESP32', 'Wi-Fi + BLE'],
          image: '/static/images/2023/wled-with-home-assistant/esp32-wroom.webp',
          url: 'https://s.click.aliexpress.com/e/_DB4HfST',
          post: {
            label: 'See my Bluetooth proxy guide',
            href: '/connect-bluetooth-devices-to-home-assistant-with-bluetooth-proxy',
          },
        },
        {
          id: 'd1-mini',
          name: 'D1 Mini (ESP8266)',
          specs: ['ESP8266', 'Wi-Fi'],
          image: '/static/images/2023/wled-with-home-assistant/d1-mini.webp',
          links: [
            { label: 'Store 1', url: 'https://s.click.aliexpress.com/e/_DB6gHF9' },
            { label: 'Store 2', url: 'https://s.click.aliexpress.com/e/_De0exaL' },
          ],
          post: {
            label: 'See my WLED guide',
            href: '/how-to-connect-led-strip-with-home-assistant-using-wled',
          },
        },
        {
          id: 'inmp441',
          name: 'INMP441 I2S Microphone',
          specs: ['I2S', 'Microphone'],
          image: '/static/images/2023/esp32-voice-assistant/inmp441-microphone.webp',
          url: 'https://s.click.aliexpress.com/e/_Dmn2PyR',
          post: {
            label: 'See my voice assistant build',
            href: '/created-voice-assistant-esp32-with-wake-word-in-home-assistant',
          },
        },
        {
          id: 'max98357a',
          name: 'MAX98357A I2S Audio Amplifier',
          specs: ['I2S', 'Amplifier'],
          image: '/static/images/2023/esp32-voice-assistant/MAX98357A.webp',
          url: 'https://s.click.aliexpress.com/e/_DdyIFTH',
          post: {
            label: 'See my voice assistant build',
            href: '/created-voice-assistant-esp32-with-wake-word-in-home-assistant',
          },
        },
        {
          id: '3w-speaker',
          name: '3 Watt Speakers',
          specs: ['3W'],
          image: '/static/images/2023/esp32-voice-assistant/3-watt-speakers.webp',
          url: 'https://s.click.aliexpress.com/e/_DBDIScT',
          post: {
            label: 'See my voice assistant build',
            href: '/created-voice-assistant-esp32-with-wake-word-in-home-assistant',
          },
        },
        {
          id: 'ws2812b-strip',
          name: 'WS2812B LED Strip',
          specs: ['Addressable', 'WLED'],
          image: '/static/images/2023/wled-with-home-assistant/led-strip-aliexpress.webp',
          url: 'https://s.click.aliexpress.com/e/_DEYtbQb',
          post: {
            label: 'See my WLED guide',
            href: '/how-to-connect-led-strip-with-home-assistant-using-wled',
          },
        },
        {
          id: 'ws2812b-cob-strip',
          name: 'COB 5mm WS2812B LED Strip',
          specs: ['COB', '5 mm', 'Addressable'],
          image: '/static/images/components/Ws2812b-cob-led-strip.webp',
          url: 'https://s.click.aliexpress.com/e/_DDtD9SP',
          post: {
            label: 'See my voice assistant build',
            href: '/How-I-created-my-voice-assistant-with-on-device-wake-word-using-home-assistant',
          },
        },
        {
          id: 'led-matrix-8x32',
          name: '8x32 LED Matrix',
          specs: ['8x32', 'Addressable'],
          image: '/static/images/2024/led-matrix/8x32-led-matrix.webp',
          url: 'https://s.click.aliexpress.com/e/_DFOOsH9',
          post: {
            label: 'See my LED matrix guide',
            href: '/how-to-control-8x32-led-matrix-like-a-pro',
          },
        },
        {
          id: 'sgp30',
          name: 'SGP30 Air Quality Sensor',
          specs: ['Air quality', 'I2C'],
          image: '/static/images/2023/air-quality-sensor-esp32-home-assistant/cover.webp',
          url: 'https://s.click.aliexpress.com/e/_DDdbOUT',
          post: {
            label: 'See my air quality build',
            href: '/air-quality-sensor-and-light-sensor-esp32-home-assistant',
          },
        },
        {
          id: 'bh1750',
          name: 'BH1750 Light Sensor',
          specs: ['Light sensor', 'I2C'],
          image: '/static/images/2023/air-quality-sensor-esp32-home-assistant/cover.webp',
          url: 'https://s.click.aliexpress.com/e/_DdVXwIJ',
          post: {
            label: 'See my air quality build',
            href: '/air-quality-sensor-and-light-sensor-esp32-home-assistant',
          },
        },
      ],
    },
    {
      id: 'sbc',
      title: 'Single Board Computers',
      description:
        'Every board here has been on my desk for benchmarks, NVMe tests, and Home Assistant workloads. Follow the review link to see how each one performed before you buy.',
      products: [
        {
          id: 'radxa-rock-5t',
          name: 'Radxa Rock 5T',
          specs: ['Rockchip RK3588', '4–32GB RAM', 'Dual 2.5GbE'],
          image: '/static/images/2026/rock-5t/front.webp',
          links: [
            { label: 'Store 1', url: 'https://s.click.aliexpress.com/e/_c40YIHzD' },
            { label: 'Store 2', url: 'https://s.click.aliexpress.com/e/_opvmiJ4' },
          ],
          post: { label: 'Read my review', href: '/radxa-rock-5t-better-than-raspberrypi-5' },
        },
        {
          id: 'radxa-dragon-q8b',
          name: 'Radxa Dragon Q8B',
          specs: ['Snapdragon SC8280XP', '4–32GB RAM', 'Dual NVMe'],
          image: '/static/images/2026/radxa-dragon-q8b/front.webp',
          url: 'https://de.aliexpress.com/item/1005012429736010.html?aff_fcid=c4a1c9982013494896246251091de99b-1786995865085-09588-_c3Wt2byj&tt=CPS_NORMAL&aff_fsk=_c3Wt2byj&aff_platform=shareComponent-detail&sk=_c3Wt2byj&aff_trace_key=c4a1c9982013494896246251091de99b-1786995865085-09588-_c3Wt2byj&terminal_id=e062923139f9418882511dd06d5f4091&afSmartRedirect=y',
          post: {
            label: 'Read my review',
            href: '/radxa-dragon-q8b-snapdragon-8cx-gen3-sbc-review',
          },
        },
        {
          id: 'radxa-dragon-q6a',
          name: 'Radxa Dragon Q6A',
          specs: ['Qualcomm QCS6490', '4–16GB RAM', 'Windows on ARM'],
          image: '/static/images/2026/radxa-dragon-q6a/dragon-q6a.webp',
          url: 'https://de.aliexpress.com/item/1005010224206962.html?aff_fcid=79f77f80ca9543b49d03804d6e991f74-1766435965636-09027-_DEhJfB1&tt=CPS_NORMAL&aff_fsk=_DEhJfB1&aff_platform=shareComponent-detail&sk=_DEhJfB1&aff_trace_key=79f77f80ca9543b49d03804d6e991f74-1766435965636-09027-_DEhJfB1',
          post: {
            label: 'Read my review',
            href: '/radxa-dragon-q6a-best-alternative-to-the-raspberry-pi-5',
          },
        },
        {
          id: 'radxa-orion-o6n',
          name: 'Radxa Orion O6N',
          specs: ['Cix P1', '8–64GB RAM', 'Nano-ITX'],
          image: '/static/images/2026/orion-o6n/o6n-view1.webp',
          url: 'https://s.click.aliexpress.com/e/_c3dnDep1',
          post: {
            label: 'Read my review',
            href: '/radxa-orion-o6n-nano-itx-arm-board-review-benchmarks',
          },
        },
        {
          id: 'radxa-cubie-a7z',
          name: 'Radxa Cubie A7Z',
          specs: ['Allwinner A733', '1–16GB RAM', 'Pi Zero size'],
          image: '/static/images/2026/radxa-cubie-a7z/cubie-a7z-front.jpg',
          url: 'https://s.click.aliexpress.com/e/_c3Qz14bl',
          post: { label: 'Read my review', href: '/radxa-cubie-a7z-my-experience' },
        },
        {
          id: 'radxa-cubie-a7a',
          name: 'Radxa Cubie A7A',
          specs: ['Allwinner A733', '2–16GB RAM', 'PCIe NVMe'],
          image: '/static/images/2025/radxa-cubie-a7a/front.webp',
          url: 'https://s.click.aliexpress.com/e/_c434m0ff',
          post: {
            label: 'Read my review',
            href: '/radxa-cubie-a7a-review-benchmarks-pi-5-comparison',
          },
        },
        {
          id: 'radxa-cubie-a5e',
          name: 'Radxa Cubie A5E',
          specs: ['Allwinner A527', '1–4GB RAM', 'NVMe'],
          image: '/static/images/2025/radxa-cubie-a5e/front.webp',
          url: 'https://s.click.aliexpress.com/e/_oka7U73',
          post: {
            label: 'Read my review',
            href: '/radxa-cubie-a5e-review-benchmarks-vs-raspberry-pi',
          },
        },
        {
          id: 'radxa-x4',
          name: 'Radxa X4',
          specs: ['Intel N100', '4–16GB RAM', 'x86'],
          image: '/static/images/2024/radxa-x4-sbc/Radxa-x4.webp',
          links: [
            { label: 'Store 1', url: 'https://s.click.aliexpress.com/e/_c4SciGWr' },
            { label: 'Store 2', url: 'https://s.click.aliexpress.com/e/_DkuskjB' },
          ],
          post: { label: 'Read my review', href: '/radxa-x4-alternative-to-raspberry-pi-5' },
        },
        {
          id: 'radxa-x4l',
          name: 'Radxa X4L',
          specs: ['Intel N100', '8–32GB RAM', 'x86'],
          image: '/static/images/2024/radxa-x4l/Board-view-1.webp',
          links: [
            { label: 'Store 1', url: 'https://s.click.aliexpress.com/e/_c4PLU5mT' },
            { label: 'Store 2', url: 'https://s.click.aliexpress.com/e/_DESXdqh' },
          ],
          post: { label: 'Read my review', href: '/radxa-x4l-a-powerful-pocket-sized-computer' },
        },
        {
          id: 'orange-pi-5-max',
          name: 'Orange Pi 5 Max',
          specs: ['Rockchip RK3588', '4–16GB RAM', '6 TOPS NPU'],
          image: '/static/images/components/orange-pi-5-max.webp',
          url: 'https://s.click.aliexpress.com/e/_De07TWt',
          post: {
            label: 'Read my review',
            href: '/Orange-pi-5-max-a-powerful-successor-to-orange-pi-5-pro',
          },
        },
        {
          id: 'muse-pi-pro',
          name: 'Muse Pi Pro',
          specs: ['SpacemiT M1', '8/16GB RAM', 'RISC-V'],
          image: '/static/images/2025/muse-pi-pro/muse-pi-pro-view.webp',
          url: 'https://s.click.aliexpress.com/e/_c41dKfrP',
          post: {
            label: 'Read my review',
            href: '/spacemit-muse-pi-pro-riscv-review-performance-benchmarks',
          },
        },
        {
          id: 'raspberry-pi-cm5',
          name: 'Raspberry Pi Compute Module 5',
          specs: ['Broadcom BCM2712', 'eMMC options'],
          image: '/static/images/2024/raspberrypi-cm5/cm5-front.webp',
          url: 'https://s.click.aliexpress.com/e/_DdzGQGd',
          post: { label: 'Read my review', href: '/raspberry-pi-compute-module-5-review' },
        },
        {
          id: 'raspberry-pi-5',
          name: 'Raspberry Pi 5',
          specs: ['Broadcom BCM2712', 'PCIe', 'Dual 4K HDMI'],
          image: '/static/images/2024/raspberry-pi-nas/raspberry-pi5.jpg',
          url: 'https://s.click.aliexpress.com/e/_Dk7NN6t',
          post: { label: 'See my Pi 5 NAS build', href: '/create-nas-with-raspberry-pi-5' },
        },
        {
          id: 'lattepanda-mu-lite',
          name: 'LattePanda Mu Lite Carrier Board',
          specs: ['Intel N100', 'x86', 'PCIe x4'],
          image: '/static/images/2025/diy-rack/latte-panda-mu-rack-mount.webp',
          url: 'https://s.click.aliexpress.com/e/_oEVRfJs',
          post: {
            label: 'See my eGPU build',
            href: '/run-gpu-on-latte-panda-mu-lite-carrier-board',
          },
        },
      ],
    },
    {
      id: 'nas-accessories',
      title: 'NAS, Storage & SBC Accessories',
      description:
        'The parts behind my Raspberry Pi NAS builds and eGPU experiment: SATA adapters, drive mounts, cables, and cases.',
      products: [
        {
          id: 'radxa-penta-sata-hat',
          name: 'Radxa Penta SATA HAT',
          specs: ['5x SATA', 'Raspberry Pi 5', 'RAID 5'],
          image: '/static/images/2025/backup-strategies/cover.webp',
          url: 'https://s.click.aliexpress.com/e/_olCRd9p',
          post: {
            label: 'See my NAS backup setup',
            href: '/3-backup-strategies-for-raspberrypi-nas',
          },
        },
        {
          id: 'nvme-to-sata-asm1166',
          name: 'NVMe to SATA Adapter (ASM1166)',
          specs: ['ASM1166', '6x SATA', 'M.2'],
          image: '/static/images/2024/diy-nas-cm5/sata-adapter.webp',
          url: 'https://s.click.aliexpress.com/e/_olOqrGf',
          post: {
            label: 'See my CM5 NAS build',
            href: '/create-diy-nas-with-raspberry-pi-compute-module-5-raid-5',
          },
        },
        {
          id: 'acrylic-hdd-rack',
          name: 'Acrylic HDD Rack Mount',
          specs: ['Acrylic', 'HDD mount'],
          image: '/static/images/2024/diy-nas-cm5/hdd-rack.webp',
          url: 'https://s.click.aliexpress.com/e/_olEubxz',
          post: {
            label: 'See my CM5 NAS build',
            href: '/create-diy-nas-with-raspberry-pi-compute-module-5-raid-5',
          },
        },
        {
          id: 'sata-power-cable',
          name: 'SATA Power Supply Cable',
          specs: ['12V 7.5A', 'DC input'],
          image: '/static/images/2024/diy-nas-cm5/sata-power.webp',
          url: 'https://s.click.aliexpress.com/e/_ooaEC11',
          post: {
            label: 'See my CM5 NAS build',
            href: '/create-diy-nas-with-raspberry-pi-compute-module-5-raid-5',
          },
        },
        {
          id: 'usb-to-sata',
          name: 'USB to SATA Connector',
          specs: ['USB', 'SATA'],
          image: '/static/images/2025/backup-strategies/usb-sata.jpg',
          url: 'https://s.click.aliexpress.com/e/_oFQ4SfZ',
          post: {
            label: 'See my NAS backup setup',
            href: '/3-backup-strategies-for-raspberrypi-nas',
          },
        },
        {
          id: 'esata-cable',
          name: 'eSATA Cable for 3.5" HDD',
          specs: ['3.5" HDD', '12V pins'],
          image: '/static/images/2025/backup-strategies/esata.jpg',
          url: 'https://s.click.aliexpress.com/e/_ok7mfCB',
          post: {
            label: 'See my NAS backup setup',
            href: '/3-backup-strategies-for-raspberrypi-nas',
          },
        },
        {
          id: 'micro-sd-card',
          name: 'Micro SD Card',
          specs: ['microSD'],
          image: '/static/images/2024/raspberry-pi-nas/sd-card.jpg',
          url: 'https://s.click.aliexpress.com/e/_DBSUjn3',
          post: { label: 'See my Pi 5 NAS build', href: '/create-nas-with-raspberry-pi-5' },
        },
        {
          id: 'orange-pi-5-max-case',
          name: 'Orange Pi 5 Max Case',
          specs: ['Orange Pi 5 Max'],
          image: '/static/images/components/orange-pi-5-max-case.webp',
          url: 'https://s.click.aliexpress.com/e/_DmIKkdF',
          post: {
            label: 'Read my review',
            href: '/Orange-pi-5-max-a-powerful-successor-to-orange-pi-5-pro',
          },
        },
        {
          id: 'egpu-oculink',
          name: 'eGPU Mount with OCuLink Cable',
          specs: ['OCuLink', 'eGPU dock'],
          image: '/static/images/2025/gpu-experiment/egpu.jpg',
          url: 'https://s.click.aliexpress.com/e/_c3Gutyd1',
          post: {
            label: 'See my eGPU build',
            href: '/run-gpu-on-latte-panda-mu-lite-carrier-board',
          },
        },
        {
          id: 'pcie-to-oculink',
          name: 'PCIe 4X to OCuLink SFF-8612 Adapter',
          specs: ['PCIe x4', 'SFF-8612'],
          image: '/static/images/2025/gpu-experiment/pcie-adapter.webp',
          url: 'https://s.click.aliexpress.com/e/_c3X4MKnV',
          post: {
            label: 'See my eGPU build',
            href: '/run-gpu-on-latte-panda-mu-lite-carrier-board',
          },
        },
      ],
    },
    {
      id: 'networking',
      title: 'Remote Access & Networking',
      description:
        'KVM-over-IP devices and the travel router I use to reach my home lab from anywhere.',
      products: [
        {
          id: 'glinet-comet-x',
          name: 'GL.iNet Comet X',
          specs: ['4-port KVM', 'KVM over IP'],
          image: '/static/images/2026/glinet-comet-x/view1.webp',
          url: 'https://s.click.aliexpress.com/e/_c4TyX7pP',
          post: { label: 'Read my review', href: '/gl-inet-comet-x-4-port-remote-kvm-review' },
        },
        {
          id: 'glinet-comet-gl-rm1',
          name: 'GL.iNet Comet KVM (GL-RM1)',
          specs: ['KVM over IP', 'Remote access'],
          image: '/static/images/2025/comet-kvm/comet-kvm.webp',
          url: 'https://s.click.aliexpress.com/e/_oDCndXd',
          post: { label: 'Read my review', href: '/comet-kvm-gl-rm1-review-best-kvm-over-ip-2025' },
        },
        {
          id: 'glinet-slate-7',
          name: 'GL.iNet Slate 7 (GL-BE3600)',
          specs: ['Wi-Fi 7', 'Travel router'],
          image: '/static/images/2025/glinet-slate-7-travel-router/1-router.webp',
          url: 'https://s.click.aliexpress.com/e/_oDLL1GK',
          post: { label: 'Read my review', href: '/glinet-slate-7-wifi-7-travel-router' },
        },
      ],
    },
    {
      id: 'homelab-rack',
      title: '10-Inch Home Lab Rack',
      description:
        'A ready-made Waveshare rack, plus every part I used to build my own DIY 10-inch rack from 2020 aluminium extrusions.',
      products: [
        {
          id: 'waveshare-homerack-8u',
          name: 'Waveshare HomeRack 8U',
          specs: ['8U', '10-inch rack'],
          image: '/static/images/2026/waveshare-homerack/product-view.webp',
          url: 'https://s.click.aliexpress.com/e/_c3VLqecX',
          post: {
            label: 'Read my review',
            href: '/waveshare-homerack-8u-10-inch-server-rack-review',
          },
        },
        {
          id: '2020-extrusion',
          name: '2020 T-Slot Aluminium Extrusion Profile',
          specs: ['2020', '200/250/500 mm'],
          image: '/static/images/2025/diy-rack/rails-1.webp',
          url: 'https://s.click.aliexpress.com/e/_olj4GKu',
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: '2020-l-bracket',
          name: '2020 L-Shape Corner Bracket',
          specs: ['2020', 'M5 screws'],
          image: '/static/images/2025/diy-rack/l-shaped-holder.jpg',
          url: 'https://s.click.aliexpress.com/e/_onRkO2g',
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: '2020-handle',
          name: '2020 Aluminium Profile Handle',
          specs: ['2020', '100 mm'],
          image: '/static/images/2025/diy-rack/handle.webp',
          url: 'https://s.click.aliexpress.com/e/_oouOx5a',
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: 'm5-screws',
          name: 'M5 x 8mm Mounting Screws',
          specs: ['M5', '8 mm'],
          image: '/static/images/2025/diy-rack/m5-screws.avif',
          url: 'https://s.click.aliexpress.com/e/_ooEQ5V6',
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: 'm5-spring-nut',
          name: '2020 M5 Spring Ball Nut',
          specs: ['2020', 'M5'],
          image: '/static/images/2025/diy-rack/m5-spring-nut.avif',
          url: 'https://s.click.aliexpress.com/e/_oCe5PHw',
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: 'micro-hdmi-to-hdmi',
          name: 'Micro HDMI to HDMI Cable',
          specs: ['30 cm'],
          image: '/static/images/2025/diy-rack/micro-hdmi.avif',
          url: 'https://s.click.aliexpress.com/e/_oCs4tFe',
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: 'hdmi-to-hdmi',
          name: 'HDMI to HDMI Cable',
          specs: ['30 cm'],
          image: '/static/images/2025/diy-rack/hdmi-to-hdmi.avif',
          url: 'https://s.click.aliexpress.com/e/_opwDBD2',
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: 'rj45-keystone',
          name: 'RJ45 Keystone Jack',
          specs: ['RJ45', 'Keystone'],
          image: '/static/images/2025/diy-rack/rj45.webp',
          url: 'https://s.click.aliexpress.com/e/_olPuxKy',
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: 'cat6-patch-cable',
          name: 'CAT6 Patch Cable',
          specs: ['CAT6'],
          image: '/static/images/2025/diy-rack/patch-cable.avif',
          url: 'https://s.click.aliexpress.com/e/_oEJLvyJ',
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
      ],
    },
  ],
}
