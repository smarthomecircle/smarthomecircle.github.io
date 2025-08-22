---
title: 'How to Install OS on Raspberry Pi Compute Module 5 with eMMC Storage'
author: 'Amrut Prabhu'
categories: ''
tags: [Raspberry Pi, CM5, Compute Module, Compute Module 5, SBC, Linux]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2024-12-19'
draft: false
summary: 'Step by step guide to install Raspberry Pi OS on Raspberry Pi Compute Module 5 with eMMC Storage '
imageUrl: /static/images/2024/os-cm5-emmc/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/SWv-WYlHJWQ"

---
<TOCInline toc={props.toc} asDisclosure />  

Installing Raspberry Pi OS on the Raspberry Pi Compute Module 5 (CM5) with eMMC storage involves a slightly different process compared to the CM5 Lite version without eMMC.


| ![cm5 front](/static/images/2024/raspberrypi-cm5/cm5-front.webp) | ![cm5 back](/static/images/2024/raspberrypi-cm5/cm5-back.webp) |
|-------------------------|-------------------------|



<AffiliateLinks 
  title="Buy Raspberry Pi Compute Module 5" 
  links={[
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_DdzGQGd" },
    { store: "ThePiHut", url: "https://thepihut.com/products/raspberry-pi-compute-module-5" },
    { store: "BerryBase", url: "https://www.berrybase.de/en/detail/019350e97c767050917125760299ebf0" }
  ]}
/>

--- 

In this guide, we’ll walk you through the steps to install Raspberry Pi OS on a Compute Module 5 using Windows, Linux, and macOS.

## For CM5 Lite (Without eMMC Storage)

If you’re using the CM5 Lite, the process is straightforward. Simply flash the OS onto an SD card using [Raspberry Pi Imager](https://www.raspberrypi.com/software/) and insert it into the IO board.

For the CM5 with eMMC storage, follow the instructions below:

## Pre-Requirement: Disable Boot From eMMC
Make sure to connect a jumper to the pins that disable booting from the eMMC prior to flashing the OS.

![emmc-boot](/static/images/2024/os-cm5-emmc/disable-emmc-boot.webp)

## Installing Raspberry Pi OS From Windows Machine

1.  **Download and Install RPI Boot Installer**

-   Download the RPI boot installer from the official Raspberry Pi website [here](https://www.raspberrypi.com/documentation/computers/compute-module.html#set-up-the-host-device).
-   Run the setup and follow the prompts.
-   During installation, command windows will open multiple times to install necessary drivers. Wait for the process to finish and click “Next” until the setup completes.

2. **Start the Mass Storage Gadget**

-   Open the Start Menu and search for “CM4/CM5 Mass Storage Gadget.”

![windows](/static/images/2024/os-cm5-emmc/windows-1.webp)

-   Click on it to open a command window.
-   When the command window shows “Waiting for BCM2835/6/7/2711/2712…” connect the IO board to your computer.
-   The red light on the IO board will turn green when the binaries start flashing onto the eMMC module. Once the light remains green, the eMMC storage will be accessible on your computer.

**3. Use Raspberry Pi Imager**

-   Open the [Raspberry Pi Imager](https://www.raspberrypi.com/software/).
-   Select the desired OS and the detected eMMC storage.
-   Click “Next” to flash the OS onto the eMMC storage.

![rpi-imager](/static/images/2024/os-cm5-emmc/rpi-imager.webp)

## Installing Raspberry Pi OS From Linux

1.  **Build RPI Boot Binary**

-   Clone the repository and build the RPI boot binary:
```shell
sudo apt install git libusb-1.0-0-dev pkg-config build-essential  
git clone --recurse-submodules --shallow-submodules --depth=1 https://github.com/raspberrypi/usbboot  
cd usbboot  
make
```
2. **Start RPI Boot**

-   Run the following command to start RPI boot:
```shell
sudo ./rpiboot -d mass-storage-gadget64
```
-   This will wait for the device connection.
-   When the command window shows “Waiting for BCM2835/6/7/2711/2712…” connect the IO board to your computer.
-   The red light on the IO board will turn green when the binaries start flashing onto the eMMC module. Once the light remains green, the eMMC storage will be accessible on your computer.
-   If these instructions don’t work, you can check the instructions from the GitHub repo [here](https://github.com/raspberrypi/usbboot?tab=readme-ov-file#linux--cygwin--wsl).

![linux](/static/images/2024/os-cm5-emmc/linux.webp)

3. **Flash the OS**

-   Once the process completes and the drive is mounted, open [Raspberry Pi Imager](https://www.raspberrypi.com/software/).
-   Select the OS, choose the eMMC module, and click “Next” to write the OS to the eMMC storage.

## Installing Raspberry Pi OS Using macOS

1.  **Build RPI Boot Binary**

-   Clone the repository and build the RPI boot binary:
```shell
git clone --recurse-submodules --shallow-submodules --depth=1 https://github.com/raspberrypi/usbboot  
cd usbboot  
brew install libusb  
brew install pkg-config  
make
```
-   Run the command to start RPI boot:
```shell
sudo ./rpiboot -d mass-storage-gadget64
```
-   When the command window shows “Waiting for BCM2835/6/7/2711/2712…” connect the IO board to your computer.
-   The red light on the IO board will turn green when the binaries start flashing onto the eMMC module. Once the light remains green, the eMMC storage will be accessible on your computer.
-   If these instructions don’t work, you can check the instructions from the GitHub repo [here](https://github.com/raspberrypi/usbboot?tab=readme-ov-file#macos).

![Macos](/static/images/2024/os-cm5-emmc/macos.webp)

2. **Flash the OS**

Open the [Raspberry Pi Imager](https://www.raspberrypi.com/software/), select the OS, choose the mounted eMMC storage, and Click “Next” to write the OS.

![Macos](/static/images/2024/os-cm5-emmc/rpi-imager-2.webp)

### Conclusion

Following these steps will allow you to successfully install Raspberry Pi OS on the CM5 with eMMC storage.

-   [**Create a NAS with Raspberry Pi 5**](https://smarthomecircle.com/create-nas-with-raspberry-pi-5)
-   [**Radxa X4: 60$ Powerful Atlernative to Raspberry Pi 5**](https://smarthomecircle.com/radxa-x4-alternative-to-raspberry-pi-5)
-   [**Create Custom Wake Word For Your Voice Assistant**](https://smarthomecircle.com/custom-wake-word-for-voice-assistant-with-home-assistant)
-   [**Orange Pi 5 MAX: A Powerful Successor to the Orange Pi 5 Pro**](https://smarthomecircle.com/Orange-pi-5-max-a-powerful-successor-to-orange-pi-5-pro)

