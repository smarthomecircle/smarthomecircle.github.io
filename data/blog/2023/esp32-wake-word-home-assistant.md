---
title: 'How to Setup Zigbee2Mqtt with Home Assistant — Step By Step Guide'
author: 'Amrut Prabhu'
categories: ''
tags: [ESP32, Wake Word, Voice Assistant, Home Assistant]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-10-26'
draft: false
summary: 'In this article we will look at how you can set up an ESP32 with a Microphone to use Wake Word with Home Assistant.'
imageUrl: /static/images/2023/zigbee2mqtt-setup/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/nNLgCUFRNsk"
---
In this article we will look at how you can set up an ESP32 with a Microphone to use Wake Word with Home Assistant.

<TOCInline toc={props.toc} asDisclosure />  

## Requirements

1.  Home Assistant up and running.  
    You can check [this](https://smarthomecircle.com/how-to-connect-wifi-to-home-assistant-on-startup) link to see how you can install it for the first time.

2.  ESP32 Board
-   [**ESP32 Dev Board**](https://amzn.to/3MbiBHq)
[![ESP32 Dev Board](/static/images/2023/esp32-wake-word/esp32-board.jpg)](https://amzn.to/3MbiBHq)
- [**Buy On Aliexpress**](https://s.click.aliexpress.com/e/_DB4HfST)
- [**Buy On Amazon**](https://amzn.to/3MbiBHq)

3.  ESPHome is up and running.  
    You can check [this](https://smarthomecircle.com/esp32-esp8266-esphome-with-home-assistant) link to setup ESPHome

To set up voice assistant, we would need three components to create the voice assist pipeline in Home Assistant.

1.  **Whisper**: For speech-to-text
2.  **Piper:** For text-to-speech
3.  **OpenWakeWord:** For invoking the Assist Pipeline.

You can check the video below, to see how you can set up Whisper, Piper, and OpneWakeWord using Home Assistant Addons.

  

If you are interested in setting all of the components using Docker, then check out this article.

Once you set up the above three components, we will flash the ESP32 ready to start using the Wake word.

## Circuit Diagram For ESP32, Microphone, and Speaker.

  

table

## Flashing ESP32 With ESPHome

**Step 1**: Create a new device on ESPHome UI by clicking on the “ + NEW DEVICE” in the right bottom corner.

**Step2:** Give it a name e.g “Voice Assistant”

**Step 2:** Select ESP32

![esp32-select](/static/images/2023/esp32-wake-word/esp32-select.png)

**Step 3:** Now click on “Edit” on the device you just created.

**Step 4:** Paste the following YAML code below the code that already exists.

  

**Step 5:** Click on Install in the top right corner, then click on “Modern format”.

**Step 6:** Now save the downloaded file.

**Step 7:** Open [https://web.esphome.io](https://web.esphome.io) in a Chrome browser.

**Step 8:** Hold the boot button on the ESP32 board and connect it to your computer. Hold the button until **Step 11**

**Step 9:** Click on “Connect” on the URL you opened in **Step 7**. Now select the ESP32 board in the Menu.

![usb-select](/static/images/2023/esp32-wake-word/usb-select.png)

In my case, it was this “USB Serial”.

**Step 10:** Now, click on “Install” and select the file that you downloaded in **Step 6**.

**Step 11:** Now click on “Install” and only release the “BOOT” button once you see “Erasing” on the UI

![earsing](/static/images/2023/esp32-wake-word/erasing.png)

With all this, we have not got our ESP32 ready with the microphone and speaker.

Now let’s connect it to Home Assistant

## Connect ESP32 To Home Assistant

**Step 1:** Click on **Settings** in Home Assistant UI.

**Step 2:** Click on **Devices & Services.**

**Step 3:** Click on **Add Integration** in the bottom right-hand corner.

**Step 4:** Search for ESPhome, and select it.

**Step 5:** Enter the IP address of the ESP32 device that has connected to your Wi-Fi and keep the port number 6053.

![host-ip](/static/images/2023/esp32-wake-word/host-ip.png)

You should be able to find the IP address of your ESP32 in your Wi-Fi router.

**Step 6:** Click on **Submit**

**Step 7:** Open the ESPHome setting page and you should be able to see the device.

![esphome](/static/images/2023/esp32-wake-word/esphome.png)

**Step 8:** Click on the device you just added and turn the **Use Wake Word** button.

With this, you should now be able to invoke Home Assistant using the Wake word.
Now if you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**Connect Zigbee Plug Using Sonoff Zigbee 3.0 USB Dongle Plus**](https://smarthomecircle.com/connect-zigbee-device-using-sonoff-zigbee-3-dongle-plus-to-home-assistant)
-   [**Setup ESP32 Cam with Frigate And Home Assistant To Detect Objects**](https://smarthomecircle.com/how-to-setup-frigate-with-home-assistant)
-   [**How I Added a Matter Device to Home Assistant**](https://smarthomecircle.com/add-matter-devices-to-home-assistant)

<br/>