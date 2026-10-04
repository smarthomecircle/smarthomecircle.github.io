---
title: "How to Build an ESP32 IR Proxy for Home Assistant with ESPHome"
author: 'Amrut Prabhu'
categories: ''
tags: [ESP32, DIY, IR Proxy, Home Assistant ]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2026-10-29'
draft: false
autoAds: true
summary: 'Build an ESP32 IR Proxy with ESPHome to learn and control infrared devices directly from Home Assistant.'
imageUrl: /static/images/2026/diy-ir-proxy/cover.webp
youtubeLink: "https://www.youtube.com/embed/4OoTQkhVlKE"
suggestedArticles:
  - title: "How I Created My Voice Assistant With ESP32"
    url: "https://smarthomecircle.com/How-I-created-my-voice-assistant-with-on-device-wake-word-using-home-assistant"
  - title: "How to Build a Smart Home Dashboard"
    url: "https://smarthomecircle.com/elecrow-10-inch-esp32-p4-esphome-lvgl-home-assistant-dashboard"
  - title: "A Rotary Display as My Home Assistant Knob"
    url: "https://smarthomecircle.com/elecrow-2-1-rotary-display-esphome-home-assistant-controller"


# affiliateLinks:
#   title: Buy GL.iNet Comet X
#   links:
#     - label: "Amazon EU"
#       url: "https://link.amazon/B02nga0JD"
#     - label: "Amazon US"
#       url: "https://link.amazon/B0bPsgQ09"
#     - label: "AliExpress"
#       url: "https://s.click.aliexpress.com/e/_c4TyX7pP"
#     - label: "Elecrow"
#       url: "https://www.gl-inet.com/en-de/products/gl-rm4pe"
---

<TOCInline toc={props.toc} asDisclosure /> 


Many devices around the home still rely on **infrared remotes** — LED strips, TVs, air conditioners, amplifiers, and more.

Instead of keeping all those remotes around, I built a simple **ESP32 IR Proxy** that allows me to receive and transmit infrared signals directly from **Home Assistant**.

The hardware is inexpensive, the wiring is simple, and ESPHome handles most of the software side.

In this guide, I'll show you how I built it and how you can use it to control an IR-based LED strip from Home Assistant.

<div className="image-flex">
  <img src="/static/images/2026/diy-ir-proxy/ir-proxy.webp" alt="ir-proxy" />
</div>

----------

## Components Required

For this project you mainly need:

-   **ESP32 development board**

[![ ESP32 ](/static/images/components/esp32.webp)](https://link.amazon/B0gnRbgGm)

  <AffiliateLinks 
  title="Buy ESP32" 
  links={[
    { store: "Amazon US", url: "https://link.amazon/B0gnRbgGm" },
    { store: "Amazon DE", url: "https://link.amazon/B0fPhwPWV" },
    { store: "Amazon UK", url: "https://link.amazon/B0buhGVZS" },
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_c4PXACzP" }
  ]}
  /> 

-   **IR receiver**

-   **IR transmitter module**

[![ IR Transmitter & Receiver ](/static/images/components/Ir-trans-receiver.webp)](https://link.amazon/B0c7iiiWy)

  <AffiliateLinks 
  title="Buy IR Transmitter & Receiver" 
  links={[
    { store: "Amazon US", url: "https://link.amazon/B0c7iiiWy" },
    { store: "Amazon DE", url: "https://link.amazon/B0dAsscgW" },
    { store: "Amazon UK", url: "https://link.amazon/B0iD8Y41E" },
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_c3iCNo9X" }
  ]}
  /> 


-   **Jumper wires**

  <AffiliateLinks 
  title="Buy IR Transmitter & Receiver" 
  links={[
    { store: "Amazon US", url: "https://link.amazon/B0cVapyqG" },
    { store: "Amazon DE", url: "https://link.amazon/B0eUpXi6A" },
    { store: "Amazon UK", url: "https://link.amazon/B09poxwlo" },
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_c4LtYohr" }
  ]}
  /> 
  

The IR receiver allows the ESP32 to **learn signals from existing remotes**, while the transmitter sends those signals back to your devices.

----------

## ESP32 IR Proxy Wiring

The wiring is quite simple.

Use the diagram below to make the connections.

### Connection Diagram

<div className="image-flex">
  <img src="/static/images/2026/diy-ir-proxy/diagram.webp" alt="diagram" />
</div>


Make sure the GPIO pins in your ESPHome configuration match the pins used in the wiring diagram.

----------

## Creating the ESPHome Device

Once the hardware is connected, we can prepare the ESP32 using **ESPHome**.

Open ESPHome and:

1.  Click **New Device**
    
2.  Create a **New Project**
    
3.  Select **ESP32**
    
4.  Select **Generic ESP32**
    
5.  Give the device a name such as `irproxy`
    
6.  Finish the initial setup
    

ESPHome will create the basic configuration required for the ESP32.

----------

## Adding the IR Proxy Configuration

Next, edit the ESPHome configuration.

Paste the configuration below underneath your existing ESPHome configuration.

```yaml

# Exiting ESP32 configuration above

remote_receiver:
  - id: ir_rx
    pin:
      number: GPIO26
      inverted: true          # IR receiver modules output active-low
      mode:
        input: true
        pullup: true
    dump: all                 # print every decoded code to the logs
    tolerance: 50%
    filter: 50us
    idle: 10ms

remote_transmitter:
  id: ir_tx
  pin: GPIO27
  carrier_duty_percent: 50%

# ---------------- INFRARED PROXY ----------------
infrared:
  - platform: ir_rf_proxy
    name: IR Transmitter
    id: ir_proxy_tx
    remote_transmitter_id: ir_tx
  - platform: ir_rf_proxy
    name: IR Receiver
    id: ir_proxy_rx
    remote_receiver_id: ir_rx
    receiver_frequency: 38kHz   # match your receiver module (TSOP38238 / V1222 / VS1838B = 38kHz)

```

This configuration sets up:

-   **IR receiver**
    
-   **IR transmitter**
    
-   **Home Assistant IR Proxy entities**


<div className="image-flex">
  <img src="/static/images/2026/diy-ir-proxy/esphome.webp" alt="diagram" />
</div>


----------

## Flashing the ESP32

After adding the configuration:

1.  Click **Save**
    
2.  Click **Install**
    
3.  Select **Plug into this computer**
    
4.  Connect the ESP32 using USB
    
5.  Compile the firmware
    
6.  Select your ESP32 from the USB flasher
    
7.  Click **Connect**
    
8.  Flash the firmware
    

Once flashing is complete, the ESP32 is ready to act as an **IR Proxy for Home Assistant**.

----------

## Adding the IR Proxy to Home Assistant

Open Home Assistant and navigate to:

**Settings → Devices & Services**

The ESPHome device should automatically appear as a newly discovered device.

Click **Add**.

Home Assistant may ask for the ESPHome **encryption key**.

You can find this inside your ESPHome configuration:

```yaml
api:
  encryption:
    key: "YOUR_ENCRYPTION_KEY"
```

Copy the key and paste it into Home Assistant.

Once setup is complete, you should see the IR receiver and transmitter provided by your ESP32.

<div className="image-flex">
  <img src="/static/images/2026/diy-ir-proxy/added-to-ha.webp" alt="added-to-ha" />
</div>

----------

## Installing HAIR in Home Assistant

Follow the full video below showing you in detail how you can install HAIR i.e Home Assistant IR in Home Assistant and using it capture IR signals and replay them to control your IR based devices.
    
<VideoEmbed 
  videoId="xP8saH3PHX0" 
  width="half" 
/>

----------

This project is a simple way to bring traditional **infrared devices into Home Assistant**.

Using an **ESP32, ESPHome, an IR receiver, and an IR transmitter**, you can build an inexpensive IR hub that can learn commands from your existing remotes and send them again from Home Assistant.

It also keeps the solution local and gives you the flexibility to integrate older IR devices into your smart-home automations.

