---
title: 'How to Connect Bluetooth Devices to Home Assistant with Bluetooth Proxy'
author: 'Amrut Prabhu'
categories: ''
tags: [Wake Word, Setup, VOICE ASSISTANT, Home Assistant]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-12-18'
draft: false
summary: 'In this article, we will explore how we can setup a Bluetooth Proxy to connect Bluetooth devices compatible with Home Assistant'
imageUrl: /static/images/2023/bluetooth-proxy-home-assistant/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/UIzM_nIluPY"

---

In this article, we will explore how we can create a Bluetooth proxy with ESP32 to connect Bluetooth devices to Home Assistant

<TOCInline toc={props.toc} asDisclosure />  


## Requirements

1.  **Home Assistant OS** setup and running.  
    You can check [this](https://smarthomecircle.com/how-to-connect-wifi-to-home-assistant-on-startup) link to see how you can install it for the first time.
2. **ESP32 Dev Board**  
    Links to buy this:
[![ESP32 Wroom](/static/images/2023/wled-with-home-assistant/esp32-wroom.webp)](https://s.click.aliexpress.com/e/_DB4HfST)
        -   [**AliExpress - ESP32 Dev Board**](https://s.click.aliexpress.com/e/_DB4HfST)
        -   [**Amazon - ESP32 Dev Board**](https://amzn.to/3QPvyrR)
      <br/>


## Creating a Bluetooth Proxy for Home Assistant

ESPHome provides an easy mechanism to create a Bluetooth proxy using an ESP32.

To create a Bluetooth proxy follow these steps.

**Step 1:** Connect your ESP32 dev board to your computer using USB.

**Step 2:** Open the URL [https://esphome.io/projects/index.html](https://esphome.io/projects/index.html) on a Chrome or Edge Browser.

**Step 3:** Select the **Bluetooth proxy** option.

**Step 4:** Select **Generic ESP32** and then click on **Connect.**

![bluetooth-proxy-setup](/static/images/2023/bluetooth-proxy-home-assistant/bluetooth-proxy-setup.webp)

**Step 5:** Now select the USB that you connected the ESP32 with.

![proxy usb select](/static/images/2023/bluetooth-proxy-home-assistant/select-usb.webp)

**Step 6:** Click on **Install Bluetooth Proxy**

![install-bluetooth-proxy](/static/images/2023/bluetooth-proxy-home-assistant/install-bluetooth-proxy.webp)

**Step 7:** After installation, you will be asked to provide Wifi credentials. Provide your wifi name and password.

Once the connection is successful, you can now proceed with connecting with Home Assistant.

## Connecting Bluetooth Proxy to Home Assistant

To connect the Bluetooth proxy to Home Assistant, follow these steps.

**Step 1:** Go to Home Assistant **Settings** on the left panel

**Step 2:** Click on **Devices & Services.**

**Step 3:** Click on **Add Integration** from the bottom right-hand corner.

**Step 4:** Search for **ESPhome**

**Step 5:** Provide the IP address of the ESP32 device that is connected to your wifi network and click **Connect**.

You can find the IP address of the ESP32 device on your internet router settings page. You should see the device with a name like e.g “Bluetooth-proxy-”.

After clicking connect, you should now see the Bluetooth Proxy on the ESPHome Integration page.

![esphome-bluetooth-proxy](/static/images/2023/bluetooth-proxy-home-assistant/esphome-bluetooth-proxy.webp)


If any Bluetooth devices are compatible with Home Assistant, they will automatically be visible on the Integrations page of Home Assistant.

If you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**Setup Zigbee2Mqtt with Home Assistant**](https://smarthomecircle.com/install-zigbee2mqtt-with-home-assistant)
-   [**Using Sonoff Zigbee 3.0 USB Dongle Plus With Home Assistant**](https://smarthomecircle.com/connect-zigbee-device-using-sonoff-zigbee-3-dongle-plus-to-home-assistant)
-   [**Voice Assistant In Home Assistant Using USB Microphone**](https://smarthomecircle.com/setup-voice-assistant-with-home-assistant-using-docker-usb-microphone)