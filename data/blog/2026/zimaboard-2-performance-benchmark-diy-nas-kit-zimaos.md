---
title: 'Building the Ultimate DIY NAS: ZimaBoard 2 Review & Benchmarks'
author: 'Amrut Prabhu'
categories: ''
tags: [Zimaboard, SBC, benchmarks, Performance, NAS, ZimaOS ]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2026-04-02'
draft: false
autoAds: true
summary: 'Build the ultimate compact DIY NAS with ZimaBoard 2. Leveraging ZimaOS and dual 2.5GbE, this energy-efficient kit simplifies backups, media streaming, and running virtual machines for your personal home lab'
imageUrl: /static/images/2026/radxa-cubie-a7z/cover.png
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/1nyaeCO8pH0"
suggestedArticles:
  - title: "Radxa Cubie A7A Review: Pi-Sized Power With PCIe, NVMe, USB 3.1 Gen2"
    url: "https://smarthomecircle.com/radxa-cubie-a7a-review-benchmarks-pi-5-comparison"
  - title: "Radxa Cubie A5E Hands-On: The Budget NVMe SBC"
    url: "https://smarthomecircle.com/radxa-cubie-a5e-review-benchmarks-vs-raspberry-pi"
  - title: "I Built A DIY 10 Inch Server Rack"
    url: "https://smarthomecircle.com/I-built-a-diy-10-inch-server-rack"

affiliateLinks:
  title: Buy Zimaboard 2
  links: 
    - label: "Official Site"
      url: "https://bit.ly/4t9vZij"
    - label: "Amazon DE"
      url: "https://amzn.to/4bVWEb8"
    - label: "Amazon US"
      url: "https://amzn.to/4s373YA"
    - label: "Amazon UK"
      url: "https://amzn.to/4bUYEAt"

includeAsSBC:
  title: "ZimaBoard 2"
  price: "$279 - $349"
  comparable: False
  specifications:
    SoC: Intel Processor N150 (Alder Lake-N)
    CPU:
      No. Of Cores: 4
      Cores: |
        4 × Intel N150 Cores
        Frequency up to 3.60GHz
        6M Cache
    GPU:
      Model: Intel UHD Graphics
      Support: |
        4K@60Hz output
        DirectX 12.1
        OpenGL 4.6
        OpenCL 3.0
    AI Capabilities: |
      CPU Only.
      Expandable via PCIe (e.g., external GPU support)
    RAM:
      Size: 8GB / 16GB (options)
      Type: LPDDR5
      Speed: 4800MHz
      Bus: Not specified
    Storage: |
      Onboard 32GB / 64GB eMMC
      2 × SATA 3.0 6Gb/s Ports (with power)
      Expandable via PCIe 3.0 slot
    Video Output: |
      1 × Mini-DisplayPort 1.4 up to 4K@60Hz
    NVMe:
      Onboard: No (via PCIe 3.0 x4 expansion slot)
      Connectivity: PCIe Gen3 x 4
      Size: Depends on NVMe adapter
    Network:
      Ethernet: 2 × 2.5GbE LAN Ports
      Wi-Fi: None onboard (expandable via PCIe/USB)
      Bluetooth: None onboard (expandable via PCIe/USB)
    PoE: No
    USB: |
      2 × USB 3.1 Gen 2 (up to 10Gbps)
    Power: |
      12V / 5A DC via Barrel Jack
    Audio: via Mini-DisplayPort
    Dimensions:
      Width: 83 mm
      Length: 140 mm
      Height: 31 mm
    Operating System: |
      [ZimaOS](https://www.zimaspace.com/zimaos) (Pre-installed)
      Supports CasaOS, Debian, Ubuntu, Windows, OpenWrt, pfSense
---


Are you looking for a powerful, compact, and easy-to-manage home server? Today, we’re diving into the **ZimaBoard 2**, a single-board server that packs a serious punch for its size. Whether you're a pro or a beginner, this might just be the **ultimate DIY NAS** hardware for your home lab.

<div class="image-flex">
  <img src="/static/images/2026/radxa-cubie-a7z/cubie-a7z-front.jpg" alt="front" />
  <img src="/static/images/2026/radxa-cubie-a7z/cubie-a7z-back.jpg" alt="back" />
</div>
    

---

## Technical Specification

<SpecificationsDisplay/>


The unboxing experience feels premium. It comes in eco-friendly packaging with a personal note from the founder. Inside, you’ll find the board protected by a sturdy **aluminum casing** designed for passive heat dissipation.



## ZimaOS: Software Made Simple
The real magic happens when you power it on. **ZimaOS** provides a clean, web-based dashboard that makes server management feel like using a smartphone.

### Key Features:
* **Easy RAID Setup:** Setting up **RAID 1** (for data redundancy) is a few clicks away. It clearly shows your available capacity before you commit.
* **PeerDrop:** A fantastic tool for transferring files between your phone or your computer and the NAS via a browser.
* **Zima Virtual Machine:** Want to run Windows 11? You can install and access OS environments directly through your web browser.
* **App Store:** One-click installs for **Home Assistant**, **Tailscale VPN**, and other Docker-based applications.
* **3-2-1 Backup:** Built-in tools to sync your data to local storage or cloud services like Google Drive and Dropbox.

---

## Real-World Performance & Power
Performance is where the ZimaBoard 2 truly shines. Thanks to the **2.5 Gigabit Ethernet**, I saw consistent transfer speeds of **275 to 280 MB/s**. This is true whether you are using SATA SSDs or NVMe storage—you are effectively saturating the network line.

**Power Consumption:**
* **Idle:** 11–13 Watts (With two HDDs connected)
* **Under Load:** ~26 Watts during heavy file transfers

This makes it an incredibly energy-efficient choice for a server that stays on 24/7.


---

## Performance Benchmarks: Raw Power
I put the ZimaBoard 2 through a series of tests to see how the **Intel N150** holds up against the competition.

### CPU & Memory Testing
* **Sysbench:** Calculated primes up to 20,000 in **24 seconds** (4,170 req/s), performing similarly to the Intel N100-based Radxa X4.
* **Geekbench:** Scored **1,235 (Single-Core)** and **2,980 (Multi-Core)**.
* **Memory Bandwidth Test:** Hit **9,800 MiB/s** for block copies. Thanks to the 64-bit bus size, it offers superior memory access performance compared to many peers.

### Connectivity & Speed
- **iPerf3 Networking:** Both ports easily hit **2.35 Gbps** for both uploads and downloads.

- **USB 3.1:** Confirmed Gen 1 speeds (10,000 bus size) using an NVMe-to-USB adapter.

### Edge AI: Running LLMs Locally
Can this small board handle AI? I ran **Qwen 3 (8B parameter model)** via Ollama.

- **Prompt Evaluation:** 6.4 tokens per second.
- **Response Generation:** 4.26 tokens per second.

While not a dedicated AI powerhouse, it is more than capable of running local, private AI assistants without any cloud subscriptions.
[Image 3: Performance Charts - Side-by-side comparison of Geekbench or Sysbench scores.]


---

## Final Verdict
The **ZimaBoard 2** is the perfect balance of **x86 flexibility** and **passive cooling**. Whether you want a private local storage solution or a flexible home lab for AI and VMs, this kit delivers performance without the subscription fees.


---

### Support the Channel
If you found this guide helpful, consider supporting the journey!
* **Subscribe** for upcoming benchmarking tests.
* Support me on **Patreon** or **Buy Me a Coffee**.

See you in the next one!