---
title: 'Connect & Automate Tuya Zigbee Smart Scene Switch To Home Assistant'
author: 'Amrut Prabhu'
categories: ''
tags: [Custom, Voice Assistant, Home Assistant]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-12-25'
draft: false
summary: 'This article will explore how we can connect and automate the Tuya Zigbee 4 Button Smart Scene Switch with Home Assistant'
imageUrl: /static/images/2023/tuya-smart-scene-switch/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/g4TUYCJOtIQ"

---

This article will explore how we can connect and automate the Tuya Zigbee 4 Button Smart Scene Switch with Home Assistant.

<TOCInline toc={props.toc} asDisclosure />  

## Requirements

1.  **Home Assistant OS** setup and running.  
    You can check [this](https://smarthomecircle.com/how-to-connect-wifi-to-home-assistant-on-startup) link to see how you can install it for the first time.
2.  **ZHA (Zigbee Home Automation)** setup or **Zigbee2MQTT** setup.  
    If you have not set it up, then you can check [this](https://smarthomecircle.com/connect-zigbee-device-using-sonoff-zigbee-3-dongle-plus-to-home-assistant) article to set up ZHA or [this](https://smarthomecircle.com/install-zigbee2mqtt-with-home-assistant) article to set up Zigbee2MQTT.
3.  **Tuya — 4 Button Smart Scene Switch**  

[![Tuya — 4 Button Smart Scene Switch](/static/images/2023/tuya-smart-scene-switch/Tuya-ZigBee-Smart-Switch.webp)](https://s.click.aliexpress.com/e/_DmPgWRR)
        -   [**Buy At AliExpress**](https://s.click.aliexpress.com/e/_DmPgWRR)
        -   [**Buy At Amazon**](https://amzn.to/47Nvn7S)      
    

## Connecting Zigbee Smart Scene Switch To Home Assistant Via ZHA

To connect the Tuya 4 Button Smart Scene Switch with Home Assistant via ZHA, follow these steps

**Step 1:** Go to Home Assistant **Settings** in the left panel.

**Step 2:** Click on **Devices & Services,** then click on **ZHA** (Zigbee Home Automation)

**Step 3:** Click on **Add Device.**

**Step 4:** Press and hold switch number 1 or button number 1 for about 10 seconds until all the lights start blinking rapidly. This will put the device in the pairing mode

**Step 5:** The device will start getting discovered and you can now change the name of the device.

![ZHA-integration](/static/images/2023/tuya-smart-scene-switch/ZHA-integration.webp)

## Automate Zigbee Smart Scene Switch with Automation BluePrint for ZHA

You can automate the Smart Scene Switch with simple automation by just selecting the device and then selecting the action.

But you can automate all four buttons with a single automation using an automation Blueprint.

Follow these steps to automate the Smart Scene Switch with an automation blueprint.

**Step 1:** Go to Home Assistant **Settings** in the left panel.

**Step 2:** Click on **Automation & Scenes** and click on the **Blueprint** tab.

**Step 3:** click on **Import Blueprint** in the bottom right-hand corner.

**Step 4:** Paste the following URL, click on **Preview,** and then **Import.**
```shell
https://gist.github.com/amrutprabhu/cb3ef5dbb1b72fb1f4a0b661cb3198c3
```
**Step 5:** Now click on the imported blueprint and you can select the Smart Scene Switch entity.

**Step 6:** Select the action you want for single click, double click, or press and hold.

![ZHA-blueprint](/static/images/2023/tuya-smart-scene-switch/ZHA-blueprint.webp)

**Step 7:** Save the automation and Start using the device.

  

## Connecting Zigbee Smart Scene Switch To Home Assistant Via Zigbee2MQTT

To connect the Tuya 4 Button Smart Scene Switch with Home Assistant via Zigbee2MQTT, follow these steps

**Step 1:** Click on the **Zigbee2MQTT** link on the left panel in Home Assistant.

**Step 2:** Click on **Permit Join** on the top bar.

**Step 4:** Press and hold switch number 1 or button number 1 for about 10 seconds until all the lights start blinking rapidly. This will put the device in the pairing mode

**Step 5:** The device will start getting discovered.

![zigbee2mqtt-integration](/static/images/2023/tuya-smart-scene-switch/zigbee2mqtt-integration.webp)

## Automate Zigbee Smart Scene Switch with Automation BluePrint for Zigbee2MQTT Integration

You can automate the Smart Scene Switch with simple automation by just selecting the device and then selecting the action.

For Zigbee2MQTT integration, you must trigger the device at least once for all the actions to be available in the automation.

But you can always automate all four buttons with a single automation using an automation Blueprint.

Follow these steps to automate the Smart Scene Switch with an automation blueprint.

**Step 1:** Go to Home Assistant **Settings** in the left panel.

**Step 2:** Click on **Automation & Scenes** and click on the **Blueprint** tab.

**Step 3:** click on **Import Blueprint** in the bottom right-hand corner.

**Step 4:** Paste the following URL, click on **Preview,** and then **Import.**
```shell
https://community.home-assistant.io/t/zigbee2mqtt-tuya-4-button-scene-switch-ts0044/274735
```
**Step 5:** Now click on the imported blueprint and you can select the Smart Scene Switch entity.

![zigbee2mqtt-blueprint](/static/images/2023/tuya-smart-scene-switch/zigbee2mqtt-blueprint.webp)

**Step 6:** Select the action you want for a single click, double click, or press and hold.

**Step 7:** Save the automation and start using the device.


If you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**Create Custom Wake Word For Your Voice Assistant**](https://smarthomecircle.com/custom-wake-word-for-voice-assistant-with-home-assistant)
-   [**Create Your Voice Assistant Device With Wake Word**](https://smarthomecircle.com/created-voice-assistant-esp32-with-wake-word-in-home-assistant)
-   [**Share Files With Home Assistant OS with Samba Share**](https://smarthomecircle.com/easily-share-files-with-home-assistant-using-samba-share)