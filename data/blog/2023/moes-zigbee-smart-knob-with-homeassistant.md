---
title: 'MOES Zigbee Smart Knob'
author: 'Amrut Prabhu'
categories: ''
tags: [Smart Device, Zigbee, Home Assistant]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-12-07'
draft: false
autoAds: true
summary: 'In this article, we will explore the new MOES Zigbee Smart Knob and connect it to Home Assistant ZHA and Zigbee2MQTT'
imageUrl: /static/images/2023/moes-zigbee-smart-knob/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/fQiKbgpTlyE"

---
In this article, we will explore the new MOES Zigbee Smart Knob and connect it to Home Assistant ZHA and Zigbee2MQTT.

We will also look at some of the automation blueprints to automate your light and media player with this smart knob.

<TOCInline toc={props.toc} asDisclosure />  


## Requirements

1.  **Home Assistant** up and running.  
    You can check [this](https://smarthomecircle.com/how-to-connect-wifi-to-home-assistant-on-startup) link to see how you can install it for the first time
2.  **ZHA** is setup and running  
    In case you have not set it up, you can look at it [here](https://smarthomecircle.com/connect-zigbee-device-using-sonoff-zigbee-3-dongle-plus-to-home-assistant).

OR

3. **Zigbee2MQTT** setup and running.  
In case you have not set it up, you can look at it [here](https://smarthomecircle.com/install-zigbee2mqtt-with-home-assistant).

4.  **Moes Zigbee Smart Knob** (Optional: Only required to listen to the pipeline output)  
    Links to buy these.  
[![Moes Zigbee Smart Knob](/static/images/2023/moes-zigbee-smart-knob/moes-smart-knob.webp)](https://s.click.aliexpress.com/e/_DkdrcSv)
        -   [**AliExpress - Moes Zigbee Smart Knob**](https://s.click.aliexpress.com/e/_DkdrcSv)
        -   [**Amazon - Moes Zigbee Smart Knob**](https://amzn.to/47Nvn7S)      
    



## Moes Zigbee Smart Knob

![Moes Zigbee Smart Knob](/static/images/2023/moes-zigbee-smart-knob/moes-smart-knob.webp)

Meet the Tuya ZigBee Smart Knob Switch — a nifty two-in-one gadget crafted for automating your home.

Just a simple tap gives you smooth control over all your smart devices connected to Home Assistant. But that’s not all — this switch can be used as a wireless dimmer for ZigBee lamps, letting you tweak your lighting using Home Assistant.

It’s got four handy modes for remote use, covering everything from turning things on and off to adjusting brightness and setting colors.

It has a sleek design at 40 x 40 x 29mm, this device runs on a CR2032 3V DC battery and talks through Zigbee 3.0, reaching up to 25m in an open area.

## Connecting Moes Zigbee Smart Knob to Home Assistant Using ZHA

If you are connecting the device using ZHA, then follow these steps.

**Step 1**: Go to **Home Assistant** Settings in the left panel

**Step 2**: Click on **Devices & Services**

**Step 3**: Select **ZHA** and Click on **Add device**.

**Step 4**: Press and Hold the reset button for 6 seconds. Once the light starts blinking in green, the device has gone into pairing mode.
![Reset button](/static/images/2023/moes-zigbee-smart-knob/reset-switch.webp)

You should now see it being discovered by **ZHA**.

![ZHA Integration](/static/images/2023/moes-zigbee-smart-knob/zha-integration.webp)

## Connecting Moes Zigbee Smart Knob to Home Assistant Using Zigbee2MQTT

If you are connecting the device using **Zigbee2MQTT**, then follow these steps.

**Step 1**: On the **Zigbee2MQTT** dashboard click on the “Permit All” on the top bar.

**Step 2**: Press and Hold the reset button for 6 seconds. Once the light starts blinking in green, the device has gone into pairing mode.

It should now be recognized in **Zigbee2MQTT**.

![Zigbee2MQTT Integration](/static/images/2023/moes-zigbee-smart-knob/zigbee2mqtt-integration.webp)  

  
## Creating Automation with a Blueprint for Lights Using ZHA

To control lights with an automation using the Smart Knob, you can use a blueprint that works with ZHA( Zigbee Home Automation)

For this,

**Step 1**: Go to **Home Assistant** Settings in the left panel

**Step 2**: Click on **Automation & Scenes**

**Step 3**: Click on the “**Blueprint**” tab and then click on “**Import Blueprint**” in the bottom right-hand corner.

**Step 4**: Paste the following URL, click on “**Preview**” and then “**Import**”
```
https://gist.github.com/amrutprabhu/e852130d5a608d1f4b957a3aa5b27a4e
```
**Step 5**: Now click on the imported blueprint and you can now select the smart knob and select the entities for your light.

**Step 6**: Save the automation and Start using the device.

![Light Automation](/static/images/2023/moes-zigbee-smart-knob/lights-control.webp)

## Creating Automation with a Blueprint for Media Using ZHA Integration

To control the volume of your media player using an automation, you can follow the same steps from above, but in this case, use the blueprint link from below
```
https://gist.github.com/amrutprabhu/5993ed706e4176013097574fc668cdaf
```
**Important**: Now, when you create an automation from the blueprint, make sure to select the entity option. Currently, the device and area option still needs to be fixed.

![Volume control](/static/images/2023/moes-zigbee-smart-knob/media-player-control.webp)

## Creating Automation with a Blueprint for Lights Using Zigbee2MQTT Integration

If you have integrated the device using Zigbee2MQTT, then you can use the below blueprint to automate your lights using the Zigbee Smart Knob.
```
https://github.com/pbergman/ha-blueprints/blob/3fc7a18cd8ea34a82f5a955beea13c02a5f805d7/ERS-10TZBVK-AA.yaml
```

If you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**My Local Voice Assistant Device With Wake Word**](http://localhost:3000/created-voice-assistant-esp32-with-wake-word-in-home-assistant)
-   [**Control LED Strip with Home Assistant Using WLED**](https://smarthomecircle.com/how-to-connect-led-strip-with-home-assistant-using-wled)
-   [**How I Added a Matter Device to Home Assistant**](https://smarthomecircle.com/add-matter-devices-to-home-assistant)

<br/>