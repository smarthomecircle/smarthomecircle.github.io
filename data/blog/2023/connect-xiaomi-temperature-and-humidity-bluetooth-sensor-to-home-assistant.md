---
title: 'Connect Xiaomi Temperature and Humidity (LYWSD03MMC) Bluetooth Sensor to Home Assistant'
author: 'Amrut Prabhu'
categories: ''
tags: [Xiaomi, Sensor,Bluetooth, Home Assistant]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-12-18'
draft: false
autoAds: true
summary: 'In this article, we will look at how we can connect the Xiaomi Temperature and Humidity (LYWSD03MMC) Bluetooth Sensor to Home Assistant'
imageUrl: /static/images/2023/xiaomi-temp-humidity-sensor/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/lKjgbug9WNY"

---


In this article, we will explore how we can connect the Xiaomi Temperature and Humidity (_LYWSD03MMC_) Bluetooth Sensor to Home Assistant

<TOCInline toc={props.toc} asDisclosure />  

## Requirements

1.  **Home Assistant OS** setup and running.  
    You can check [this](https://smarthomecircle.com/how-to-connect-wifi-to-home-assistant-on-startup) link to see how you can install it for the first time.
2.  **Bluetooth Proxy** setup and running  
    You can check [this](https://smarthomecircle.com/connect-bluetooth-devices-to-home-assistant-with-bluetooth-proxy) page, to see how you can set it up.
3. **Xiaomi Temperature and Humidity (LYWSD03MMC) Bluetooth Sensor**
    [![Xiaomi Temperature and Humidity (LYWSD03MMC) Bluetooth Sensor](/static/images/2023/xiaomi-temp-humidity-sensor/xiaomi-temp-humidity-sensor.png)](https://s.click.aliexpress.com/e/_DkrUrzT)
        -   [**Buy On AliExpress**](https://s.click.aliexpress.com/e/_DkrUrzT)
        -   [**Buy On Amazon**](https://amzn.to/480BKEO)
      <br/> 
To connect the sensor to Home Assistant, we must first Factory Reset the device and then flash it with custom firmware.

Let’s look at how we can do that.

## Factory Reset Xiaomi Temperature and Humidity Bluetooth Sensor

Follow these steps to factory reset the Xiaomi Temperature and Humidity Bluetooth Sensor.

**Step 1:** Open the back panel of the device.

**Step 2:** Connect the **Reset** and **GND** pins with a wire and hold it for 5–6 secs.

![LYWSD03MMC-reset-switch](/static/images/2023/xiaomi-temp-humidity-sensor/LYWSD03MMC-reset-switch.webp)

Once the screen refreshes, this means the device is factory reset.

## Flashing Xiaomi Temperature and Humidity Sensor with Custom Firmware

To use the Xiaomi Temperature and Humidity Bluetooth sensor with Home Assistant, you must flash it with custom firmware.

> **Warning:** Flashing custom firmware is always at your own risk. Flashing custom firmware can brick your device and make it unusable. So proceed with your own risk.

To flash the custom firmware follow these steps.

**Step 1:** Open [this](https://pvvx.github.io/ATC_MiThermometer/TelinkMiFlasher.html) URL in your Chrome or Edge browser.

**Step 2:** Click on the **Get Advertising MAC** option and then click on **Connect** and select the device with **_LYWSD03MMC_** as the name

![LYWSD03MMC-sensor](/static/images/2023/xiaomi-temp-humidity-sensor/LYWSD03MMC-sensor.webp)

Setting up a connection can take about 4–5 minutes.

**Step 3:** Now click on **Custom Firmware ver 4.6** and click on **Start Flashing.**

![flash-custom-firmware](/static/images/2023/xiaomi-temp-humidity-sensor/flash-custom-firmware.webp)

**Step 4:** After flashing completes, click on **Reconnect** to re-connect the device.

**Step 5:** Scroll down to the **Configuration** section and change the **Advertising type** to **BTHome v2.**

**Step 6:** Click on **Send Config.**

![](/static/images/2023/xiaomi-temp-humidity-sensor/set-config.webp)

With this, the custom firmware is flashed and configured.

You can now connect the Xiaomi Temperature and Humidity Bluetooth sensor to Home Assistant.

## Connecting Xiaomi Temperature and Humidity Bluetooth Sensor to Home Assistant

With the custom firmware installed in the sensor, we can now connect it to Home Assistant.

To connect the sensor to Home Assistant, follow these steps.

**Step 1:** Go to Home Assistant **Settings** in the left panel.

**Step 2:** Click on **Devices & Services.**

Mostly you should see it being auto-discovered like this.

![bthome-auto-discover](/static/images/2023/xiaomi-temp-humidity-sensor/bthome-auto-discover.webp)

If not, then

**Step 3:** Click on **Add Integration** from the bottom right-hand corner.

**Step 4:** Search for **BTHome** and click on it.

![bthome-integration](/static/images/2023/xiaomi-temp-humidity-sensor/bthome-integration.webp)

You should be able to see the device there.

In case it does not still show up, wait for some time and retry the **BThome** Integration again.

If you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**Setup Zigbee2Mqtt with Home Assistant**](https://smarthomecircle.com/install-zigbee2mqtt-with-home-assistant)
-   [**Using Sonoff Zigbee 3.0 USB Dongle Plus With Home Assistant**](https://smarthomecircle.com/connect-zigbee-device-using-sonoff-zigbee-3-dongle-plus-to-home-assistant)
-   [**Voice Assistant In Home Assistant Using USB Microphone**](https://smarthomecircle.com/setup-voice-assistant-with-home-assistant-using-docker-usb-microphone)