---
title: "Radxa Dragon Q8B Review: Specs, Benchmarks & Local LLM Performance"
author: 'Amrut Prabhu'
categories: ''
tags: [Radxa, Qualcomm, SBC, AI, Performance, Benchmarks ]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2026-08-27'
draft: false
autoAds: true
summary: 'With 29 TOPS of local AI performance, dual 2.5GbE ports, and blazingly fast M.2 NVMe storage, check out our full hands-on review and benchmarks of the Radxa Dragon Q8B.'
imageUrl: /static/images/2026/radxa-dragon-q8b/cover.webp
youtubeLink: "https://www.youtube.com/embed/KEFTjnUbaLU"
suggestedArticles:
  - title: "Radxa Rock 5T: Pi-Sized Power With PCIe, NVMe, USB 3.1 Gen2, Thermals & Real-World Benchmarks"
    url: "https://smarthomecircle.com/radxa-rock-5t-better-than-raspberrypi-5"
  - title: "Radxa Cubie A7Z: Raspberry Pi Zero–sized Powerful SBC"
    url: "https://smarthomecircle.com/radxa-cubie-a7z-my-experience"
  - title: "How to Auto-Mount an NVMe Drive on Linux at Startup"
    url: "https://smarthomecircle.com/how-to-auto-mount-storage-in-linux-on-startup"
includeAsSBC:
  title: "Radxa Dragon Q8B"
  price: "$ 219+"
  comparable: True
  url: "https://radxa.com/products/dragon/q8b/"
  specifications:
    SoC: Qualcomm QCS8550
    CPU: 
      No. Of Cores: 8
      Cores: |
        1 x Cortex®-X3 up to 3.2GHz
        2 x Cortex®-A715 up to 2.8GHz
        2 x Cortex®-A710 up to 2.8GHz
        3 x Cortex®-A510 up to 2.0GHz
    GPU:
      Model: Qualcomm® Adreno™ 740
      Support: |
        Vulkan® 1.3
        OpenGL® ES 3.2
        OpenCL® 3.0
    AI Capabilities: |
        NPU: Up to 48 TOPS (Qualcomm® Hexagon™)
    RAM:
      Size: 8GB / 12GB / 16GB / 24GB
      Type: LPDDR5X
      Speed: 4200MHz
      Bus: 64bit
    Storage: |
      MicroSD Card Slot
      1 x M.2 2280 NVMe SSD
      UFS 4.0 / eMMC 5.1
    Video Output: |
      1 x HDMI 2.1 up to 8Kp60 
      1 x USB Type-C DP up to 8Kp60
      1 x 4-lane MIPI DSI up to 4Kp60
    NVMe:
      Onboard: No
      Number Of Connectors: 1
      Connectivity: PCIe Gen4 x 2
      Size: 2280
    Network:
      Ethernet: 1 x 2.5 Gigabit Ethernet
      Wi-Fi: Wi-Fi 7 / Wi-Fi 6E
      Bluetooth: Bluetooth 5.3
    PoE: Yes (PoE HAT Required)
    USB: |
      1 x USB Type-C (USB 3.2 Gen2, DP 1.4)  
      2 x USB 3.2 Gen1 Type-A 
      2 × USB 2.0
    Power: |
      12V DC via 5525 Barrel Jack or USB PD Type-C
    Audio: |
      3.5mm Audio Jack (with Mic)
      1 x Speaker Header
    Camera: 3 x 4-lane MIPI CSI
    Cooling: 4-pin Fan Connector with PWM
    Other Expansion Capabilities: |
      1 x M.2 Key E Connector
      1 x SIM Card Socket
      1 x RTC Battery Connector
    Dimensions:
      Width: 85 mm
      Length: 100 mm 
    Operating System: |
      [Radxa OS](https://github.com/radxa-build/)
      Android 13
      Ubuntu / Debian

affiliateLinks:
  title: Buy Radxa Dragon Q8B
  links:
    - label: "AliExpress"
      url: "https://de.aliexpress.com/item/1005012429736010.html?aff_fcid=c4a1c9982013494896246251091de99b-1786995865085-09588-_c3Wt2byj&tt=CPS_NORMAL&aff_fsk=_c3Wt2byj&aff_platform=shareComponent-detail&sk=_c3Wt2byj&aff_trace_key=c4a1c9982013494896246251091de99b-1786995865085-09588-_c3Wt2byj&terminal_id=e062923139f9418882511dd06d5f4091&afSmartRedirect=y"
    - label: "Amazon"
      url: "https://amzn.to/4zpbHVV"
    - label: "Arace"
      url: "https://arace.tech/products/radxa-dragon-q8b"
---

<TOCInline toc={props.toc} asDisclosure /> 

If you are looking for a powerhouse Single Board Computer (SBC) that rivals the Raspberry Pi 5, you need to check out the new Radxa Dragon Q8B.

Powered by the Qualcomm Snapdragon 8cx Gen 3 CPU, this board is built for heavy multitasking, lightning-fast storage, and running local AI models right out of the box. Today, I'll walk you through its core specs, performance benchmarks, and local AI capabilities so you can see exactly what this beast can do.

<div className="image-flex">
  <img src="/static/images/2026/radxa-dragon-q8b/front-1.webp" alt="front-1" />
  <img src="/static/images/2026/radxa-dragon-q8b/front.webp" alt="front" />
</div>

<AffiliateLinksFromMetadata />

## Technical Specification

<SpecificationsDisplay/>


## Smooth Operating System & GPU Performance

Radxa provides a customized, Ubuntu-based OS running on the latest Linux 7.0 kernel. Out of the box, the GPU drivers are fully ready to utilize the Qualcomm Adreno 690 GPU.

-   **Hardware Video Decoding:** Flawless. Running 1080p and 4K YouTube streams in Firefox resulted in zero dropped frames.
    
-   **OpenGL Support:** GLmark2 scored ~5,844 (nearly twice the score of the Radxa Dragon Q6A).

<p align="center">
  <img src="/static/images/2026/radxa-dragon-q8b/glmark2.webp" alt="glmark2" />
</p>

<Collapsible title="Detailed vkmark Test Results">

```shell
radxa@radxa-dragon-q8b:~/glmark2$ glmark2-es2-wayland 
=======================================================
    glmark2 2023.01
=======================================================
    OpenGL Information
    GL_VENDOR:      freedreno
    GL_RENDERER:    FD690
    GL_VERSION:     OpenGL ES 3.2 Mesa 26.0.3-1ubuntu1
    Surface Config: buf=32 r=8 g=8 b=8 a=8 depth=24 stencil=0 samples=0
    Surface Size:   800x600 windowed
=======================================================
[build] use-vbo=false: FPS: 5232 FrameTime: 0.191 ms
[build] use-vbo=true: FPS: 7323 FrameTime: 0.137 ms
[texture] texture-filter=nearest: FPS: 6491 FrameTime: 0.154 ms
[texture] texture-filter=linear: FPS: 7519 FrameTime: 0.133 ms
[texture] texture-filter=mipmap: FPS: 8031 FrameTime: 0.125 ms
[shading] shading=gouraud: FPS: 6342 FrameTime: 0.158 ms
[shading] shading=blinn-phong-inf: FPS: 6162 FrameTime: 0.162 ms
[shading] shading=phong: FPS: 5457 FrameTime: 0.183 ms
[shading] shading=cel: FPS: 8113 FrameTime: 0.123 ms
[bump] bump-render=high-poly: FPS: 3937 FrameTime: 0.254 ms
[bump] bump-render=normals: FPS: 8482 FrameTime: 0.118 ms
[bump] bump-render=height: FPS: 7412 FrameTime: 0.135 ms
[effect2d] kernel=0,1,0;1,-4,1;0,1,0;: FPS: 9724 FrameTime: 0.103 ms
[effect2d] kernel=1,1,1,1,1;1,1,1,1,1;1,1,1,1,1;: FPS: 7116 FrameTime: 0.141 ms
[pulsar] light=false:quads=5:texture=false: FPS: 5591 FrameTime: 0.179 ms
[desktop] blur-radius=5:effect=blur:passes=1:separable=true:windows=4: FPS: 3942 FrameTime: 0.254 ms
[desktop] effect=shadow:windows=4: FPS: 4978 FrameTime: 0.201 ms
[buffer] columns=200:interleave=false:update-dispersion=0.9:update-fraction=0.5:update-method=map: FPS: 323 FrameTime: 3.097 ms
[buffer] columns=200:interleave=false:update-dispersion=0.9:update-fraction=0.5:update-method=subdata: FPS: 372 FrameTime: 2.692 ms
[buffer] columns=200:interleave=true:update-dispersion=0.9:update-fraction=0.5:update-method=map: FPS: 590 FrameTime: 1.697 ms
[ideas] speed=duration: FPS: 2439 FrameTime: 0.410 ms
[jellyfish] <default>: FPS: 5776 FrameTime: 0.173 ms
[terrain] <default>: FPS: 372 FrameTime: 2.690 ms
[shadow] <default>: FPS: 5714 FrameTime: 0.175 ms
[refract] <default>: FPS: 741 FrameTime: 1.350 ms
[conditionals] fragment-steps=0:vertex-steps=0: FPS: 7367 FrameTime: 0.136 ms
[conditionals] fragment-steps=5:vertex-steps=0: FPS: 6874 FrameTime: 0.145 ms
[conditionals] fragment-steps=0:vertex-steps=5: FPS: 8116 FrameTime: 0.123 ms
[function] fragment-complexity=low:fragment-steps=5: FPS: 8795 FrameTime: 0.114 ms
[function] fragment-complexity=medium:fragment-steps=5: FPS: 8811 FrameTime: 0.114 ms
[loop] fragment-loop=false:fragment-steps=5:vertex-steps=5: FPS: 8676 FrameTime: 0.115 ms
[loop] fragment-steps=5:fragment-uniform=false:vertex-steps=5: FPS: 7737 FrameTime: 0.129 ms
[loop] fragment-steps=5:fragment-uniform=true:vertex-steps=5: FPS: 8345 FrameTime: 0.120 ms
=======================================================
                                  glmark2 Score: 5844 
=======================================================

```

</Collapsible>

-   **Vulkan Support:** VKmark tests scored 1.6 times higher than the Q6A.

<p align="center">
  <img src="/static/images/2026/radxa-dragon-q8b/vkmark.webp" alt="vkmark" />
</p>

<Collapsible title="Detailed vkmark Test Results">

```shell 
radxa@radxa-dragon-q8b:~/vkmark$ vkmark --winsys wayland
=======================================================
    vkmark 2025.01
=======================================================
    Vendor ID:      0x5143
    Device ID:      0x6090000
    Device Name:    Turnip Adreno (TM) 690
    Driver Version: 109051907
    Device UUID:    bfd99d17a715516ca75c13274a3b0582
=======================================================
[vertex] device-local=true: FPS: 5601 FrameTime: 0.179 ms
[vertex] device-local=false: FPS: 5961 FrameTime: 0.168 ms
[texture] anisotropy=0: FPS: 4285 FrameTime: 0.233 ms
[texture] anisotropy=16: FPS: 4312 FrameTime: 0.232 ms
[shading] shading=gouraud: FPS: 4500 FrameTime: 0.222 ms
[shading] shading=blinn-phong-inf: FPS: 3942 FrameTime: 0.254 ms
[shading] shading=phong: FPS: 3963 FrameTime: 0.252 ms
[shading] shading=cel: FPS: 4607 FrameTime: 0.217 ms
[effect2d] kernel=edge: FPS: 11571 FrameTime: 0.086 ms
[effect2d] kernel=blur: FPS: 8210 FrameTime: 0.122 ms
[desktop] <default>: FPS: 7182 FrameTime: 0.139 ms
[cube] <default>: FPS: 13496 FrameTime: 0.074 ms
[clear] <default>: FPS: 16890 FrameTime: 0.059 ms
=======================================================
                                   vkmark Score: 7270
=======================================================

```
</Collapsible>

<div className="image-flex">
  <img src="/static/images/2026/radxa-dragon-q8b/chipset.webp" alt="chipset" />
</div>

## Blazing Fast CPU & Memory

You want raw processing power? The Dragon Q8B delivers.

-   **Sysbench:** Calculated prime numbers up to 20,000 in just 10 seconds, processing ~9,100 requests per second. (6 seconds faster than the Q6A).


<p align="center">
  <img src="/static/images/2026/radxa-dragon-q8b/sysbench.webp" alt="sysbench" />
</p>

<Collapsible title="Detailed Sysbench Test Results">

```shell 
radxa@radxa-dragon-q8b:~$ sysbench cpu --cpu-max-prime=20000 --threads=8 --time=0 --events=100000 run
sysbench 1.0.20 (using system LuaJIT 2.1.1761786044)

Running the test with following options:
Number of threads: 8
Initializing random number generator from current time


Prime numbers limit: 20000

Initializing worker threads...

Threads started!

CPU speed:
    events per second:  9183.24

General statistics:
    total time:                          10.8882s
    total number of events:              100000

Latency (ms):
         min:                                    0.78
         avg:                                    0.87
         max:                                    6.49
         95th percentile:                        0.95
         sum:                                87078.54

Threads fairness:
    events (avg/stddev):           12500.0000/1289.68
    execution time (avg/stddev):   10.8848/0.00
```
</Collapsible>


-   **Geekbench:** High single and multi-core scores. Multi-core performance doubled that of the Q6A.

<p align="center">
  <img src="/static/images/2026/radxa-dragon-q8b/geekbench.webp" alt="geekbench" />
</p>

Geekbench Scores : [here](https://browser.geekbench.com/v6/cpu/18432369) 

-   **Memory Bandwidth:** The 128-bit LPDDR4X RAM peaked at 16,700 MiB/s for memory copies and 8,700 MiB/s for block copies.


<p align="center">
  <img src="/static/images/2026/radxa-dragon-q8b/mbw.webp" alt="mbw" />
</p>

<Collapsible title="Detailed Memory Bandwidth Test Results">

```shell 
radxa@radxa-dragon-q8b:~$ mbw -b 1024 1024
Long uses 8 bytes. Allocating 2*134217728 elements = 2147483648 bytes of memory.
Using 1024 bytes as blocks for memcpy block copy test.
Getting down to business... Doing 10 runs per test.
0       Method: MEMCPY  Elapsed: 0.06127        MiB: 1024.00000 Copy: 16712.910 MiB/s
1       Method: MEMCPY  Elapsed: 0.06112        MiB: 1024.00000 Copy: 16754.475 MiB/s
2       Method: MEMCPY  Elapsed: 0.06127        MiB: 1024.00000 Copy: 16711.819 MiB/s
3       Method: MEMCPY  Elapsed: 0.06129        MiB: 1024.00000 Copy: 16707.456 MiB/s
4       Method: MEMCPY  Elapsed: 0.06121        MiB: 1024.00000 Copy: 16729.293 MiB/s
5       Method: MEMCPY  Elapsed: 0.06078        MiB: 1024.00000 Copy: 16848.479 MiB/s
6       Method: MEMCPY  Elapsed: 0.06112        MiB: 1024.00000 Copy: 16752.556 MiB/s
7       Method: MEMCPY  Elapsed: 0.06118        MiB: 1024.00000 Copy: 16737.222 MiB/s
8       Method: MEMCPY  Elapsed: 0.06071        MiB: 1024.00000 Copy: 16867.907 MiB/s
9       Method: MEMCPY  Elapsed: 0.06021        MiB: 1024.00000 Copy: 17006.294 MiB/s
AVG     Method: MEMCPY  Elapsed: 0.06102        MiB: 1024.00000 Copy: 16782.346 MiB/s
0       Method: DUMB    Elapsed: 0.06732        MiB: 1024.00000 Copy: 15210.933 MiB/s
1       Method: DUMB    Elapsed: 0.06621        MiB: 1024.00000 Copy: 15464.774 MiB/s
2       Method: DUMB    Elapsed: 0.06637        MiB: 1024.00000 Copy: 15428.658 MiB/s
3       Method: DUMB    Elapsed: 0.06661        MiB: 1024.00000 Copy: 15373.067 MiB/s
4       Method: DUMB    Elapsed: 0.06652        MiB: 1024.00000 Copy: 15393.172 MiB/s
5       Method: DUMB    Elapsed: 0.06639        MiB: 1024.00000 Copy: 15424.010 MiB/s
6       Method: DUMB    Elapsed: 0.06624        MiB: 1024.00000 Copy: 15459.404 MiB/s
7       Method: DUMB    Elapsed: 0.06681        MiB: 1024.00000 Copy: 15326.817 MiB/s
8       Method: DUMB    Elapsed: 0.06577        MiB: 1024.00000 Copy: 15570.592 MiB/s
9       Method: DUMB    Elapsed: 0.06614        MiB: 1024.00000 Copy: 15482.544 MiB/s
AVG     Method: DUMB    Elapsed: 0.06644        MiB: 1024.00000 Copy: 15412.843 MiB/s
0       Method: MCBLOCK Elapsed: 0.11693        MiB: 1024.00000 Copy: 8757.751 MiB/s
1       Method: MCBLOCK Elapsed: 0.11667        MiB: 1024.00000 Copy: 8776.742 MiB/s
2       Method: MCBLOCK Elapsed: 0.11646        MiB: 1024.00000 Copy: 8793.021 MiB/s
3       Method: MCBLOCK Elapsed: 0.11682        MiB: 1024.00000 Copy: 8765.247 MiB/s
4       Method: MCBLOCK Elapsed: 0.11672        MiB: 1024.00000 Copy: 8773.207 MiB/s
5       Method: MCBLOCK Elapsed: 0.11681        MiB: 1024.00000 Copy: 8766.748 MiB/s
6       Method: MCBLOCK Elapsed: 0.11631        MiB: 1024.00000 Copy: 8804.058 MiB/s
7       Method: MCBLOCK Elapsed: 0.11638        MiB: 1024.00000 Copy: 8798.687 MiB/s
8       Method: MCBLOCK Elapsed: 0.11666        MiB: 1024.00000 Copy: 8777.494 MiB/s
9       Method: MCBLOCK Elapsed: 0.11661        MiB: 1024.00000 Copy: 8781.483 MiB/s
AVG     Method: MCBLOCK Elapsed: 0.11664        MiB: 1024.00000 Copy: 8779.420 MiB/s
```
</Collapsible>

<div className="image-flex">
  <img src="/static/images/2026/radxa-dragon-q8b/e-key.webp" alt="e-key" />
  <img src="/static/images/2026/radxa-dragon-q8b/fpc.webp" alt="e-key" />
</div>


## Cool Temperatures & Low Power Consumption

Despite all this power, the board stays remarkably cool and energy-efficient.

-   **Temperatures:** Idles at a chilly **36°C**. After 10 minutes of stress testing, it never peaked above **54°C** thanks to the included heatsink and fan.
    
-   **Power Draw:** Consumes just **4 Watts** at idle. Under maximum Geekbench load, it peaked at only **20 Watts**.
    

<div className="image-flex">
  <img src="/static/images/2026/radxa-dragon-q8b/top-view.webp" alt="top-view" />
</div>

## Storage & Transfer Speeds

Having dual M.2 NVMe slots is an absolute game-changer for homelab servers. Here are the read speeds you can expect:

-   **NVMe Slot 1 (Gen3 x4):** ~2,800 MB/s.
    
-   **NVMe Slot 2 (Gen3 x2):** ~1,300 MB/s.
    
-   **PCIe FPC Connector (via NVMe HAT):** ~721 MB/s.
    
-   **USB 3.2 Gen 2 (via USB-to-NVMe adapter):** ~880 MB/s write speeds (copied 53GB in under 60 seconds).


<div className="image-flex">
  <img src="/static/images/2026/radxa-dragon-q8b/back.webp" alt="chipset" />
  <img src="/static/images/2026/radxa-dragon-q8b/port.webp" alt="chipset" />
</div>

 

## Next-Level Local AI & Home Assistant

If you are running smart home setups or local LLMs, this SBC is a powerhouse.

-   **Home Assistant (Docker):** Using the Whisper **small-int8** model for local voice assistance, speech-to-text converted in under 2 seconds.

<p align="center">
  <img src="/static/images/2026/radxa-dragon-q8b/whisper.webp" alt="whisper" />
</p>


-   **Ollama (Raw CPU):** Running the Gemma 4B (12B parameter) model on raw CPU power gave 19 tokens/sec for prompt evaluation and 3.5 tokens/sec for generation.
    
-   **Qualcomm NPU (29 TOPS):** Radxa provides a guide to run the Llama 3.2 1B model via the NPU using Alibaba's ModelScope. The results? A massive **264 tokens/sec** prompt processing rate and **21 tokens/sec** generation rate.
    

## Final Verdict: Should You Buy It?

I am incredibly impressed by the overall performance of this board.

If you are debating buying a 16GB Raspberry Pi 5 (which will cost you around €300), you should seriously consider the Radxa Dragon Q8B instead. For roughly €290 on Arace (or ~€380 on AliExpress) for the 16GB RAM variant, you get dual NVMe slots, dual 2.5GbE networking, and a built-in AI NPU that absolutely crushes edge computing tasks.

<div className="image-flex">
  <img src="/static/images/2026/radxa-dragon-q8b/stand-1.webp" alt="stand-1" />
  <img src="/static/images/2026/radxa-dragon-q8b/front-2.webp" alt="front-2" />
</div>

<AffiliateLinksFromMetadata />