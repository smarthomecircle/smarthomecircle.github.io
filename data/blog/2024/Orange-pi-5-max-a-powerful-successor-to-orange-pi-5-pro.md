---
title: 'Exploring the Orange Pi 5 MAX: A Powerful Successor to the Orange Pi 5 Pro'
author: 'Amrut Prabhu'
categories: ''
tags: [SBC, Orange pi, Orange pi 5, Orange pi 5 max]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2024-09-25'
draft: false
autoAds: true
summary: 'In this article we will look at the Orange Pi 5 MAX and compare it with the Raspberry Pi 5 in terms of performance'
imageUrl: /static/images/2024/orange-pi-5-max/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/OVam317j-bc"

---
<TOCInline toc={props.toc} asDisclosure />  

## Components

1.  Orange Pi 5 MAX.  
    -   [**Amazon (Affiliate Link)**](https://amzn.to/4gAEOw4)
    -   [**AliExpress (Affiliate Link)**](https://s.click.aliexpress.com/e/_De07TWt)
[![ orange-pi-5-max ](/static/images/components/orange-pi-5-max.webp)](https://amzn.to/4gAEOw4)

2.  Acrylic Case

 -   [**Amazon (Affiliate Link)**](https://amzn.to/4doQTkZ)
 -   [**AliExpress (Affiliate Link)**](https://s.click.aliexpress.com/e/_DmIKkdF)
[![orange-pi-5-max-case](/static/images/components/orange-pi-5-max-case.webp)](https://s.click.aliexpress.com/e/_DmIKkdF)


The Orange Pi 5 MAX is an exciting new single-board computer (SBC) that follows in the footsteps of its predecessor, the Orange Pi 5 Pro, while maintaining the same form factor as the Raspberry Pi 5. In this article, we'll dive into the details of the Orange Pi 5 MAX, exploring its various components, performance benchmarks, and practical use cases.

## Operating System Compatibility

Orange Pi offers a wide variety of operating systems for the 5 MAX, which can be downloaded directly from their [website](http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/service-and-support/Orange-Pi-5-Max.html). These include popular Linux distributions like Ubuntu, Debian, and Arch Linux, as well as an Android image. Additionally, there’s [Ubuntu for Rockchip](https://github.com/Joshua-Riek/ubuntu-rockchip), an open-source project that supports Rockchip SoCs, providing builds specifically for the [Orange Pi 5 MAX](https://joshua-riek.github.io/ubuntu-rockchip-download/boards/orangepi-5-max.html).

While I initially wanted to run Armbian Linux on this board, support for it isn't available yet. 

**Update: 26th Sept 2024**

A community build image is available. The desktop build is currently not working properly while the server build image works fine. But currently I haven't tested the entire build.

## Initial Setup and Desktop Performance

To get started, I installed the Debian image from Orange Pi onto a microSD card for testing. The overall desktop experience was quite smooth, with quick load times for web browsers, minimal lag when moving windows, and overall responsiveness.

![desktop](/static/images/2024/orange-pi-5-max/desktop.webp)

I tested media performance by running a 1080p YouTube video, which played smoothly after a few initial frame drops. Switching to 4K resolution yielded similarly smooth results, with no frame drops throughout playback.

![youtube](/static/images/2024/orange-pi-5-max/youtube-performance.webp)

Impressively, all of these tests were conducted without using a fan or heatsink, meaning the system ran completely silent.

## NVMe Performance

One of the highlights of the Orange Pi 5 MAX is its support for PCIe Gen 3 via a 2280 NVMe slot. After installing an NVMe drive in the M.2 M-key slot, I initially saw transfer speeds of around 220 MB/s. However, after formatting the drive with the Ext4 file system, the speeds jumped to 2,300 MB/s—nearly three times faster than the Raspberry Pi 5, which only supports PCIe Gen 2 with a single lane.

![nvme](/static/images/2024/orange-pi-5-max/nvme.webp)

Although I expected speeds closer to 3,900 MB/s, which is the theoretical maximum for PCIe Gen 3 with four lanes, I confirmed via the `lspci` command that the board was indeed running at PCIe Gen 3 speeds. The takeaway? The Orange Pi 5 MAX offers much faster NVMe speeds than its competitors, and you don’t need an additional hat to achieve them.

![lscpi](/static/images/2024/orange-pi-5-max/lscpi.webp)

## eMMC and Storage Testing

Next, I tested the eMMC module and observed transfer speeds around 300 MB/s—significantly faster than the 60 MB/s from the microSD card. This makes the eMMC a solid option for those seeking faster storage solutions on this SBC.

## Benchmark Testing

To evaluate the CPU, I ran several tests:

-   **Sysbench:** I used sysbench to calculate prime numbers up to 20,000. The board processed 5,300 events per second, completing 100,000 requests in just 19 seconds.

    ![sysbench](/static/images/2024/orange-pi-5-max/sysbench.webp)

-   **Geekbench:** In [Geekbench](https://browser.geekbench.com/v6/cpu/7763144) tests, the Orange Pi 5 MAX’s single-core performance was slightly lower than the Raspberry Pi 5, likely due to the 1.8 GHz Cortex-A55 core. However, the multi-core performance was 20% better than the Raspberry Pi 5, showcasing the strength of this board in multi-threaded tasks.
    
    ![geekbench](/static/images/2024/orange-pi-5-max/geekbench.webp)
-   **Power Consumption & Temperature:** The CPU’s temperature rose from 35°C to 60°C during these tests, with power consumption spiking from 2W at idle to 6W under full load. Notably, all tests were performed without a fan.

## Network Performance

I also tested the 2.5 Gigabit Ethernet port using **iperf3**, which achieved impressive speeds of around 2.3 Gbps for both sending and receiving data. This makes the Orange Pi 5 MAX ideal for applications that require high network throughput.

![ethernet](/static/images/2024/orange-pi-5-max/ethernet-speed.webp)

## Home Automation and Voice Assistant Testing

Given my interest in home automation, I set up Docker and ran Home Assistant on the board. It worked flawlessly, allowing easy access to the Home Assistant UI. I also tested voice assistants by running Whisper and Piper containers for speech-to-text conversion. The Orange Pi 5 MAX processed speech-to-text in 4 seconds, while the Raspberry Pi 5 took about 14 seconds using the same `small-int8` model. Using a smaller `tiny-int8` model, the 5 MAX completed the task in 1.2 seconds—twice as fast as the Raspberry Pi 5.

![home assistant](/static/images/2024/orange-pi-5-max/home-assistant.webp)

## GPIO and Fan Control

To test the GPIO pins, I used the provided `gpio` command and connected an LED, successfully toggling it using basic commands. 

![gpio](/static/images/2024/orange-pi-5-max/gpio.webp)

As for cooling, although I couldn’t find an official fan for the board, I used a fan from the Orange Pi 5 Plus to test its response. The fan kicked in once the CPU temperature exceeded 50°C and adjusted its speed according to temperature changes.

For optimal performance, I recommend using this board with a heatsink and a fan, especially if you plan to push the CPU to its limits.

## Memory Bandwidth Test 

Here is the output of 1 GB of memory bandwidth test. 

<details>
  <summary>Memory Bandwidth Test</summary>

    ```shell
    amrut@orangepi5-max:~$ mbw -s 1024 1000
    mbw: invalid option -- 's'
    Long uses 8 bytes. Allocating 2*134217728 elements = 2147483648 bytes of memory.
    Using 262144 bytes as blocks for memcpy block copy test.
    Getting down to business... Doing 10 runs per test.
    0       Method: MEMCPY  Elapsed: 0.10618        MiB: 1024.00000 Copy: 9643.728 MiB/s
    1       Method: MEMCPY  Elapsed: 0.10495        MiB: 1024.00000 Copy: 9757.306 MiB/s
    2       Method: MEMCPY  Elapsed: 0.10495        MiB: 1024.00000 Copy: 9757.120 MiB/s
    3       Method: MEMCPY  Elapsed: 0.10491        MiB: 1024.00000 Copy: 9760.561 MiB/s
    4       Method: MEMCPY  Elapsed: 0.10491        MiB: 1024.00000 Copy: 9760.933 MiB/s
    5       Method: MEMCPY  Elapsed: 0.10494        MiB: 1024.00000 Copy: 9757.771 MiB/s
    6       Method: MEMCPY  Elapsed: 0.10494        MiB: 1024.00000 Copy: 9757.492 MiB/s
    7       Method: MEMCPY  Elapsed: 0.10492        MiB: 1024.00000 Copy: 9759.631 MiB/s
    8       Method: MEMCPY  Elapsed: 0.10497        MiB: 1024.00000 Copy: 9754.982 MiB/s
    9       Method: MEMCPY  Elapsed: 0.10496        MiB: 1024.00000 Copy: 9756.469 MiB/s
    AVG     Method: MEMCPY  Elapsed: 0.10506        MiB: 1024.00000 Copy: 9746.477 MiB/s
    0       Method: DUMB    Elapsed: 0.08920        MiB: 1024.00000 Copy: 11479.692 MiB/s
    1       Method: DUMB    Elapsed: 0.09364        MiB: 1024.00000 Copy: 10935.965 MiB/s
    2       Method: DUMB    Elapsed: 0.08939        MiB: 1024.00000 Copy: 11455.548 MiB/s
    3       Method: DUMB    Elapsed: 0.08941        MiB: 1024.00000 Copy: 11452.217 MiB/s
    4       Method: DUMB    Elapsed: 0.09430        MiB: 1024.00000 Copy: 10858.500 MiB/s
    5       Method: DUMB    Elapsed: 0.09518        MiB: 1024.00000 Copy: 10758.563 MiB/s
    6       Method: DUMB    Elapsed: 0.09274        MiB: 1024.00000 Copy: 11041.741 MiB/s
    7       Method: DUMB    Elapsed: 0.08932        MiB: 1024.00000 Copy: 11464.013 MiB/s
    8       Method: DUMB    Elapsed: 0.08927        MiB: 1024.00000 Copy: 11470.305 MiB/s
    9       Method: DUMB    Elapsed: 0.08925        MiB: 1024.00000 Copy: 11474.032 MiB/s
    AVG     Method: DUMB    Elapsed: 0.09117        MiB: 1024.00000 Copy: 11231.691 MiB/s
    0       Method: MCBLOCK Elapsed: 0.06921        MiB: 1024.00000 Copy: 14794.908 MiB/s
    1       Method: MCBLOCK Elapsed: 0.06832        MiB: 1024.00000 Copy: 14989.387 MiB/s
    2       Method: MCBLOCK Elapsed: 0.06806        MiB: 1024.00000 Copy: 15045.990 MiB/s
    3       Method: MCBLOCK Elapsed: 0.06831        MiB: 1024.00000 Copy: 14990.923 MiB/s
    4       Method: MCBLOCK Elapsed: 0.06808        MiB: 1024.00000 Copy: 15040.686 MiB/s
    5       Method: MCBLOCK Elapsed: 0.06749        MiB: 1024.00000 Copy: 15172.843 MiB/s
    6       Method: MCBLOCK Elapsed: 0.06800        MiB: 1024.00000 Copy: 15059.045 MiB/s
    7       Method: MCBLOCK Elapsed: 0.06741        MiB: 1024.00000 Copy: 15189.723 MiB/s
    8       Method: MCBLOCK Elapsed: 0.06749        MiB: 1024.00000 Copy: 15172.618 MiB/s
    9       Method: MCBLOCK Elapsed: 0.06758        MiB: 1024.00000 Copy: 15152.412 MiB/s
    AVG     Method: MCBLOCK Elapsed: 0.06799        MiB: 1024.00000 Copy: 15059.975 MiB/s
    ```

</details>

## Conclusion: A Capable Competitor to Raspberry Pi 5

The Orange Pi 5 MAX offers significant improvements over its predecessor and strong competition to the Raspberry Pi 5. With built-in support for PCIe Gen 3, faster NVMe speeds, and excellent multi-core performance, it’s an excellent option for those looking to build home servers, NAS devices, or home automation systems.

If you're interested in purchasing the Orange Pi 5 MAX, you can find it on [AliExpress](https://s.click.aliexpress.com/e/_De07TWt) or [Amazon](https://amzn.to/4gAEOw4). I’ll be making another video soon to demonstrate its AI capabilities, including the 6 TOPs NPU.

If you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**Create a NAS with Raspberry Pi 5**](https://smarthomecircle.com/create-nas-with-raspberry-pi-5)
-   [**Create Custom Wake Word For Your Voice Assistant**](https://smarthomecircle.com/custom-wake-word-for-voice-assistant-with-home-assistant)
-   [**Share Files With Home Assistant OS with Samba Share**](https://smarthomecircle.com/easily-share-files-with-home-assistant-using-samba-share)

