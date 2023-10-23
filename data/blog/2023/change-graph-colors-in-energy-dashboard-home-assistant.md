---
title: 'How To Change Graph Colors in Energy Dashboard In Home Assistant'
author: 'Amrut Prabhu'
categories: ''
tags: [Energy Graph, Energy Dashboard, Home Assistant]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-09-21'
draft: false
summary: 'In this article, we will look at how you can change colors for your energy graph in the energy dashboard of Home Assistant.'
imageUrl: /static/images/2023/energy-dashboard-home-assistant/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/9c2XUjobVB8"
---
In this article, we will look at how you can change colors for your energy graph in the energy dashboard of Home Assistant.

<TOCInline toc={props.toc} asDisclosure />  

## Requirements

1.  Home Assistant 2023.09 or later up and running.  
    You can check [this](https://smarthomecircle.com/connect-wifi-on-home-assistant-on-startup) link to see how you can install it for the first time
2.  The energy dashboard is already configured showing the energy graph.

## Changing Graph Colors in Energy Dashboard

Your energy graph would look something like this.

![without-color-dashboard](/static/images/2023/energy-dashboard-home-assistant/without-color.webp)

Now you can specify individual colors for each of your device using the following configuration.
```yaml
frontend:  
  themes:  
    Custom Home Assistant:    # this is the name of the theme  
      energy-grid-consumption-color-0: "#ed2964"  
      energy-grid-consumption-color-1: "#ff7f17"  
      energy-grid-consumption-color-2: "#00ff00"  
      energy-grid-consumption-color-3: "#17e2fc"  
      energy-grid-consumption-color-4: "#d117ff"  
      energy-grid-consumption-color-5: "#e96697"  
      energy-grid-consumption-color-6: "#f79f07"
```
For each value starting from the 0th index, the devices would get the colors in the energy graph.

For example, for the above config, the output is something like this.

![energy-dashboard-with-color](/static/images/2023/energy-dashboard-home-assistant/energy-dashboard-with-color.webp)


Now if you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**Connect Zigbee Plug Using Sonoff Zigbee 3.0 USB Dongle Plus**](https://smarthomecircle.com/connect-zigbee-device-using-sonoff-zigbee-3-dongle-plus-to-home-assistant)
-   [**How I Setup ESP32/ESP8266 With ESP Home and Home Assistant**](https://smarthomecircle.com/esp32-esp8266-esphome-with-home-assistant)
-   [**How I Added a Matter Device to Home Assistant**](https://smarthomecircle.com/add-matter-devices-to-home-assistant)