---
title: 'Radxa Cubie A5E Hands-On: The Budget NVMe SBC—Full Review & Results'
author: 'Amrut Prabhu'
categories: ''
tags: [Radxa, SBC, Allwinner, Octa Core, Wifi 6, NVME]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2025-09-18'
draft: false
autoAds: true
summary: 'Radxa Cubie A5E tested—performance, temps, NVMe speeds, and value vs Raspberry Pi, with real numbers and use-cases'
imageUrl: /static/images/2025/radxa-cubie-a5e/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/Bv6ReLJgSi8"

suggestedArticles:
  - title: "GL.iNet Slate 7 (GL‑BE3600) Review"
    url: "https://smarthomecircle.com/glinet-slate-7-wifi-7-travel-router"
  - title: "I Built A DIY 10 Inch Server Rack"
    url: "https://smarthomecircle.com/I-built-a-diy-10-inch-server-rack"
  - title: "Radxa X4: 60$ Powerful Atlernative to Raspberry Pi 5"
    url: "https://smarthomecircle.com/radxa-x4-alternative-to-raspberry-pi-5"
affiliateLinks:
    title: Buy Radxa Cubie A5E
    links: 
      - label: "AliExpress"
        url: "https://s.click.aliexpress.com/e/_oka7U73"
      - label: "Arace"
        url: "https://arace.tech/products/radxa-cubie-a5e"

includeAsSBC:
  title: "Radxa Cubie A5E"
  url: "https://radxa.com/products/cubie/a5e"
  price: "$ 39"
  specifications:
    SoC: Allwinner A527
    CPU:
      No. Of Cores: 8
      Cores: |
        4 × Cortex-A55 @ 1.8 GHz
        4 × Cortex-A55 @ 1.4 GHz
    GPU:
      Model: Mali-G57 MC1
      Support: |
        OpenGL ES 3.2
        Vulkan 1.1–1.3
        OpenCL 2.2
    AI Capabilities: |
        NPU: Up to 2TOPs
    RAM:
      Size: 1GB / 2GB / 4GB
      Type: LPDDR4
      Speed: 2400MT/s
      Bus: 32-bit
    Storage: |
      MicroSD
      1 x M.2 M-Key For NVMe SSD
    Video Output: |
      1 x HDMI 2.0 up to 4K@60fps
      4-lane MIPI-DSI
    NVMe:
      Onboard: Yes
      Number Of Connectors: 1
      Connectivity: PCIe Gen 2 x 1
      Size: 2230
    Network:
      Ethernet: 2 × Gigabit Ethernet
      WiFi: Wi-Fi 6
      Bluetooth: Bluetooth 5.2
    PoE: No
    USB: |
      1 × USB Type-C (Power & USB 2.0 OTG)
      1 × USB 2.0
    Power: 5V/4A via USB-C
    Audio:
    Camera:
    Cooling:
    Dimensions: |
      Width: 56 mm
      Height: 65 mm
    Operating System: |
      [Debian](https://docs.radxa.com/en/cubie/a5e/download)
      [Android 13](https://docs.radxa.com/en/cubie/a5e/download#android)
      [Armbian](https://www.armbian.com/radxa-cubie-a5e/)


---
<TOCInline toc={props.toc} asDisclosure />  

In this video/article I’m sharing my experience with the **Radxa Cubie A5E**—a tiny SBC that surprised me with how much it packs into such a small footprint, and how it stacks up against boards like the Raspberry Pi 4 and Pi 5.

----------

<p align="center">
  <img src="/static/images/2025/radxa-cubie-a5e/front.webp" alt="front" />
</p>
    
<AffiliateLinksFromMetadata />


## Technical Specifications

<SpecificationsDisplay/>

(Specs as per Radxa’s product page.) [Radxa Cubie A5E](https://radxa.com/products/cubie/a5e/)


<div class="image-flex">
  <img src="/static/images/2025/radxa-cubie-a5e/front-small.webp" alt="sbc-front" />
  <img src="/static/images/2025/radxa-cubie-a5e/back.webp" alt="sbc-back" />
  <img src="/static/images/2025/radxa-cubie-a5e/case-photo.webp" alt="sbc-back" />
</div>

----------

## My setup & first impressions (OS situation)

I started with [Armbian](https://www.armbian.com/radxa-cubie-a5e/). It booted fine over LAN, but at the time there were a couple of missing pieces for my testing: **no HDMI output** and **no exposed temperature sensors**, which I needed for thermal checks. On the plus side, it shipped with a **Linux 6.16** kernel, so I’m optimistic about where community support is heading.

Next I tried [**Radxa’s own Linux image**](https://docs.radxa.com/en/cubie/a5e/download) (they also offer Android). The image was labeled **Debian Bullseye**, but the system actually identified itself as **Debian 13 “Trixie”** during my checks—which was **pre-release** at the time. Despite that, it **worked surprisingly well** and gave me the sensors and display I needed.

----------

## Thermals Performance

With **no heatsink**, the A5E idled around **~70 °C**. On this board the sensors present as two groups: **`cpul`** (the 1.4 GHz cluster) and **`cpub`** (the 1.8 GHz cluster).

Since I planned to run benchmarks, I installed the **metal case** (with a thermal pad). Assembly took a minute—remove the side struts, slide the board in, refit the I/O side panels (Wi-Fi antenna + LAN line up nicely), then screw it all back together.

**Result:** idle temps **dropped to ~43 °C**—about a **40% reduction**—and with this, I continued my tests.

----------

## Benchmarks Results

> All tests were run on the 4 GB variant, fresh boot, same desk ambient, desktop still running in the background as it came built in the debian Image, accessed via SSH.

### 1) CPU: Sysbench Test (Calculates prime numbers upto 20,000 for every 10k requests)

-   **Total time:** ~**39 s**
    
-   **Throughput:** ~**2,500 events/s**
    
-   **Peak temp:** ~**58 °C** (with the case)
    
A touch **slower than Raspberry Pi 4** in this specific test (by ~3 s), but close.
    
<p align="center">
  <img src="/static/images/2025/radxa-cubie-a5e/Sysbenchtest.webp" alt="router" />
</p>

### 2) Memory Tests

-   **MEMCPY:** ~**2,900 MiB/s**
    
-   **Block Copy (1 KiB):** ~**4,000 MiB/s**
    
**Better than Raspberry Pi 4** in my runs. The Raspberry Pi 5 and Cubie A5E both have a **32-bit memory bus**, but Pi 5’s **LPDDR4X** tends to push higher transfers than **LPDDR4** that the A5E and Pi 4 has.

<p align="center">
  <img src="/static/images/2025/radxa-cubie-a5e/mbw-test.webp" alt="router" />
</p>

<p align="center">
  <img src="/static/images/2025/radxa-cubie-a5e/tinymembench.webp" alt="router" />
</p>


### 3) Geekbench (CPU)

-   **Single-core:** **241**
    
-   **Multi-core:** **1005**
    
-   **Power draw:** ~**2 W** idle; up to **~6 W** during multi-core phases
    
-   **Thermals:** peaked around **~75 °C** ( with the case )

The Cubie A5E did perform better than the Raspberry Pi 4 in the multicore performance test. 

    [Geekbench Score](https://browser.geekbench.com/v6/cpu/13712942)
<p align="center">
  <img src="/static/images/2025/radxa-cubie-a5e/geekbench.webp" alt="router" />
</p>
    

----------

## Storage & networking

-   **NVMe over M.2 M-key (PCIe Gen2 x1):** `lspci` confirmed **Gen2 x1**; `hdparm` reads landed around **~366 MB/s**, which is right in line with **PCIe 2.0 x1** limits.
    
-   **Dual Gigabit Ethernet:** in repeated iperf runs, **one port consistently tested a bit slower** than the other. I am not sure why.
    
<p align="center">
  <img src="/static/images/2025/radxa-cubie-a5e/iperf3.webp" alt="router" />
</p>
    

----------

## Whisper on Home Assistant (Docker)

One of my standard checks: **Home Assistant + Whisper + Piper** in Docker.  
With **Whisper small-int8**, speech-to-text took about **~11 seconds** for my sample—**faster than my Raspberry Pi 4** with the same model. For voice-friendly HA automations at the edge, that’s a nice win at this size and power.

<p align="center">
  <img src="/static/images/2025/radxa-cubie-a5e/whisper-performance.webp" alt="router" />
</p>
    

----------

## So… should you get one?

If you want a **low-power, compact box** with **Wi-Fi 6**, **two GbE ports**, and **NVMe**, the **Cubie A5E** is great for things like:

-   **Pi-hole / AdGuard Home**
    
-   **Home Assistant** (light-to-moderate setups)
    
-   **DIY routers / multi-NIC tinkering**
    

Just remember:
    
-   Passive cooling with the **metal case** is _highly_ recommended.
    
-   PCIe is **Gen2 x1**—perfectly fine for snappy apps and Docker volumes, but not a storage monster.
    
Finally I would be still monitoring the Armbian community build for a more stable release.

----------
<p>
  <img src="/static/images/2025/radxa-cubie-a5e/front-small-sbc.webp" alt="router" />
</p>

<AffiliateLinks 
  title="Buy Radxa Cubie A5E" 
  links={[
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_oka7U73" },
    { store: "Arace", url: "https://arace.tech/products/radxa-cubie-a5e" }
  ]}
/>

<p>
  <img src="/static/images/2025/radxa-cubie-a5e/case.webp" alt="router" />
</p>

<AffiliateLinksFromMetadata />


## Support the Channel

Enjoyed this article? Consider supporting the channel:

-   ✅ **Subscribe** to the [YouTube channel](https://www.youtube.com/@SmartHomeCircle?sub_confirmation=1)
    
-   ☕ **Support my work** on [Patreon](https://patreon.com/AmrutPrabhu) or [Buy Me a Coffee](https://www.buymeacoffee.com/amrutprabhu)


