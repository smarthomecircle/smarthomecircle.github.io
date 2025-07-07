---
title: 'I Created A DIY 10 Inch Server Rack'
author: 'Amrut Prabhu'
categories: ''
tags: [Raspberry Pi, CM5, Compute Module, Compute Module 5, open media vault,NAS, Raid 5]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2025-07-04'
draft: false
summary: 'Build a DIY NAS using Raspberry Pi Compute Module 5, NVMe to SATA adapter, and OpenMediaVault with RAID 5.'
imageUrl: /static/images/2024/diy-nas-cm5/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/5J-es6-DBU4"

---
<TOCInline toc={props.toc} asDisclosure />  

If you're into DIY tech setups, compact home servers, or SBC (Single Board Computer) projects, this custom-built **DIY 10-inch rack** is exactly what you need. In this article, I’ll walk you through how I designed and assembled my own modular rack using **2020 T-slot aluminium extrusion rails**, standard M5 hardware, and some clever 3D-printed accessories.

Whether you’re looking to mount Raspberry Pi boards, Jetson devices, small switches, or custom carrier boards, this rack is built for flexibility and expansion. Plus, I’ve included a full **list of components with shopping links**, 3D print files, and practical insights from my build process.

----------

## 🔧 **Rack Design Goals & Dimensions**

I needed a compact rack with the following specifications:

-   **Height:** 50 cm
-   **Depth:** 20 cm
-   **Width:** Suitable for 10-inch rack mount modules
    

The key material used was **2020 aluminium extrusion profiles**, commonly found in 3D printers. I used different lengths to build a rectangular frame and connected them using **L-shaped corner brackets**. Here's how the pieces came together:

-   **500mm rails (4 pcs)** – For vertical supports
-   **250mm rails (4 pcs)** – For rack depth
-   **200mm rails (4 pcs)** – For rack width (front and back frames)
    

----------
## 🧰 **Components Used**

Here’s a full list of components with images and links for purchase:


| Item |  Specs & Links |
|------|:----------------|
| **2020 T Type Slot Aluminium extrusion profile** <br/> <img src="/static/images/2025/diy-rack/rails-1.jpg" width="150"/>  |  - 4 pieces 500 mm length <br/> - 4 pieces 250 mm length  <br/> - 4 pieces 200 mm length  <br/> [Amazon US](https://amzn.to/4eb7wCL) \| [Amazon DE](https://amzn.to/44djPKs) \| [AliExpress](https://s.click.aliexpress.com/e/_olj4GKu) |
| **2020 L-shape corner bracket** <br/> <img src="/static/images/2025/diy-rack/l-shaped-holder.jpg" width="150"/>  |  - 24 pieces with M5 Screws  <br/> [Amazon US](https://amzn.to/3T1tS02) \| [Amazon DE](https://amzn.to/4e9r9vf) \| [AliExpress](https://s.click.aliexpress.com/e/_onRkO2g) |
| **2020 Aluminium Profile Handle** <br/> <img src="/static/images/2025/diy-rack/handle.jpg" width="150"/>  |  - 2 pieces 100 mm for 20x20 Aluminium Profile  <br/> [Amazon US](https://amzn.to/45vtvST) \| [Amazon DE](https://amzn.to/44asr4u) \| [AliExpress](https://s.click.aliexpress.com/e/_oouOx5a) |
| **M5 x 8mm Mounting Screws** <br/> <img src="/static/images/2025/diy-rack/m5-screws.avif" width="150"/>  |  - 50 pieces  <br/> [Amazon US](https://amzn.to/3G3B7S6) \| [Amazon DE](https://amzn.to/44pkR7h) \| [AliExpress](https://s.click.aliexpress.com/e/_ooEQ5V6) |
| **2020 M5 Spring Ball Nut** <br/> <img src="/static/images/2025/diy-rack/m5-spring-nut.avif" width="150"/>  |  - 50 pieces for 20x 20 Aluminium Profile <br/> [Amazon US](https://amzn.to/4lgx18d) \| [Amazon DE](https://amzn.to/4jXskz6) \| [AliExpress](https://s.click.aliexpress.com/e/_oCe5PHw) |
| **Micro HDMI to HDMI 30cm** <br/> <img src="/static/images/2025/diy-rack/micro-hdmi.avif" width="150"/>  |  - 2 pieces <br/> [Amazon US](https://amzn.to/3ZDAfub) \| [Amazon DE](https://amzn.to/43SKddI) \| [AliExpress](https://s.click.aliexpress.com/e/_oCs4tFe) |
| **HDMI to HDMI 30cm** <br/> <img src="/static/images/2025/diy-rack/hdmi-to-hdmi.avif" width="150"/>  |  - 2 pieces <br/> [Amazon US](https://amzn.to/3T2E0pf) \| [Amazon DE](https://amzn.to/3HIhxvk) \| [AliExpress](https://s.click.aliexpress.com/e/_opwDBD2) |
| **RJ45 Keystone Jack** <br/> <img src="/static/images/2025/diy-rack/rj45.jpg" width="150"/>  |  - 10 pieces <br/> [Amazon US](https://amzn.to/4elkYnN) \| [Amazon DE](https://amzn.to/3G3Q72q) \| [AliExpress](https://s.click.aliexpress.com/e/_olPuxKy) |



----------


## 💻 **Mounted Devices on the Rack**

Once the frame was ready, I started mounting my devices using custom 3D-printed 10-inch rack mounts:

### 1. **GLiNet Slate 7 Travel Router**

GLiNet Slate 7 is a compact WiFi 7 travel router with dual 2.5GbE ports, USB 3.0, and USB-C PD input.
It features a built-in touchscreen for quick access to VPN, TOR, WiFi settings, and device stats.
Powered by a 1.1GHz quad-core Qualcomm CPU, it includes 1GB RAM, 512MB flash, and OpenWRT preinstalled.
With speeds up to 1.3Gbps over WiFi and power use around 5W, it’s ideal for travel networking.
At $150, it delivers strong value with NAS support, advanced features, and worldwide adapters included.
    

### 2. **Raspberry Pi 5 & Orange Pi 5 Max**

The Raspberry Pi 5 features a 2.4GHz quad-core ARM Cortex-A76 CPU with up to 8GB RAM.
It includes dual 4K HDMI outputs, PCIe support, USB 3.0, and a microSD card slot.
Now with a dedicated power button and real-time clock, it improves usability.
The new RP1 I/O chip delivers faster USB, camera, and networking performance.
Ideal for DIY projects, media centers, and light desktop tasks at an affordable price.
    

### 3. **Jet KVM Interface**

The JetKVM is a compact, open-source KVM-over-IP device that allows full remote control of a computer—even when it's powered off, locked, or unresponsive. It features HDMI, USB, and Ethernet connectivity, supporting functions like Wake-on-LAN, virtual USB mounting, and remote OS installation. Housed in a sturdy die-cast zinc alloy body, it’s powered by a Rockchip CPU with hardware H.264/HEVC encoding for smooth, low-latency (~30–100 ms) streaming. Its web-based interface offers real-time performance stats and flexible access options, including local or cloud-based control. Priced from around $69, it’s OTA-updatable and promises future open-source support, though it currently lacks built-in Wi-Fi and audio passthrough.
    

### 4. **Netgear 8-Port Gigabit Switch**

-   Temporary network hub
    
-   Future upgrade planned: **Ubiquiti 2.5 Gbps Flex Switch**
    

### 5. **Radxa Rock 5T **

The Radxa Rock 5T is a powerful SBC powered by the RK3588 octa-core processor with 6 TOPS AI performance.
It supports up to 4 displays (including 8K60 HDMI and USB-C), dual 2.5GbE, HDMI input, Wi-Fi 6, and Bluetooth 5.2. With LPDDR5 RAM, dual PCIe NVMe slots, and M.2 for 4G modules, it’s ideal for edge AI, media, or server use. Benchmark tests show strong multicore performance and fast NVMe and memory speeds.
It can run Home Assistant, NAS setups, and AI workloads, making it great for home labs and DIY projects.
    

### 6. **LattePanda Mu Lite Carrier Board**

The LattePanda Mu Lite Carrier Board, paired with the Intel N100-equipped Mu module, transforms the tiny 60×70 mm x86 board into a compact yet powerful top-tier mini PC reference design. It bridges essential I/O — HDMI 2.0 output, USB 3.2 Gen 2, Gigabit Ethernet, PCIe 3.0 x4 slot (with 12 V input), and dual M.2 slots for NVMe storage or wireless modules. Powered via USB‑C (up to 15 V) or a 12–20 V DC jack, it supports passive or active cooling modes and runs Windows or Linux seamlessly. The Intel N100 chip delivers roughly twice the CPU and 10–30× GPU performance compared to Raspberry Pi 5, all within a highly customizable, open-source carrier board platform. Perfect for DIY NAS, edge computing, mini servers, or custom embedded designs—this board is an ideal x86 foundation for maker and home-lab projects.
    


----------

## 💡 **Benefits of This DIY 10-Inch Rack**

-   **Fully Modular & Adjustable:** Slide and reposition mounts without tools
    
-   **Expandable Design:** Easily extend the rack vertically using extrusion extenders
    
-   **No Drilling Required:** All mounts attach using sliding nuts and M5 screws
    
-   **Space-Saving:** Compact footprint with ample room for up to 10 devices
    
-   **Great for SBCs & Home Lab Setups**
    

----------

## 📁 **Download Files & Build Your Own**

You can find all STL files, measurements, and a shopping list in this detailed article:

> 📦 [**Download 3D print files and full build instructions**](#)

----------

## 🎥 **Watch the Full Video**

Want to see the entire build in action? Check out the full YouTube video here:  
▶️ [**Watch DIY 10-Inch Rack Build on YouTube**](#)

----------

## **Final Thoughts**

This DIY 10-inch rack project gave me full control over how I mount and manage my devices. Whether you're building a mini data center, an SBC playground, or a home lab test environment, this modular rack is both cost-effective and future-proof.

----------

## 🙌 **Support & Subscribe**

If you enjoyed this project and want to see more like it:

-   ✅ **Subscribe** to the [YouTube channel](https://www.youtube.com/@SmartHomeCircle?sub_confirmation=1)
    
-   ☕ **Support my work** on [Patreon](https://patreon.com/AmrutPrabhu) or [Buy Me a Coffee](https://www.buymeacoffee.com/amrutprabhu)
    
-   🔁 **Share** this article with fellow makers and tinkerers

If you are interested in exploring more of such easy to follow step by step guides, then here are a few suggestions.

-   [**Create a NAS with Raspberry Pi 5**](https://smarthomecircle.com/create-nas-with-raspberry-pi-5)
-   [**Radxa X4: 60$ Powerful Atlernative to Raspberry Pi 5**](https://smarthomecircle.com/radxa-x4-alternative-to-raspberry-pi-5)
-   [**Install OS on Raspberry Pi Compute Module 5 with eMMC Storage**](https://smarthomecircle.com/how-to-install-os-on-raspberry-pi-compute-module-5-emmc-storage)
-   [**Orange Pi 5 MAX: A Powerful Successor to the Orange Pi 5 Pro**](https://smarthomecircle.com/Orange-pi-5-max-a-powerful-successor-to-orange-pi-5-pro)

