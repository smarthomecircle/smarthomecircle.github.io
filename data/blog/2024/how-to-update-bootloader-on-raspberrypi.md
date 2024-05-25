---
title: 'How To Update Bootloader (EEPROM) On The Raspberry Pi'
author: 'Amrut Prabhu'
categories: ''
tags: [Raspberry Pi, bootloader, EEPROM]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2024-02-17'
draft: false
summary: 'This article on how you can update the bootloader (EEPROM) on the Raspberry Pi'
imageUrl: /static/images/2024/update-bootloader/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: ""

---
<TOCInline toc={props.toc} asDisclosure />  


## Pre Requirement

-   **RaspberryPI OS** is installed on the SD Card and **Raspberry Pi** is up and running

## Updating Raspberry Pi Bootloader

**Step 1:** Open the terminal and enter the following command
```shell
sudo raspi-config
```
**Step 2:** Now select **Advanced Options** > **Bootloader Version >** select **Latest** and confirm the changes.

**Step 3:** Now update your Raspberry Pi OS with the following command.
```shell
sudo apt upgrade
```
**Step 4:** Now run this command
```shell
sudo rpi-eeprom-update
```
This will show you the latest updated version


**Step 5:** Now update the bootloader and reboot the system
```shell
sudo rpi-eeprom-update -a  
sudo reboot
```
If you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**Create Custom Wake Word For Your Voice Assistant**](https://smarthomecircle.com/custom-wake-word-for-voice-assistant-with-home-assistant)
-   [**Connect Bluetooth Devices to Home Assistant with Bluetooth Proxy**](https://smarthomecircle.com/connect-bluetooth-devices-to-home-assistant-with-bluetooth-proxy)
-   [**Share Files With Home Assistant OS with Samba Share**](https://smarthomecircle.com/easily-share-files-with-home-assistant-using-samba-share)