---
title: "Building a Home Assistant Dashboard with Elecrow ESP32-P4 and ESPHome LVGL"
author: 'Amrut Prabhu'
categories: ''
tags: [Home Assistant, ESPHome, Dashboard, ESP32 P4, Elecrow ]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2026-09-17'
draft: false
autoAds: true
summary: 'Build an interactive Home Assistant dashboard using the Elecrow 10-inch ESP32-P4 display, ESPHome, and LVGL step-by-step.'
imageUrl: /static/images/2026/elecrow-esp32-p4-display/cover.webp
youtubeLink: "https://www.youtube.com/embed/du-4jJSz0OI"
suggestedArticles:
  - title: "A Rotary Display as My Home Assistant Knob"
    url: "https://smarthomecircle.com/elecrow-2-1-rotary-display-esphome-home-assistant-controller"
  - title: "My Hands-On with a 7.3″ Color ePaper Display "
    url: "https://smarthomecircle.com/seeed-studio-reterminal-e1002-color-epaper-7-3-review"
  - title: "ReSpeaker XVF3800: a surprisingly solid local voice assistant"
    url: "https://smarthomecircle.com/respeaker-xvf3800-home-assistant-voice-assistant"


affiliateLinks:
  title: Buy Elecrow ESP32 P4 Display
  links:
    - label: "Amazon EU"
      url: "https://link.amazon/B02dAk2Wd"
    - label: "Amazon US"
      url: "https://link.amazon/B04pnvU3h"
    - label: "AliExpress"
      url: "https://s.click.aliexpress.com/e/_c35xo2QH"
    - label: "Elecrow"
      url: "https://www.elecrow.com/crowpanel-advanced-10-1inch-esp32-p4-hmi-ai-display-1024x600-ips-touch-screen-wifi-6.html"
---

<TOCInline toc={props.toc} asDisclosure /> 

Transforming a bare touchscreen into an interactive **smart home dashboard** is easier than ever using **ESPHome** and **LVGL (Light and Versatile Graphics Library)**. The new **Elecrow 10-inch Touchscreen Display** packs high-end performance into an sleek form factor, making it ideal for real-time control.

<div className="image-flex">
  <img src="/static/images/2026/elecrow-esp32-p4-display/panel-display.webp" alt="panel-display" />
</div>

<AffiliateLinksFromMetadata />

## Hardware Specs and Board Overview

-   **Main Processor:** Dual-core **ESP32-P4** RISC-V CPU running up to **400 MHz** with **16 MB Flash** and **32 MB PSRAM**.
    
-   **Wireless Connectivity:** Dedicated onboard **ESP32-C6** chip providing **Wi-Fi 6** and **Bluetooth 5.3**.
    
-   **Vision & Audio Support:** Integrated **CSI camera connector**, **2x speaker ports**, and dedicated **AI vision processing capabilities**.
    
-   **Expansion I/O:** Easy accessibility to **I2C bus**, **UART interfaces**, **battery connector**, and **wireless module expansion ports**.
    

<div className="image-flex">
  <img src="/static/images/2026/elecrow-esp32-p4-display/back.webp" alt="back" />
</div>


## Part 1: Initial ESPHome Setup and LVGL Flashing

Setting up the display requires establishing a baseline firmware build with board pinouts, touchscreen drivers, and initial LVGL support.

1.  Open your **ESPHome Dashboard** and create a new project.
    
2.  Select **ESP32-P4** as your target board architecture.
    
3.  Paste the core hardware configuration file containing pinouts for display, backlight LED, and touch interface.
    
4.  Add the basic **LVGL YAML section** for initial layout generation.
    
5.  Connect the display via **USB-C** to your host machine.
    
6.  Click **Install**, launch the **USB Flasher**, and flash the compiled firmware directly to the board.
    

```yaml
# Board: Generic ESP32-P4 Board (pre-rev3) (Generic)
# Definition: definitions/boards/generic-esp32p4/manifest.yaml

esphome:
  name: 10-inch-step-1
  friendly_name: 10-inch-step-1
  min_version: 2026.5.0
  on_boot:
    priority: 800
    then:
      - output.turn_on: backlight_pwm
      - delay: 200ms
      - output.turn_off: power_light
      - delay: 500ms
      - light.turn_on:
          id: back_light
          brightness: 100%
esp32:
  variant: esp32p4
  # CrowPanel boards are often pre-rev3 silicon. Set false only if yours is production rev3+.
  engineering_sample: true
  cpu_frequency: 360MHz   # ES chips cannot use 400MHz
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
      execute_from_psram: true
      enable_idf_experimental_features: true
psram:
  speed: 200MHz
# MIPI DSI on P4 requires LDO channels 3 and 4
esp_ldo:
  - channel: 3
    voltage: 2.5V
  - channel: 4
    voltage: 2.5V
logger:
api:
ota:
  - platform: esphome
    #password: "f6bb6e424ef6857086c1000e705e8c77"
esp32_hosted:
  type: sdio
  variant: ESP32C6
  active_high: true
  reset_pin: GPIO32
  cmd_pin: GPIO19
  clk_pin: GPIO18
  d0_pin: GPIO17
  d1_pin: GPIO16
  d2_pin: GPIO15
  d3_pin: GPIO14
wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: "10-Inch-Display Fallback Hotspot"
  manual_ip:
    gateway: 192.168.0.1
    static_ip: 192.168.0.55
    subnet: 255.255.255.0

captive_portal:

i2c:
  - id: bus_a
    sda: GPIO45
    scl: GPIO46
    frequency: 400kHz
touchscreen:
  - platform: gt911
    id: my_touchscreen
    display: my_display
    i2c_id: bus_a
    reset_pin: GPIO40
    interrupt_pin: GPIO42
    update_interval: 50ms
output:
  - platform: ledc
    pin: GPIO31
    id: backlight_pwm
  - platform: gpio
    id: power_light
    pin: GPIO29
    inverted: true
light:
  - platform: monochromatic
    id: back_light
    name: Backlight
    output: backlight_pwm
    restore_mode: ALWAYS_ON
display:
  - platform: mipi_dsi
    id: my_display
    # There is no Elecrow model in 2026.5; this 1024x600 Waveshare panel is the usual match.
    model: WAVESHARE-ESP32-P4-WIFI6-TOUCH-LCD-7B
    reset_pin: GPIO41
    update_interval: never
    auto_clear_enabled: false
    dimensions: 1024x600
    color_order: RGB
    color_depth: 16
    pclk_frequency: 48MHz


#Actual changes here


lvgl:
  displays:
    - my_display
  touchscreens:
    - my_touchscreen
  buffer_size: 25%
  color_depth: 16

```

<div className="image-flex">
  <img src="/static/images/2026/elecrow-esp32-p4-display/part-1.webp" alt="comet-q" />
</div>



## Part 2: Rendering a Custom Background Image

An attractive background image elevates the dashboard look from basic to polished.

1.  Upload your desired background image file into the **ESPHome `config` directory**.
    
2.  Add an `image:` component definition in your configuration, specifying precise resize parameters.
    
3.  Reference the image source inside the **LVGL bottom layer configuration**.
    
4.  Deploy the firmware update **Over-The-Air (OTA)** since the display is now on your local Wi-Fi network.
    


```yaml
...

#Actual changes here

image:
  - file: background-1024-600.jpg
    id: img_background
    resize: 1024x600
    type: RGB565
    byte_order: little_endian

lvgl:
  displays:
    - my_display
  touchscreens:
    - my_touchscreen
  buffer_size: 25%
  color_depth: 16
  bottom_layer:
    widgets:
      - image:
          src: img_background
          align: CENTER

  pages:
    - id: main_page
      bg_opa: TRANSP
      scrollbar_mode: "OFF"
```

<div className="image-flex">
  <img src="/static/images/2026/elecrow-esp32-p4-display/part-2.webp" alt="part-2" />
</div>


## Part 3: Building a 2x2 Interactive Grid Layout

Grid layouts allow effortless placement of UI control elements like toggle switches and scene triggers.

1.  Define a **2x2 grid container** in your LVGL structure to hold up to four interactive widgets.
    
2.  Add a button widget locked to cell index `(0, 0)`.
    
3.  Configure an `on_click` action trigger inside the button YAML to target your **Home Assistant entity** (e.g., a smart plug).
    
4.  **Crucial Step:** Navigate to **Home Assistant Settings -> Devices -> ESPHome -> 10-inch Display Settings** and check **"Allow device to perform Home Assistant actions"**.
    

```yaml
...
#Actual changes here
image:
  - file: background-1024-600.jpg
    id: img_background
    resize: 1024x600
    type: RGB565
    byte_order: little_endian

lvgl:
  displays:
    - my_display
  touchscreens:
    - my_touchscreen
  buffer_size: 25%
  color_depth: 16
  # Wallpaper behind every page
  bottom_layer:
    widgets:
      - image:
          src: img_background
          align: CENTER
  pages:
    - id: main_page
      bg_opa: TRANSP
      scrollbar_mode: "OFF"
      widgets:
  
        - obj:
            id: grid_panel
            align: BOTTOM_MID
            y: -10
            width: 1004
            height: 530
            bg_opa: TRANSP
            border_width: 0
            scrollbar_mode: "OFF"
            pad_all: 6
            layout:
              type: GRID
              grid_rows: [FR(1), FR(1)]
              grid_columns: [FR(1), FR(1)]
              pad_row: 14
              pad_column: 14
            widgets:
              # ---------- 2 x 2 (boxes 1-4) ----------
              - button:
                  id: btn_1
                  checkable: false
                  grid_cell_row_pos: 0
                  grid_cell_column_pos: 0
                  grid_cell_x_align: STRETCH
                  grid_cell_y_align: STRETCH

                  on_click:
                    then:
                      - homeassistant.action:
                          action: switch.toggle
                          data:
                            entity_id: switch.third_reality_e3
                    

```

<div className="image-flex">
  <img src="/static/images/2026/elecrow-esp32-p4-display/part-3.webp" alt="part-3" />
</div>


## Part 4: Implementing Two-Way Sync with Home Assistant

To prevent state mismatch between your physical dashboard and Home Assistant, the display must listen for live entity updates.

1.  Add a `binary_sensor` component in ESPHome tracking the Home Assistant entity ID.
    
2.  Set the LVGL button property `checkable: false` to allow manual color control via code scripts.
    
3.  Use the `on_state` trigger inside the binary sensor to modify button background colors dynamically based on entity state (`ON` vs `OFF`).
    
4.  Add a text label widget inside the button structure for clean visual identification.
    

```yaml

#Actual changes here
image:
  - file: background-1024-600.jpg
    id: img_background
    resize: 1024x600
    type: RGB565
    byte_order: little_endian


binary_sensor:
  - platform: homeassistant
    id: ha_btn_1
    entity_id: switch.third_reality_e3
    trigger_on_initial_state: true
    on_state:
      then:
        - if:
            condition:
              lambda: 'return x;'
            then:
              - lvgl.widget.update:
                  id: btn_1
                  bg_color: 0xFFD400

            else:
              - lvgl.widget.update:
                  id: btn_1
                  bg_color: 0x1E293B
  
lvgl:
  displays:
    - my_display
  touchscreens:
    - my_touchscreen
  buffer_size: 25%
  color_depth: 16
  # Wallpaper behind every page
  bottom_layer:
    widgets:
      - image:
          src: img_background
          align: CENTER
  pages:
    - id: main_page
      bg_opa: TRANSP
      scrollbar_mode: "OFF"
      widgets:
  
        - obj:
            id: grid_panel
            align: BOTTOM_MID
            y: -10
            width: 1004
            height: 530
            bg_opa: TRANSP
            border_width: 0
            scrollbar_mode: "OFF"
            pad_all: 6
            layout:
              type: GRID
              grid_rows: [FR(1), FR(1)]
              grid_columns: [FR(1), FR(1)]
              pad_row: 14
              pad_column: 14
            widgets:
              # ---------- 2 x 2 (boxes 1-4) ----------
              - button:
                  id: btn_1
                  checkable: false
                  grid_cell_row_pos: 0
                  grid_cell_column_pos: 0
                  grid_cell_x_align: STRETCH
                  grid_cell_y_align: STRETCH
                  widgets:
                      - label:
                          id: btn_1_text
                          align: CENTER
                          text: "Smart Plug"
                  on_click:
                    then:
                      - homeassistant.action:
                          action: switch.toggle
                          data:
                            entity_id: switch.third_reality_e3

```

<div className="image-flex">
  <img src="/static/images/2026/elecrow-esp32-p4-display/part-4.webp" alt="part-3" />
  <img src="/static/images/2026/elecrow-esp32-p4-display/part-5.webp" alt="part-3" />
</div>

## Complete Custom Dashboard YAML Configuration

Combine all elements—sensors, live clocks, temperature readings, dynamic color changes, and multi-button grid layouts—into one cohesive configuration script.

<Collapsible title="Open the full YAML code">

```yaml
# Board: Generic ESP32-P4 Board (pre-rev3) (Generic)
# Definition: definitions/boards/generic-esp32p4/manifest.yaml

esphome:
  name: display-10inch-working
  friendly_name: Display-10inch-working
  min_version: 2026.5.0
  on_boot:
    priority: 800
    then:
      - output.turn_on: backlight_pwm
      - delay: 200ms
      - output.turn_off: power_light
      - delay: 500ms
      - light.turn_on:
          id: back_light
          brightness: 100%
esp32:
  variant: esp32p4
  # CrowPanel boards are often pre-rev3 silicon. Set false only if yours is production rev3+.
  engineering_sample: true
  cpu_frequency: 360MHz   # ES chips cannot use 400MHz
  flash_size: 16MB
  framework:
    type: esp-idf
    advanced:
      execute_from_psram: true
      enable_idf_experimental_features: true
psram:
  speed: 200MHz
# MIPI DSI on P4 requires LDO channels 3 and 4
esp_ldo:
  - channel: 3
    voltage: 2.5V
  - channel: 4
    voltage: 2.5V
logger:
api:
ota:
  - platform: esphome
    #password: "f6bb6e424ef6857086c1000e705e8c77"
esp32_hosted:
  type: sdio
  variant: ESP32C6
  active_high: true
  reset_pin: GPIO32
  cmd_pin: GPIO19
  clk_pin: GPIO18
  d0_pin: GPIO17
  d1_pin: GPIO16
  d2_pin: GPIO15
  d3_pin: GPIO14
wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: "10-Inch-Display Fallback Hotspot"
  manual_ip:
    gateway: 192.168.0.1
    static_ip: 192.168.0.55
    subnet: 255.255.255.0

captive_portal:

i2c:
  - id: bus_a
    sda: GPIO45
    scl: GPIO46
    frequency: 400kHz
touchscreen:
  - platform: gt911
    id: my_touchscreen
    display: my_display
    i2c_id: bus_a
    reset_pin: GPIO40
    interrupt_pin: GPIO42
    update_interval: 50ms
output:
  - platform: ledc
    pin: GPIO31
    id: backlight_pwm
  - platform: gpio
    id: power_light
    pin: GPIO29
    inverted: true
light:
  - platform: monochromatic
    id: back_light
    name: Backlight
    output: backlight_pwm
    restore_mode: ALWAYS_ON
display:
  - platform: mipi_dsi
    id: my_display
    # There is no Elecrow model in 2026.5; this 1024x600 Waveshare panel is the usual match.
    model: WAVESHARE-ESP32-P4-WIFI6-TOUCH-LCD-7B
    reset_pin: GPIO41
    update_interval: never
    auto_clear_enabled: false
    dimensions: 1024x600
    color_order: RGB
    color_depth: 16
    pclk_frequency: 48MHz
# 2026.5 image syntax — do NOT use "platform: file" (that is 2026.7+)
image:
  - file: background-1024-600.jpg
    id: img_background
    resize: 1024x600
    type: RGB565
    byte_order: little_endian

#New change
font:
  # ---- clock ----
  - file: "gfonts://Roboto@700"
    id: font_time
    size: 126
    bpp: 4
    glyphs: [" ", ":", "-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  - file: "gfonts://Roboto@700"
    id: font_date
    size: 48
    bpp: 4

  # ---- bold UI text (replaces the built-in montserrat_* fonts) ----
  - file: "gfonts://Montserrat@700"
    id: font_bold_24
    size: 24
    bpp: 4

  - file: "gfonts://Montserrat@700"
    id: font_bold_20
    size: 20
    bpp: 4

  # ---- temperature readout ----
  - file: "gfonts://Montserrat@700"
    id: font_temp
    size: 44
    bpp: 4
    glyphs: [" ", "-", ".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "\u00B0", "C"]

  # ---- Material Design Icons ----
  - file: "https://github.com/Templarian/MaterialDesign-Webfont/raw/master/fonts/materialdesignicons-webfont.ttf"
    id: font_icons
    size: 48
    bpp: 4
    glyphs:
      - "\U000F0335"  # mdi:lightbulb
      - "\U000F0502"  # mdi:television
      - "\U000F097E"  # mdi:light-switch
      - "\U000F06B5"  # mdi:lamp

time:
  - platform: homeassistant
    id: esptime
    on_time_sync:
      then:
        - script.execute: refresh_clock
    on_time:
      - seconds: 0
        then:
          - script.execute: refresh_clock

script:
  - id: refresh_clock
    mode: restart
    then:
      - lvgl.label.update:
          id: time_label
          text:
            time_format: "%H:%M"
            time: !lambda return id(esptime).now();
      - lvgl.label.update:
          id: date_label
          text: !lambda |-
            static const char *const DOW[] = {"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
            static const char *const MON[] = {"Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
            auto now = id(esptime).now();
            if (!now.is_valid()) {
              return std::string("Waiting for time");
            }
            char buf[32];
            snprintf(buf, sizeof(buf), "%s %d %s %d", DOW[now.day_of_week - 1],
                     now.day_of_month, MON[now.month - 1], now.year);
            return std::string(buf);

binary_sensor:
  - platform: homeassistant
    id: ha_light_1
    entity_id: light.light
    trigger_on_initial_state: true
    on_state:
      then:
        - if:
            condition:
              lambda: 'return x;'
            then:
              - lvgl.widget.update:
                  id: btn_1
                  bg_color: 0xFFD400
                  bg_opa: 80%
            else:
              - lvgl.widget.update:
                  id: btn_1
                  bg_color: 0x1E293B
                  bg_opa: 80%

  - platform: homeassistant
    id: ha_btn_1
    entity_id: switch.third_reality_e3
    trigger_on_initial_state: true
    on_state:
      then:
        - if:
            condition:
              lambda: 'return x;'
            then:
              - lvgl.widget.update:
                  id: btn_2
                  bg_color: 0xFFD400
                  bg_opa: 80%
            else:
              - lvgl.widget.update:
                  id: btn_2
                  bg_color: 0x1E293B
                  bg_opa: 80%


  - platform: homeassistant
    id: ha_btn_3
    entity_id: switch.office_shelly_plug
    trigger_on_initial_state: true
    on_state:
      then:
        - if:
            condition:
              lambda: 'return x;'
            then:
              - lvgl.widget.update:
                  id: btn_3
                  bg_color: 0xFFD400
                  bg_opa: 80%
            else:
              - lvgl.widget.update:
                  id: btn_3
                  bg_color: 0x1E293B
                  bg_opa: 80%


  - platform: homeassistant
    id: ha_btn_4
    entity_id: switch.home_assistant_voice_093377_mute
    trigger_on_initial_state: true
    on_state:
      then:
        - if:
            condition:
              lambda: 'return x;'
            then:
              - lvgl.widget.update:
                  id: btn_4
                  bg_color: 0xFFD400
                  bg_opa: 80%
            else:
              - lvgl.widget.update:
                  id: btn_4
                  bg_color: 0x1E293B
                  bg_opa: 80%




sensor:
  - platform: homeassistant
    id: ha_temp_climate_panel
    entity_id: sensor.outdoor_meter_temperature
    on_value:
      then:
        - lvgl.label.update:
            id: temp_1_value
            text: !lambda |-
              if (std::isnan(x)) return std::string("--.-°C");
              return str_sprintf("%.1f°C", x);

  - platform: homeassistant
    id: ha_temp_meter_pro
    entity_id: sensor.meter_pro_temperature
    on_value:
      then:
        - lvgl.label.update:
            id: temp_2_value
            text: !lambda |-
              if (std::isnan(x)) return std::string("--.-°C");
              return str_sprintf("%.1f°C", x);

    
lvgl:
  displays:
    - my_display
  touchscreens:
    - my_touchscreen
  buffer_size: 25%
  color_depth: 16
  default_font: font_bold_24
  # Shared look for all grid boxes
  style_definitions:
    - id: btn_style
      bg_color: 0x1E293B
      bg_opa: 80%
      radius: 12
      border_width: 0
      text_color: 0xFFFFFF
      text_font: font_bold_20
      text_align: CENTER
  # Wallpaper behind every page
  bottom_layer:
    widgets:
      - image:
          src: img_background
          align: CENTER
  pages:
    - id: main_page
      bg_opa: TRANSP
      scrollbar_mode: "OFF"
      widgets:

        - label:
            id: brand_label
            align: TOP_RIGHT
            x: -10
            y: 18
            text: "Smart Home Circle"
            text_color: 0xE2E8F0
            text_font: font_bold_24

        - obj:
            id: grid_panel
            align: BOTTOM_MID
            y: -10
            width: 1004
            height: 530
            bg_opa: TRANSP
            border_width: 0
            scrollbar_mode: "OFF"
            pad_all: 6
            layout:
              type: GRID
              grid_rows: [FR(1), FR(1), FR(1)]
              grid_columns: [FR(1), FR(1), FR(1), FR(1), FR(1), FR(1)]
              pad_row: 14
              pad_column: 14
            widgets:
              # ---------- left half: nested 2 x 2 (boxes 1-4) ----------
              - obj:
                  id: left_panel
                  grid_cell_row_pos: 0
                  grid_cell_column_pos: 0
                  grid_cell_row_span: 3
                  grid_cell_column_span: 3
                  grid_cell_x_align: STRETCH
                  grid_cell_y_align: STRETCH
                  bg_opa: TRANSP
                  border_width: 0
                  scrollbar_mode: "OFF"
                  pad_all: 0
                  layout:
                    type: GRID
                    grid_rows: [FR(1), FR(1)]
                    grid_columns: [FR(1), FR(1)]
                    pad_row: 14
                    pad_column: 14
                  widgets:
                    # ---------- box 1: Light ----------
                    - button:
                        id: btn_1
                        styles: btn_style
                        checkable: false
                        grid_cell_row_pos: 0
                        grid_cell_column_pos: 0
                        grid_cell_x_align: STRETCH
                        grid_cell_y_align: STRETCH
                        checked:
                          bg_color: 0xFFD400
                          bg_opa: 40%
                        widgets:
                          - label:
                              id: btn_1_icon
                              align: CENTER
                              y: -30
                              text: "\U000F0335"
                              text_font: font_icons
                              text_color: 0xFFFFFF
                          - label:
                              id: btn_1_text
                              align: CENTER
                              y: 40
                              text: "Light"
                              text_color: 0xFFFFFF
                              text_font: font_bold_24
                        on_click:
                          then:
                            - homeassistant.action:
                                action: light.toggle
                                data:
                                  entity_id: light.light
                    # ---------- box 2: TV ----------
                    - button:
                        id: btn_2
                        styles: btn_style
                        checkable: false
                        grid_cell_row_pos: 0
                        grid_cell_column_pos: 1
                        grid_cell_x_align: STRETCH
                        grid_cell_y_align: STRETCH
                        checked:
                          bg_color: 0xFFD400
                          bg_opa: 40%
                        widgets:
                          - label:
                              id: btn_2_icon
                              align: CENTER
                              y: -30
                              text: "\U000F0502"
                              text_font: font_icons
                              text_color: 0xFFFFFF
                          - label:
                              id: btn_2_text
                              align: CENTER
                              y: 40
                              text: "TV"
                              text_color: 0xFFFFFF
                              text_font: font_bold_24
                        on_click:
                          then:
                            - logger.log: "TV pressed"
                            - homeassistant.action:
                                action: switch.toggle
                                data:
                                  entity_id: switch.third_reality_e3
                    # ---------- box 3: Desk lamp ----------
                    - button:
                        id: btn_3
                        styles: btn_style
                        checkable: false
                        grid_cell_row_pos: 1
                        grid_cell_column_pos: 0
                        grid_cell_x_align: STRETCH
                        grid_cell_y_align: STRETCH
                        checked:
                          bg_color: 0xFFD400
                          bg_opa: 40%
                        widgets:
                          - label:
                              id: btn_3_icon
                              align: CENTER
                              y: -30
                              text: "\U000F097E"
                              text_font: font_icons
                              text_color: 0xFFFFFF
                          - label:
                              id: btn_3_text
                              align: CENTER
                              y: 40
                              text: "Desk lamp"
                              text_color: 0xFFFFFF
                              text_font: font_bold_24
                        on_click:
                          then:
                            - logger.log: "Desk lamp pressed"
                            - homeassistant.action:
                                action: switch.toggle
                                data:
                                  entity_id: switch.office_shelly_plug
                    # ---------- box 4: Lamp ----------
                    - button:
                        id: btn_4
                        styles: btn_style
                        checkable: false
                        grid_cell_row_pos: 1
                        grid_cell_column_pos: 1
                        grid_cell_x_align: STRETCH
                        grid_cell_y_align: STRETCH
                        checked:
                          bg_color: 0xFFD400
                          bg_opa: 40%
                        widgets:
                          - label:
                              id: btn_4_icon
                              align: CENTER
                              y: -30
                              text: "\U000F06B5"
                              text_font: font_icons
                              text_color: 0xFFFFFF
                          - label:
                              id: btn_4_text
                              align: CENTER
                              y: 40
                              text: "Lamp"
                              text_color: 0xFFFFFF
                              text_font: font_bold_24
                        on_click:
                          then:
                            - logger.log: "Lamp pressed"
                            - homeassistant.action:
                                action: switch.toggle
                                data:
                                  entity_id: switch.home_assistant_voice_093377_mute
              # ---------- right half, rows 0-1: clock ----------
              - obj:
                  id: time_panel
                  styles: btn_style
                  grid_cell_row_pos: 0
                  grid_cell_column_pos: 3
                  grid_cell_row_span: 2
                  grid_cell_column_span: 3
                  grid_cell_x_align: STRETCH
                  grid_cell_y_align: STRETCH
                  scrollbar_mode: "OFF"
                  pad_all: 10
                  layout:
                    type: FLEX
                    flex_flow: COLUMN
                    flex_align_main: CENTER
                    flex_align_cross: CENTER
                    flex_align_track: CENTER
                    pad_row: 16
                  widgets:
                    - label:
                        id: time_label
                        text: "--:--"
                        text_font: font_time
                        text_color: 0xFFFFFF
                    - label:
                        id: date_label
                        text: "Waiting for time"
                        text_font: font_date
                        text_color: 0xE2E8F0

              # ---------- right half, row 2: two temperature boxes ----------
              - obj:
                  id: sensor_panel
                  grid_cell_row_pos: 2
                  grid_cell_column_pos: 3
                  grid_cell_column_span: 3
                  grid_cell_x_align: STRETCH
                  grid_cell_y_align: STRETCH
                  bg_opa: TRANSP
                  border_width: 0
                  scrollbar_mode: "OFF"
                  pad_all: 0
                  layout:
                    type: GRID
                    grid_rows: [FR(1)]
                    grid_columns: [FR(1), FR(1)]
                    pad_column: 6
                  widgets:
                    - obj:
                        id: temp_1_box
                        styles: btn_style
                        grid_cell_row_pos: 0
                        grid_cell_column_pos: 0
                        grid_cell_x_align: STRETCH
                        grid_cell_y_align: STRETCH
                        scrollbar_mode: "OFF"
                        pad_all: 6
                        layout:
                          type: FLEX
                          flex_flow: COLUMN
                          flex_align_main: CENTER
                          flex_align_cross: CENTER
                          flex_align_track: CENTER
                          pad_row: 2
                        widgets:
                          - label:
                              id: temp_1_value
                              text: "--.-°C"
                              text_font: font_temp
                              text_color: 0xFFFFFF
                          - label:
                              id: temp_1_name
                              text: "Outdoor"
                              text_font: font_bold_20
                              text_color: 0xE2E8F0
                    - obj:
                        id: temp_2_box
                        styles: btn_style
                        grid_cell_row_pos: 0
                        grid_cell_column_pos: 1
                        grid_cell_x_align: STRETCH
                        grid_cell_y_align: STRETCH
                        scrollbar_mode: "OFF"
                        pad_all: 6
                        layout:
                          type: FLEX
                          flex_flow: COLUMN
                          flex_align_main: CENTER
                          flex_align_cross: CENTER
                          flex_align_track: CENTER
                          pad_row: 2
                        widgets:
                          - label:
                              id: temp_2_value
                              text: "--.-°C"
                              text_font: font_temp
                              text_color: 0xFFFFFF
                          - label:
                              id: temp_2_name
                              text: "Indoor"
                              text_font: font_bold_20
                              text_color: 0xE2E8F0
```
</Collapsible>

<div className="image-flex">
  <img src="/static/images/2026/elecrow-esp32-p4-display/panel-display.webp" alt="panel-display" />
</div>

<AffiliateLinksFromMetadata />