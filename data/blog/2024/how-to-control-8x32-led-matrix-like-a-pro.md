---
title: 'How To Control LED Matrix With Home Assistant Like A Pro | Send Text Messages'
author: 'Amrut Prabhu'
categories: ''
tags: [LED, LED Matrix, WLED, WS2812B LED, Home Assistant]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2024-09-12'
draft: false
summary: 'In this article we will look at controlling a 32x8 LED Matrix panel with Home Assistant like a pro'
imageUrl: /static/images/2024/led-matrix/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/L5L_ABFvAjg"

---
<TOCInline toc={props.toc} asDisclosure />  

## Components

1.  8x32 LED Matrix with individual programmable LEDs of type WS2812B.  
    You can buy using the links below.
    -   [**Amazon -  8x32 LED Matrix**](https://amzn.to/3TJnZ8z)
    -   [**AliExpress -  8x32 LED Matrix**](https://s.click.aliexpress.com/e/_DFOOsH9)
[![ 8x32 LED Matrix ](/static/images/2024/led-matrix/8x32-led-matrix.webp)](https://amzn.to/3TJnZ8z)

2.  D1 Mini board

 -   [**Amazon -  D1 Mini**](https://amzn.to/3AT0Z0f)
 -   [**AliExpress - D1 Mini**](https://s.click.aliexpress.com/e/_De0exaL)
[![D1 Mini](/static/images/2023/wled-with-home-assistant/d1-mini.webp)](https://s.click.aliexpress.com/e/_De0exaL)


## STL Model File For 3D printer

The link to the STL file for the 3D printing model is [here](https://www.thingiverse.com/thing:6759479).

## Circuit Diagram

![circuit diagram](/static/images/2024/led-matrix/circuit-diagram.webp)

## Installing WLED on D1 mini

1.  Head over to [https://install.wled.me](https://install.wled.me) and connect the D1 mini to the compute2.
2.  Click on “Connect” and then click on “Install WLED”.
3.  After installation, configure Wifi credentials.
4.  Once connected, add it to Home Assistant.

## REST Commands For Controlling LED Matrix Text Input

### Simple Text Options command
```yaml
rest_command:
  wled_text:
    url: http://<IP Address of the device>/json/state
    method: POST
    payload: '{ "on": true, "bri": "{{brightness}}", "seg":{"id":0, "col":{{color}} , "fx":122, "n":"{{text}}" }}' 
```
  

### Advanced Text Options Command
```yaml
rest_command:
  wled_text_advanced:
    url: http://<IP Address of the device>/json/state
    method: POST
    payload: '{"on": true, "bri": {{brightness}}, "seg":{"id":0, "fx":122, "frz": {{freeze}}, "sx": {{scroll_speed}}, "col": {{color}}, "n":"{{text}}"}}'
```

Here are some recommended articles for you.

-   [**Create Custom Wake Word For Your Voice Assistant**](https://smarthomecircle.com/custom-wake-word-for-voice-assistant-with-home-assistant)
-   [**Connect Bluetooth Devices to Home Assistant with Bluetooth Proxy**](https://smarthomecircle.com/connect-bluetooth-devices-to-home-assistant-with-bluetooth-proxy)
-   [**Share Files With Home Assistant OS with Samba Share**](https://smarthomecircle.com/easily-share-files-with-home-assistant-using-samba-share)