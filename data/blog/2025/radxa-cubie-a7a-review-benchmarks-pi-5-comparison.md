---
title: 'Radxa Cubie A7A Review: Pi-Sized Power With PCIe, NVMe, USB 3.1 Gen2, Thermals & Real-World Benchmarks'
author: 'Amrut Prabhu'
categories: ''
tags: [GPU, latte panda, SBC, AI, Vulkan, ollama, llama cpp]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2025-11-20'
draft: false
autoAds: true
summary: 'I benchmarked the Radxa Cubie A7A (Allwinner A733): thermals, Geekbench, LPDDR5, PCIe NVMe, USB 3.1 Gen2, Whisper/HA, and Pi 5 vs Pi 4 comparisons.'
imageUrl: /static/images/2025/radxa-cubie-a7a/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/3MdcOY9aIn4"
suggestedArticles:
  - title: "A palm-size IO board for Raspberry Pi CM5"
    url: "https://smarthomecircle.com/raspberry-pi-cm5-small-io-board-hands-on"
  - title: "Radxa Cubie A5E Hands-On: The Budget NVMe SBC"
    url: "https://smarthomecircle.com/radxa-cubie-a5e-review-benchmarks-vs-raspberry-pi"
  - title: "I Built A DIY 10 Inch Server Rack"
    url: "https://smarthomecircle.com/I-built-a-diy-10-inch-server-rack"
---

<TOCInline toc={props.toc} asDisclosure /> 


<p align="center">
  <img src="/static/images/2025/radxa-cubie-a7a/front.webp" alt="front" />
</p>
    
I’ve been spending time with the Radxa **Cubie A7A**, and I wanted to share how it behaved for me in real use—thermals, CPU and memory performance, storage, networking, desktop, and a bit of AI/voice. 



## Technical Specification

| Category       | Specifications                                                                                                                                                                                           |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Processor**  | **SoC:** Allwinner A733<br/>**CPU:** 2× Cortex-A76 + 6× Cortex-A55 (up to 2.0 GHz)<br/>**GPU:** Imagination BXM-4-64 MC1 (OpenGL ES 3.2, Vulkan 1.3, OpenCL 3.0)<br/>**NPU:** 3 TOPS AI acceleration engine |
| **Memory**     | LPDDR5: 8 GB                                                                                                                                                        |
| **Storage**    | **Boot:** 8 MB SPI NOR flash<br/>**System:** MicroSD / eMMC module / UFS module                                                                                                                           |
| **Network**    | **Wired:** 1× Gigabit Ethernet (PoE via external PoE HAT)<br/>**Wireless:** Wi-Fi 6, Bluetooth 5.4, external antenna interface                                                                            |
| **Video Out**  | 1× HDMI (up to 4K@60 fps)<br/>1× 4-lane MIPI DSI                                                                                                                                                          |
| **Camera**     | 1× 4-lane MIPI CSI **or** 2× 2-lane MIPI CSI                                                                                                                                                             |
| **Audio**      | 3.5 mm 4-pole headphone jack with mic input; stereo output can directly drive 32 Ω headphones                                                                                                            |
| **USB**        | 1× USB 3.1 Type-A (HOST)<br/>3× USB 2.0 Type-A (HOST)<br/>1× USB 2.0 Type-C (OTG/Power)                                                                                                                    |
| **Expansion**  | 40-pin GPIO header (UART/SPI/I²C, etc.)<br/>1× single-lane PCIe 3.0 via FPC connector<br/>Fan header: 1× 2-pin 1.25 mm<br/>RTC header: 1× 2-pin 1.25 mm                                                     |
| **Power**      | USB Type-C 5 V<br/>PoE (with PoE HAT)<br/>5 V via GPIO pins 2 & 4                                                                                                                                          |
| **OS Support** | Debian Linux, Android 13            |

The board is about the same footprint as a Raspberry Pi 5, but it won’t fit Pi 5 cases because the Ethernet and USB ports are arranged differently.

<p align="center">
  <img src="/static/images/2025/radxa-cubie-a7a/a7a-pi5.webp" alt="pi5-compare" />
</p>
    
---

## Setup & First Boot

Radxa provides [**Debian**](https://github.com/radxa-build/radxa-a733/releases) and [**Android**](https://github.com/radxa/allwinner-android-manifests/releases/) images. I went with Debian and jumped in over SSH. At idle and **without a heatsink**, the CPU sat around **54 °C**. To see where the ceiling was, I ran a quick `sysbench` CPU stress; without any cooling, temps climbed to **~75 °C**.


<div class="image-flex">
  <img src="/static/images/2025/radxa-cubie-a7a/side.webp" alt="side" />
</div>
    
---

## CPU: Quick Stress & Comparison

For a simple repeatable check, I used **sysbench** test 

- **Task** : Calculate prime numbers up to 20,000 
- **No. of Requests**: 10,000 requests.

**Results**

- **Total time**: **~25.73 s** 
- **Throughput**: **~3,885 requests/sec**. 


<div class="image-flex">
  <img src="/static/images/2025/radxa-cubie-a7a/sysbench.webp" alt="sysbench" />
</div>
    

---

## Memory Tests: 

### Memory Bandwidth Test

Memory numbers were interesting:

- **Memcpy:** ~**4,952 MiB/s**
- **1 KiB Block Copy:** ~**2,564 MiB/s**


<div class="image-flex">
  <img src="/static/images/2025/radxa-cubie-a7a/mbw.webp" alt="mbw" />
</div>

### Tiny MemBench Test

<div class="image-flex">
  <img src="/static/images/2025/radxa-cubie-a7a/tinymembench.webp" alt="tinymembench" />
</div>


My **8 GB** unit’s **LPDDR5** seemed clocked at **1800 MHz**. From what I’ve seen, **2400 MHz** is currently available on the **4 GB and 6 GB** variants, not (yet) on the higher-RAM versions.


---

## Geekbench 

On **Geekbench**, I recorded **636 (single-core)** and **1496 (multi-core)**. That’s **roughly 2× a Pi 4**, but still a notch under a Pi 5.

<div class="image-flex">
  <img src="/static/images/2025/radxa-cubie-a7a/geekbench.webp" alt="geekbench" />
</div>

Geekbench Score: [Link](https://browser.geekbench.com/v6/cpu/13857004)

## Power Consumption

- **Idle (no heatsink):** ~**2.8 W**
- **Multicore phase in Geekbench (with fan spin-up):** ~**8 W**


---

## NVMe via PCIe HAT

The A7A exposes **PCIe 3.0** over FPC. On my first try, the board didn’t detect my drive/HAT combo. After a bit of back-and-forth and **installing custom packages from Radxa engineers**, NVMe was recognized and I measured **~521 MB/s** (Gen3 x1). That’s lower than what I usually get on a Pi 5 in the same lane configuration, but it’s workable—and I’m optimistic this will improve as compatibility expands.

---

## Networking & USB 3.1 Gen2

**Gigabit Ethernet** saturated nicely for me: around **~940 Mb/s** both up and down.

On the **USB 3.1** port, `lsusb` showed my USB-to-NVMe bridge enumerated on the **10,000 Mb/s bus**, confirming **Gen2** capability. In a sustained transfer test (FIO), I saw roughly **~1000 MB/s**, copying **~60 GB in ~60 s**, which is excellent for an SBC.

```
/:  Bus 04.Port 1: Dev 1, Class=root_hub, Driver=sunxi-ohci/1p, 12M
/:  Bus 03.Port 1: Dev 1, Class=root_hub, Driver=sunxi-ehci/1p, 480M
/:  Bus 02.Port 1: Dev 1, Class=root_hub, Driver=xhci-hcd/1p, 10000M
    |__ Port 1: Dev 2, If 0, Class=Mass Storage, Driver=, 10000M
/:  Bus 01.Port 1: Dev 1, Class=root_hub, Driver=xhci-hcd/1p, 480M
    |__ Port 1: Dev 2, If 0, Class=Hub, Driver=hub/4p, 480M
        |__ Port 4: Dev 4, If 0, Class=Wireless, Driver=aic_btusb, 480M
        |__ Port 4: Dev 4, If 1, Class=Wireless, Driver=aic_btusb, 480M
        |__ Port 4: Dev 4, If 2, Class=Vendor Specific Class, Driver=aic8800_fdrv, 480M
```

---

## Home Assistant & Faster Whisper Performance

I spun up **Docker**, then ran **Home Assistant**, **Whisper**, and **Piper** in containers. With **Whisper small-int8**, speech-to-text on my clip took about **~7.6 s**. That’s **far better than Pi 4** in my environment and **about 1 s slower than Pi 5** using the same model.


<div class="image-flex">
  <img src="/static/images/2025/radxa-cubie-a7a/faster-whisper.webp" alt="faster-whisper" />
</div>

---

## Desktop & GPU

The Debian image includes a desktop, so I tried **Chromium** first. Hardware video decode wasn’t engaged for me; **1080p** YouTube **dropped a few frames at the start** and then settled; **4K** was **a bit choppy** with periodic drops.

For 3D, **glmark2** ran using **OpenGL 3.2** on the Imagination BXM GPU
- **Score : 374**

**vkmark** confirmed **Vulkan** is usable
- **Score: 730**

<div class="image-flex">
  <img src="/static/images/2025/radxa-cubie-a7a/vkmark.webp" alt="vkmark" />
</div>

---


## Where It Stands Today

The Cubie A7A already **beats the Raspberry Pi 4** across most of aspects but still finds it slightly behind the pi5 interms of performance. The **3-TOPS NPU** and **PCIe 3.0** give it headroom, but I feel **software is the current limiter**:

- **LPDDR5 frequency** on my 8 GB unit is **1800 MHz** (I’d love to see **2400 MHz** land here).
- **NVMe compatibility** : I expect more support on this.

That said, engineering responses have been **quick**, and I’m expecting iterative improvements. If the RAM profile and NVMe support mature—and with the I/O this board already has—it could **outpace a Raspberry Pi 5 in value** at similar pricing, especially if you want **more RAM**.

