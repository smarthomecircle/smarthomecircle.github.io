/**
 * Amazon sale / deal data, shown on /sale/amazon.
 * Same shape as aliexpress.js; see README.md in this folder for the full field reference.
 *
 * imageUrl   - optional cover image used when the page is shared (og:image / twitter:image)
 * event      - optional sale banner (name, start, end, url, badge), e.g. for Prime Day
 * categories - sections of the page, each rendered as one product table
 *
 * Products list one link per Amazon store in `links`, labelled by the store the
 * short link redirects to (amazon.com → US, amazon.de → DE, amazon.co.uk → UK).
 */
module.exports = {
  imageUrl: '/static/images/sales/amazon-cover.webp',
  categories: [
    {
      id: 'zigbee-smart-home',
      title: 'Zigbee & Smart Home',
      description: 'Coordinators, plugs, switches, and sensors I have paired with Home Assistant.',
      products: [
        {
          id: 'sonoff-dongle-max',
          name: 'Sonoff Dongle Max',
          specs: ['PoE / Wi-Fi / USB', 'EFR32MG24', 'Zigbee/Thread'],
          image: '/static/images/2026/sonoff-dongle-max/dongle-max.jpg',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/4qPgpqY' },
            { label: 'Amazon DE', url: 'https://amzn.to/4qejil7' },
          ],
          post: {
            label: 'Read my review',
            href: '/sonoff-dongle-max-features-and-home-assistant-setup',
          },
        },
        {
          id: 'sonoff-zigbee-3-dongle-plus',
          name: 'Sonoff Zigbee 3.0 USB Dongle Plus',
          specs: ['USB', 'EFR32MG21', 'Zigbee 3.0'],
          image:
            '/static/images/2023/sonoff-zigbee-3-dongle-home-assistant/sonoff-zigbee-3-dongle-plus-image.webp',
          links: [{ label: 'Amazon US', url: 'https://amzn.to/456Yzp1' }],
          post: {
            label: 'See my Zigbee2MQTT guide',
            href: '/install-zigbee2mqtt-with-home-assistant',
          },
        },
        {
          id: 'tuya-zigbee-plug',
          name: 'Tuya Zigbee Smart Plug',
          specs: ['Zigbee', 'Energy monitoring'],
          image: '/static/images/2023/sonoff-zigbee-3-dongle-home-assistant/zigbee-plug.webp',
          links: [{ label: 'Amazon DE', url: 'https://amzn.to/3ZFioSq' }],
          post: {
            label: 'See my Zigbee2MQTT guide',
            href: '/install-zigbee2mqtt-with-home-assistant',
          },
        },
        {
          id: 'tuya-wifi-plug',
          name: 'Tuya Wi-Fi Smart Plug',
          specs: ['Wi-Fi', 'Energy monitoring', 'Tuya Local'],
          image: '/static/images/2026/tuya-local-setup/tuya-plug.png',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/4d0AK8D' },
            { label: 'Amazon DE', url: 'https://amzn.to/433hX6A' },
            { label: 'Amazon UK', url: 'https://amzn.to/4fcY5Fq' },
          ],
          post: {
            label: 'See my Tuya Local guide',
            href: '/home-assistant-tuya-local-control-setup',
          },
        },
        {
          id: 'tuya-zigbee-knob',
          name: 'Tuya / MOES Zigbee Smart Knob',
          specs: ['Rotary', 'Zigbee', 'Scene control'],
          image: '/static/images/2023/moes-zigbee-smart-knob/moes-smart-knob.webp',
          links: [{ label: 'Amazon DE', url: 'https://amzn.to/47Nvn7S' }],
          post: { label: 'See my setup guide', href: '/moes-zigbee-smart-knob-with-homeassistant' },
        },
        {
          id: 'xiaomi-lywsd03mmc',
          name: 'Xiaomi Temperature & Humidity Monitor 2 (LYWSD03MMC)',
          specs: ['Bluetooth', 'Temp/Humidity'],
          image: '/static/images/2023/xiaomi-temp-humidity-sensor/xiaomi-temp-humidity-sensor.png',
          links: [{ label: 'Amazon DE', url: 'https://amzn.to/480BKEO' }],
          post: {
            label: 'See my setup guide',
            href: '/connect-xiaomi-temperature-and-humidity-bluetooth-sensor-to-home-assistant',
          },
        },
        {
          id: 'switchbot-climate-panel-trv',
          name: 'SwitchBot Climate Panel + Radiator Thermostat',
          specs: ['Bluetooth', 'Radiator thermostat'],
          image: '/static/images/2025/switchbot-climate-panel/view.webp',
          links: [{ label: 'Amazon DE', url: 'https://amzn.to/43cbgj7' }],
          post: { label: 'Read my review', href: '/switchbot-climate-panel-trv-setup-review' },
        },
      ],
    },
    {
      id: 'displays-voice',
      title: 'Voice Assistants',
      description: 'Microphones I use for local voice control in Home Assistant.',
      products: [
        {
          id: 'respeaker-xvf3800',
          name: 'Seeed Studio ReSpeaker XVF3800',
          specs: ['XMOS XVF3800', '4-mic array', 'USB'],
          image: '/static/images/2026/respeaker-xvf3800/respeaker-front.webp',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/3KNXiyh' },
            { label: 'Amazon DE', url: 'https://amzn.to/3LjM0lp' },
          ],
          post: {
            label: 'Read my review',
            href: '/respeaker-xvf3800-home-assistant-voice-assistant',
          },
        },
        {
          id: 'razer-usb-microphone',
          name: 'Razer USB Streaming Microphone',
          specs: ['USB', 'Microphone'],
          image: '/static/images/2023/voice-home-assistant-usb-microphone/microphone.jpg',
          links: [{ label: 'Amazon DE', url: 'https://amzn.to/402lMXB' }],
          post: {
            label: 'See my voice assistant setup',
            href: '/setup-voice-assistant-with-home-assistant-using-docker-usb-microphone',
          },
        },
      ],
    },
    {
      id: 'esp32-diy',
      title: 'ESP32 & DIY Electronics',
      description:
        'Boards, audio modules, and LEDs from my ESPHome projects: wake word voice assistants, WLED strips, and an LED matrix.',
      products: [
        {
          id: 'esp32-s3-devkit',
          name: 'ESP32-S3 Dev Board',
          specs: ['ESP32-S3', 'PSRAM', 'Wi-Fi + BLE'],
          image: '/static/images/components/esp32-s3-n8r2.webp',
          links: [{ label: 'Amazon US', url: 'https://amzn.to/3xnA8ax' }],
          post: {
            label: 'See my voice assistant build',
            href: '/How-I-created-my-voice-assistant-with-on-device-wake-word-using-home-assistant',
          },
        },
        {
          id: 'esp32-wroom',
          name: 'ESP32 WROOM Dev Board (2-pack)',
          specs: ['ESP32', 'Wi-Fi + BLE'],
          image: '/static/images/2023/wled-with-home-assistant/esp32-wroom.webp',
          links: [{ label: 'Amazon DE', url: 'https://amzn.to/3QPvyrR' }],
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
          links: [{ label: 'Amazon US', url: 'https://amzn.to/3AT0Z0f' }],
          post: {
            label: 'See my LED matrix guide',
            href: '/how-to-control-8x32-led-matrix-like-a-pro',
          },
        },
        {
          id: 'inmp441',
          name: 'INMP441 I2S Microphone',
          specs: ['I2S', 'Microphone'],
          image: '/static/images/2023/esp32-voice-assistant/inmp441-microphone.webp',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/3GdxO7o' },
            { label: 'Amazon DE', url: 'https://amzn.to/47uScws' },
          ],
          post: {
            label: 'See my voice assistant build',
            href: '/How-I-created-my-voice-assistant-with-on-device-wake-word-using-home-assistant',
          },
        },
        {
          id: 'max98357a',
          name: 'MAX98357A I2S Audio Amplifier',
          specs: ['I2S', '3W', 'Amplifier'],
          image: '/static/images/2023/esp32-voice-assistant/MAX98357A.webp',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/46wKTmW' },
            { label: 'Amazon DE', url: 'https://amzn.to/47vEMjH' },
          ],
          post: {
            label: 'See my voice assistant build',
            href: '/How-I-created-my-voice-assistant-with-on-device-wake-word-using-home-assistant',
          },
        },
        {
          id: 'ws2812b-strip',
          name: 'WS2812B LED Strip',
          specs: ['Addressable', '5V', 'WLED'],
          image: '/static/images/2023/wled-with-home-assistant/led-strip-aliexpress.webp',
          links: [{ label: 'Amazon DE', url: 'https://amzn.to/3Pjtmbr' }],
          post: {
            label: 'See my WLED guide',
            href: '/how-to-connect-led-strip-with-home-assistant-using-wled',
          },
        },
        {
          id: 'ws2812b-cob-strip',
          name: 'WS2812B COB LED Strip',
          specs: ['COB', 'Addressable', '5V'],
          image: '/static/images/components/Ws2812b-cob-led-strip.webp',
          links: [{ label: 'Amazon DE', url: 'https://amzn.to/3yqR7t7' }],
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
          links: [{ label: 'Amazon US', url: 'https://amzn.to/3TJnZ8z' }],
          post: {
            label: 'See my LED matrix guide',
            href: '/how-to-control-8x32-led-matrix-like-a-pro',
          },
        },
      ],
    },
    {
      id: 'sbc',
      title: 'Single Board Computers',
      description: 'Boards I have benchmarked and run Home Assistant, NAS, and AI workloads on.',
      products: [
        {
          id: 'radxa-rock-5t',
          name: 'Radxa Rock 5T',
          specs: ['Rockchip RK3588', '4–32GB RAM', 'Dual 2.5GbE'],
          image: '/static/images/2026/rock-5t/front.webp',
          links: [{ label: 'Amazon US', url: 'https://amzn.to/40Vp1BK' }],
          post: { label: 'Read my review', href: '/radxa-rock-5t-better-than-raspberrypi-5' },
        },
        {
          id: 'radxa-dragon-q8b',
          name: 'Radxa Dragon Q8B',
          specs: ['Snapdragon SC8280XP', '4–32GB RAM', 'Dual NVMe'],
          image: '/static/images/2026/radxa-dragon-q8b/front.webp',
          links: [{ label: 'Amazon US', url: 'https://amzn.to/4zpbHVV' }],
          post: {
            label: 'Read my review',
            href: '/radxa-dragon-q8b-snapdragon-8cx-gen3-sbc-review',
          },
        },
        {
          id: 'radxa-cubie-a7a',
          name: 'Radxa Cubie A7A',
          specs: ['Allwinner A733', '2–16GB RAM', 'PCIe NVMe'],
          image: '/static/images/2025/radxa-cubie-a7a/front.webp',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/47Q9yHd' },
            { label: 'Amazon DE', url: 'https://amzn.to/4pjxHeU' },
          ],
          post: {
            label: 'Read my review',
            href: '/radxa-cubie-a7a-review-benchmarks-pi-5-comparison',
          },
        },
        {
          id: 'orange-pi-5-max',
          name: 'Orange Pi 5 Max',
          specs: ['Rockchip RK3588', '8GB RAM', '6 TOPS NPU'],
          image: '/static/images/components/orange-pi-5-max.webp',
          links: [{ label: 'Amazon DE', url: 'https://amzn.to/4gAEOw4' }],
          post: {
            label: 'Read my review',
            href: '/Orange-pi-5-max-a-powerful-successor-to-orange-pi-5-pro',
          },
        },
        {
          id: 'raspberry-pi-5',
          name: 'Raspberry Pi 5',
          specs: ['Broadcom BCM2712', '4GB RAM', 'PCIe'],
          image: '/static/images/2024/raspberry-pi-nas/raspberry-pi5.jpg',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/3IETvS9' },
            { label: 'Amazon DE', url: 'https://amzn.to/4kOb1kn' },
          ],
          post: { label: 'See my Pi 5 NAS build', href: '/create-nas-with-raspberry-pi-5' },
        },
        {
          id: 'zimaboard-2',
          name: 'ZimaBoard 2',
          specs: ['Intel N150', 'x86', '2-bay NAS'],
          image: '/static/images/2026/zimaboard-2-review/zimaboard-2.webp',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/4s373YA' },
            { label: 'Amazon DE', url: 'https://amzn.to/4bVWEb8' },
            { label: 'Amazon UK', url: 'https://amzn.to/4bUYEAt' },
          ],
          post: {
            label: 'Read my review',
            href: '/zimaboard-2-performance-benchmark-diy-nas-kit-zimaos',
          },
        },
        {
          id: 'lattepanda-mu',
          name: 'LattePanda Mu Compute Module Kit',
          specs: ['Intel N100', '8GB RAM', '64GB eMMC'],
          image: '/static/images/2025/gpu-experiment/latte-panda-mu.webp',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/3WLJS88' },
            { label: 'Amazon DE', url: 'https://amzn.to/4qQevai' },
          ],
          post: {
            label: 'See my eGPU build',
            href: '/run-gpu-on-latte-panda-mu-lite-carrier-board',
          },
        },
        {
          id: 'lattepanda-mu-lite-carrier',
          name: 'LattePanda Mu Lite Carrier Board',
          specs: ['PCIe 3.0', 'M.2 M-key', 'Ethernet'],
          image: '/static/images/2025/diy-rack/latte-panda-mu-rack-mount.webp',
          links: [{ label: 'Amazon DE', url: 'https://amzn.to/3IvRzLY' }],
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
      ],
    },
    {
      id: 'nas-accessories',
      title: 'NAS, Storage & SBC Accessories',
      description:
        'Drives, SATA adapters, mounts, and cables from my Raspberry Pi NAS builds and eGPU experiment.',
      products: [
        {
          id: 'seagate-ironwolf-4tb',
          name: 'Seagate IronWolf 4TB NAS HDD',
          specs: ['3.5"', '5400 rpm', 'CMR'],
          image: '/static/images/2025/backup-strategies/hdd.jpg',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/3ZXRqFQ' },
            { label: 'Amazon DE', url: 'https://amzn.to/3ZN5To0' },
          ],
          post: {
            label: 'See my NAS backup setup',
            href: '/3-backup-strategies-for-raspberrypi-nas',
          },
        },
        {
          id: 'intenso-ssd',
          name: 'Intenso High Performance SATA SSD',
          specs: ['2.5"', 'SATA 6 Gbps'],
          image: '/static/images/2025/backup-strategies/ssd.jpg',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/4gKmeRC' },
            { label: 'Amazon DE', url: 'https://amzn.to/3VU6T8Q' },
          ],
          post: {
            label: 'See my NAS backup setup',
            href: '/3-backup-strategies-for-raspberrypi-nas',
          },
        },
        {
          id: 'nvme-to-sata-asm1166',
          name: 'M.2 to SATA Adapter (ASM1166)',
          specs: ['ASM1166', '6x SATA', 'M.2'],
          image: '/static/images/2024/diy-nas-cm5/sata-adapter.webp',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/3Bm0QmD' },
            { label: 'Amazon DE', url: 'https://amzn.to/4fjHg8j' },
          ],
          post: {
            label: 'See my CM5 NAS build',
            href: '/create-diy-nas-with-raspberry-pi-compute-module-5-raid-5',
          },
        },
        {
          id: 'hdd-rack-mount',
          name: 'HDD Rack Mount / Drive Cage',
          specs: ['3.5" HDD', 'Rack mount'],
          image: '/static/images/2024/diy-nas-cm5/hdd-rack.webp',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/4iFN3rF' },
            { label: 'Amazon DE', url: 'https://amzn.to/3BuOMPY' },
          ],
          post: {
            label: 'See my CM5 NAS build',
            href: '/create-diy-nas-with-raspberry-pi-compute-module-5-raid-5',
          },
        },
        {
          id: 'usb-to-sata',
          name: 'USB to SATA Adapter Cable',
          specs: ['USB 3.0', '2.5" SSD/HDD'],
          image: '/static/images/2025/backup-strategies/usb-sata.jpg',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/3VS6uDJ' },
            { label: 'Amazon DE', url: 'https://amzn.to/41ZiW8y' },
          ],
          post: {
            label: 'See my NAS backup setup',
            href: '/3-backup-strategies-for-raspberrypi-nas',
          },
        },
        {
          id: 'esatap-cable',
          name: 'eSATAp 12V to SATA Cable',
          specs: ['eSATAp', '2.5"/3.5" HDD'],
          image: '/static/images/2025/backup-strategies/esata.jpg',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/41RZWsz' },
            { label: 'Amazon DE', url: 'https://amzn.to/3Dsq2Z5' },
          ],
          post: {
            label: 'See my NAS backup setup',
            href: '/3-backup-strategies-for-raspberrypi-nas',
          },
        },
        {
          id: 'external-hard-drive',
          name: 'External Hard Drive',
          specs: ['USB', 'NAS storage'],
          image: '/static/images/2024/raspberry-pi-nas/external-drive.jpg',
          links: [{ label: 'Amazon US', url: 'https://amzn.to/3HqIaBz' }],
          post: { label: 'See my Pi 5 NAS build', href: '/create-nas-with-raspberry-pi-5' },
        },
        {
          id: 'micro-sd-card',
          name: 'Micro SD Card',
          specs: ['microSD'],
          image: '/static/images/2024/raspberry-pi-nas/sd-card.jpg',
          links: [{ label: 'Amazon US', url: 'https://amzn.to/3OdnUqQ' }],
          post: { label: 'See my Pi 5 NAS build', href: '/create-nas-with-raspberry-pi-5' },
        },
        {
          id: 'egpu-oculink',
          name: 'eGPU Dock with OCuLink',
          specs: ['OCuLink', 'PCIe 4.0 x4'],
          image: '/static/images/2025/gpu-experiment/egpu.jpg',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/4nEnY1v' },
            { label: 'Amazon DE', url: 'https://amzn.to/43mrXbU' },
          ],
          post: {
            label: 'See my eGPU build',
            href: '/run-gpu-on-latte-panda-mu-lite-carrier-board',
          },
        },
        {
          id: 'pcie-to-oculink',
          name: 'PCIe 4.0 x4 to OCuLink Adapter',
          specs: ['PCIe x4', 'SFF-8611/8612'],
          image: '/static/images/2025/gpu-experiment/pcie-adapter.webp',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/3JNQL61' },
            { label: 'Amazon DE', url: 'https://amzn.to/49kKVDH' },
          ],
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
      description: 'KVM-over-IP and travel routers I use to reach my home lab from anywhere.',
      products: [
        {
          id: 'glinet-comet-gl-rm1',
          name: 'GL.iNet Comet KVM (GL-RM1)',
          specs: ['KVM over IP', '4K', 'Tailscale'],
          image: '/static/images/2025/comet-kvm/comet-kvm.webp',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/3GKnCHz' },
            { label: 'Amazon DE', url: 'https://amzn.to/44PyFbt' },
          ],
          post: { label: 'Read my review', href: '/comet-kvm-gl-rm1-review-best-kvm-over-ip-2025' },
        },
        {
          id: 'glinet-slate-7',
          name: 'GL.iNet Slate 7 (GL-BE3600)',
          specs: ['Wi-Fi 7', 'Travel router'],
          image: '/static/images/2025/glinet-slate-7-travel-router/1-router.webp',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/3IwT8t7' },
            { label: 'Amazon DE', url: 'https://amzn.to/44FkqWP' },
          ],
          post: { label: 'Read my review', href: '/glinet-slate-7-wifi-7-travel-router' },
        },
        {
          id: 'glinet-slate-7-pro',
          name: 'GL.iNet Slate 7 Pro',
          specs: ['Wi-Fi 7', '6 GHz', '2.5G'],
          image: '/static/images/2026/slate-7-pro/slate-7-pro.webp',
          links: [{ label: 'Amazon DE', url: 'https://amzn.to/3SGxSGf' }],
          post: {
            label: 'Read my review',
            href: '/gl-inet-slate-7-pro-wifi-7-travel-router-review',
          },
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
          links: [{ label: 'Amazon US', url: 'https://amzn.to/4zOCpYi' }],
          post: {
            label: 'Read my review',
            href: '/waveshare-homerack-8u-10-inch-server-rack-review',
          },
        },
        {
          id: '2020-extrusion',
          name: '2020 T-Slot Aluminium Extrusion Profile',
          specs: ['2020', 'T-slot'],
          image: '/static/images/2025/diy-rack/rails-1.webp',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/4eb7wCL' },
            { label: 'Amazon DE', url: 'https://amzn.to/44djPKs' },
          ],
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: '2020-l-bracket',
          name: '2020 L-Shape Corner Bracket',
          specs: ['2020', 'M5 screws'],
          image: '/static/images/2025/diy-rack/l-shaped-holder.jpg',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/3T1tS02' },
            { label: 'Amazon DE', url: 'https://amzn.to/4e9r9vf' },
          ],
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: '2020-handle',
          name: '2020 Aluminium Profile Handle',
          specs: ['2020', 'Handle'],
          image: '/static/images/2025/diy-rack/handle.webp',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/45vtvST' },
            { label: 'Amazon DE', url: 'https://amzn.to/44asr4u' },
          ],
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: 'm5-screws',
          name: 'M5 x 8mm Mounting Screws',
          specs: ['M5', '8 mm'],
          image: '/static/images/2025/diy-rack/m5-screws.avif',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/3G3B7S6' },
            { label: 'Amazon DE', url: 'https://amzn.to/44pkR7h' },
          ],
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: 'm5-spring-nut',
          name: '2020 M5 Spring Ball Nut',
          specs: ['2020', 'M5'],
          image: '/static/images/2025/diy-rack/m5-spring-nut.avif',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/4lgx18d' },
            { label: 'Amazon DE', url: 'https://amzn.to/4jXskz6' },
          ],
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: 'micro-hdmi-to-hdmi',
          name: 'Micro HDMI to HDMI Cable',
          specs: ['30 cm', '4K'],
          image: '/static/images/2025/diy-rack/micro-hdmi.avif',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/3ZDAfub' },
            { label: 'Amazon DE', url: 'https://amzn.to/43SKddI' },
          ],
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: 'hdmi-to-hdmi',
          name: 'HDMI Panel Mount Cable',
          specs: ['30 cm', '4K'],
          image: '/static/images/2025/diy-rack/hdmi-to-hdmi.avif',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/3T2E0pf' },
            { label: 'Amazon DE', url: 'https://amzn.to/3HIhxvk' },
          ],
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: 'rj45-keystone',
          name: 'CAT6 RJ45 Keystone Jack',
          specs: ['RJ45', 'Keystone', '10 pcs'],
          image: '/static/images/2025/diy-rack/rj45.webp',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/4elkYnN' },
            { label: 'Amazon DE', url: 'https://amzn.to/3G3Q72q' },
          ],
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
        {
          id: 'cat6-patch-cable',
          name: 'CAT6 Patch Cable',
          specs: ['CAT6', 'Short'],
          image: '/static/images/2025/diy-rack/patch-cable.avif',
          links: [
            { label: 'Amazon US', url: 'https://amzn.to/4l3gO5B' },
            { label: 'Amazon DE', url: 'https://amzn.to/46BROPy' },
          ],
          post: { label: 'See my DIY rack build', href: '/I-built-a-diy-10-inch-server-rack' },
        },
      ],
    },
  ],
}
