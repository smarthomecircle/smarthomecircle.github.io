---
title: 'Radxa Orion O6N: My experience with this Nano-ITX Arm powerhouse'
author: 'Amrut Prabhu'
categories: ''
tags: [SBC, radxa, perfromance, qualcomm, benchmarks]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2026-02-19'
draft: false
autoAds: true
summary: 'Powerful Radxa Orion O6N Nano-ITX review: benchmarks, Linux support, thermals, AI tests, and I/O performance with UEFI support.'
imageUrl: /static/images/2026/orion-o6n/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/JzfFAwOaWFI"
suggestedArticles:
  - title: "Radxa Cubie A7A Review: Pi-Sized Power With PCIe, NVMe, USB 3.1 Gen2"
    url: "https://smarthomecircle.com/radxa-cubie-a7a-review-benchmarks-pi-5-comparison"
  - title: "Radxa Cubie A5E Hands-On: The Budget NVMe SBC"
    url: "https://smarthomecircle.com/radxa-cubie-a5e-review-benchmarks-vs-raspberry-pi"
  - title: "I Built A DIY 10 Inch Server Rack"
    url: "https://smarthomecircle.com/I-built-a-diy-10-inch-server-rack"

affiliateLinks:
  title: Buy Radxa Dragon Q6A
  links: 
    - label: "AliExpress"
      url: "https://de.aliexpress.com/item/1005010224206962.html?aff_fcid=79f77f80ca9543b49d03804d6e991f74-1766435965636-09027-_DEhJfB1&tt=CPS_NORMAL&aff_fsk=_DEhJfB1&aff_platform=shareComponent-detail&sk=_DEhJfB1&aff_trace_key=79f77f80ca9543b49d03804d6e991f74-1766435965636-09027-_DEhJfB1"
    - label: "Arace"
      url: "https://arace.tech/products/radxa-dragon-q6a?variant=44069918802100"

includeAsSBC:
  title: "Radxa Orion O6N"
  price: "$ 199+"
  comparable: False
  specifications:
    SoC: Cix P1 (CD8160 variant)
    CPU:
      No. Of Cores: 12
      Cores: |
        4 × Cortex-A720 (big) up to 2.6GHz
        4 × Cortex-A720 (mid) up to 2.4GHz
        4 × Cortex-A520 (LITTLE) up to 1.8GHz

    GPU:
      Model: Arm Immortalis-G720 MC10
      Support: |
        Vulkan 1.4
        OpenGL ES 4.3
        OpenCL 3.0
        Hardware ray tracing
    AI Capabilities: |
      NPU: 30 TOPS
    RAM:
      Size: 8GB / 16GB / 24GB / 32GB / 48GB / 64GB (options)
      Type: LPDDR5
      Speed: 5000MT/s or 6000MT/s (SKU dependent)
      Bus: 128-bit
    Storage: |
      2 × M.2 M-Key NVMe SSD slots (PCIe Gen4 x4 per slot)
      1 × UFS module connector (Radxa UFS module)
    Video Output: |
      1 × DisplayPort 1.4 (up to 4K@120Hz, MST supported)
      1 × HDMI 2.0 (up to 4K@60Hz)
      1 × USB-C (USB 3.2 Gen2 + DisplayPort Alt Mode, up to 4K@60Hz)
    NVMe:
      Onboard: Yes
      Number Of Connectors: 2
      Connectivity: PCIe Gen4 x 4 (per slot)
      Size: 2280
    Network:
      Ethernet: 2 × 2.5 Gigabit Ethernet
      WiFi: Optional via M.2 E-Key module
      Bluetooth: Optional via M.2 E-Key module

    USB: |
      1 × USB-C (USB 3.2 Gen2 10Gbps + DP Alt Mode)
      2 × USB-A (USB 3.2 Gen2 10Gbps)
      3 × USB-A (USB 2.0)
    PoE: No
    Power: |
      12V DC via 5.5×2.5mm (5525) barrel jack
      12V via 4-pin power connector.
    Audio: No dedicated 3.5mm audio jack (audio via HDMI/DP)
    Camera: |
      2 × MIPI CSI (4-lane or 2-lane per port)
      
    Cooling: |
      4-pin CPU fan header with PWM control + TACH feedback
      75×75mm heatsink mounting holes
    Dimensions: |
      Form factor: Nano-ITX
      Board size: 120mm × 120mm
    Other Expansion Capabilities: |
      1 × M.2 E-Key (PCIe Gen4 x2 + USB) for wireless modules
      1 × M.2 B-Key (USB) for cellular modules
      1 x Nano SIM slot
      40-pin GPIO header

    Operating System: |
      [Debian](https://cdimage.debian.org/debian-cd/current/arm64/iso-dvd/) 
      [Ubuntu 25.10](https://ubuntu.com/download/desktop)
      Fedora Linux
      [Radxa OS](https://github.com/radxa-build/radxa-orion-cix-p1/releases)
---

<TOCInline toc={props.toc} asDisclosure /> 


About a year ago Radxa launched the **Orion O6**, and now there’s a **Nano-ITX** version of the same platform: the **Orion O6N**. I’ve been putting it through the kind of real-world tests I actually care about—booting different OS images, checking hardware acceleration, measuring power and thermals, and seeing how it behaves as a small server and an AI box.


<div class="image-flex">
  <img src="/static/images/2026/orion-o6n/o6n-view1.webp" alt="o6n-view1" />
  <img src="/static/images/2026/orion-o6n/o6n-view2.webp" alt="o6n-view2" />
</div>


---

## Technical Specifications

<SpecificationsDisplay/>

---

## OS support: UEFI makes it *so* much easier

On the OS side, I had a surprisingly smooth experience.

- I downloaded a **Debian desktop image** meant for Arm devices, installed it, and it **booted with no issues**.
- I also installed an official Arm image for **Ubuntu 25.10**, again **no issues**, and it was running a fairly recent kernel (around **6.17**).

This is largely possible because the board supports **UEFI** (based on **EDK2**) and also includes **ACPI** support. That combination makes it feel much more “PC-like” than the usual SBC workflow.

I’ve also seen people in the Radxa Discord running other operating systems like **Gentoo, Fedora, and even FreeBSD**—but one important detail: on those, **hardware acceleration wasn’t available yet**, so graphics/video were basically running via software rendering.

Because of that, I used **Radxa OS** for most of my performance testing, since it *does* provide hardware acceleration.

<div class="image-flex">
  <img src="/static/images/2026/orion-o6n/uefi-2.webp" alt="uefi" />
  <img src="/static/images/2026/orion-o6n/uefi-11.webp" alt="uefi" />
</div>


---

## GPU testing: Vulkan vs OpenGL results

To get a quick feel for GPU performance, I ran **Furmark**:

- **Vulkan (API 1.4):** ~**23 FPS**
- **OpenGL (4.6):** ~**18 FPS**

<div class="image-flex">
  <img src="/static/images/2026/orion-o6n/furmark-opengl.webp" alt="furmark-opengl" />
  <img src="/static/images/2026/orion-o6n/furmark-vulkan.webp" alt="furmark-opengl" />
</div>


---

## Power and thermals: efficient, cool, and silent

With the CPU fan and an NVMe connected:

- **Idle power:** ~**11 to 11.5W**
- **Running Ollama:** jumped to ~**31W**

Temperature-wise:
- **Idle:** ~**32°C**
- **10-minute stress test:** didn’t go above ~**43°C**

<div class="image-flex">
  <img src="/static/images/2026/orion-o6n/o6n-fan.webp" alt="o6n-fan" />
</div>


### CPU Cores have variying frequencies.
During the stress test I noticed the 12 cores weren’t all locked to the same clock:
- 2 cores around **2.6 GHz**
- 2 cores around **2.5 GHz**
- 2 cores around **2.3 GHz**
- 2 cores around **2.2 GHz**
- 4 cores around **1.8 GHz**


<p align="center">
  <img src="/static/images/2026/orion-o6n/htop.webp" alt="geekbench" />
</p>

---

## AI and LLM tests on CPU

I tested a **Qwen3 8B** model using **Ollama**:
- ~**11 tokens/sec** for prompt evaluation
- ~**6 tokens/sec** for generation/evaluation

Then I built **llama.cpp** locally:
- ~**13 tokens/sec** prompt evaluation
- ~**7 tokens/sec** generation

Important note: these were **CPU-only** runs. I wasn’t using the NPU.


<div class="image-flex">
  <img src="/static/images/2026/orion-o6n/ollama.webp" alt="ollama" />
  <img src="/static/images/2026/orion-o6n/llamacpp.webp" alt="llamacpp" />
</div>

---

## CPU benchmarks: Geekbench and Sysbench

### Geekbench
- **Single-core:** **1329**
- **Multi-core:** **6683**

In my comparisons, that lands around **~2× the performance of a Rock 5T (RK3588)** in the same general test style.

<p align="center">
  <img src="/static/images/2026/orion-o6n/geekbench.webp" alt="geekbench" />
</p>

[Geekbench Score](https://browser.geekbench.com/v6/cpu/15863367)

### Sysbench
I ran a sysbench prime test (up to 20,000 per 100,000 requests), and this board completed it in:
- **~9.8 seconds**

That was also roughly **~2× faster than the Rock 5T** in the same type of workload.

<p align="center">
  <img src="/static/images/2026/orion-o6n/sysbench.webp" alt="sysbench" />
</p>

---

## Memory performance:

I ran the following tests:
- **Memory Bandwidth Test**
- **Tinymembench**

The results were *way* ahead of what I typically see on boards like the Rock 5T and Raspberry Pi 5. This is exactly where that **128-bit memory bus** makes a difference.


<div class="image-flex">
  <img src="/static/images/2026/orion-o6n/mbw.webp" alt="mbw" />
  <img src="/static/images/2026/orion-o6n/tinymembench.webp" alt="tinymembench" />
</div>


---

## I/O Tests

### USB 3.2 test
With a USB-to-NVMe adapter, I confirmed it was running on the **10,000 Mbit bus**, and using fio I saw:
- ~**970 MB/s write speed**

### Dual Gen4 NVMe slots
Both M.2 M-key slots provide **PCIe Gen 4 x4**, and in hdparm I saw read speeds around:
- ~**2600 MB/s**

That’s excellent for a board in this category, and it makes it much more realistic to run it as a proper server or lab box with fast local storage.

<p align="center">
  <img src="/static/images/2026/orion-o6n/hdparm.webp" alt="hdparm" />
</p>

---

## Networking: 2.5GbE is solid, Wi-Fi works (after firmware)

For Ethernet, I tested with **iperf3** and got about:
- ~**2.3 Gbit/s** sending and receiving

For Wi-Fi, I used an **Intel BE200 (Wi-Fi 7)** card, which was detected, but **firmware wasn’t loaded**. After copying the required firmware file, Wi-Fi worked and I measured about **~500 Mbit/s**

<div class="image-flex">
  <img src="/static/images/2026/orion-o6n/wifi7.webp" alt="llamacpp" />
</div>

---

## Home Assistant + local voice: surprisingly quick

I ran **Home Assistant** as a container (Docker), along with local voice assistant components i.e **Piper** and  **Whisper** (small int8 model)

When I gave it a voice command, the board converted speech to text in about:
- **~2.3 seconds**

That’s a strong result—better than what I’ve seen from the Rock 5T and even Radxa X4 (Intel N100) in similar “local voice” style workloads.

<div class="image-flex">
  <img src="/static/images/2026/orion-o6n/ha.webp" alt="llamacpp" />
  <img src="/static/images/2026/orion-o6n/ha-voice.webp" alt="llamacpp" />
</div>

---

## Mainline Linux support is still in progress

Right now, mainline Linux support still isn’t fully complete, and it’s been in progress for close to a year since the Orion O6 release.

There is a [**linux-sky**](https://github.com/Sky1-Linux/linux-sky1) repository that provides patches intended for Linux **6.18**, so you can build a patched kernel yourself. I tried that approach on the O6N, but I couldn’t get it working properly on this board yet.

So at the moment, if you want the best experience—especially around things like GPU acceleration—**Radxa OS is the safer choice**.

---

## Where I land on the Orion O6N right now

At this stage, the software side is still evolving—especially if you want the full experience of the inbuilt GPU and the NPU across different distros.

But even with that caveat, this board is already very usable because:
- **UEFI + ACPI** make OS installation and booting feel much more “PC-like”
- The **12-core CPU** is excellent for compute-heavy workloads
- Storage and I/O are genuinely strong (dual Gen4 x4 NVMe, fast USB, 2.5GbE)
- Thermals and power draw are efficient for what it delivers

Right now I see it as a really capable **server / lab / compute box**, especially if you want to run serious workloads on Arm hardware that starts to feel comparable to modern desktop-class CPUs in day-to-day usage.


<div class="image-flex">
  <img src="/static/images/2026/orion-o6n/o6n-fan.webp" alt="o6n-fan" />
</div>


<AffiliateLinksFromMetadata />


