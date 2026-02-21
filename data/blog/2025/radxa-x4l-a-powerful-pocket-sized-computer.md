---
title: 'Radxa X4L: A Pocket-Sized Powerhouse'
author: 'Amrut Prabhu'
categories: ''
tags: [Radxa, SBC, Windows, Linux,  Home Assistant, whisper, piper]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2025-05-05'
autoAds: true
draft: false
summary: 'A powerful pocket-sized PC featuring the Intel N100 processor, dual 32-bit LPDDR5 memory channels, and versatile OS support. Ideal for home automation, virtualization, and portable computing.'
imageUrl: /static/images/2024/radxa-x4l/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/5ARf0nh62rU"
affiliateLinks:
  title: Buy Radxa X4L
  links: 
    - label: "AliExpress"
      url: "https://s.click.aliexpress.com/e/_c4PLU5mT"
    - label: "Arace"
      url: "https://arace.tech/products/palmshell-slim-x4l?_pos=1&_psq=x4l&_ss=e&_v=1.0"

includeAsSBC:
  title: "Radxa X4L"
  price: $ 135+
  url: "https://palmshell.io/slim-x4l"
  specifications:
    SoC: Intel N100 (Alder Lake-N)
    CPU:
      No. Of Cores: 4
      Cores: |
        4 Cores / 4 Threads
        Base Frequency: 2.0 GHz
        Max Turbo Frequency: 3.4 GHz
    GPU:
      Model: Intel UHD Graphics
      Support: |
        OpenGL 4.6
        OpenCL 3.0
        DirectX 12.1
    AI Capabilities: CPU ONly
    RAM:
      Size: 8GB / 16GB / 32GB
      Type: LPDDR5
      Speed: 4800 MT/s
      Bus: Dual 32-bit
    Storage: |
      1 x M.2 M Key for NVMe SSD
    Video Output: |
      2 × HDMI 2.0 up to dual 4K@60fps support
    NVMe:
        Onboard: Yes
        Number Of Connectors: 1
        Connectivity: PCIe Gen 3 x 4
        Size: 2280
    Network:
      Ethernet: 1 × 2.5 Gigabit RJ45 port
      WiFi: Wi-Fi 6
      Bluetooth: Bluetooth 5.2
    PoE: Yes (PoE HAT required)
    USB: |
      3 × USB 3.0
      1 × USB 2.0
    Power: 12V/3A direct or USB PD (Power Delivery)
    Audio: 1× 3.5mm jack, support audio input/output
    Camera: 
    Cooling: |
      Passive or via GPIO pins
    Dimensions:
    Other Expansion Capabilities:
    # Others: |
    #   1 × Power Button
    #   1 × Recovery Button
    #   1 × Status LED
    #   1 × Kensington Lock
    Operating System: |
      [Debian](https://www.debian.org/distrib/) 
      [Ubuntu](https://ubuntu.com/download/desktop)
      [Fedora Linux](https://www.fedoraproject.org/)
      Windows 11


suggestedArticles:
  - title: "Radxa X4: 60$ Powerful Atlernative to Raspberry Pi 5"
    url: "https://smarthomecircle.com/radxa-x4-alternative-to-raspberry-pi-5"
  - title: "Create a NAS with Raspberry Pi 5"
    url: "https://smarthomecircle.com/create-nas-with-raspberry-pi-5"
  - title: "Create Custom Wake Word For Your Voice Assistant"
    url: "https://smarthomecircle.com/custom-wake-word-for-voice-assistant-with-home-assistant"
  - title: "Orange Pi 5 MAX: A Powerful Successor to the Orange Pi 5 Pro"
    url: "https://smarthomecircle.com/Orange-pi-5-max-a-powerful-successor-to-orange-pi-5-pro"
---
<TOCInline toc={props.toc} asDisclosure />  

Radxa has recently launched the **X4L**, the successor to their popular X4. Marketed as a portable PC that fits in your pocket, the X4L offers a suite of features aimed at enhancing functionality and performance for tech enthusiasts and professionals alike. Here’s an in-depth look at what this device provides, its benchmarks, and potential use cases.

![Board-view](/static/images/2024/radxa-x4l/Board-view-1.webp)

**Links to buy Radxa X4L:**
- **AliExpress** : https://s.click.aliexpress.com/e/_DESXdqh
- **Arace** : https://arace.tech/products/palmshell-slim-x4l
----------


## Technical Specifications

<SpecificationsDisplay/>

## Key Features and Specifications

The **X4L** is noticeably larger than its predecessor, being roughly **twice the size of the X4** and weighing around **289 grams**. Both models are powered by the **Intel N100 processor**, a quad-core x86 chip capable of clock speeds up to **3.4 GHz**, making them compatible with a variety of operating systems, including Windows and Linux.

## Improved Hardware:

-   **Dual 32-bit memory bus**: The X4L now utilizes dual 32-bit channels to fully leverage its **LPDDR5 RAM**, a significant improvement over the X4’s single-channel design.
    
    ![Board-view](/static/images/2024/radxa-x4l/dual-32-bit.webp)

-   **Enhanced cooling**: A temperature-controlled CPU fan has been added, with adjustable settings in the BIOS for optimized performance.
-   **PCI Express 3.0 support**: Confirmed through testing, this allows faster NVMe and peripheral performance.

----------

## Recovery and Installation: The Power of Roobi

The X4L comes pre-installed with **Roobi**, a recovery installer developed by Radxa. This network installer simplifies the setup process by eliminating the need for bootable disks.

![roobi](/static/images/2024/radxa-x4l/roobi.webp)

-   **How it works**: Connect a LAN cable, press the recovery button, and access the installer at `roobi.local` from any device.
-   **Supported OS options**: OpenWRT, Ubuntu, Windows 10, and Fedora can be installed remotely.
-   **Out-of-the-box experience**: Testing with Windows 10 revealed all drivers were pre-installed, streamlining the setup process.

----------

## Performance Testing

### Memory and Storage:

-   **Memory architecture**: The X4L’s dual 32-bit channels boost memory performance by up to **35% for memory copy operations** compared to the X4.
    
    ![mbw-test](/static/images/2024/radxa-x4l/mbw-test.webp)
    

-   **NVMe performance**:
    -  **Windows**: 3400 MB/s (read speed).
    - **Ubuntu**: 2400 MB/s (read speed).

### Power Consumption
- At Idle, the X4L sips about 10 Watts of energy. While I was running a stress test, the power consumption went up to 21 Watts of energy.

### Ethernet Speeds:

-   The **2.5 Gigabit Ethernet port** achieved speeds of up to **2300 MB/s** during iPerf3 testing.

### Stress Testing:

-   **Windows**: Under load, temperatures reached **90°C**, triggering minor CPU throttling. Prolonged stress pushed it to **100°C**, primarily affecting the bottom metal plate.
-   **Ubuntu**: Performed better, with temperatures peaking at **95°C** during prolonged stress without throttling.

### Benchmark Results:

-   **Geekbench**: Scored ~10% better than the X4 on Windows; no significant difference on Ubuntu.
    - Scores on [Windows](https://browser.geekbench.com/v6/cpu/8901652) and [Linux](https://browser.geekbench.com/v6/cpu/8899835)
-   **Tiny MemBench**: The X4L showed improvements across the board compared to the X4:

    -   **C copy**: +30%
    -   **C fill**: +16%
    -   **Standard memcpy**: +23%
    -   **Standard memset**: +21%
    <details>
        <summary>Tiny Membench Score Details (Expand)</summary>

        ```shell
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

        C copy backwards                                     :   7110.9 MB/s (6.1%)
        C copy backwards (32 byte blocks)                    :   7100.4 MB/s (2.4%)
        C copy backwards (64 byte blocks)                    :   7128.2 MB/s
        C copy                                               :   6816.3 MB/s (0.8%)
        C copy prefetched (32 bytes step)                    :   4136.5 MB/s (2.2%)
        C copy prefetched (64 bytes step)                    :   4280.4 MB/s
        C 2-pass copy                                        :   6055.5 MB/s
        C 2-pass copy prefetched (32 bytes step)             :   3142.8 MB/s
        C 2-pass copy prefetched (64 bytes step)             :   3141.7 MB/s (0.1%)
        C fill                                               :   8894.8 MB/s
        C fill (shuffle within 16 byte blocks)               :   8928.3 MB/s (0.2%)
        C fill (shuffle within 32 byte blocks)               :   8919.1 MB/s (3.2%)
        C fill (shuffle within 64 byte blocks)               :   8906.1 MB/s (0.2%)
        ---
        standard memcpy                                      :   9620.9 MB/s
        standard memset                                      :   9253.6 MB/s (0.3%)
        ---
        MOVSB copy                                           :   7101.1 MB/s
        MOVSD copy                                           :   7097.0 MB/s
        SSE2 copy                                            :   7100.3 MB/s
        SSE2 nontemporal copy                                :   9798.7 MB/s
        SSE2 copy prefetched (32 bytes step)                 :   5836.6 MB/s
        SSE2 copy prefetched (64 bytes step)                 :   6093.5 MB/s
        SSE2 nontemporal copy prefetched (32 bytes step)     :   6809.2 MB/s
        SSE2 nontemporal copy prefetched (64 bytes step)     :   7234.2 MB/s (0.2%)
        SSE2 2-pass copy                                     :   5725.8 MB/s (0.1%)
        SSE2 2-pass copy prefetched (32 bytes step)          :   4133.2 MB/s (0.2%)
        SSE2 2-pass copy prefetched (64 bytes step)          :   4267.9 MB/s
        SSE2 2-pass nontemporal copy                         :   2868.6 MB/s
        SSE2 fill                                            :   9249.8 MB/s (0.3%)
        SSE2 nontemporal fill                                :  19631.3 MB/s (0.3%)

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
            65536 :    2.5 ns          /     3.7 ns 
            131072 :    3.8 ns          /     4.7 ns 
            262144 :    5.1 ns          /     6.0 ns 
            524288 :    6.4 ns          /     7.2 ns 
        1048576 :    7.1 ns          /     7.5 ns 
        2097152 :    7.9 ns          /     8.2 ns 
        4194304 :   14.0 ns          /    17.3 ns 
        8388608 :   35.5 ns          /    53.1 ns 
        16777216 :   95.7 ns          /   138.6 ns 
        33554432 :  132.3 ns          /   173.5 ns 
        67108864 :  152.0 ns          /   187.9 ns 

        block size : single random read / dual random read, [MADV_HUGEPAGE]
            1024 :    0.0 ns          /     0.0 ns 
            2048 :    0.0 ns          /     0.0 ns 
            4096 :    0.0 ns          /     0.0 ns 
            8192 :    0.0 ns          /     0.0 ns 
            16384 :    0.0 ns          /     0.0 ns 
            32768 :    0.0 ns          /     0.0 ns 
            65536 :    2.5 ns          /     3.7 ns 
            131072 :    3.8 ns          /     4.7 ns 
            262144 :    4.4 ns          /     4.9 ns 
            524288 :    4.7 ns          /     5.0 ns 
        1048576 :    4.9 ns          /     5.0 ns 
        2097152 :    5.3 ns          /     5.3 ns 
        4194304 :   11.3 ns          /    14.4 ns 
        8388608 :   30.7 ns          /    46.5 ns 
        16777216 :   87.4 ns          /   128.3 ns 
        33554432 :  121.6 ns          /   156.4 ns 
        67108864 :  137.7 ns          /   165.2 ns 
        ```
    </details>

    <br/>
    ![tinymembenchscore](/static/images/2024/radxa-x4l/TinyMembenchscores.webp)

- Whisper Speech To Text Conversion

    ![whisper](/static/images/2024/radxa-x4l/whisper.webp)

----------

## Practical Use Cases

The X4L excels in versatility, making it suitable for a range of applications:

1.  **Home Automation**: Running Home Assistant with local voice assistants like Whisper and Piper demonstrated noticeable performance improvements over the X4 and Raspberry Pi 5.
2.  **Portable PC**: Ideal for running Windows or Linux as a compact workstation.
3.  **Virtualization**: Supports Proxmox for managing virtual machines.
4.  **Network Storage**: Use OpenMediaVault for creating a network-attached storage (NAS) solution.

----------

## Hardware Expansion

The board features GPIO pin holes, and Radxa may release an optional **RP2040 module** for GPIO support, enabling broader functionality in IoT and automation projects.

![gpio-pins](/static/images/2024/radxa-x4l/gpio-pins.webp)

----------

## Final Thoughts and Benchmarks

The **Radxa X4L** builds on its predecessor’s strengths with improved memory bandwidth, enhanced thermal performance, and user-friendly recovery tools.


If you enjoyed reading this and want to see more like it:

-   ✅ **Subscribe** to the [YouTube channel](https://www.youtube.com/@SmartHomeCircle?sub_confirmation=1)
    
-   ☕ **Support my work** on [Patreon](https://patreon.com/AmrutPrabhu) or [Buy Me a Coffee](https://www.buymeacoffee.com/amrutprabhu)

Stay tuned for more content on home automation and tech reviews.
