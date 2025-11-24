---
title: 'Radxa Cubie A7A Review: Pi-Sized Power With PCIe, NVMe, USB 3.1 Gen2, Thermals & Real-World Benchmarks'
author: 'Amrut Prabhu'
categories: ''
tags: [SBC, radxa, perfromance, cubie, benchmarks]
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
affiliateLinks:
  - label: "AliExpress"
    url: "https://s.click.aliexpress.com/e/_oka7U73"
  - label: "Arace"
    url: "https://arace.tech/products/radxa-cubie-a5e"

includeAsSBC:
  title: "Radxa Cubie A7A"
  price: "39$"
  specifications:
    SoC: Allwinner A733
    CPU: |
      2× Cortex-A76 up to 2.0GHz
      4× Cortex-A55 up to 1.8GHz
    GPU:
      model: Imagination BXM-4-64 MC1
      support: |
        OpenGL ES 3.2
        Vulkan 1.3
        OpenCL 3.0
    NPU: Up to 3TOPs
    RAM:
      Size: 4GB
      Type: LPDDR5
      Speed: 1800MT/s
      Bus: 32bit
    Storage: |
      MicroSD
      NVMe (via PCIe NVME HAT)
      eMMC/UFS
      
    Video Output: |
      1 x HDMI 2.0 up to 4K@60fps
      1 x 4-lane MIPI-DSI
    NVMe:
      Onboard: No (via NVMe PCIe Connector)
      # Number Of Connectors: 1
      # Type: M.2 M-key 
      Connectivity: PCIe Gen 3 x1
      Size: 2230 / 2280
    USB: |
      1 × USB Type-C (Power & USB 2.0 OTG)
      1 × USB 3.1 gen2
      3 x USB 2.0
    Network:
      Ethernet: 1 × 1 Gigabit Ethernet
      WiFi: WiFi 6
      Bluetooth: Bluetooth 5.4
    PoE: Yes (PoE HAT required)
    Power: 5V/4A or 5V/3A via USB-C
    GPIO: Yes
    Dimensions: |
      Width: 56 mm
      Length: 85 mm
    Operating System:
      Debian:
        url: https://docs.radxa.com/en/cubie/a5e/download
      Android: Android 13
      Armbian:
        url: https://www.armbian.com/radxa-cubie-a5e/

---

<TOCInline toc={props.toc} asDisclosure /> 


<p align="center">
  <img src="/static/images/2025/radxa-cubie-a7a/front.webp" alt="front" />
</p>

<AffiliateLinks 
  title="Buy Radxa Cubie A7A" 
  links={[
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_c434m0ff" },
    { store: "Amazon US", url: "https://amzn.to/47Q9yHd" },
    { store: "Amazon EU", url: "https://amzn.to/4pjxHeU" }
  ]}
/>

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

<Collapsible title="Detailed Sysbench Test Results">

```shell
radxa@radxa-cubie-a7a:~$ sysbench cpu --cpu-max-prime=20000 --threads=8 --time=0 --events=100000 run
sysbench 1.0.20 (using system LuaJIT 2.1.0-beta3)

Running the test with following options:
Number of threads: 8
Initializing random number generator from current time


Prime numbers limit: 20000

Initializing worker threads...

Threads started!

CPU speed:
    events per second:  3885.07

General statistics:
    total time:                          25.7374s
    total number of events:              100000

Latency (ms):
         min:                                    1.13
         avg:                                    2.06
         max:                                    6.72
         95th percentile:                        2.81
         sum:                               205838.25

Threads fairness:
    events (avg/stddev):           12500.0000/5690.73
    execution time (avg/stddev):   25.7298/0.00
```
</Collapsible>

<div class="image-flex">
  <img src="/static/images/2025/radxa-cubie-a7a/sysbench.webp" alt="sysbench" />
</div>
    

---

## Memory Tests: 

### Memory Bandwidth Test

Memory numbers were interesting:

- **Memcpy:** ~**4,952 MiB/s**
- **1 KiB Block Copy:** ~**2,564 MiB/s**

<Collapsible title="Detailed Memory Bandwidth Test Results">

```shell
radxa@radxa-cubie-a7a:~$ mbw -b 1024 1024
Long uses 8 bytes. Allocating 2*134217728 elements = 2147483648 bytes of memory.
Using 1024 bytes as blocks for memcpy block copy test.
Getting down to business... Doing 10 runs per test.
0       Method: MEMCPY  Elapsed: 0.20576        MiB: 1024.00000 Copy: 4976.720 MiB/s
1       Method: MEMCPY  Elapsed: 0.20469        MiB: 1024.00000 Copy: 5002.565 MiB/s
2       Method: MEMCPY  Elapsed: 0.21224        MiB: 1024.00000 Copy: 4824.749 MiB/s
3       Method: MEMCPY  Elapsed: 0.20499        MiB: 1024.00000 Copy: 4995.414 MiB/s
4       Method: MEMCPY  Elapsed: 0.20486        MiB: 1024.00000 Copy: 4998.462 MiB/s
5       Method: MEMCPY  Elapsed: 0.20539        MiB: 1024.00000 Copy: 4985.613 MiB/s
6       Method: MEMCPY  Elapsed: 0.20600        MiB: 1024.00000 Copy: 4970.994 MiB/s
7       Method: MEMCPY  Elapsed: 0.21404        MiB: 1024.00000 Copy: 4784.264 MiB/s
8       Method: MEMCPY  Elapsed: 0.20493        MiB: 1024.00000 Copy: 4996.877 MiB/s
9       Method: MEMCPY  Elapsed: 0.20490        MiB: 1024.00000 Copy: 4997.487 MiB/s
AVG     Method: MEMCPY  Elapsed: 0.20678        MiB: 1024.00000 Copy: 4952.135 MiB/s
0       Method: DUMB    Elapsed: 0.20099        MiB: 1024.00000 Copy: 5094.806 MiB/s
1       Method: DUMB    Elapsed: 0.20044        MiB: 1024.00000 Copy: 5108.761 MiB/s
2       Method: DUMB    Elapsed: 0.20332        MiB: 1024.00000 Copy: 5036.297 MiB/s
3       Method: DUMB    Elapsed: 0.20509        MiB: 1024.00000 Copy: 4993.003 MiB/s
4       Method: DUMB    Elapsed: 0.20059        MiB: 1024.00000 Copy: 5104.839 MiB/s
5       Method: DUMB    Elapsed: 0.20081        MiB: 1024.00000 Copy: 5099.271 MiB/s
6       Method: DUMB    Elapsed: 0.20049        MiB: 1024.00000 Copy: 5107.512 MiB/s
7       Method: DUMB    Elapsed: 0.20090        MiB: 1024.00000 Copy: 5096.987 MiB/s
8       Method: DUMB    Elapsed: 0.20884        MiB: 1024.00000 Copy: 4903.299 MiB/s
9       Method: DUMB    Elapsed: 0.20064        MiB: 1024.00000 Copy: 5103.694 MiB/s
AVG     Method: DUMB    Elapsed: 0.20221        MiB: 1024.00000 Copy: 5064.000 MiB/s
0       Method: MCBLOCK Elapsed: 0.39870        MiB: 1024.00000 Copy: 2568.347 MiB/s
1       Method: MCBLOCK Elapsed: 0.39898        MiB: 1024.00000 Copy: 2566.513 MiB/s
2       Method: MCBLOCK Elapsed: 0.39998        MiB: 1024.00000 Copy: 2560.102 MiB/s
3       Method: MCBLOCK Elapsed: 0.39860        MiB: 1024.00000 Copy: 2568.985 MiB/s
4       Method: MCBLOCK Elapsed: 0.40091        MiB: 1024.00000 Copy: 2554.189 MiB/s
5       Method: MCBLOCK Elapsed: 0.39815        MiB: 1024.00000 Copy: 2571.889 MiB/s
6       Method: MCBLOCK Elapsed: 0.39864        MiB: 1024.00000 Copy: 2568.740 MiB/s
7       Method: MCBLOCK Elapsed: 0.40098        MiB: 1024.00000 Copy: 2553.731 MiB/s
8       Method: MCBLOCK Elapsed: 0.39860        MiB: 1024.00000 Copy: 2569.017 MiB/s
9       Method: MCBLOCK Elapsed: 0.39875        MiB: 1024.00000 Copy: 2568.051 MiB/s
AVG     Method: MCBLOCK Elapsed: 0.39923        MiB: 1024.00000 Copy: 2564.941 MiB/s
```
</Collapsible>

<div class="image-flex">
  <img src="/static/images/2025/radxa-cubie-a7a/mbw.webp" alt="mbw" />
</div>

### Tiny MemBench Test

<div class="image-flex">
  <img src="/static/images/2025/radxa-cubie-a7a/tinymembench.webp" alt="tinymembench" />
</div>

<Collapsible title="Detailed Tiny MemBench Test Results">

```shell
radxa@radxa-cubie-a7a:~/tinymembench-master$ ./tinymembench
tinymembench v0.4.9 (simple benchmark for memory throughput and latency)

==========================================================================
== Memory bandwidth tests                                               ==
==                                                                      ==
== Note 1: 1MB = 1000000 bytes                                          ==
== Note 2: Results for 'copy' tests show how many bytes can be          ==
==         copied per second (adding together read and writen           ==
==         bytes would have provided twice higher numbers)              ==
== Note 3: 2-pass copy means that we are using a small temporary buffer ==
==         to first fetch data into it, and only then write it to the   ==
==         destination (source -> L1 cache, L1 cache -> destination)    ==
== Note 4: If sample standard deviation exceeds 0.1%, it is shown in    ==
==         brackets                                                     ==
==========================================================================

 C copy backwards                                     :   5487.8 MB/s (0.5%)
 C copy backwards (32 byte blocks)                    :   5479.4 MB/s (0.5%)
 C copy backwards (64 byte blocks)                    :   5475.5 MB/s (0.5%)
 C copy                                               :   5370.6 MB/s (0.4%)
 C copy prefetched (32 bytes step)                    :   5420.8 MB/s (0.4%)
 C copy prefetched (64 bytes step)                    :   5415.1 MB/s (0.4%)
 C 2-pass copy                                        :   3500.3 MB/s (0.8%)
 C 2-pass copy prefetched (32 bytes step)             :   5207.6 MB/s (0.3%)
 C 2-pass copy prefetched (64 bytes step)             :   5199.3 MB/s
 C fill                                               :   8484.3 MB/s (0.5%)
 C fill (shuffle within 16 byte blocks)               :   8486.5 MB/s (0.5%)
 C fill (shuffle within 32 byte blocks)               :   8485.0 MB/s (0.4%)
 C fill (shuffle within 64 byte blocks)               :   8437.4 MB/s (0.6%)
 ---
 standard memcpy                                      :   5396.3 MB/s (0.5%)
 standard memset                                      :   8477.9 MB/s (0.5%)
 ---
 NEON LDP/STP copy                                    :   5387.9 MB/s (0.4%)
 NEON LDP/STP copy pldl2strm (32 bytes step)          :   5401.3 MB/s (0.4%)
 NEON LDP/STP copy pldl2strm (64 bytes step)          :   5394.5 MB/s (0.4%)
 NEON LDP/STP copy pldl1keep (32 bytes step)          :   5366.8 MB/s (0.4%)
 NEON LDP/STP copy pldl1keep (64 bytes step)          :   5362.5 MB/s (0.4%)
 NEON LD1/ST1 copy                                    :   5328.7 MB/s
 NEON STP fill                                        :   8478.0 MB/s (0.5%)
 NEON STNP fill                                       :   8479.9 MB/s (0.5%)
 ARM LDP/STP copy                                     :   5385.4 MB/s (0.4%)
 ARM STP fill                                         :   8479.6 MB/s (0.5%)
 ARM STNP fill                                        :   8482.7 MB/s (0.6%)

==========================================================================
== Memory latency test                                                  ==
==                                                                      ==
== Average time is measured for random memory accesses in the buffers   ==
== of different sizes. The larger is the buffer, the more significant   ==
== are relative contributions of TLB, L1/L2 cache misses and SDRAM      ==
== accesses. For extremely large buffer sizes we are expecting to see   ==
== page table walk with several requests to SDRAM for almost every      ==
== memory access (though 64MiB is not nearly large enough to experience ==
== this effect to its fullest).                                         ==
==                                                                      ==
== Note 1: All the numbers are representing extra time, which needs to  ==
==         be added to L1 cache latency. The cycle timings for L1 cache ==
==         latency can be usually found in the processor documentation. ==
== Note 2: Dual random read means that we are simultaneously performing ==
==         two independent memory accesses at a time. In the case if    ==
==         the memory subsystem can't handle multiple outstanding       ==
==         requests, dual random read has the same timings as two       ==
==         single reads performed one after another.                    ==
==========================================================================

block size : single random read / dual random read
      1024 :    0.0 ns          /     0.0 ns 
      2048 :    0.0 ns          /     0.0 ns 
      4096 :    0.0 ns          /     0.0 ns 
      8192 :    0.0 ns          /     0.0 ns 
     16384 :    0.0 ns          /     0.0 ns 
     32768 :    0.0 ns          /     0.0 ns 
     65536 :    0.0 ns          /     0.0 ns 
    131072 :    1.3 ns          /     1.8 ns 
    262144 :    2.5 ns          /     3.2 ns 
    524288 :   14.4 ns          /    20.4 ns 
   1048576 :   19.9 ns          /    25.3 ns 
   2097152 :   84.8 ns          /   127.9 ns 
   4194304 :  130.5 ns          /   176.8 ns 
   8388608 :  153.8 ns          /   193.4 ns 
  16777216 :  169.3 ns          /   204.2 ns 
  33554432 :  179.9 ns          /   211.8 ns 
  67108864 :  187.7 ns          /   218.5 ns 
```
</Collapsible>
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

<Collapsible title="Detailed Glmark 2 Results">

```shell
radxa@radxa-cubie-a7a:~$ glmark2-es2
=======================================================
   glmark2 2023.01
=======================================================
   OpenGL Information
   GL_VENDOR:      Imagination Technologies
   GL_RENDERER:    PowerVR B-Series BXM-4-64
   GL_VERSION:     OpenGL ES 3.2 build 24.2@6603887
   Surface Config: buf=32 r=8 g=8 b=8 a=8 depth=24 stencil=0 samples=0
   Surface Size:   800x600 windowed
=======================================================
[build] use-vbo=false: FPS: 406 FrameTime: 2.464 ms
[build] use-vbo=true: FPS: 464 FrameTime: 2.157 ms
[texture] texture-filter=nearest: FPS: 507 FrameTime: 1.975 ms
[texture] texture-filter=linear: FPS: 502 FrameTime: 1.996 ms
[texture] texture-filter=mipmap: FPS: 498 FrameTime: 2.009 ms
[shading] shading=gouraud: FPS: 406 FrameTime: 2.468 ms
[shading] shading=blinn-phong-inf: FPS: 400 FrameTime: 2.503 ms
[shading] shading=phong: FPS: 356 FrameTime: 2.813 ms
[shading] shading=cel: FPS: 355 FrameTime: 2.824 ms
[bump] bump-render=high-poly: FPS: 244 FrameTime: 4.114 ms
[bump] bump-render=normals: FPS: 541 FrameTime: 1.850 ms
[bump] bump-render=height: FPS: 501 FrameTime: 1.999 ms
[effect2d] kernel=0,1,0;1,-4,1;0,1,0;: FPS: 365 FrameTime: 2.747 ms
[effect2d] kernel=1,1,1,1,1;1,1,1,1,1;1,1,1,1,1;: FPS: 199 FrameTime: 5.048 ms
[pulsar] light=false:quads=5:texture=false: FPS: 587 FrameTime: 1.706 ms
[desktop] blur-radius=5:effect=blur:passes=1:separable=true:windows=4: FPS: 177 FrameTi
me: 5.663 ms
[desktop] effect=shadow:windows=4: FPS: 402 FrameTime: 2.491 ms
[buffer] columns=200:interleave=false:update-dispersion=0.9:update-fraction=0.5:update-
method=map: FPS: 149 FrameTime: 6.747 ms
[buffer] columns=200:interleave=false:update-dispersion=0.9:update-fraction=0.5:update-
method=subdata: FPS: 148 FrameTime: 6.757 ms
[buffer] columns=200:interleave=true:update-dispersion=0.9:update-fraction=0.5:update-m
ethod=map: FPS: 237 FrameTime: 4.224 ms
[ideas] speed=duration: FPS: 505 FrameTime: 1.981 ms
[jellyfish] <default>: FPS: 253 FrameTime: 3.954 ms
[terrain] <default>: FPS: 26 FrameTime: 39.452 ms
[shadow] <default>: FPS: 286 FrameTime: 3.502 ms
[refract] <default>: FPS: 49 FrameTime: 20.443 ms
[conditionals] fragment-steps=0:vertex-steps=0: FPS: 580 FrameTime: 1.726 ms
[conditionals] fragment-steps=5:vertex-steps=0: FPS: 418 FrameTime: 2.397 ms
[conditionals] fragment-steps=0:vertex-steps=5: FPS: 567 FrameTime: 1.766 ms
[function] fragment-complexity=low:fragment-steps=5: FPS: 488 FrameTime: 2.052 ms
[function] fragment-complexity=medium:fragment-steps=5: FPS: 368 FrameTime: 2.722 ms
[loop] fragment-loop=false:fragment-steps=5:vertex-steps=5: FPS: 487 FrameTime: 2.057 m
s
[loop] fragment-steps=5:fragment-uniform=false:vertex-steps=5: FPS: 428 FrameTime: 2.33
9 ms
[loop] fragment-steps=5:fragment-uniform=true:vertex-steps=5: FPS: 477 FrameTime: 2.098
ms
=======================================================
                                 glmark2 Score: 374  
=======================================================

```
</Collapsible>

**vkmark** confirmed **Vulkan** is usable
- **Score: 730**


<Collapsible title="Detailed vkmark Results">

```shell
radxa@radxa-cubie-a7a:~$ vkmark
=======================================================
   vkmark 2025.01
=======================================================
   Vendor ID:      0x1010
   Device ID:      0x36104183
   Device Name:    PowerVR B-Series BXM-4-64 MC1
   Driver Version: 6603887
   Device UUID:    6fc464002438006800b700c117dd6700
=======================================================
[vertex] device-local=true: FPS: 739 FrameTime: 1.353 ms
[vertex] device-local=false: FPS: 703 FrameTime: 1.422 ms
[texture] anisotropy=0: FPS: 838 FrameTime: 1.193 ms
[texture] anisotropy=16: FPS: 836 FrameTime: 1.196 ms
[shading] shading=gouraud: FPS: 553 FrameTime: 1.808 ms
[shading] shading=blinn-phong-inf: FPS: 520 FrameTime: 1.923 ms
[shading] shading=phong: FPS: 412 FrameTime: 2.427 ms
[shading] shading=cel: FPS: 389 FrameTime: 2.571 ms
[effect2d] kernel=edge: FPS: 483 FrameTime: 2.070 ms
[effect2d] kernel=blur: FPS: 196 FrameTime: 5.102 ms
[desktop] <default>: FPS: 553 FrameTime: 1.808 ms
[cube] <default>: FPS: 1170 FrameTime: 0.855 ms
[clear] <default>: FPS: 2101 FrameTime: 0.476 ms
=======================================================
                                  vkmark Score: 730
=======================================================

```

</Collapsible>


<div class="image-flex">
  <img src="/static/images/2025/radxa-cubie-a7a/vkmark.webp" alt="vkmark" />
</div>

---


## Where It Stands Today

The Cubie A7A already **beats the Raspberry Pi 4** across most of aspects but still finds it slightly behind the pi5 interms of performance. The **3-TOPS NPU** and **PCIe 3.0** give it headroom, but I feel **software is the current limiter**:

- **LPDDR5 frequency** on my 8 GB unit is **1800 MHz** (I’d love to see **2400 MHz** land here).
- **NVMe compatibility** : I expect more support on this.

That said, engineering responses have been **quick**, and I’m expecting iterative improvements. If the RAM profile and NVMe support mature—and with the I/O this board already has—it could **outpace a Raspberry Pi 5 in value** at similar pricing, especially if you want **more RAM**.

<AffiliateLinks 
  title="Buy Radxa Cubie A7A" 
  links={[
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_c434m0ff" },
    { store: "Amazon US", url: "https://amzn.to/47Q9yHd" },
    { store: "Amazon EU", url: "https://amzn.to/4pjxHeU" }
  ]}
/>