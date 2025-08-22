---
title: 'Create a Network-Attached Storage (NAS) with Raspberry Pi Compute Module 5 and NVMe to SATA Adapter'
author: 'Amrut Prabhu'
categories: ''
tags: [Raspberry Pi, CM5, Compute Module, Compute Module 5, open media vault,NAS, Raid 5]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2025-06-03'
draft: false
summary: 'Build a DIY NAS using Raspberry Pi Compute Module 5, NVMe to SATA adapter, and OpenMediaVault with RAID 5.'
imageUrl: /static/images/2024/diy-nas-cm5/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/5J-es6-DBU4"
suggestedArticles:
  - title: "Create a NAS with Raspberry Pi 5"
    url: "https://smarthomecircle.com/create-nas-with-raspberry-pi-5"
  - title: "Radxa X4: 60$ Powerful Atlernative to Raspberry Pi 5"
    url: "https://smarthomecircle.com/radxa-x4-alternative-to-raspberry-pi-5"
  - title: "Install OS on Raspberry Pi Compute Module 5 with eMMC Storage"
    url: "https://smarthomecircle.com/how-to-install-os-on-raspberry-pi-compute-module-5-emmc-storage"
  - title: "Orange Pi 5 MAX: A Powerful Successor to the Orange Pi 5 Pro"
    url: "https://smarthomecircle.com/Orange-pi-5-max-a-powerful-successor-to-orange-pi-5-pro"
---
<TOCInline toc={props.toc} asDisclosure />  

In this guide, we’ll walk through the process of creating a DIY Network-Attached Storage (NAS) system using a Raspberry Pi Compute Module 5 (CM5) and an NVMe to SATA adapter.

This adapter, equipped with the ASM1166 chip, supports six SATA connections, making it a versatile tool for this project. Let’s dive into the steps, challenges, and results.

----------

#### Components Used:

1.  **Raspberry Pi Compute Module 5**: A compact yet powerful computing module.

    ![sata adapater](/static/images/2024/diy-nas-cm5/cm5-front.webp)

<AffiliateLinks 
  title="Buy Raspberry Pi Compute Module 5" 
  links={[
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_DdzGQGd" },
    { store: "ThePiHut", url: "https://thepihut.com/products/raspberry-pi-compute-module-5" },
    { store: "BerryBase", url: "https://www.berrybase.de/en/detail/019350e97c767050917125760299ebf0" }
  ]}
/>

2.  **NVMe to SATA Adapter**: Features the ASM1166 chip for connecting multiple SATA drives.

    ![sata adapater](/static/images/2024/diy-nas-cm5/sata-adapter.webp)

<AffiliateLinks 
  title="Buy NVMe to SATA Adapter (ASM1166)" 
  links={[
    { store: "Amazon EU", url: "https://amzn.to/4fjHg8j" },
    { store: "Amazon US", url: "https://amzn.to/3Bm0QmD" },
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_olOqrGf" }
  ]}
/>
3.  **Acrylic HDD Rack Mount**: For neatly organizing hard drives.

    ![hdd rack](/static/images/2024/diy-nas-cm5/hdd-rack.webp)

<AffiliateLinks 
  title="Buy Acrylic HDD Rack Mount" 
  links={[
    { store: "Amazon EU", url: "https://amzn.to/3BuOMPY" },
    { store: "Amazon US", url: "https://amzn.to/4iFN3rF" },
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_olEubxz" }
  ]}
/>
4.  **SATA Power Supply Cable**: Powered by a DC adapter (7.5A, 12V).

    ![sata power supply](/static/images/2024/diy-nas-cm5/sata-power.webp)

<AffiliateLinks 
  title="Buy SATA Power Supply Cable (7.5A, 12V)" 
  links={[
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_ooaEC11" }
  ]}
/>
5.  **Hard Drives**: Used for creating the storage array.

<AffiliateLinks 
  title="Buy Hard Drives for NAS" 
  links={[
    { store: "Amazon EU", url: "https://amzn.to/3OZOzHs" },
    { store: "Amazon US", url: "https://amzn.to/4ghjE5E" }
  ]}
/>

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


If you enjoyed this project and want to see more like it:

-   ✅ **Subscribe** to the [YouTube channel](https://www.youtube.com/@SmartHomeCircle?sub_confirmation=1)
    
-   ☕ **Support my work** on [Patreon](https://patreon.com/AmrutPrabhu) or [Buy Me a Coffee](https://www.buymeacoffee.com/amrutprabhu)
