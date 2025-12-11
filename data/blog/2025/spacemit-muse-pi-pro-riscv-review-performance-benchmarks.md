---
title: 'Muse Pi Pro (Spacemit K1 / M1) – My First Real RISC-V Experience'
author: 'Amrut Prabhu'
categories: ''
tags: [RISC V, SBC, benchmarks, Performance, Spacemit ]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2025-12-11'
draft: false
autoAds: true
summary: 'Hands-on review of the Muse Pi Pro RISC-V SBC with the SpacemiT K1 SoC – benchmarks, thermals, NVMe and Wi-Fi 6 performance, plus my honest thoughts for developers.'
imageUrl: /static/images/2025/muse-pi-pro/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/xETkRuCWASw"
suggestedArticles:
  - title: "Radxa Cubie A7A Review: Pi-Sized Power With PCIe, NVMe, USB 3.1 Gen2"
    url: "https://smarthomecircle.com/radxa-cubie-a7a-review-benchmarks-pi-5-comparison"
  - title: "Radxa Cubie A5E Hands-On: The Budget NVMe SBC"
    url: "https://smarthomecircle.com/radxa-cubie-a5e-review-benchmarks-vs-raspberry-pi"
  - title: "I Built A DIY 10 Inch Server Rack"
    url: "https://smarthomecircle.com/I-built-a-diy-10-inch-server-rack"
---

<TOCInline toc={props.toc} asDisclosure /> 

In this article, I want to walk you through **my actual hands-on experience** using a RISC-V single-board computer: the **Muse Pi Pro**, built around Spacemit’s K1 SoC packaged into their M1 module.

I’ll focus on how it feels to use, what works well, where it falls short, and whether I’d use it day-to-day.

<div class="image-flex">
  <img src="/static/images/2025/muse-pi-pro/muse-pi-pro-view.webp" alt="muse-pi-pro" />
  <img src="/static/images/2025/muse-pi-pro/muse-pi-pro-view-1.webp" alt="muse-pi-pro" />
</div>

---


The Muse Pi Pro isn’t just a bare board thrown together; it’s a fairly feature-rich SBC based on a **64-bit RISC-V octa-core CPU** running at **1.6 GHz**.

## Technical Specification

## Muse Pi Pro – Technical Specifications

| Category        | Specification |
|----------------|---------------|
| **SoC**        | SpacemiT **M1** RISC-V SoC (similar to K1), octa-core 64-bit X60 CPU @ **1.6 GHz** |
| **CPU**        | **8× X60 RISC-V cores** @ 1.6 GHz |
| **GPU**        | **Imagination IMG BXE-2-32** GPU, supports **OpenGL ES 3.2**, **Vulkan 1.2** <br/> Hardware **H.265 / H.264** video decoder/encoder, up to **1080p60** |
| **NPU**        | Integrated AI accelerator, up to **2.0 TOPS (INT8)** |
| **System memory** | **8 GB LPDDR4X** @ **2400 MT/s** (board-mounted) |
| **On-board storage** | **eMMC 5.1**, typically **64 GB** |
| **Removable storage** | **microSD** card slot (UHS-II) |
| **M.2 slot**  | **M.2 M-Key 2230** socket for **NVMe SSD** (PCIe Gen 2 **x2** lanes) |
| **Mini PCIe** | Full-size **miniPCIe** slot (PCIe Gen 2 **x1** lane), typically for **4G/5G** or extra Wi-Fi/network modules |
| **HDMI output** | **HDMI 1.4**, up to **1080p @ 60 Hz** |
| **MIPI DSI**  | **2-lane MIPI DSI** via 15-pin FPC, up to **1080p60** |
| **MIPI CSI (camera)** | One **4-lane MIPI CSI** via 22-pin FPC + one **2-lane MIPI CSI** via 15-pin FPC |
| **Audio**     | **3.5 mm** audio jack |
| **Ethernet**  | **Gigabit Ethernet** (RJ45) |
| **Wireless**  | On-board **Wi-Fi 6** + **Bluetooth 5.2** module |
| **USB ports** | **4 × USB 3.0 Type-A** ports; **1 × USB 2.0 Type-C OTG** port (also used for power/PD) |
| **RTC**       | **RTC battery** connector on board |
| **Power input** | **USB-C** (USB PD), supports **5 V / 9 V / 12 V** up to **3 A** |


<div class="image-flex">
  <img src="/static/images/2025/muse-pi-pro/muse-pi-pro-m1.webp" alt="muse-pi=pro" />
</div>


---

## OS Options and First Boot

When I first powered on the board, it booted straight into the setup for **Bianbu Star OS**.

Spacemit provides a few OS options for the Muse Pi Pro:

- **Bianbu OS** – a RISC-V-optimized OS built on Ubuntu community sources. [link](https://archive.spacemit.com/image/k1/version/bianbu/)
- **Bianbu Star** – built on top of Bianbu OS, more polished for user interaction and desktop usage. [link](https://archive.spacemit.com/image/k1/version/bianbu-computer/)
- **Fedora** – available via Fedora-V Force Images. [link](https://images.fedoravforce.org/Muse%20Pi%20Pro)
- **Debian** – build by SpacemiT. [link](https://archive.spacemit.com/image/k1/version/debian/)

### Trying Debian (Trixie)

I started with the **Debian Trixie** image. On paper, that sounded great – a modern Debian on RISC-V.

In reality:

- Booting to the setup screen took **a very long time**.
- Launching applications like Chrome felt **painfully slow**.
- Overall, it just didn’t feel optimized for this hardware yet.

<div class="image-flex">
  <img src="/static/images/2025/muse-pi-pro/debian.webp" alt="debian" />
</div>


Because of that, I ended up abandoning Debian for now and went back to Bianbu Star.

### Bianbu Star 3.0 (Ubuntu 25.04 Based)

I flashed [**Bianbu Star 3.0 (beta)**](https://archive.spacemit.com/image/k1/version/bianbu-computer/v3.0beta1/) next. This is based on **Ubuntu 25.04 “Plucky”**, and it felt immediately more responsive:

- Boot time was **much faster**.
- The desktop environment felt more polished.
- Apps opened in a reasonable amount of time.

<div class="image-flex">
  <img src="/static/images/2025/muse-pi-pro/bianbu-star.webp" alt="vkmark" />
</div>

So for the rest of my testing, I used **Bianbu Star 3.0 beta** OS.

---

## Browsers, Video Playback, and Hardware Decoding

One of my first tests was simple: **web browsing**.

### Chrome / Chromium vs Firefox

When I tried Chrome, the system told me it was **pretty old**, even after attempting updates. 
I found a [**Reddit post**](https://www.reddit.com/r/RISCV/comments/1haccaz/comment/m1n57zu/) mentioning that **Firefox** is available for this platform, so I installed it. Firefox worked, but it did **not** use hardware acceleration for video decoding in my setup.

On the other hand, **Chromium** did use **hardware video decoding**, which is important for smoother playback on a low-power device like this.

### YouTube Playback

I tested YouTube in Chromium:

- **1080p video**  
  - Played **quite well**, just a few dropped frames now and then.  
  - Overall, definitely *watchable*.
- **4K video**  
  - The frames kept dropping.  
  - Playback became **choppy** and not enjoyable.


---

## Graphics Benchmarks: OpenGL & Vulkan on RISC-V

I was actually curious how far GPU support has come on RISC-V, so I ran a couple of graphics benchmarks.

### glmark2 (OpenGL)

First, I built **glmark2** for **Wayland** and ran the test.  
The result:

- **glmark2 score:** **499**


### vkmark (Vulkan)

Next, I compiled and ran **vkmark** to check **Vulkan** support.  
The result:

- **vkmark score:** **650**

This actually surprised me in a good way. Seeing **both OpenGL and Vulkan** working on a RISC-V SBC is a sign that the software ecosystem is moving forward.

<div class="image-flex">
  <img src="/static/images/2025/muse-pi-pro/vkmark.webp" alt="vkmark" />
  <img src="/static/images/2025/muse-pi-pro/glmark.webp" alt="glmark" />
</div>

---

## Thermal Performance

### Without the Fan (Heatsink Only)

- **Idle temperature:** ~**40°C**  
- **After 5 minutes of stress testing:** ~**52°C**

Even with just the heatsink and **no fan**, those numbers are very reasonable.

### With the Fan Connected

- **Idle temperature:** ~**33°C**
- **After 5 minutes of stress testing:** up to ~**42°C**, but no higher

So the fan dropped both idle and load temperatures significantly. 


Even though the board is fine without active cooling, I decided to **keep the fan on** for the rest of my tests to keep things stable.

---

## CPU Benchmarks: sysbench and Geekbench

To get a rough feel for CPU performance, I ran a few common benchmarks.

### sysbench

I used **sysbench** to calculate prime numbers up to **20,000**, with **100,000 requests**.

- The board completed the test in about **38 seconds**.
- It processed roughly **2,600 requests per second**.

<p align="center">
  <img src="/static/images/2025/muse-pi-pro/sysbench.webp" alt="sysbench" />
</p>


### Geekbench

I also ran **Geekbench** using the build compiled for RISC-V.

**Scores** :
- Single Core : **134**
- Multi Core : **581**


<p align="center">
  <img src="/static/images/2025/muse-pi-pro/geekbench.webp" alt="geekbench" />
</p>

[Link](https://browser.geekbench.com/v6/cpu/15300572)

---

## Memory Performance

### Memory Bandwidth Test

For the memory bandwidth test, I saw:

- Around **2300 MiB/s** for overall memory bandwidth
- Around **6300 MiB/s** for block copy of **1 KiB** blocks

<p align="center">
  <img src="/static/images/2025/muse-pi-pro/mbw.webp" alt="mbw" />
</p>

### Tinymembench Test

Running **tinymembench** test output:

- **C Copy** : **2554.5 MB/s**
- **C fill** : **7428.8 MB/s**
- **Standard MemCOPY** : **2590.7 MB/s**
- **Standard MemSet** : **7385 MB/s**

<p align="center">
  <img src="/static/images/2025/muse-pi-pro/tinymembench.webp" alt="tinymembench" />
</p>


---

## Networking: Ethernet and Wi-Fi 6

### iperf3 Test
- **Ethernet** :**935 Mbit/s**
- **Wifi 6** :**820 Mbit/s**


---

## Power Consumption

Power consumption is a big deal for small boards, especially if you’re running them 24/7.

Here’s what I observed (without the fan plugged in):

- **Idle** : ~**3.3 W**  
- **At Peak load** : **8.5 W**.

The board was drawing **12 V** from the USB-C **PD power supply**, not 5 V.


---

## Storage and I/O: NVMe and USB 3.0

### NVMe (M.2 M-Key, PCIe Gen 2 ×2)

I checked the NVMe performance on a 2230 SSD:

- I got around **566 MB/s**.

That’s consistent with **PCIe Gen 2 with 2 lane** speeds.

<div class="image-flex">
  <img src="/static/images/2025/muse-pi-pro/muse-pi-pro-nvme-view.webp" alt="glmark" />
</div>

### USB 3.0 Ports

To test the **USB 3.0** ports, I used a **USB 3 → NVMe adapter**.

- The device showed up on a **5000 Mbit/s** bus, confirming **USB 3.0**.
- Using a flexible I/O test, I saw:
  - About **361 MB/s write speed**
  - Around **21 GB copied in 60 seconds**

Again, that’s perfectly in line with **USB 3.0** expectations on SBCs.

```
amrut@a-spacemitk1xmusepiproboard:~$ lsusb -t
/:  Bus 001.Port 001: Dev 001, Class=root_hub, Driver=mv-ehci/1p, 480M
/:  Bus 002.Port 001: Dev 001, Class=root_hub, Driver=xhci-hcd/1p, 480M
    |__ Port 001: Dev 002, If 0, Class=Hub, Driver=hub/5p, 480M
        |__ Port 005: Dev 003, If 0, Class=Billboard, Driver=[none], 480M
/:  Bus 003.Port 001: Dev 001, Class=root_hub, Driver=xhci-hcd/1p, 5000M
    |__ Port 001: Dev 002, If 0, Class=Hub, Driver=hub/4p, 5000M
        |__ Port 001: Dev 003, If 0, Class=Mass Storage, Driver=uas, 5000M
```

---

## UEFI Support

I was also curious about the **UEFI support** on this board.

To have UEFI, I had to flash the [firwmware](https://archive.spacemit.com/image/k1/version/bianbu-computer-uefi/) which has UEFI built in.  I had to flash it to the emmc to make it work. Make sure you use the zip file and not the image file. 

I use the [Titanium Flashing tool](https://developer.spacemit.com/documentation?token=P9EKwYIkti4EOOkvsgTcb9W3nUb) provided by SpacemiT

- The tool flashed the firmware **successfully**.
- On boot, I pressed **`F2`** and was able to access the **UEFI UI**.

The UEFI firmware is based on **EDK2**.


<div class="image-flex">
  <img src="/static/images/2025/muse-pi-pro/uefi-1.webp" alt="uefi" />
  <img src="/static/images/2025/muse-pi-pro/uefi-2.webp" alt="uefi" />
  <img src="/static/images/2025/muse-pi-pro/uefi-3.webp" alt="uefi" />
  <img src="/static/images/2025/muse-pi-pro/uefi-4.webp" alt="uefi" />
  <img src="/static/images/2025/muse-pi-pro/uefi-5.webp" alt="uefi" />
</div>

---

## So, Where Does RISC-V Stand Today (Considering This Board)?

After using the Muse Pi Pro for a while, here’s my honest take.

RISC-V boards, **including this one**, still **haven’t fully caught up** to mature ARM SBCs like the Raspberry Pi 4/5 in overall performance and polish.
But at the same time, seeing **OpenGL and Vulkan working**, getting solid **networking performance**, having **NVMe, USB 3.0, Wi-Fi 6**, and decent thermals, makes me feel like we are **getting closer** to what ARM SBCs offer today.


