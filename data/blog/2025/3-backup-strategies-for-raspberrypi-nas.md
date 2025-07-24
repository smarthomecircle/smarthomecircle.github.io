---
title: '3 Backup Strategies for My Raspberry Pi 5 NAS with RAID 5'
author: 'Amrut Prabhu'
categories: ''
tags: [Raspberry Pi, NAS, Open Media Vault, Radxa, Raspberry Pi HAT]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2025-01-12'
draft: false
summary: 'Unleash Raspberry Pi Compute Module 5: compact, versatile mini-computer for high-speed storage, DIY NAS, and innovative projects.'
imageUrl: /static/images/2024/raspberrypi-cm5/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/7N2VnqQcOHk"

---
<TOCInline toc={props.toc} asDisclosure />  


A few months ago, I built a Raspberry Pi 5 NAS with RAID 5 using the [Penta SATA HAT](https://s.click.aliexpress.com/e/_olCRd9p) from Radxa. While it’s been a reliable setup, I wanted to enhance the data reliability. In this guide, I’ll walk you through three backup strategies I’ve implemented for my Raspberry Pi 5 NAS, and I’ll also discuss the energy consumption changes resulting from these updates.

### Upgrading the Hardware

Before diving into the strategies, I made some significant hardware upgrades:

-   **Added a 120GB SSD** for the OS, replacing the SD card on the Pi 5.
    
    | ![Alt text](/static/images/2025/backup-strategies/ssd.jpg) | - Amazon EU : https://amzn.to/3VU6T8Q <br/>- Amazon US : https://amzn.to/4gKmeRC |
    |-----------------------------|---------------------------------------------------------|
    
-   **Installed a 4TB HDD** as secondary storage for backups.
    
    | ![HDD Drives](/static/images/2025/backup-strategies/hdd.jpg) | - Amazon EU : https://amzn.to/3ZN5To0 <br/>- Amazon US : https://amzn.to/3ZXRqFQ |
    |-----------------------------|---------------------------------------------------------|
    
-   Organized the components into a compact and efficient rack setup using an Acrylic HDD Mount rack.

    | ![Acrylic Rack](/static/images/2025/backup-strategies/case.jpg) | - Amazon EU: https://amzn.to/3BuOMPY <br/>- Amazon US :  https://amzn.to/4iFN3rF  <br/>- AliExpress : https://s.click.aliexpress.com/e/_olEubxz 
    |-----------------------------|---------------------------------------------------------|

-   USB to SATA connector

    | ![Acrylic Rack](/static/images/2025/backup-strategies/usb-sata.jpg) | - Amazon EU: https://amzn.to/41ZiW8y <br/>- Amazon US :  https://amzn.to/3VS6uDJ  <br/>- AliExpress : https://s.click.aliexpress.com/e/_oFQ4SfZ
    |-----------------------------|---------------------------------------------------------|

- eSATA cable for 3.5 inch HDD with 12v pins.

    | ![Acrylic Rack](/static/images/2025/backup-strategies/esata.jpg) | - Amazon EU: https://amzn.to/3Dsq2Z5 <br/>- Amazon US :  https://amzn.to/41RZWsz  <br/>- AliExpress : https://s.click.aliexpress.com/e/_ok7mfCB
    |-----------------------------|---------------------------------------------------------|


### Backup Strategy 1: NAS OS Backup To The NAS

First, I configured a system backup to safeguard the NAS OS:

1.  **OMV Backup Plugin:**

-   Installed the OMV Backup plugin in OpenMediaVault.
-   Configured the plugin to:
    -   Save backups to the RAID 5 shared folder.
    -   Use the DD command for a full disk backup.
    -   Retain up to five copies.


2. **Scheduling:**

-   Scheduled daily backups at 1:30 AM.

3. **Restoring the OS:**

-   Extracted the backup file to a PC.
-   Used the DD command to flash the backup onto the SSD.

4. **Booting From USB Storage**

-   Mount the USB storage and open the `BootFS` partition
-   Update the `config.txt` file to enable USB boot by adding `usb_max_current_enable=1`
-   Conenct the SSD to the Pi 5 via the USB-to-SATA connector and turn on the Pi 5.

This strategy ensures I can quickly restore the NAS OS in case of SD card failure.

### Backup Strategy 2: NAS Data Backup to Local HDD

Next, I implemented local data backup using the 4TB HDD:

1.  **Drive Setup:**

-   Formatted the HDD with the EXT4 file system.
-   Created and mounted a shared folder named `backup` on the HDD.

**2. Rsync Configuration:**

-   Created an Rsync task in OpenMediaVault:
    - Source: RAID 5 shared folder.
    - Destination: 4TB HDD backup folder.
    - Schedule: Daily at 2:00 AM.
-   Enabled options to preserve ACLs and synchronize deletions.

This strategy provides an on-site backup of the RAID 5 data.

### Backup Strategy 3: Remote Backup to Another NAS

Lastly, I set up remote backups to a second NAS:

1.  **Remote NAS Setup:**

-   Configured the remote NAS (CM5 NAS) with RAID 5.
-   Enabled Rsync server and created a module named `backup`.

2. **Rsync Task on Raspberry Pi 5 NAS:**

-   Configured an Rsync task:
    - Type: Remote (Push).
    - Source: RAID 5 shared folder on PiFi NAS.
    - Destination: `backup` module on the remote NAS.
    - Schedule: Daily at 3:15 AM.
-   Enabled options to preserve ACLs and synchronize deletions.

This strategy ensures off-site redundancy, enhancing data security in case of physical damage to the primary NAS.

### Conclusion

By implementing these three strategies, I’ve significantly improved the reliability and security of my Raspberry Pi 5 NAS:

1.  Backups of the OS ensure rapid recovery from system failures.
2.  Local HDD backups protect against RAID 5 data corruption.
3.  Remote backups safeguard against physical damage to the primary NAS.

These strategies have provided peace of mind and a robust system for my video editing workflow. If you’re considering similar upgrades or have questions, feel free to reach out!

-   [**Radxa X4: 60$ Powerful Atlernative to Raspberry Pi 5**](https://smarthomecircle.com/radxa-x4-alternative-to-raspberry-pi-5)
-   [**Create a NAS with Raspberry Pi 5**](https://smarthomecircle.com/create-nas-with-raspberry-pi-5)
-   [**Created My Voice Assistant With On-Device Wake Word Detection On ESP32**](https://smarthomecircle.com/How-I-created-my-voice-assistant-with-on-device-wake-word-using-home-assistant)
-   [**Orange Pi 5 MAX: A Powerful Successor to the Orange Pi 5 Pro**](https://smarthomecircle.com/Orange-pi-5-max-a-powerful-successor-to-orange-pi-5-pro)

