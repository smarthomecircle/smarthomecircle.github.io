---
title: 'My Hands-On with a 7.3″ Color ePaper Display (Seeed Studio reTerminal E1002)'
author: 'Amrut Prabhu'
categories: ''
tags: [Dashboard, epaper, ESPHome, Home Assistant, AI]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2025-11-06'
draft: false
autoAds: true
summary: 'Make a beautiful, low-power status board on a 7.3″ color ePaper. My ESP32-S3 tips, SenseCraft presets, and ESPHome LVGL config notes inside'
imageUrl: /static/images/2025/seeed-reterminal-e1002/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/Nb-NRA7cv1M"
suggestedArticles:
  - title: "Seeed Studio Xiao 7.5 inch ePaper Display + ESPHome"
    url: "https://smarthomecircle.com/seeed-studio-xiao-epaper-dashboard-home-assistant"
  - title: "Local Voice Assistant with ReSpeaker Lite and Home Assistant"
    url: "https://smarthomecircle.com/local-voice-assistant-with-seeed-studio-respeaker-lite"
  - title: "Control LED Matrix With Home Assistant Like A Pro"
    url: "https://smarthomecircle.com/how-to-control-8x32-led-matrix-like-a-pro"
---

<TOCInline toc={props.toc} asDisclosure /> 

I’ve been living with a 7.3-inch color ePaper panel from Seeed Studio for a bit, and I want to walk you through what it’s like to set up, customize, and actually use it day-to-day. If you enjoy the idea of a low-power, always-on status board that can show real color, this thing is fun.


<div class="image-flex">
  <img src="/static/images/2025/seeed-reterminal-e1002/frontshot.webp" alt="front panel" />
</div>

<AffiliateLinks 
  title="Seeed Studio reTerminal E1002 Full-color ePaper Display" 
  links={[
    { store: "Seeed Studio", url: "https://www.seeedstudio.com/reTerminal-E1002-p-6533.html?sensecap_affiliate=zkW5xlz&referring_service=link" },
  ]}
/>

---

## Hardware Impressions

What immediately stood out to me is the build. The panel sits in a rigid metal case with a glass front, and the face is totally clean—no front logo—so it blends into a setup nicely. Despite being a little smaller than the monochrome board I used in a previous project, it feels noticeably more premium in the hand and on the wall.

Under the hood it’s powered by an ESP32-S3 with 8 MB PSRAM and 32 MB of flash, and it includes a built-in 2000 mAh battery. Around the sides you’ll find:

- **Right side:** microSD card slot, power switch, power & status LEDs, USB-C for power/data, and integrated temperature/humidity sensors.  
- **Left side:** I²S and GPIO breakouts if you want to wire in external sensors.  
- **Top edge:** a set of hardware buttons for quick interaction, plus a **microphone input**.

<div class="image-flex">
  <img src="/static/images/2025/seeed-reterminal-e1002/side-left.webp" alt="right side panel" />
  <img src="/static/images/2025/seeed-reterminal-e1002/side-right.webp" alt="left side view" />
</div>

---

## What You Can Build On It

There are a bunch of ways to program this display:

- **SenseCraft HMI (Seeed’s UI designer)**  
- **TRMNL Cloud API**  
- **Lopaka**  
- **ESPHome**  
- **Arduino IDE**  
- **EZ Studio**

I experimented with **SenseCraft HMI** which proviodes the no-code/low-code option and **ESPHome** for fully local device.

If you’re the “drag-and-drop and ship it” type, SenseCraft HMI is surprisingly capable. If you want everything to run locally and integrate deeply with your **Home Assistant**, ESPHome is where I landed for day-to-day use.

---

## SenseCraft HMI: No-Code, Lots of Presets

<div class="image-flex">
  <img src="/static/images/2025/seeed-reterminal-e1002/sensecraft-hmi.webp" alt="sensecraft hmi" />
</div>

With SenseCraft HMI, I flashed the firmware, joined the display to Wi-Fi, and started building a UI in the browser—no code needed. I could:


- Create an **image gallery** for rotating photos  
- Drop in **custom UI components** (cards, icons, text, etc.)  
- Show an **RSS feed** or even render **webpage content**  (what fits in the size)
- Use presets for **weather**, **GitHub profile**, a **stock market dashboard**, and **YouTube subscriber count**

The **Data** component is where it gets interesting: you point it at a public URL, select the fields you care about, and bind them to UI elements. There’s even some **AI assistance** for layout. I asked it to generate eight cards (each with an icon and a value), and it scaffolded the grid instantly. I then asked it to bind those cards to an API, and it handled that too—honestly more polished than I expected.

You can also surface **on-device sensors**—battery percentage, temperature, and humidity—right in the dashboard.

<div class="image-flex">
  <img src="/static/images/2025/seeed-reterminal-e1002/sensecraft-output.webp" alt="sensecraft hmi output" />
</div>


### The Catch: Cloud Dependency

All of the above works great, but it does rely on cloud services. Every time the screen updates, the device fetches data from the cloud, so you’ll want a reliable internet connection. That’s fine for many use cases. Personally, I prefer local control where I can, which is why I also set it up with ESPHome.

---

## ESPHome + LVGL: Local-First and Flexible

ESPHome now has [**LVGL**](https://esphome.io/components/lvgl/) support, so I built a fully local UI that runs on the device. That means I can:

- Keep **data sources** inside my network (Home Assistant, local APIs, MQTT, etc.)  
- Customize **exactly** how the dashboard looks and behaves  
- Avoid external dependencies once it’s flashed and configured

<div class="image-flex">
  <img src="/static/images/2025/seeed-reterminal-e1002/esphome.webp" alt="esphome output" />
</div>


I am not good at designing UIs but I hope the following YAML config gives you a start. 

```yaml
esphome:
  name: seeed-1002
  friendly_name: Seeed-1002
  on_boot:
    priority: 800
    then:
      - delay: 2s                 # give LVGL a moment to init
      - component.update: epaper_display

esp32:
  board: esp32-s3-devkitc-1
  framework:
    type: esp-idf

psram:
  mode: octal            # typical for 8/16MB S3 modules
  speed: 80MHz
# Enable logging
logger:
  # level: INFO

# Enable Home Assistant API
api:
  encryption:
    key: "pKndtl5o895sx0Yr/eFZd7lYPUAq5KM7a3C21tKdBSk="

ota:
  - platform: esphome
    password: "029cc3e98743e0cd9ac053bc0e449cf3"

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  manual_ip: 
    gateway: 192.168.0.1
    subnet: 255.255.255.0
    static_ip: 192.168.0.188

  # Enable fallback hotspot (captive portal) in case wifi connection fails
  ap:
    ssid: "Seeed-1002 Fallback Hotspot"
    password: "LopDpNMkK2yC"

captive_portal:


font:

  - file: "gfonts://Inter@600"
    id: myFont_sm
    size: 18
  - file: "gfonts://Inter@700"
    id: myFont
    size: 24
  - file: "gfonts://Inter@700"
    id: myFont_28
    size: 28



# ---- SPI + Display (yours, unchanged) ----
spi:
  clk_pin: GPIO7
  mosi_pin: GPIO9

display:
  - platform: epaper_spi
    id: epaper_display
    model: 7.3in-spectra-e6
    cs_pin: GPIO10
    dc_pin: GPIO11
    reset_pin:
      number: GPIO12
      inverted: false
    busy_pin:
      number: GPIO13
      inverted: true
    # LVGL + e-paper: don't auto-clear, do refresh periodically
    auto_clear_enabled: false     # REQUIRED for LVGL on displays
    update_interval: 300s          # try 30–60s while testing; tune later
    # rotation: 0°                # uncomment if orientation needs changing



image:
  defaults:
    type: rgb565
    transparency: alpha_channel
    resize: 40x40
  images:
    # pick your Icon from here: https://pictogrammers.com/library/mdi/
    - file: mdi:thermometer        
      id: ic_temp
    - file: mdi:power-plug
      id: ic_power_plug
    - file: mdi:weather-sunny      
      id: ic_sunny
    - file: mdi:water-percent      
      id: ic_humidity
    - file: mdi:molecule-co2       
      id: ic_co2
    - file: mdi:flash              
      id: ic_power
    - file: mdi:lightbulb          
      id: ic_bulb
    - file: mdi:coffee-maker       
      id: ic_coffee
    - file: mdi:door-open          
      id: ic_door
    - file: mdi:light-switch       
      id: ic_switch

interval:
  - interval: 60min
    then:
      - lvgl.label.update:
          id: lbl_date
          text:
            time_format: "%a %d %b"
            time: !lambda |-
              auto t = id(ha_time).now();
              //if (!t.is_valid()) t = id(sntp_time).now();
              return t;


time:
  - platform: homeassistant
    id: ha_time

 #------------------------- ALL Sensors --------------------
sensor:

  - platform: homeassistant
    id: s_card1
    entity_id: sensor.server_plug_summation_delivered
    internal: true
    
    on_value:
        - lvgl.label.update:
            id: card1_value
            text: !lambda |-
              return esphome::str_sprintf("%.1f", id(s_card1).state);
        - component.update: epaper_display
        # Use this to debug issues if no values are being populated.
        # - lambda: |-
        #     ESP_LOGI("ha", "s_card1 updated: %.2f", id(s_card1).state);

  - platform: homeassistant
    id: s_card2
    entity_id: sensor.home_climate_panel_cb_temperature
    internal: true
    on_value:
        - lvgl.label.update:
            id: card2_value
            text: !lambda |-
              return esphome::str_sprintf("%.1f", id(s_card2).state);
        - component.update: epaper_display


  - platform: homeassistant
    id: s_card3
    entity_id: sensor.home_climate_panel_cb_humidity
    internal: true
    on_value:
        - lvgl.label.update:
            id: card3_value
            text: !lambda |-
              return esphome::str_sprintf("%.1f", id(s_card3).state);
        - component.update: epaper_display



binary_sensor:
  - platform: homeassistant
    id: s_card4
    entity_id: binary_sensor.door_sensor_opening_2
    trigger_on_initial_state: true
    on_state:
      then:
        - lvgl.label.update:
            id: card4_value    # <-- the door card's value label
            text: !lambda |-
              return x ? std::string("OPEN") : std::string("Closed");
        - component.update: epaper_display


# --------- All TEXT Sensors -------------------------#
text_sensor:

  - platform: homeassistant
    id: s_card5
    entity_id: sensor.meter_pro_co2_monitor_carbon_dioxide
    internal: true
    on_value:
        - lvgl.label.update:
            id: card5_value
            text: !lambda |-
              return esphome::str_sprintf("%s", id(s_card5).state.c_str());
        - component.update: epaper_display

  - platform: homeassistant
    id: ts_card6
    entity_id: input_boolean.light
    on_value:
        - lvgl.label.update:
            id: card6_value
            text: !lambda |-
              return esphome::str_sprintf("%s", id(ts_card6).state.c_str());
        - component.update: epaper_display

  - platform: homeassistant
    id: ts_card7
    entity_id: light.light
    on_value:
        - lvgl.label.update:
            id: card7_value
            text: !lambda |-
              return esphome::str_sprintf("%s", id(ts_card7).state.c_str());
        - component.update: epaper_display

  - platform: homeassistant
    id: ts_card8
    entity_id: switch.3d_printer_switch
    on_value:
        - lvgl.label.update:
            id: card8_value
            text: !lambda |-
              return esphome::str_sprintf("%s", id(ts_card8).state.c_str());
        - component.update: epaper_display



# ---- LVGL UI ----
lvgl:
  displays: [epaper_display]
  buffer_size: 12%
  byte_order: little_endian


  style_definitions:
    - id: st_bg
      bg_color: 0x0033CC   # background color
      bg_opa: 80%
      border_width: 0

    - id: st_card
      bg_opa: 100%              # opaque
      border_color: 0x000000
      border_width: 4
      radius: 12
      pad_all: 10
      bg_color: 0xE6C200


    - id: st_topbar
      bg_opa: 0%            # fully transparent bar
      border_width: 0
      pad_left: 10
      pad_right: 10
      pad_top: 8
      pad_bottom: 8

    - id: st_title_sm
      text_font: myFont_sm  # your smaller font (e.g., Inter 18)
      text_color: 0x000000

    - id: st_title_sm_date
      text_font: myFont_sm  # your smaller font (e.g., Inter 18)
      text_color: 0xFFFFFF

    - id: st_title_md
      text_font: myFont_28 
      text_color: 0xFFFFFF

    - id: st_title        # (kept for date/time etc.)
      text_font: myFont

    - id: st_value
      text_font: myFont_28

    # ----------- Accent Colors    ---------------
    - id: st_accent_red
      bg_color: 0xCC0000
      bg_opa: 100%
      border_width: 0

    - id: st_accent_yellow
      bg_color: 0xE6C200
      bg_opa: 100%
      border_width: 0

    - id: st_accent_blue
      bg_color: 0x0033CC
      bg_opa: 100%
      border_width: 0

    - id: st_accent_green
      bg_color: 0x008833
      bg_opa: 100%
      border_width: 0

    - id: st_accent_black
      bg_color: 0x000000
      bg_opa: 100%
      border_width: 0

    # ----------- Icons Colors    ---------------
    # --- Dark circular icon background ---
    - id: st_icon_wrap_black
      bg_color: 0x000000
      bg_opa: 100%
      border_width: 0
      radius: 999       # any value >= half of width/height makes it a circle
      pad_all: 0

    # --- icon tint styles (use Spectra-6 friendly hues) ---
    - id: st_icon_red
      image_recolor: 0xCC0000
      image_recolor_opa: 100%

    - id: st_icon_yellow
      image_recolor: 0xE6C200
      image_recolor_opa: 100%

    - id: st_icon_blue
      image_recolor: 0x0033CC
      image_recolor_opa: 100%

    - id: st_icon_green
      image_recolor: 0x008833
      image_recolor_opa: 100%
    
    - id: st_icon_white
      image_recolor: 0xFFFFFF
      image_recolor_opa: 100%

  widgets:
    # ===== 4 × 2 grid for 800×480 =====
    # columns x: 16, 211, 406, 601 | rows y: 56, 266
    # each card: 183×198
    # Title sits at bottom (full width, wraps). Value is nudged up (y:-30).
    - obj:
        id: bg
        x: 0
        y: 0
        width: 800
        height: 480
        styles: st_bg
    # ---------- Card 1 ----------
    - obj:
        id: card1
        x: 16
        y: 56
        width: 183
        height: 198
        styles: st_card
        widgets:
          - obj:                # accent bar
              width: 163
              height: 6
              align: TOP_MID
              y: 4
              styles: st_accent_red
          - obj:                # icon
              width: 48
              height: 48
              align: TOP_LEFT
              x: 10
              y: 16
              styles: st_icon_wrap_black
              widgets:
                - image:
                    src: ic_power
                    align: CENTER
                    styles: st_icon_yellow
          - label:              # sensor value
              id: card1_value
              align: CENTER
              y: -5
              styles: st_value
              text: "--"
          - label:              # sensor name
              text: "Server Power Usage"
              align: BOTTOM_LEFT
              x: 10
              y: -10
              width: 163       # 183 card width - 2*10 padding
              long_mode: WRAP
              styles: st_title_sm

    # ---------- Card 2 ----------
    - obj:
        id: card2
        x: 211
        y: 56
        width: 183
        height: 198
        styles: st_card
        widgets:
          - obj:                # <— accent bar
              width: 163
              height: 6
              align: TOP_MID
              y: 4
              styles: st_accent_blue
          - obj:
              width: 48
              height: 48
              align: TOP_LEFT
              x: 10
              y: 16
              styles: st_icon_wrap_black
              widgets:
                - image:
                    src: ic_temp
                    align: CENTER
                    styles: st_icon_yellow
          - label:
              id: card2_value
              align: CENTER
              y: -5
              styles: st_value
              text: "--"

          - label:
              text: "Temperature"
              align: BOTTOM_LEFT
              x: 10
              y: -10
              width: 163
              long_mode: WRAP
              styles: st_title_sm

    # ---------- Card 3 ----------
    - obj:
        id: card3
        x: 406
        y: 56
        width: 183
        height: 198
        styles: st_card
        widgets:
          - obj:                # <— accent bar
              width: 163
              height: 6
              align: TOP_MID
              y: 4
              styles: st_accent_green
          - obj:
              width: 48
              height: 48
              align: TOP_LEFT
              x: 10
              y: 16
              styles: st_icon_wrap_black
              widgets:
                - image:
                    src: ic_humidity
                    align: CENTER
                    styles: st_icon_white
          - label:
              id: card3_value
              align: CENTER
              y: -5
              styles: st_value
              text: "--"

          - label:
              text: "Humidity"
              align: BOTTOM_LEFT
              x: 10
              y: -10
              width: 163
              long_mode: WRAP
              styles: st_title_sm

    # ---------- Card 4 ----------
    - obj:
        id: card4
        x: 601
        y: 56
        width: 183
        height: 198
        styles: st_card
        widgets:
          - obj:                # <— accent bar
              width: 163
              height: 6
              align: TOP_MID
              y: 4
              styles: st_accent_black
          - obj:
              width: 48
              height: 48
              align: TOP_LEFT
              x: 10
              y: 16
              styles: st_icon_wrap_black
              widgets:
                - image:
                    src: ic_door
                    align: CENTER
                    styles: st_icon_white
          - label:
              id: card4_value
              align: CENTER
              y: -5
              styles: st_value
              text: "--"

          - label:
              text: "Door"
              align: BOTTOM_LEFT
              x: 10
              y: -10
              width: 163
              long_mode: WRAP
              styles: st_title_sm

    # ---------- Card 5 ----------
    - obj:
        id: card5
        x: 16
        y: 266
        width: 183
        height: 198
        styles: st_card
        widgets:
          - obj:                # <— accent bar
              width: 163
              height: 6
              align: TOP_MID
              y: 4
              styles: st_accent_red
          - obj:
              width: 48
              height: 48
              align: TOP_LEFT
              x: 10
              y: 16
              styles: st_icon_wrap_black
              widgets:
                - image:
                    src: ic_co2
                    align: CENTER
                    styles: st_icon_white
              
          - label:
              id: card5_value
              align: CENTER
              y: -5
              styles: st_value
              text: "--"

          - label:
              text: "Carbon Dioxide"
              align: BOTTOM_LEFT
              x: 10
              y: -10
              width: 163
              long_mode: WRAP
              styles: st_title_sm

    # ---------- Card 6 ----------
    - obj:
        id: card6
        x: 211
        y: 266
        width: 183
        height: 198
        styles: st_card
        widgets:
          - obj:                # <— accent bar
              width: 163
              height: 6
              align: TOP_MID
              y: 4
              styles: st_accent_blue
          - obj:
              width: 48
              height: 48
              align: TOP_LEFT
              x: 10
              y: 16
              styles: st_icon_wrap_black
              widgets:
                - image:
                    src: ic_bulb
                    align: CENTER
                    styles: st_icon_yellow
          - label:
              id: card6_value
              align: CENTER
              y: -5
              styles: st_value
              text: "--"

          - label:
              text: "Attic Light"
              align: BOTTOM_LEFT
              x: 10
              y: -10
              width: 163
              long_mode: WRAP
              styles: st_title_sm

    # ---------- Card 7 (switch) ----------
    - obj:
        id: card7
        x: 406
        y: 266
        width: 183
        height: 198
        styles: st_card
        widgets:
          - obj:                # <— accent bar
              width: 163
              height: 6
              align: TOP_MID
              y: 4
              styles: st_accent_green
          - obj:
              width: 48
              height: 48
              align: TOP_LEFT
              x: 10
              y: 16
              styles: st_icon_wrap_black
              widgets:
                - image:
                    src: ic_bulb
                    align: CENTER
                    styles: st_icon_yellow
          - label:
              id: card7_value
              align: CENTER
              y: -5
              styles: st_value
              text: "--"

          - label:
              text: "Bedroom Light"
              align: BOTTOM_LEFT
              x: 10
              y: -10
              width: 163
              long_mode: WRAP
              styles: st_title_sm

    # ---------- Card 8 (binary sensor) ----------
    - obj:
        id: card8
        x: 601
        y: 266
        width: 183
        height: 198
        styles: st_card
        widgets:
          - obj:                # <— accent bar
              width: 163
              height: 6
              align: TOP_MID
              y: 4
              styles: st_accent_black
          - obj:
              width: 48
              height: 48
              align: TOP_LEFT
              x: 10
              y: 16
              styles: st_icon_wrap_black
              widgets:
                - image:
                    src: ic_switch
                    align: CENTER
                    styles: st_icon_white
          - label:
              id: card8_value
              align: CENTER
              y: -5
              styles: st_value
              text: "--"

          - label:
              text: "3D Printer Switch"
              align: BOTTOM_LEFT
              x: 10
              y: -10
              width: 163
              long_mode: WRAP
              styles: st_title_sm

    - label:
        id: lbl_title
        text: "Smart Home Circle"          # placeholder text
        align: TOP_LEFT
        x: 10
        y: 8
        styles: st_title_md
    - label:
        id: lbl_date
        text: "..."          # placeholder text
        align: TOP_RIGHT
        x: -12
        y: 8
        styles: st_title_sm_date
```


---

## Daily Use Notes

- **Look & feel:** The glass front and metal chassis make it feel like a finished product, not a dev kit.  
- **Buttons on top:** Handy for quick actions—think “next photo,” “refresh,” or toggling a view.  
- **Sensors:** Having temp/humidity onboard saves wiring for simple dashboards.  
- **Storage:** The microSD card is convenient for photo galleries and caching.  
- **Power:** The 2000 mAh battery is nice for short untethered sessions, but I mostly run it on USB-C for a set-and-forget dashboard.

---

## Which Path Should You Choose?

- **SenseCraft HMI** if you want:  
  No-code setup, quick wins, presets (weather, stocks, GitHub, YouTube), and AI-assisted layouts. Just note the **cloud dependency**.

- **ESPHome** if you want:  
  **Local-first** control, deep integration with Home Assistant/local APIs, and you’re comfortable writing YAML and iterating on a UI with LVGL.

Honestly, I’m happy this device supports both ends of that spectrum—start fast in the cloud if you want, then migrate pieces local as you go.

---

## Price & Availability

The display is about **$109**, with shipping options from **EU, US, and China** warehouses.  

<div class="image-flex">
  <img src="/static/images/2025/seeed-reterminal-e1002/display.webp" alt="display" />
</div>


<AffiliateLinks 
  title="Seeed Studio reTerminal E1002 Full-color ePaper Display" 
  links={[
    { store: "Seeed Studio", url: "https://www.seeedstudio.com/reTerminal-E1002-p-6533.html?sensecap_affiliate=zkW5xlz&referring_service=link" },
  ]}
/>

