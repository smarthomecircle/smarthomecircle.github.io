---
title: 'Radxa Rock 5T'
author: 'Amrut Prabhu'
categories: ''
tags: [Raspberry Pi, CM5, Compute Module, Compute Module 5, open media vault,NAS, Raid 5]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2025-02-13'
draft: false
summary: 'Build a DIY NAS using Raspberry Pi Compute Module 5, NVMe to SATA adapter, and OpenMediaVault with RAID 5.'
imageUrl: /static/images/2024/diy-nas-cm5/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/5J-es6-DBU4"
slug: "raspberry-pi-5-review"
specs:
  SoC: >
    Rockchip RK3588
  CPU: |
    4 x Cortex®-A76 up to 2.4GHz
    4 x Cortex®-A55 up to 1.8GHz
  GPU:
    model: Arm® Mali™ G610MC4
    support: |
      Vulkan® 1.1, 1.2
      OpenGL® ES 3.2/2.0/1.1
      OpenCL® 1.1, 1.2 and 2.2
  NPU: Up to 6TOPs
  RAM:
    Type: LPDDR5
    Speed: 2400MT/s
    Bus: 64bit
  Video Output: |
    - 1 x HDMI 2.1 up to 8Kp60 
    - 1 x HDMI 2.1 up to 4Kp60 
    - 1 x USB Type C port DP up to 4Kp60
    - 1 x 4-lane MIPI DSI up to 1080p60
  Audio:
    - 1 x 3.5mm Headphone Jack with Microphone Input
  MicroSD Card Slot: Yes
  eMMC Support: Yes
  NVMe:
    Onboard: Yes
    Number Of Connectors: 2
    Type: M.2 M-key 
    Connectivity: PCIe 3.0 2-lane
    Size: 2280
  USB Ports: |
    1 x USB Type-C (USB 3.1 Gen1 OTG, DP up to 4Kp60)  
    2 x USB 3.1 Gen1 
    2 × USB 2.0
  Network:
    2 x 2.5 Gigabit Ethernet ports
  PoE Support: Yes (HAT Required)
  Wireless Connectivity: |
    1 x WiFi 6
    1 x Bluetooth 5.2
  Power Supply: |
    1 x 5525 DC Jack Port 12V Input
  GPIO: Yes

  Dimension: |
    Width: 82 mm
    Lenght: 110 mm 
  Operation System:
    Radxa OS:
      url: https://docs.radxa.com/en/rock5/rock5t/getting-started/download
    Ubuntu:
      url: https://ubuntu.com/download/raspberry-pi
  Extra Connectors: |
    1 x M.2 B Key Connector
    1 x SIM Card Socket
    1 x RTC battery connector
    1 x PWM fan connector


affiliateLinks:
  - label: "Amazon"
    url: "https://amzn.to/raspberrypi5"
  - label: "PiShop"
    url: "https://www.pishop.us/product/raspberry-pi-5"
---
<TOCInline toc={props.toc} asDisclosure />  

In this guide, we’ll walk through the process of creating a DIY Network-Attached Storage (NAS) system using a Raspberry Pi Compute Module 5 (CM5) and an NVMe to SATA adapter.

This adapter, equipped with the ASM1166 chip, supports six SATA connections, making it a versatile tool for this project. Let’s dive into the steps, challenges, and results.

----------

#### Components Used:

1.  **Raspberry Pi Compute Module 5**: A compact yet powerful computing module.

    ![sata adapater](/static/images/2024/diy-nas-cm5/cm5-front.webp)

    - **AliExpress** : https://s.click.aliexpress.com/e/_DdzGQGd
    - **ThePiHut** : https://thepihut.com/products/raspberry-pi-compute-module-5
    - **BerryBase** : https://www.berrybase.de/en/detail/019350e97c767050917125760299ebf0

2.  **NVMe to SATA Adapter**: Features the ASM1166 chip for connecting multiple SATA drives.

    ![sata adapater](/static/images/2024/diy-nas-cm5/sata-adapter.webp)

    - Amazon EU:          https://amzn.to/4fjHg8j
    - Amazon US:          https://amzn.to/3Bm0QmD
    - AliExpress  :          https://s.click.aliexpress.com/e/_olOqrGf
3.  **Acrylic HDD Rack Mount**: For neatly organizing hard drives.

    ![hdd rack](/static/images/2024/diy-nas-cm5/hdd-rack.webp)

    - Amazon EU:          https://amzn.to/3BuOMPY
    - Amazon US:          https://amzn.to/4iFN3rF
    - AliExpress  :          https://s.click.aliexpress.com/e/_olEubxz
4.  **SATA Power Supply Cable**: Powered by a DC adapter (7.5A, 12V).

    ![sata power supply](/static/images/2024/diy-nas-cm5/sata-power.webp)

    - AliExpress:           https://s.click.aliexpress.com/e/_ooaEC11
5.  **Hard Drives**: Used for creating the storage array.
    - Amazon EU:        https://amzn.to/3OZOzHs
    - Amazon US:        https://amzn.to/4ghjE5E

6.  **OpenMediaVault (OMV)**: Software for managing NAS.

----------

#### Installing the OS and Configurations

I installed Raspberry Pi OS Lite on the Compute Module 5. This OS is lightweight and ideal for running OpenMediaVault. (A detailed video guide on flashing the OS on the CM5 with eMMC storage is linked [here](https://smarthomecircle.com/how-to-install-os-on-raspberry-pi-compute-module-5-emmc-storage))

During the setup, I encountered an error related to the AHCI controller. After [some research](https://github.com/raspberrypi/linux/issues/6214#issuecomment-2246811573), I added the following to load the required overlays in the `config.txt` file and rebooted the system.

  ```properties
[all]  

# dtparam=pciex1  
# dtparam=pciex1_gen=3  
  
dtparam=pcie-32bit-dma-pi5  
dtoverlay=pciex1-compat-pi5,no-mip
```
This resolved the issue, and the drives were successfully recognized.

----------

#### Set Up OpenMediaVault and RAID 5

I have a detailed guide to setup Open Media Vault on a Raspberry Pi 5 [here](https://smarthomecircle.com/create-nas-with-raspberry-pi-5)

With OpenMediaVault installed, I accessed its UI to confirm the drives were detected. Using the multiple device plugin, I formatted the drives and set up RAID 5 for redundancy and performance.

RAID 5 allowed me to combine multiple drives into a single array while safeguarding data against single-drive failures. For detailed instructions, check out my video on setting up [OpenMediaVault and RAID 5](https://youtu.be/0AVOghLYEu8).

----------

#### Performance Testing

After exposing the NAS via SMB services, I tested the setup by transferring a large file over a LAN connection. The results were impressive:

-   Using the onboard Ethernet: ~110 MB/s.
-   With a 2.5 Gbps USB-to-Ethernet adapter: 130–140 MB/s.

While these speeds are solid for hard drives, my SSD-based NAS setup achieved faster speeds of ~200 MB/s.

----------

#### Power Consumption

Power consumption for the HDD-based NAS was measured:

-   **Idle**: ~21W.
-   **Peak Load**: ~34W.

In comparison, my SSD-based NAS consumed only ~9W at peak load, making it more energy-efficient for daily use. I plan to use the HDD NAS as a backup solution, automating it to replicate data from the SSD NAS and shut down afterward. This approach minimizes energy use and wear on the drives.

----------

#### Challenges and Solutions

1.  **NVMe to SATA Adapter Durability**: The adapter is fragile, requiring careful handling when connecting/disconnecting SATA cables.
2.  **Heat Generation**: Hard drives generate significant heat. A fan will be added to improve cooling, albeit at the cost of higher power consumption.

----------

#### Conclusion

This DIY NAS setup demonstrates the potential of the Raspberry Pi Compute Module 5 and the NVMe to SATA adapter. While it’s not as energy-efficient as SSD-based solutions, it offers a reliable backup system with decent performance.

For more innovative projects, subscribe to [my channel](https://www.youtube.com/@SmartHomeCircle).

If you’d like to support my work, consider [buying me a coffee](https://www.buymeacoffee.com/amrutprabhu) or contributing via [Patreon](https://patreon.com/AmrutPrabhu).

-   [**Create a NAS with Raspberry Pi 5**](https://smarthomecircle.com/create-nas-with-raspberry-pi-5)
-   [**Radxa X4: 60$ Powerful Atlernative to Raspberry Pi 5**](https://smarthomecircle.com/radxa-x4-alternative-to-raspberry-pi-5)
-   [**Install OS on Raspberry Pi Compute Module 5 with eMMC Storage**](https://smarthomecircle.com/how-to-install-os-on-raspberry-pi-compute-module-5-emmc-storage)
-   [**Orange Pi 5 MAX: A Powerful Successor to the Orange Pi 5 Pro**](https://smarthomecircle.com/Orange-pi-5-max-a-powerful-successor-to-orange-pi-5-pro)

