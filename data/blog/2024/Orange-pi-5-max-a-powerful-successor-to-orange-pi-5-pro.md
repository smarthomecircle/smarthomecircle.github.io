---
title: 'Exploring the Orange Pi 5 MAX: A Powerful Successor to the Orange Pi 5 Pro'
author: 'Amrut Prabhu'
categories: ''
tags: [SBC, Orange pi, Orange pi 5, Orange pi 5 max]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2024-09-25'
draft: false
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

## Conclusion: A Capable Competitor to Raspberry Pi 5

The Orange Pi 5 MAX offers significant improvements over its predecessor and strong competition to the Raspberry Pi 5. With built-in support for PCIe Gen 3, faster NVMe speeds, and excellent multi-core performance, it’s an excellent option for those looking to build home servers, NAS devices, or home automation systems.

If you're interested in purchasing the Orange Pi 5 MAX, you can find it on [AliExpress](https://s.click.aliexpress.com/e/_De07TWt) or [Amazon](https://amzn.to/4gAEOw4). I’ll be making another video soon to demonstrate its AI capabilities, including the 6 TOPs NPU.

If you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**Create a NAS with Raspberry Pi 5**](https://smarthomecircle.com/create-nas-with-raspberry-pi-5)
-   [**Create Custom Wake Word For Your Voice Assistant**](https://smarthomecircle.com/custom-wake-word-for-voice-assistant-with-home-assistant)
-   [**Share Files With Home Assistant OS with Samba Share**](https://smarthomecircle.com/easily-share-files-with-home-assistant-using-samba-share)

