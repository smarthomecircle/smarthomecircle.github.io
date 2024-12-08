---
title: 'Radxa X4: 60$ Powerful Atlernative to Raspberry Pi 5'
author: 'Amrut Prabhu'
categories: ''
tags: [Radxa, SBC, Windows, Linux,  Home Assistant, whisper, piper]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2024-11-07'
draft: false
summary: 'Radxa X4, A New Intel-Based Single Board Computer: Features, Performance, and Use Cases'
imageUrl: /static/images/2024/radxa-x4-sbc/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/IiDMtrdSGsg"

---
<TOCInline toc={props.toc} asDisclosure />  


In the world of single-board computers (SBCs), there’s an intriguing new player i.e the [Radxa X4](https://s.click.aliexpress.com/e/_DkuskjB) —an Intel-based board that’s almost the same size as a Raspberry Pi. Powered by the Intel N100 processor, this board packs an impressive punch, reaching speeds up to 3.4 GHz. 

![radxa-x4](/static/images/2024/radxa-x4-sbc/intel-n100.webp)

Since it’s built on x86 architecture, it offers broad compatibility with various Linux distributions and can even run Windows. With a full BIOS, users can modify settings just like on a traditional desktop. But the most surprising feature? It’s nearly the same size as the Raspberry Pi 5, even fitting snugly into the official Pi 5 case, with just a slight overhang.

Let’s take a closer look at this board's performance and potential uses.

### Performance on Windows and Linux

First, I installed Windows 11 and drivers from Radxa’s site. The setup ran smoothly, and general tasks performed well, giving a near-desktop experience. Streaming was also surprisingly fluid: Full HD YouTube videos played without a hitch, and even 4K videos streamed smoothly, with no dropped frames. Graphics-intensive tasks were similarly impressive on Windows. 

For instance, while running WebGL, the board maintained 60 frames per second (fps) with up to 10,000 elements, although it did drop at 15,000. Testing this on Ubuntu, I found that 5,000 elements held steady at 60 fps, with performance dipping at 10,000—an indication that graphics rendering performs better on Windows.

![radxa-x4](/static/images/2024/radxa-x4-sbc/webgl.webp)

### Pushing the CPU: Thermal Performance and Modifications

Next, I ran a CPU stress test with CPU-Z, and I noticed thermal throttling started at around 64°C. The N100’s thermal limit is 85°C, so I adjusted the board’s power limit in the BIOS from 6 watts to 12.5 watts. This helped delay throttling, although temperatures did continue to rise. Using Sysbench on Ubuntu, I saw similar results. 

![radxa-x4](/static/images/2024/radxa-x4-sbc/cpu-temperatures.webp)

To improve cooling, I swapped the thermal pad for a copper shim and thermal paste, then re-ran the stress test. This change made a significant difference: on Windows, the CPU stayed under 54°C without throttling, and on Ubuntu, it remained below 48°C.

![radxa-x4](/static/images/2024/radxa-x4-sbc/thermal-paste.webp)

### Benchmarking Performance: Geekbench and Power Usage

In Geekbench tests, this board demonstrated impressive performance, scoring about 30% higher in single-core performance than both the Raspberry Pi 5 and the Orange Pi 5 Max. In multi-core tests, it outperformed the Raspberry Pi 5 by 60% and matched the Orange Pi 5 Max, which has eight cores. 

![radxa-x4](/static/images/2024/radxa-x4-sbc/geekbench-comparison.webp)

Interestingly, running Geekbench on Ubuntu gave slightly better results than on Windows. The board’s power consumption maxed out around 18 watts during these benchmarks.

![radxa-x4](/static/images/2024/radxa-x4-sbc/geekbench-ubuntu.webp)

### Storage and Memory Testing

When testing NVMe storage speeds, I achieved read and write speeds of 3200 MB/s on Windows, although speeds were slightly lower on Linux, at 2200 MB/s. This difference could be due to system optimizations, so I’ll continue to investigate. 

![radxa-x4](/static/images/2024/radxa-x4-sbc/nvme-performance.webp)

The memory bandwidth test produced around 4800 MiB/s for memory copy and about 7000 MiB/s for block copy.

### Real-World Applications and Use Cases

The board’s capabilities make it ideal for various applications. For example, I set up Home Assistant for smart home automation, adding Whisper for speech-to-text and Piper for text-to-speech. Using the small-int8 model, Whisper translated commands in under 3 seconds—faster than both the Orange Pi 5 Max (4.5 seconds) and Raspberry Pi 5 (14 seconds). 

![radxa-x4](/static/images/2024/radxa-x4-sbc/voice-assistant-performance.webp)

At idle, the board consumes around 7 watts with the NVMe and fan running, which is manageable for always-on applications.

Beyond home automation, the board’s x86 architecture opens a range of possibilities:

-   **Network Attached Storage (NAS)**: Using OpenMediaVault, you can create a high-speed, low-cost NAS server.
-   **Virtualization**: With Proxmox, the board can handle multiple virtual machines, offering a flexible testing or server environment.
-   **Desktop Use**: It’s suitable for general computing, web browsing, and light media consumption, with potential for light gaming.

### Some Limitations to Consider

While powerful, the board does come with a few caveats:

1.  **Higher Power Consumption**: The idle power usage (7-8 watts) is roughly double that of ARM-based SBCs like the Raspberry Pi 5, which idles around 3-4 watts. This extra power usage may impact users aiming for ultra-low-energy setups.
    
2.  **Memory Bus Limitation**: Due to its compact design, the board uses a 32-bit memory bus instead of the full 64-bit bus that LPDDR5 RAM can support. This limits the maximum potential memory bandwidth.
    
3.  **Non-Adjustable Fan**: The fan runs at full speed continuously, regardless of the board’s temperature, which could affect noise levels in quieter setups.
    

### Final Thoughts and Pricing

For around [€57 for the 4 GB RAM model and €75 for the 8 GB version](https://s.click.aliexpress.com/e/_DkuskjB), this board is a competitive choice compared to the Raspberry Pi 5, especially considering its Intel-based x86 CPU. Radxa’s upcoming X4L version is expected to add more features, which I’ll cover in future reviews.

This board is ideal for those looking for a flexible, powerful, and nearly pocket-sized x86 system. Its potential use cases—from home automation to light desktop computing—are broad, making it a strong alternative in the SBC market.

If you enjoy my content and want to support the channel, consider [buying me a coffee](https://buymeacoffee.com/amrutprabhu).

Thanks for following along, and happy building!

-   [**Create a NAS with Raspberry Pi 5**](https://smarthomecircle.com/create-nas-with-raspberry-pi-5)
-   [**Create Custom Wake Word For Your Voice Assistant**](https://smarthomecircle.com/custom-wake-word-for-voice-assistant-with-home-assistant)
-   [**Share Files With Home Assistant OS with Samba Share**](https://smarthomecircle.com/easily-share-files-with-home-assistant-using-samba-share)
-   [**Orange Pi 5 MAX: A Powerful Successor to the Orange Pi 5 Pro**](https://smarthomecircle.com/Orange-pi-5-max-a-powerful-successor-to-orange-pi-5-pro)

