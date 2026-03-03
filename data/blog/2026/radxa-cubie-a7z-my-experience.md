---
title: 'Radxa Cubie A7Z: Raspberry Pi Zero–sized Powerful SBC'
author: 'Amrut Prabhu'
categories: ''
tags: [Radxa, SBC, benchmarks, Performance, Cubie ]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2026-01-11'
draft: false
autoAds: true
summary: ''
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

includeAsSBC:
  title: "Radxa Cubie A7Z"
  price: "$19"
  comparable: False
  specifications:
    SoC: Allwinner A733
    CPU: |
      2× Cortex-A76 up to 2.0GHz
      6× Cortex-A55 up to 1.8GHz
    GPU:
      Model: Imagination BXM-4-64 MC1
      Support: |
        OpenGL ES 3.2
        Vulkan 1.3
        OpenCL 3.0
    AI Capabilities: |
      NPU: 3 TOPS
    RAM:
      Size: 1GB / 2GB / 4GB / 8GB / 16GB (options)
      Type: LPDDR4X
      Speed: Not specified
      Bus: Not specified
    Storage: |
      MicroSD
      Onboard UFS module (optional, up to 1TB)
      NVMe SSD (via PCIe FPC + external HAT)
    Video Output: |
      1 × Micro HDMI 2.0 up to 4K@60fps
      1 × USB-C (DP Alt Mode) for external displays
    NVMe:
      Onboard: No (via PCIe FPC + external HAT)
      Connectivity: PCIe Gen3 x1 (1-lane)
      Size: Depends on NVMe HAT
    Network:
      Ethernet: None onboard
      WiFi: WiFi 6
      Bluetooth: Bluetooth 5.4
    PoE: No
    USB: |
      1 × USB-C 2.0 OTG (Power + Data)
      1 × USB-C (USB 3.1) with DisplayPort Alt Mode
    Power: |
      5V via USB-C power port
      5V via GPIO pins 2 & 4
    Audio: Not specified
    Dimensions: |
      Width: 30 mm
      Length: 65 mm
    Operating System: |
      [Radxa OS](https://github.com/radxa-build/radxa-a733/releases)
      [Android 13](https://github.com/radxa/allwinner-android-manifests/releases)

---


If you like tiny single-board computers, the **Radxa Cubie A7Z** is one of those boards that makes you do a double‑take. It’s basically **Pi Zero–sized**, but it packs a lot more I/O and compute than you wouldn't expect from something this small.

<div class="image-flex">
  <img src="/static/images/2026/radxa-cubie-a7z/cubie-a7z-front.jpg" alt="front" />
  <img src="/static/images/2026/radxa-cubie-a7z/cubie-a7z-back.jpg" alt="back" />
</div>
    

---

## Technical Specification

<SpecificationsDisplay/>

> 📸 **Photo suggestion:** close-up shots of the connectors: micro HDMI, both USB‑C ports, the FPC PCIe connector, and the Wi‑Fi antennas.

---

## Storage expansion: Connected an NVMe HAT via the PCIe FPC Connector

I connected a **Raspberry Pi NVMe hat** to the FPC connector to access PCIe capabilities.

With a **WD NVMe**, I measured about **654 MB/s read**. That’s absolutely usable, but it was still **lower than my Raspberry Pi 5**, even though I’m using **PCIe Gen3 x1** here.


<div class="image-flex">
  <img src="/static/images/2026/radxa-cubie-a7z/nvme-hat.jpg" alt="nvme" />
</div>
    

---

## OS options: Debian-based Radxa OS and Android

On the software side, I’m seeing two main options:
- **Radxa OS** (Debian-based) : [Link](https://github.com/radxa-build/radxa-a733/releases)
- **Android build** : [Link](https://github.com/radxa/allwinner-android-manifests/releases)


---

## Cooling: small board but needs cooling

This SoC definitely **heats up** when you try to get that octa‑core performance out of it. Radxa has an official heatsink + fan, but I wanted to see if I could keep it **passively cooled**.

So I tried a **Pi Zero heatsink**, and it fit surprisingly well—especially after I used a **slightly thicker thermal pad** to make sure it had good contact.

the temperatures with that setup and desktop environment running:
- **Idle**: ~**52°C**
- **Stress test ~10 minutes**: stayed under **70°C**

For a tiny passively cooled board, that felt **pretty acceptable**, and it gave me enough confidence to move on to the rest of my tests.

<div class="image-flex">
  <img src="/static/images/2026/radxa-cubie-a7z/heatsink.jpg" alt="heatsink" />
</div>
    
---

## GPU benchmarks: OpenGL and Vulkan both worked

To sanity-check graphics support, I ran:
- **glmark2** (OpenGL): **404**
- **vkmark** (Vulkan): **785**

The important part for me wasn’t chasing the biggest number but was that both stacks **ran successfully**, which is a good sign for experimentation and lightweight UI/graphics use.

<Collapsible title="Detailed Glmark2 Test Results">

```shell
  radxa@radxa-cubie-a7z:~/glmark2$ glmark2-es2 
  =======================================================
      glmark2 2023.01
  =======================================================
      OpenGL Information
      GL_VENDOR:      Imagination Technologies
      GL_RENDERER:    PowerVR B-Series BXM-4-64
      GL_VERSION:     OpenGL ES 3.2 build 24.2@6603887
      Surface Config: buf=32 r=8 g=8 b=8 a=8 depth=24 stencil=0 samples=0
      Surface Size:   800x600 windowed
  =======================================================
  [build] use-vbo=false: FPS: 445 FrameTime: 2.249 ms
  [build] use-vbo=true: FPS: 494 FrameTime: 2.026 ms
  [texture] texture-filter=nearest: FPS: 536 FrameTime: 1.866 ms
  [texture] texture-filter=linear: FPS: 564 FrameTime: 1.775 ms
  [texture] texture-filter=mipmap: FPS: 564 FrameTime: 1.774 ms
  [shading] shading=gouraud: FPS: 438 FrameTime: 2.288 ms
  [shading] shading=blinn-phong-inf: FPS: 430 FrameTime: 2.326 ms
  [shading] shading=phong: FPS: 387 FrameTime: 2.590 ms
  [shading] shading=cel: FPS: 378 FrameTime: 2.651 ms
  [bump] bump-render=high-poly: FPS: 257 FrameTime: 3.892 ms
  [bump] bump-render=normals: FPS: 597 FrameTime: 1.675 ms
  [bump] bump-render=height: FPS: 561 FrameTime: 1.785 ms
  [effect2d] kernel=0,1,0;1,-4,1;0,1,0;: FPS: 387 FrameTime: 2.588 ms
  [effect2d] kernel=1,1,1,1,1;1,1,1,1,1;1,1,1,1,1;: FPS: 207 FrameTime: 4.852 ms
  [pulsar] light=false:quads=5:texture=false: FPS: 659 FrameTime: 1.518 ms
  [desktop] blur-radius=5:effect=blur:passes=1:separable=true:windows=4: FPS: 181 FrameTime: 5.544 ms
  [desktop] effect=shadow:windows=4: FPS: 460 FrameTime: 2.176 ms
  [buffer] columns=200:interleave=false:update-dispersion=0.9:update-fraction=0.5:update-method=map: FPS: 158 FrameTime: 6.360 ms
  [buffer] columns=200:interleave=false:update-dispersion=0.9:update-fraction=0.5:update-method=subdata: FPS: 158 FrameTime: 6.346 ms
  [buffer] columns=200:interleave=true:update-dispersion=0.9:update-fraction=0.5:update-method=map: FPS: 260 FrameTime: 3.855 ms
  [ideas] speed=duration: FPS: 569 FrameTime: 1.759 ms
  [jellyfish] <default>: FPS: 272 FrameTime: 3.679 ms
  [terrain] <default>: FPS: 27 FrameTime: 37.121 ms
  [shadow] <default>: FPS: 300 FrameTime: 3.334 ms
  [refract] <default>: FPS: 53 FrameTime: 19.014 ms
  [conditionals] fragment-steps=0:vertex-steps=0: FPS: 653 FrameTime: 1.532 ms
  [conditionals] fragment-steps=5:vertex-steps=0: FPS: 447 FrameTime: 2.242 ms
  [conditionals] fragment-steps=0:vertex-steps=5: FPS: 650 FrameTime: 1.540 ms
  [function] fragment-complexity=low:fragment-steps=5: FPS: 536 FrameTime: 1.867 ms
  [function] fragment-complexity=medium:fragment-steps=5: FPS: 390 FrameTime: 2.568 ms
  [loop] fragment-loop=false:fragment-steps=5:vertex-steps=5: FPS: 530 FrameTime: 1.890 ms
  [loop] fragment-steps=5:fragment-uniform=false:vertex-steps=5: FPS: 507 FrameTime: 1.973 ms
  [loop] fragment-steps=5:fragment-uniform=true:vertex-steps=5: FPS: 487 FrameTime: 2.054 ms
  =======================================================
                                    glmark2 Score: 409 
  =======================================================
  radxa@radxa-cubie-a7z:~/glmark2$ 

```
</Collapsible>

<Collapsible title="Detailed Vkmark Test Results">

```shell
radxa@radxa-cubie-a7z:~/vkmark$ vkmark --winsys xcb
=======================================================
    vkmark 2025.01
=======================================================
    Vendor ID:      0x1010
    Device ID:      0x36104183
    Device Name:    PowerVR B-Series BXM-4-64 MC1
    Driver Version: 6603887
    Device UUID:    6fc464002438006800b700c117dd6700
=======================================================
[vertex] device-local=true: FPS: 669 FrameTime: 1.495 ms
[vertex] device-local=false: FPS: 794 FrameTime: 1.259 ms
[texture] anisotropy=0: FPS: 926 FrameTime: 1.080 ms
[texture] anisotropy=16: FPS: 919 FrameTime: 1.088 ms
[shading] shading=gouraud: FPS: 600 FrameTime: 1.667 ms
[shading] shading=blinn-phong-inf: FPS: 567 FrameTime: 1.764 ms
[shading] shading=phong: FPS: 446 FrameTime: 2.242 ms
[shading] shading=cel: FPS: 420 FrameTime: 2.381 ms
[effect2d] kernel=edge: FPS: 513 FrameTime: 1.949 ms
[effect2d] kernel=blur: FPS: 206 FrameTime: 4.854 ms
[desktop] <default>: FPS: 605 FrameTime: 1.653 ms
[cube] <default>: FPS: 1280 FrameTime: 0.781 ms
[clear] <default>: FPS: 2264 FrameTime: 0.442 ms
=======================================================
                                   vkmark Score: 785
=======================================================

```
</Collapsible>


---

## CPU performance

I ran a couple of CPU benchmarking tests to get a feel for where it lands.

### Geekbench 6
The Geekbench scores are **Lower than Raspberry Pi 5** but **Much better than Raspberry Pi 4**

<p align="center">
  <img src="/static/images/2026/radxa-cubie-a7z/geekbench.png" alt="geekbench" />
</p>


### Sysbench Test
In **sysbench**, I tested prime calculation up to **20,000** with **100,000 requests** and it completed in about **32 seconds**.

<Collapsible title="Detailed Sysbench Test Results">

```shell
radxa@radxa-cubie-a7z:~$ sysbench cpu --cpu-max-prime=20000 --threads=8 --time=0 --events=100000 run
sysbench 1.0.20 (using system LuaJIT 2.1.0-beta3)

Running the test with following options:
Number of threads: 8
Initializing random number generator from current time


Prime numbers limit: 20000

Initializing worker threads...

Threads started!

CPU speed:
    events per second:  3112.10

General statistics:
    total time:                          32.1301s
    total number of events:              100000

Latency (ms):
         min:                                    1.14
         avg:                                    2.57
         max:                                   14.97
         95th percentile:                        3.55
         sum:                               256987.91

Threads fairness:
    events (avg/stddev):           12500.0000/5105.24
    execution time (avg/stddev):   32.1235/0.00
```
</Collapsible>

<p align="center">
  <img src="/static/images/2026/radxa-cubie-a7z/sysbench-test.png" alt="sysbench" />
</p>


---

## Memory performance

For memory testing, I ran a memory bandwidth test and also **tinymembench**.

The bandwidth test showed **better performance mainly for memcpy** versus Pi 4. **tinymembench** gave me **consistently better results than Pi 4**


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

<p align="center">
  <img src="/static/images/2026/radxa-cubie-a7z/mbw-test.png" alt="mbw" />
</p>

<Collapsible title="Detailed Tiny Membench Test Results">

```shell
radxa@radxa-cubie-a7z:~/tinymembench-master$ ./tinymembench 
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

 C copy backwards                                     :   5171.4 MB/s (0.3%)
 C copy backwards (32 byte blocks)                    :   5164.1 MB/s (0.3%)
 C copy backwards (64 byte blocks)                    :   5169.7 MB/s (0.3%)
 C copy                                               :   5159.7 MB/s
 C copy prefetched (32 bytes step)                    :   5221.8 MB/s (0.4%)
 C copy prefetched (64 bytes step)                    :   5212.3 MB/s (0.3%)
 C 2-pass copy                                        :   3375.5 MB/s (1.5%)
 C 2-pass copy prefetched (32 bytes step)             :   4816.7 MB/s (1.7%)
 C 2-pass copy prefetched (64 bytes step)             :   4868.6 MB/s (2.2%)
 C fill                                               :   8387.9 MB/s (0.8%)
 C fill (shuffle within 16 byte blocks)               :   8385.4 MB/s (0.9%)
 C fill (shuffle within 32 byte blocks)               :   8377.8 MB/s (0.6%)
 C fill (shuffle within 64 byte blocks)               :   8264.0 MB/s (0.7%)
 ---
 standard memcpy                                      :   5203.8 MB/s (0.3%)
 standard memset                                      :   8381.0 MB/s (0.9%)
 ---
 NEON LDP/STP copy                                    :   5193.9 MB/s (0.3%)
 NEON LDP/STP copy pldl2strm (32 bytes step)          :   5138.8 MB/s (32.6%)
 NEON LDP/STP copy pldl2strm (64 bytes step)          :   2485.8 MB/s
 NEON LDP/STP copy pldl1keep (32 bytes step)          :   1995.2 MB/s (0.9%)
 NEON LDP/STP copy pldl1keep (64 bytes step)          :   3822.9 MB/s (1.3%)
 NEON LD1/ST1 copy                                    :   3861.3 MB/s (1.0%)
 NEON STP fill                                        :   8295.0 MB/s (1.1%)
 NEON STNP fill                                       :   4816.8 MB/s (0.4%)
 ARM LDP/STP copy                                     :   3870.8 MB/s (1.3%)
 ARM STP fill                                         :   8298.1 MB/s (1.5%)
 ARM STNP fill                                        :   5239.2 MB/s (2.8%)

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
      8192 :    1.0 ns          /     0.3 ns 
     16384 :    1.0 ns          /     0.3 ns 
     32768 :    1.0 ns          /     0.3 ns 
     65536 :    1.0 ns          /     0.3 ns 
    131072 :    2.7 ns          /     2.6 ns 
    262144 :    4.4 ns          /     4.7 ns 
    524288 :   17.4 ns          /    22.9 ns 
   1048576 :   24.6 ns          /    29.1 ns 
   2097152 :   86.6 ns          /   126.1 ns 
   4194304 :  129.2 ns          /   169.9 ns 
   8388608 :  153.9 ns          /   188.1 ns 
  16777216 :  163.0 ns          /   192.0 ns 
  33554432 :  171.8 ns          /   198.5 ns 
  67108864 :  178.5 ns          /   204.9 ns 
```
</Collapsible>

<p align="center">
  <img src="/static/images/2026/radxa-cubie-a7z/tiny-membench.png" alt="tinymembench" />
</p>


---

## USB-C Speed Tests

I tested the **USB‑C data port** to confirm whether it actually behaves like **USB 3.1 Gen 2**.

I connected a **USB 3 to NVMe adapter**, and it showed up on the **10,000 Mbit/s bus**, which lines up with Gen 2 expectations.

```shell
radxa@radxa-cubie-a7z:~$ lsusb -t
/:  Bus 04.Port 1: Dev 1, Class=root_hub, Driver=sunxi-ohci/1p, 12M
/:  Bus 03.Port 1: Dev 1, Class=root_hub, Driver=sunxi-ehci/1p, 480M
    |__ Port 1: Dev 3, If 0, Class=Wireless, Driver=aic_btusb, 480M
    |__ Port 1: Dev 3, If 1, Class=Wireless, Driver=aic_btusb, 480M
    |__ Port 1: Dev 3, If 2, Class=Vendor Specific Class, Driver=aic8800_fdrv, 480M
/:  Bus 02.Port 1: Dev 1, Class=root_hub, Driver=xhci-hcd/1p, 10000M
    |__ Port 1: Dev 7, If 0, Class=Mass Storage, Driver=uas, 10000M
/:  Bus 01.Port 1: Dev 1, Class=root_hub, Driver=xhci-hcd/1p, 480M
```
Then I ran **fio**, and I was seeing close to **~1000 MB/s write** performance, which was genuinely impressive for a board this small.


---

## Power draw

On the power draw side, I see that at: 
- **Idle:** ~**1.9–2.0 W**
- **Under load (Geekbench multicore phase):** ~**3.9–4.5 W**

That’s a nice power profile if you’re thinking about portable setups or running it from a power bank.

---

## What are the use cases

After running all these tests, the Cubie A7Z feels like a **seriously capable tiny SBC**. A few ideas that make sense to me:

- **Portable NAS / storage node**  
  Use the **PCIe Gen3 x1** expansion for NVMe and power it with a **power bank**.
- **Tiny dev box**  
  Debian-based OS, fast USB storage, small footprint.
- **Edge/IoT experiments**  
  Wi‑Fi 6, Bluetooth 5.4, camera input, and that 3 TOPS NPU (software support willing).

---

## Things to consider before you go all-in

A couple of real-world notes from my testing:

- **It needs a heatsink.**  
  The SoC heats up enough that I wouldn’t run it bare if I care about stability.
- **NVMe compatibility can be limited.**  
  I could use a **newer WD Gen4 NVMe**, but **some Gen3 NVMe drives** (including Raspberry Pi and Samsung ones I tried) **did not get detected**.
  From what I’ve seen, this is less about the board itself and more about **software support on the Allwinner side**. You can follow the thread [here](https://forum.radxa.com/t/radxa-cubie-a7z-nvme-hat-not-detected/29080) for more details


---

## My conclusion

For a Pi Zero–sized board, the Cubie A7Z feels *way* more powerful than its dimensions suggest. Between the PCIe expansion, fast USB storage, and efficient power draw, it’s the kind of SBC that makes me want to build something practical with it—especially in the “portable” category.
