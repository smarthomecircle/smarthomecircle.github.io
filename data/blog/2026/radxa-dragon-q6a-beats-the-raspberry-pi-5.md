---
title: 'Radxa Dragon Q6A: my hands-on experience (benchmarks, thermals, and Windows 11 Pro on ARM)'
author: 'Amrut Prabhu'
categories: ''
tags: [SBC, radxa, perfromance, qualcomm, benchmarks]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2026-01-02'
draft: false
autoAds: true
summary: 'My Radxa Dragon Q6A review with benchmark results, thermals, NVMe/UFS speeds, Home Assistant voice tests, and a walkthrough of Windows 11 on ARM (UEFI).'
imageUrl: /static/images/2026/radxa-dragon-q6a/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/oiIn1y9-Dxk"
suggestedArticles:
  - title: "Radxa Cubie A7A Review: Pi-Sized Power With PCIe, NVMe, USB 3.1 Gen2"
    url: "https://smarthomecircle.com/radxa-cubie-a7a-review-benchmarks-pi-5-comparison"
  - title: "Radxa Cubie A5E Hands-On: The Budget NVMe SBC"
    url: "https://smarthomecircle.com/radxa-cubie-a5e-review-benchmarks-vs-raspberry-pi"
  - title: "I Built A DIY 10 Inch Server Rack"
    url: "https://smarthomecircle.com/I-built-a-diy-10-inch-server-rack"

includeAsSBC:
  title: "Radxa Dragon Q6A"
  price: "$59.50+"
  comparable: False
  specifications:
    SoC: Qualcomm QCS6490
    CPU: |
      1× Kryo Prime @ 2.7GHz
      3× Kryo Gold @ 2.4GHz
      4× Kryo Silver @ 1.9GHz
    GPU:
      Model: Qualcomm Adreno 643
      Support: |
        OpenGL ES 3.2
        Vulkan 1.3
        OpenCL 2.2
        DirectX Feature Level 12
    AI Capabilities: |
      Qualcomm AI Engine (Hexagon DSP + Hexagon Tensor Accelerator): up to 12 TOPS
    RAM:
      Size: 4GB / 6GB / 8GB / 12GB / 16GB (options)
      Type: LPDDR5
      Speed: 5500MT/s
      Bus: Not specified
    Storage: |
      MicroSD card slot
      eMMC/UFS module
      M.2 2230 NVMe SSD (PCIe)
    Video Output: |
      1 × HDMI 2.0 Type-A up to 4K@30fps
      1 × MIPI DSI (4-lane, FHD+)
    NVMe:
      Onboard: Yes (M.2 M-Key 2230 slot)
      Connectivity: PCIe Gen3 x 2 lane
      Size: 2230
    Network:
      Ethernet: 1 × Gigabit Ethernet
      WiFi: WiFi 6 
      Bluetooth: Bluetooth 5.4
    PoE: Yes (requires PoE HAT)
    USB: |
      1 × USB 2.0 Type-C
      1 × USB 3.1 Type-A OTG
      3 × USB 2.0 Type-A Host
    Power: |
      12V via USB-C PD input (12V capable)
      12V via 3-pin power connector
      5V via 40-pin header (2 × 5V in/out)
    Audio: |
      1 × 3.5mm audio/microphone jack
      HDMI audio out
    Dimensions: |
      Width: 65 mm
      Length: 85 mm
      Height: 20 mm
    Operating System: |
      [Radxa OS](https://github.com/radxa-build/radxa-dragon-q6a/releases)
      [Fedora](https://images.arm.fedoravforce.org/Radxa%20Dragon%20Q6A)
      [Deepin Linux](https://deepin-community.github.io/sig-deepin-ports/images/arm64)
      [Armbian](https://www.armbian.com/radxa-dragon-q6a/)
      Windows on Arm

---

<TOCInline toc={props.toc} asDisclosure /> 


I’ve been testing the **Radxa Dragon Q6A** as a compact, high-performance single-board computer, and I want to share what I learned after pushing it through real benchmarks, storage tests, thermals, and even **Windows 11 on ARM**.

<div class="image-flex">
  <img src="/static/images/2026/radxa-dragon-q6a/dragon-q6a.webp" alt="dragon q6a" />
  <img src="/static/images/2026/radxa-dragon-q6a/dragon-q6a-1.webp" alt="dragon q6a" />
</div>

<AffiliateLinks 
  title="Buy Radxa Dragon Q6A" 
  links={[
    { store: "AliExpress", url: "https://de.aliexpress.com/item/1005010224206962.html?aff_fcid=79f77f80ca9543b49d03804d6e991f74-1766435965636-09027-_DEhJfB1&tt=CPS_NORMAL&aff_fsk=_DEhJfB1&aff_platform=shareComponent-detail&sk=_DEhJfB1&aff_trace_key=79f77f80ca9543b49d03804d6e991f74-1766435965636-09027-_DEhJfB1" },
    { store: "Arace", url: "https://arace.tech/products/radxa-dragon-q6a?variant=44069918802100" }
  ]}
/>

---

## Technical Specification

<SpecificationsDisplay/>

---

## Cooling is *not optional* 

I initially ran the board **bare**, without any heatsink. That worked fine for light tasks… until I started a Vulkan benchmark (**vkmark**). The board would **shut down** when the temperatures went out accepatble levels (105°C).

My fix was simple: I installed a tiny **25 mm heatsink + fan** (the kind often used on a Raspberry Pi 4) and powered it via the **GPIO pins**. 

<div class="image-flex">
  <img src="/static/images/2026/radxa-dragon-q6a/with-fan.webp" alt="dragon q6a fan" />
</div>

---

## Operating systems I tested: Armbian, Radxa OS, and Windows 11 with preview support

- **Armbian**: [Link](https://www.armbian.com/radxa-dragon-q6a/).
- **Radxa OS**: Radxa’s Ubuntu-based build. [Link](https://github.com/radxa-build/radxa-dragon-q6a/releases)
- **Windows 11 on ARM (preview)**: full guide [here](https://forum.radxa.com/t/windows-on-radxa-dragon-q6a/29913) .

### UEFI Support Avaiable

To get UEFI support, you need to flash the custom firmware mentioned in this [here](https://forum.radxa.com/t/windows-on-radxa-dragon-q6a/29913). 

With UEFI available, I downloaded the **Windows for ARM** image and prepared a USB drive with **Rufus**. Next, I plugged it into the board and started the installation selecting the USB as the boot medium.

<div class="image-flex">
  <img src="/static/images/2026/radxa-dragon-q6a/boot-select.webp" alt="dragon q6a" />
  <img src="/static/images/2026/radxa-dragon-q6a/uefi-boot.webp" alt="dragon q6a" />
  <img src="/static/images/2026/radxa-dragon-q6a/windows.webp" alt="dragon q6a" />
</div>


---

## Thermals Performance: Windows 11 Pro & Armbian

The thermal numbers are based on the small heat sink fan that I had used.

- **Windows 11 Pro**
  - Idle temps: **~47°C**
  - 5-minute stress: **~90°C**
  - 10-minute stress: **~92°C**

- **Armbian**
  - Idle temps: **~43°C**
  - 10-minute stress: stayed under **~80°C**

In all the cases, the CPU did **not** throttle down at all. 

I’m also keeping an eye out for an official heatsink from Radxa, because the SoC *can* run hot when pushed.

---

## Benchmarks: GPU, CPU, and memory

I ran a mix of benchmarks to understand how this board behaves across graphics and compute.

### Geekbench Test

Geekbench test showed pretty high result which were similar to those from an Intel N100.
- **Windows 11 Pro**
  - Single Score: **1089**
  - Multi-Core Score: **2906**

[Geekbench Score Link](https://browser.geekbench.com/v6/cpu/15592222)

- **Ambian**
  - Single Score: **1177**
  - Multi-Core Score: **3100**

[Geekbench Score Link](https://browser.geekbench.com/v6/cpu/15606461)

### Graphics benchmarks
- glmark2 (OpenGL) Score: **2946**
<p align="center">
  <img src="/static/images/2026/radxa-dragon-q6a/glmark2.webp" alt="dragon q6a" />
</p>

- vkmark (Vulkan) Score: **4557**
<p align="center">
  <img src="/static/images/2026/radxa-dragon-q6a/vkmark.webp" alt="dragon q6a" />
</p>

### CPU benchmark (sysbench)
For a prime number calculation up to 20,000 for every 100,000 request made to it, the results showed quick response, consuming less amount of time. 
- Total time : **16.95 seconds**
- No. of event/requests per second : **5896.17**

<Collapsible title=" Sysbench Test Details">

```shell
amrut@radxa-dragon-q6a:~$ sysbench cpu --cpu-max-prime=20000 --threads=8 --time=0 --events=100000 run 
sysbench 1.0.20 (using system LuaJIT 2.1.0-beta3)

Running the test with following options:
Number of threads: 8
Initializing random number generator from current time


Prime numbers limit: 20000

Initializing worker threads...

Threads started!

CPU speed:
    events per second:  5896.17

General statistics:
    total time:                          16.9589s
    total number of events:              100000

Latency (ms):
         min:                                    0.84
         avg:                                    1.36
         max:                                    4.53
         95th percentile:                        2.61
         sum:                               135633.71

Threads fairness:
    events (avg/stddev):           12500.0000/5986.89
    execution time (avg/stddev):   16.9542/0.00
```
</Collapsible>

<p align="center">
  <img src="/static/images/2026/radxa-dragon-q6a/sysbench.webp" alt="dragon q6a" />
</p>


### Memory benchmark 
This board makes use of **LPDDR5** RAM and the memory benchmark results were really impressive. These number were pretty high as you can see then below. 
#### Memory bandwidth Test
- MemCPY : **7641 MiB/s**
- MCBLOCK : **7507 MiB/s**
<Collapsible title="Memory Bandwidth Test Details">

```shell
amrut@radxa-dragon-q6a:~$ mbw -b 1024 1024
Long uses 8 bytes. Allocating 2*134217728 elements = 2147483648 bytes of memory.
Using 1024 bytes as blocks for memcpy block copy test.
Getting down to business... Doing 10 runs per test.
0       Method: MEMCPY  Elapsed: 0.13424        MiB: 1024.00000 Copy: 7628.299 MiB/s
1       Method: MEMCPY  Elapsed: 0.13396        MiB: 1024.00000 Copy: 7644.130 MiB/s
2       Method: MEMCPY  Elapsed: 0.13413        MiB: 1024.00000 Copy: 7634.328 MiB/s
3       Method: MEMCPY  Elapsed: 0.13375        MiB: 1024.00000 Copy: 7656.304 MiB/s
4       Method: MEMCPY  Elapsed: 0.13417        MiB: 1024.00000 Copy: 7631.938 MiB/s
5       Method: MEMCPY  Elapsed: 0.13392        MiB: 1024.00000 Copy: 7646.071 MiB/s
6       Method: MEMCPY  Elapsed: 0.13410        MiB: 1024.00000 Copy: 7636.092 MiB/s
7       Method: MEMCPY  Elapsed: 0.13418        MiB: 1024.00000 Copy: 7631.767 MiB/s
8       Method: MEMCPY  Elapsed: 0.13404        MiB: 1024.00000 Copy: 7639.625 MiB/s
9       Method: MEMCPY  Elapsed: 0.13363        MiB: 1024.00000 Copy: 7663.065 MiB/s
AVG     Method: MEMCPY  Elapsed: 0.13401        MiB: 1024.00000 Copy: 7641.147 MiB/s
0       Method: DUMB    Elapsed: 0.14013        MiB: 1024.00000 Copy: 7307.448 MiB/s
1       Method: DUMB    Elapsed: 0.14026        MiB: 1024.00000 Copy: 7300.623 MiB/s
2       Method: DUMB    Elapsed: 0.14107        MiB: 1024.00000 Copy: 7258.808 MiB/s
3       Method: DUMB    Elapsed: 0.14103        MiB: 1024.00000 Copy: 7260.815 MiB/s
4       Method: DUMB    Elapsed: 0.14009        MiB: 1024.00000 Copy: 7309.535 MiB/s
5       Method: DUMB    Elapsed: 0.14089        MiB: 1024.00000 Copy: 7268.339 MiB/s
6       Method: DUMB    Elapsed: 0.14084        MiB: 1024.00000 Copy: 7270.507 MiB/s
7       Method: DUMB    Elapsed: 0.14118        MiB: 1024.00000 Copy: 7252.947 MiB/s
8       Method: DUMB    Elapsed: 0.14087        MiB: 1024.00000 Copy: 7269.217 MiB/s
9       Method: DUMB    Elapsed: 0.14046        MiB: 1024.00000 Copy: 7290.280 MiB/s
AVG     Method: DUMB    Elapsed: 0.14068        MiB: 1024.00000 Copy: 7278.796 MiB/s
0       Method: MCBLOCK Elapsed: 0.13807        MiB: 1024.00000 Copy: 7416.474 MiB/s
1       Method: MCBLOCK Elapsed: 0.13651        MiB: 1024.00000 Copy: 7501.227 MiB/s
2       Method: MCBLOCK Elapsed: 0.13671        MiB: 1024.00000 Copy: 7490.363 MiB/s
3       Method: MCBLOCK Elapsed: 0.13649        MiB: 1024.00000 Copy: 7502.601 MiB/s
4       Method: MCBLOCK Elapsed: 0.13540        MiB: 1024.00000 Copy: 7562.498 MiB/s
5       Method: MCBLOCK Elapsed: 0.13586        MiB: 1024.00000 Copy: 7537.282 MiB/s
6       Method: MCBLOCK Elapsed: 0.13656        MiB: 1024.00000 Copy: 7498.700 MiB/s
7       Method: MCBLOCK Elapsed: 0.13595        MiB: 1024.00000 Copy: 7532.070 MiB/s
8       Method: MCBLOCK Elapsed: 0.13607        MiB: 1024.00000 Copy: 7525.428 MiB/s
9       Method: MCBLOCK Elapsed: 0.13633        MiB: 1024.00000 Copy: 7511.351 MiB/s
AVG     Method: MCBLOCK Elapsed: 0.13639        MiB: 1024.00000 Copy: 7507.618 MiB/s
```
</Collapsible>

<p align="center">
  <img src="/static/images/2026/radxa-dragon-q6a/mbw.webp" alt="router" />
</p>

#### Tinymembench Test
- C Copy: **8426 MB/s**
- C Fill: **20357 MB/s**
- Standard MemCopy: **8327 MB/s**
- Standard MemSet: **20376 MB/s**
<Collapsible title="Tinymembench Test Details">

```shell
amrut@radxa-dragon-q6a:~/tinymembench-master$ ./tinymembench
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

 C copy backwards                                     :   8440.6 MB/s (0.3%)
 C copy backwards (32 byte blocks)                    :   8435.9 MB/s
 C copy backwards (64 byte blocks)                    :   8438.8 MB/s
 C copy                                               :   8426.7 MB/s
 C copy prefetched (32 bytes step)                    :   8427.3 MB/s
 C copy prefetched (64 bytes step)                    :   8425.9 MB/s
 C 2-pass copy                                        :   8542.4 MB/s
 C 2-pass copy prefetched (32 bytes step)             :   8501.5 MB/s
 C 2-pass copy prefetched (64 bytes step)             :   8513.7 MB/s (0.5%)
 C fill                                               :  20357.5 MB/s
 C fill (shuffle within 16 byte blocks)               :  20369.6 MB/s
 C fill (shuffle within 32 byte blocks)               :  20380.5 MB/s (1.8%)
 C fill (shuffle within 64 byte blocks)               :  20338.0 MB/s
 ---
 standard memcpy                                      :   8327.7 MB/s
 standard memset                                      :  20376.6 MB/s
 ---
 NEON LDP/STP copy                                    :   8444.3 MB/s
 NEON LDP/STP copy pldl2strm (32 bytes step)          :   8448.3 MB/s
 NEON LDP/STP copy pldl2strm (64 bytes step)          :   8446.8 MB/s (0.4%)
 NEON LDP/STP copy pldl1keep (32 bytes step)          :   8403.6 MB/s
 NEON LDP/STP copy pldl1keep (64 bytes step)          :   8402.1 MB/s
 NEON LD1/ST1 copy                                    :   8440.7 MB/s
 NEON STP fill                                        :  20386.2 MB/s
 NEON STNP fill                                       :  20387.0 MB/s
 ARM LDP/STP copy                                     :   8452.8 MB/s
 ARM STP fill                                         :  20386.2 MB/s (0.1%)
 ARM STNP fill                                        :  20380.9 MB/s

==========================================================================
== Framebuffer read tests.                                              ==
==                                                                      ==
== Many ARM devices use a part of the system memory as the framebuffer, ==
== typically mapped as uncached but with write-combining enabled.       ==
== Writes to such framebuffers are quite fast, but reads are much       ==
== slower and very sensitive to the alignment and the selection of      ==
== CPU instructions which are used for accessing memory.                ==
==                                                                      ==
== Many x86 systems allocate the framebuffer in the GPU memory,         ==
== accessible for the CPU via a relatively slow PCI-E bus. Moreover,    ==
== PCI-E is asymmetric and handles reads a lot worse than writes.       ==
==                                                                      ==
== If uncached framebuffer reads are reasonably fast (at least 100 MB/s ==
== or preferably >300 MB/s), then using the shadow framebuffer layer    ==
== is not necessary in Xorg DDX drivers, resulting in a nice overall    ==
== performance improvement. For example, the xf86-video-fbturbo DDX     ==
== uses this trick.                                                     ==
==========================================================================

 NEON LDP/STP copy (from framebuffer)                 :   1601.9 MB/s
 NEON LDP/STP 2-pass copy (from framebuffer)          :   1338.4 MB/s
 NEON LD1/ST1 copy (from framebuffer)                 :   1603.4 MB/s
 NEON LD1/ST1 2-pass copy (from framebuffer)          :   1337.8 MB/s
 ARM LDP/STP copy (from framebuffer)                  :    773.0 MB/s
 ARM LDP/STP 2-pass copy (from framebuffer)           :    745.6 MB/s

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

block size : single random read / dual random read, [MADV_NOHUGEPAGE]
      1024 :    0.0 ns          /     0.0 ns 
      2048 :    0.0 ns          /     0.0 ns 
      4096 :    0.0 ns          /     0.0 ns 
      8192 :    0.0 ns          /     0.0 ns 
     16384 :    0.0 ns          /     0.0 ns 
     32768 :    0.0 ns          /     0.0 ns 
     65536 :    0.9 ns          /     1.3 ns 
    131072 :    1.5 ns          /     1.8 ns 
    262144 :    1.9 ns          /     2.7 ns 
    524288 :    8.4 ns          /    12.3 ns 
   1048576 :   12.6 ns          /    16.1 ns 
   2097152 :   15.1 ns          /    17.3 ns 
   4194304 :   60.7 ns          /    90.4 ns 
   8388608 :   99.9 ns          /   133.4 ns 
  16777216 :  121.8 ns          /   147.5 ns 
  33554432 :  138.4 ns          /   160.0 ns 
  67108864 :  149.5 ns          /   168.2 ns 

block size : single random read / dual random read, [MADV_HUGEPAGE]
      1024 :    0.0 ns          /     0.0 ns 
      2048 :    0.0 ns          /     0.0 ns 
      4096 :    0.0 ns          /     0.0 ns 
      8192 :    0.0 ns          /     0.0 ns 
     16384 :    0.0 ns          /     0.0 ns 
     32768 :    0.0 ns          /     0.0 ns 
     65536 :    1.2 ns          /     1.7 ns 
    131072 :    1.6 ns          /     2.0 ns 
    262144 :    1.9 ns          /     2.2 ns 
    524288 :    8.3 ns          /    11.8 ns 
   1048576 :   11.7 ns          /    14.8 ns 
   2097152 :   13.8 ns          /    15.9 ns 
   4194304 :   59.5 ns          /    88.9 ns 
   8388608 :   99.6 ns          /   130.1 ns 
  16777216 :  120.1 ns          /   142.4 ns 
  33554432 :  129.9 ns          /   146.5 ns 
  67108864 :  134.8 ns          /   149.7 ns 
```
</Collapsible>
<p align="center">
  <img src="/static/images/2026/radxa-dragon-q6a/tinymembench.webp" alt="router" />
</p>


---

## Networking: Gigabit Ethernet & Wifi 6
I tested the ethernet and Wifi speeds using iPerf3 test and these were the results. 
- Gigabit Ethernet: ~**942 Mbps** 
- Wi‑Fi: ~**170 Mbps** 

<div class="image-flex">
  <img src="/static/images/2026/radxa-dragon-q6a/iperf3-ethernet.webp" alt="dragon q6a" />
  <img src="/static/images/2026/radxa-dragon-q6a/iperf3-wifi.webp" alt="dragon q6a" />
</div>

---

## Storage tests: NVMe, UFS module, and USB

### NVMe Speeds
The **M.2 M-key** onboard slot provide **PCIe Gen 3** speeds with **2 lane** connectivity. I tested the speed on windows 11 Pro and I got pretty good result. I tested it on Armbian and Radxa OS and I got slightly lower results 

- Windows 11 Pro: **~1644 MB/s**
- Armbian : **~1000 MB/s**
- Radxa OS : **~750 MB/s**

<div class="image-flex">
  <img src="/static/images/2026/radxa-dragon-q6a/windows-nvme.webp" alt="dragon q6a" />
</div>


### UFS Speeds
I connected a UFS 3.1 module to the board and I got pretty good speeds.

- Windows 11 Pro: **~1416 MB/s**
- Armbian :  **~1384 MB/s**
- Radxa OS :  **~1187 MB/s**


### USB 3.1 Speeds
I connected a **USB 3 to NVMe adapter** and confirmed it it was using the **5000 Mb/s** bus (USB 3.1 Gen 1). 
```shell
amrut@radxa-dragon-q6a:~$ lsusb -t
/:  Bus 001.Port 001: Dev 001, Class=root_hub, Driver=xhci-hcd/1p, 480M
    |__ Port 001: Dev 002, If 0, Class=Hub, Driver=hub/4p, 480M
        |__ Port 004: Dev 007, If 0, Class=Wireless, Driver=btusb, 480M
        |__ Port 004: Dev 007, If 1, Class=Wireless, Driver=btusb, 480M
        |__ Port 004: Dev 007, If 2, Class=Vendor Specific Class, Driver=aic8800_fdrv, 480M
/:  Bus 002.Port 001: Dev 001, Class=root_hub, Driver=xhci-hcd/1p, 480M
/:  Bus 003.Port 001: Dev 001, Class=root_hub, Driver=xhci-hcd/1p, 5000M
    |__ Port 001: Dev 002, If 0, Class=Mass Storage, Driver=uas, 5000M
```

Using Flexible I/O Tester (fio), I got **~395 MB/s write speeds**
<Collapsible title="Flexible I/O Tester Details">

```shell
amrut@radxa-dragon-q6a:~$ sudo fio --name=seqwrite  --filename=/mnt/usb/fio-test.bin  --size=4G  --bs=1M --rw=write --ioengine=libaio --direct=1  --iodepth=32 --numjobs=1 --time_based=1 --runtime=60 --group_reporting
seqwrite: (g=0): rw=write, bs=(R) 1024KiB-1024KiB, (W) 1024KiB-1024KiB, (T) 1024KiB-1024KiB, ioengine=libaio, iodepth=32
fio-3.36
Starting 1 process
Jobs: 1 (f=1): [W(1)][100.0%][w=378MiB/s][w=378 IOPS][eta 00m:00s]
seqwrite: (groupid=0, jobs=1): err= 0: pid=5221: Tue Dec 16 17:50:07 2025
  write: IOPS=377, BW=378MiB/s (396MB/s)(22.2GiB/60080msec); 0 zone resets
    slat (usec): min=52, max=82966, avg=2627.36, stdev=1748.49
    clat (msec): min=9, max=163, avg=82.07, stdev= 8.29
     lat (msec): min=11, max=165, avg=84.70, stdev= 8.30
    clat percentiles (msec):
     |  1.00th=[   55],  5.00th=[   81], 10.00th=[   82], 20.00th=[   82],
     | 30.00th=[   82], 40.00th=[   82], 50.00th=[   82], 60.00th=[   82],
     | 70.00th=[   82], 80.00th=[   83], 90.00th=[   86], 95.00th=[   87],
     | 99.00th=[  115], 99.50th=[  140], 99.90th=[  157], 99.95th=[  159],
     | 99.99th=[  163]
   bw (  KiB/s): min=370688, max=401408, per=100.00%, avg=387182.62, stdev=4474.92, samples=119
   iops        : min=  362, max=  392, avg=378.07, stdev= 4.37, samples=119
  lat (msec)   : 10=0.02%, 20=0.24%, 50=0.63%, 100=97.79%, 250=1.32%
  cpu          : usr=4.43%, sys=6.28%, ctx=45486, majf=0, minf=10
  IO depths    : 1=0.1%, 2=0.1%, 4=0.1%, 8=0.1%, 16=0.1%, 32=99.9%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.1%, 64=0.0%, >=64=0.0%
     issued rwts: total=0,22694,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=32

Run status group 0 (all jobs):
  WRITE: bw=378MiB/s (396MB/s), 378MiB/s-378MiB/s (396MB/s-396MB/s), io=22.2GiB (23.8GB), run=60080-60080msec

Disk stats (read/write):
  sdd: ios=0/45255, sectors=0/46318856, merge=0/11, ticks=0/3552987, in_queue=3553122, util=99.98%
```
</Collapsible>
---

## Home Assistant : Voice Assistant With Whisper Performance

One of my favorite test is running **Home Assistant** and seeing how quickly the local voice assistant components respond.

I ran **Home Assistant, Whisper and Piper with Docker**:

When I gave a voice command, **Whisper (with small-int8 model)** converted speech-to-text in about **~4 seconds**, which was roughly **~50% faster** than the Raspberry Pi 5 in my own comparisons.

<p align="center">
  <img src="/static/images/2026/radxa-dragon-q6a/faster-whisper.webp" alt="dragon q6a" />
</p>


---

## Power usage: surprisingly reasonable for the performance

With **NVMe + UFS module + fan** connected:

- Idle power draw: **~3.9 – 4 Watt**
- Under stress testing: **~9.5 – 10 Watt**

<div class="image-flex">
  <img src="/static/images/2026/radxa-dragon-q6a/peak-watts.webp" alt="dragon q6a" />
  <img src="/static/images/2026/radxa-dragon-q6a/idle-watts.webp" alt="dragon q6a" />
</div>

---

## How I’d use it (and why it impressed me)

After running all these tests, what stood out most was that this board feels like a **serious** SBC — fast CPU performance, strong GPU results, and very capable storage + I/O options.

I can see it fitting in a few different roles:

- **Windows-on-ARM mini desktop** for normal usage and even some light gaming.  
- **Home server / rack setup** to run containers, services, and automation.
- **Cluster node** for something like Kubernetes.


---

## Price snapshot

Prices for the **8Gb** variant as below
In my searches, I saw pricing around:
- **~€90 on AliExpress**: [Link](https://de.aliexpress.com/item/1005010224206962.html?aff_fcid=79f77f80ca9543b49d03804d6e991f74-1766435965636-09027-_DEhJfB1&tt=CPS_NORMAL&aff_fsk=_DEhJfB1&aff_platform=shareComponent-detail&sk=_DEhJfB1&aff_trace_key=79f77f80ca9543b49d03804d6e991f74-1766435965636-09027-_DEhJfB1)
- **~€70 on Arace**: [Link](https://arace.tech/products/radxa-dragon-q6a?variant=44069918802100)

<div class="image-flex">
  <img src="/static/images/2026/radxa-dragon-q6a/dragon-q6a-1.webp" alt="dragon q6a" />
</div>

<AffiliateLinks 
  title="Buy Radxa Dragon Q6A" 
  links={[
    { store: "AliExpress", url: "https://de.aliexpress.com/item/1005010224206962.html?aff_fcid=79f77f80ca9543b49d03804d6e991f74-1766435965636-09027-_DEhJfB1&tt=CPS_NORMAL&aff_fsk=_DEhJfB1&aff_platform=shareComponent-detail&sk=_DEhJfB1&aff_trace_key=79f77f80ca9543b49d03804d6e991f74-1766435965636-09027-_DEhJfB1" },
    { store: "Arace", url: "https://arace.tech/products/radxa-dragon-q6a?variant=44069918802100" }
  ]}
/>


