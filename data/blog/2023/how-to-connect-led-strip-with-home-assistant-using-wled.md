---
title: 'How to Control LED Strip with Home Assistant Using WLED — Step-By-Step Guide'
author: 'Amrut Prabhu'
categories: ''
tags: [WLED, LED lights, LED strip, Home Assistant]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-10-12'
draft: false
autoAds: true
summary: 'In this article, we will look at how you can control an LED strip with Home Assistant using WLED.'
imageUrl: /static/images/2023/wled-with-home-assistant/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/eFPBkX-jPag"

---
In this article, we will look at how you can control an LED strip with Home Assistant using WLED.

<TOCInline toc={props.toc} asDisclosure />  

## Requirements

1.  LED strip with individual programmable LEDS of type WS2812B, WS2811, or SK6812.  
    You can buy using the links below.
    -   [**Amazon - WS2812B LED**](https://amzn.to/3Pjtmbr)
[![WS2812B LED](/static/images/2023/wled-with-home-assistant/led-strip.jpg)](https://amzn.to/3Pjtmbr)

-   [**AliExpress - WS2812B LED**](https://s.click.aliexpress.com/e/_DEYtbQb)
[![WS2812B LED](/static/images/2023/wled-with-home-assistant/led-strip-aliexpress.webp)](https://s.click.aliexpress.com/e/_DEYtbQb)
2.  ESP32 or D1 Mini board. You can buy it using the links below.

-   [**AliExpress - ESP32 Wroom**](https://s.click.aliexpress.com/e/_DB4HfST)
[![ESP32 Wroom](/static/images/2023/wled-with-home-assistant/esp32-wroom.webp)](https://s.click.aliexpress.com/e/_DB4HfST)

-   [**AliExpress - D1 Mini**](https://s.click.aliexpress.com/e/_DB6gHF9)
[![ESP32 Wroom](/static/images/2023/wled-with-home-assistant/d1-mini.webp)](https://s.click.aliexpress.com/e/_DB6gHF9)
## Circuit Diagram For Connecting LED Strip to D1 mini

![d1-mini-circuit-diagram](/static/images/2023/wled-with-home-assistant/d1-mini-circuit-diagram.webp)

## Circuit Diagram For Connecting LED Strip to ESP32

![esp32-circuit-diagram](/static/images/2023/wled-with-home-assistant/esp32-circuit-diagram.webp)

  

## Installing WLED on D1 mini

If you are using a D1 mini, connect it to the computer and open [this](https://install.wled.me/) link in the browser.

Now, click on install and you should get this popup.

![wled](/static/images/2023/wled-with-home-assistant/wled.webp)

Now select your device and click Connect.

Then click on “Install WLED”.

Once you click on “Install WLED” and if it remains in the “Connecting” state for a long time, this means your D1 mini is not in the flashing mode.

To enable flashing mode in the D1 mini, you must connect the D3 pin and ground pin and then connect the D1 mini to the computer. This should put it in the flashing mode.

Once the erasing and flashing are done, it will ask you for your Wi-Fi information. Provide the Wi-Fi information and click “Connect”.

Now you should get this option to visit the device.

![wled-success](/static/images/2023/wled-with-home-assistant/wled-success.webp)

You can either now add this to your Home Assistant or you can directly visit the device interface which looks like this.

![wled-ui](/static/images/2023/wled-with-home-assistant/wled-ui.webp)

  

## Installing WLED on ESP32

Follow the same steps from above, except you must press and hold the “Boot” button while connecting the ESP32 to the computer.

Then follow the exact steps as stated above.

  

## Connecting WLED Strip To Home Assistant

To add your WLED programmed ESP32 or D1 mini to Home Assistant, head over to your Home Assistant and go to “Settings” and then the “Devices & Services” option.

Once you are in the “Integrations” tab, click on the “Add integration” button in the bottom right-hand corner and search for WLED.

![home-assistant-wled](/static/images/2023/wled-with-home-assistant/home-assistant-wled.webp)

Now, as you can see above, you will have to enter the IP address of your D1 mini or ESP32 in which you have WLED installed.

With this, you have now connected your WLED device to Home Assistant.

![home-assistant-setup](/static/images/2023/wled-with-home-assistant/home-assistant-setup.webp)

Now if you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**Connect Zigbee Plug Using Sonoff Zigbee 3.0 USB Dongle Plus**](https://smarthomecircle.com/connect-zigbee-device-using-sonoff-zigbee-3-dongle-plus-to-home-assistant)
-   [**How I Setup ESP32 Cam with Frigate And Home Assistant To Detect Objects**](https://smarthomecircle.com/how-to-setup-frigate-with-home-assistant)
-   [**How I Added a Matter Device to Home Assistant**](https://smarthomecircle.com/add-matter-devices-to-home-assistant)