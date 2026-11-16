---
title: 'Voice Assistant Timers With On-Device Wake Word Detection On ESP32 S3'
author: 'Amrut Prabhu'
categories: ''
tags: [Wake Word, Micro Wake Word, ESP32, Voice Assistant, Home Assistant]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2024-07-18'
draft: false
autoAds: true
summary: 'In this article, we will look at how I added timers to my Voice Assistant with an ESP32 S3 with on-device Wake Word detection'
imageUrl: /static/images/2024/add-timer-to-voice-assistant/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/QMCB6hLPUM4"

---

In this article, we will look at how to add timers to your voice Assistant with On-Device Wake Word detection on an ESP32 S3.

<TOCInline toc={props.toc} asDisclosure />  


## Requirements

1.  **Home Assistant** up and running.  
    You can check [this](https://smarthomecircle.com/how-to-connect-wifi-to-home-assistant-on-startup) link to see how you can install it for the first time
2.  **ESPHome** is setup and running  
    In case you have not set it up, you can look at it [here](https://smarthomecircle.com/esp32-esp8266-esphome-with-home-assistant).
3. **ESP32 S3 N8R2 or N16R8 Dev Board**

[![ESP32 S3 ](/static/images/components/esp32-s3-n8r2.webp)](https://s.click.aliexpress.com/e/_DFopt57)

<AffiliateLinks 
  title="" 
  links={[
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_DFopt57" },
    { store: "Amazon", url: "https://amzn.to/3xnA8ax" }
  ]}
/>

Guide for ordering ESP32 N8R2 or N16R8 Board is [here](https://docs.espressif.com/projects/esp-idf/en/stable/esp32s3/hw-reference/esp32s3/user-guide-devkitc-1.html#ordering-information)
      <br/>
4.  **INMP441 Microphone**

[![INMP441 MICROPHONE](/static/images/2023/esp32-voice-assistant/inmp441-microphone.webp)](https://s.click.aliexpress.com/e/_Dmn2PyR)

<AffiliateLinks 
  title="" 
  links={[
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_Dmn2PyR" },
    { store: "Amazon", url: "https://amzn.to/3GdxO7o" }
  ]}
/>
        <br/>
5. **MAX98357A Audio Amplifier**

[![MAX98357A](/static/images/2023/esp32-voice-assistant/MAX98357A.webp)](https://s.click.aliexpress.com/e/_DdyIFTH)

<AffiliateLinks 
  title="" 
  links={[
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_DdyIFTH" },
    { store: "Amazon", url: "https://amzn.to/46wKTmW" }
  ]}
/>      
        <br/>
6.  **3-watt Speakers** (Optional: Only required to listen to the pipeline output)

[![3 watt speaker](/static/images/2023/esp32-voice-assistant/3-watt-speakers.webp)](https://s.click.aliexpress.com/e/_DBDIScT)

<AffiliateLinks 
  title="" 
  links={[
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_DBDIScT" },
    { store: "Amazon", url: "https://amzn.to/49BbAJR" }
  ]}
/>      


7.  **COB 5mm WS2812B LED Strip**

[![WS2812B LED Strip](/static/images/components/Ws2812b-cob-led-strip.webp)](https://s.click.aliexpress.com/e/_DDtD9SP)

<AffiliateLinks 
  title="" 
  links={[
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_DDtD9SP" },
    { store: "Amazon", url: "https://amzn.to/3yqR7t7" }
  ]}
/>      


## Set up Voice Assistant
To create your voice assistant with ESP32 S3, you can refer to my article "[How To Setup On-Device Wake Word Detection For Voice Assistant using Micro Wake Word](https://smarthomecircle.com/How-to-setup-on-device-wake-word-for-voice-assistant-home-assistant)". You will get a step-by-step guide to create your voice assistant there.

## Implement Timers
To implement the timers feature, use the following YAML code.

** **Updated for Home Assistant 2025.07** **

```yaml
esphome:
  name: esp32-s3-wake-word
  friendly_name: ESP32-S3-Wake-word
  platformio_options:
    board_build.flash_mode: dio
  on_boot:
    - light.turn_on:
        id: led_ww
        blue: 100%
        brightness: 60%
        effect: fast pulse

esp32:
  board: esp32-s3-devkitc-1
  framework:
    type: esp-idf

    sdkconfig_options:
      CONFIG_ESP32S3_DEFAULT_CPU_FREQ_240: "y"
      CONFIG_ESP32S3_DATA_CACHE_64KB: "y"
      CONFIG_ESP32S3_DATA_CACHE_LINE_64B: "y"
      CONFIG_AUDIO_BOARD_CUSTOM: "y"
   
psram:
  mode: octal # Please change this to quad for N8R2 and octal for N16R8
  speed: 80MHz

# Enable logging
logger:
  # hardware_uart: UART0

api:
  encryption:
    key: "TFpb+pBAvQIS1MVwaA7EoJ2DkpWE+79UvVro7yMyGdU="
  on_client_connected:
        then:
          - delay: 50ms
          - light.turn_off: led_ww
          - micro_wake_word.start:
  on_client_disconnected:
        then:
          - voice_assistant.stop: 



ota:
  - platform: esphome
    password: "1245211a05eef56614a2ef5a3f3e971c"

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  # Enable fallback hotspot (captive portal) in case wifi connection fails
  ap:
    ssid: "Esp32-S3-Wake-Word"
    password: "LJfUrdJk3svP"

captive_portal:


button:
  - platform: restart
    name: "Restart"
    id: but_rest

switch:
  - platform: template
    id: mute
    name: mute
    optimistic: true
    on_turn_on: 
      - micro_wake_word.stop:
      - voice_assistant.stop:
      - light.turn_on:
          id: led_ww           
          red: 100%
          green: 0%
          blue: 0%
          brightness: 60%
          effect: fast pulse 
      - light.turn_on:
          id: led_strip           
          red: 100%
          green: 0%
          blue: 0%
          brightness: 60%
          effect: fast pulse 
          
      - delay: 2s
      - light.turn_off:
          id: led_ww
      - light.turn_off:
          id: led_strip

      - light.turn_on:
          id: led_ww          
          red: 100%
          green: 0%
          blue: 0%
          brightness: 30%
      - light.turn_on:
          id: led_strip           
          red: 100%
          green: 0%
          blue: 0%
          brightness: 30%

    on_turn_off:
      - micro_wake_word.start:
      - light.turn_on:
          id: led_ww           
          red: 0%
          green: 100%
          blue: 0%
          brightness: 60%
          effect: fast pulse 
      - light.turn_on:
          id: led_strip  
          red: 0%
          green: 100%
          blue: 0%
          brightness: 60%
          effect: fast pulse 
      - delay: 2s
      - light.turn_off:
          id: led_strip
      - light.turn_off:
          id: led_ww
  - platform: template
    id: timer_ringing
    optimistic: true
    internal: False
    name: "Timer Ringing"
    restore_mode: ALWAYS_OFF


# GPIO Mute Button Config
binary_sensor:
  - platform: gpio
    id: button01
    name: "Mute Button" # Physical Mute switch
    pin:
      number: GPIO10
      inverted: True
      mode:
        input: True
        pullup: True
    on_press: 
      if:
        condition:
          switch.is_on: timer_ringing 
        then:
          - switch.turn_off: timer_ringing
        else:
          - switch.toggle: mute



light:
  - platform: esp32_rmt_led_strip
    id: led_ww
    rgb_order: GRB
    pin: GPIO48
    num_leds: 1
    rmt_symbols: 96
    chipset: ws2812
    name: "On board light"
    effects:
      - pulse:
      - pulse:
          name: "Fast Pulse"
          transition_length: 0.5s
          update_interval: 0.5s
          min_brightness: 0%
          max_brightness: 100%

  - platform: esp32_rmt_led_strip
    id: led_strip    # LED Strip Config
    rgb_order: GRB
    pin: GPIO09
    num_leds: 29
    rmt_symbols: 96
    chipset: ws2812
    name: "Led Strip"
    effects:
      - pulse:
      - pulse:
          name: "Fast Pulse"
          transition_length: 0.5s
          update_interval: 0.5s
          min_brightness: 0%
          max_brightness: 100%
      - addressable_scan:
          name: "Scan Effect With Custom Values"
          move_interval: 5ms
          scan_width: 10

          
          
 # Audio and Voice Assistant Config          
i2s_audio:
  - id: i2s_in # For microphone
    i2s_lrclk_pin: GPIO3  #WS 
    i2s_bclk_pin: GPIO2 #SCK

  - id: i2s_speaker #For Speaker
    i2s_lrclk_pin: GPIO6  #LRC 
    i2s_bclk_pin: GPIO7 #BLCK

microphone:
  - platform: i2s_audio
    id: va_mic
    adc_type: external
    i2s_din_pin: GPIO4 #SD
    channel: left
    pdm: false
    i2s_audio_id: i2s_in
    bits_per_sample: 32bit
    
speaker:
  - platform: i2s_audio
    id: i2s_audio_speaker
    sample_rate: 48000
    bits_per_sample: 16bit
    i2s_audio_id: i2s_speaker
    i2s_dout_pin: GPIO8   #  DIN Pin of the MAX98357A Audio Amplifier
    dac_type: external
    channel: stereo
    timeout: never
    buffer_duration: 100ms


media_player:
  - platform: speaker
    id: external_media_player
    name: Media Player
    internal: False
    volume_increment: 0.05
    volume_min: 0.4
    volume_max: 1
    announcement_pipeline:
      speaker: i2s_audio_speaker
      format: FLAC     # FLAC is the least processor intensive codec
      num_channels: 1  # Stereo audio is unnecessary for announcements
      sample_rate: 48000
    files:
      - id: timer_finished_sound
        file: https://github.com/esphome/home-assistant-voice-pe/raw/dev/sounds/timer_finished.flac
      

micro_wake_word:
  on_wake_word_detected:
    
    - voice_assistant.start:
        wake_word: !lambda return wake_word;
        silence_detection: true
    - light.turn_on:
        id: led_ww           
        red: 30%
        green: 30%
        blue: 70%
        brightness: 60%
        effect: fast pulse 
    - light.turn_on:
        id: led_strip
        effect: "Scan Effect With Custom Values"
        red: 80%
        green: 0%
        blue: 80%
        brightness: 80%
  models:
    - model: okay_nabu
    
voice_assistant:
  id: va
  microphone: va_mic
  auto_gain: 31dBFS
  noise_suppression_level: 2
  volume_multiplier: 4.0
  media_player: external_media_player
  on_stt_end:
       then: 
         - light.turn_off: led_ww
         - light.turn_off: led_strip
  on_error:
          - micro_wake_word.start:  
  on_end:
        then:
          - light.turn_off: led_ww
          - light.turn_off: led_strip
          - wait_until:
              not:
                voice_assistant.is_running:
          - micro_wake_word.start: 
  
  
  on_timer_finished:
    - micro_wake_word.stop:
    - voice_assistant.stop:
    - switch.turn_on: timer_ringing
    - wait_until:
        not:
          microphone.is_capturing:
    
    - wait_until:
        not:
          micro_wake_word.is_running:
    - light.turn_on:
        id: led_strip
        effect: "Scan Effect With Custom Values"
        red: 80%
        green: 0%
        blue: 30%
        brightness: 80%
    
    - media_player.speaker.play_on_device_media_file:
          media_file: timer_finished_sound
    - micro_wake_word.start:
    - wait_until:
        and:
          - micro_wake_word.is_running:
    #       - microphone.is_capturing:
    - while:
        condition:
          switch.is_on: timer_ringing
        then:
          - media_player.speaker.play_on_device_media_file:
              media_file: timer_finished_sound
          - delay: 2s
    - wait_until:
        not:
          speaker.is_playing:
    
    - light.turn_off: led_strip
    - micro_wake_word.start:
 
```
With this, you can configure timers in an ESP32 S3 with On-Device Wake Word detection for your Voice Assistant connected to Home Assistant.

-   [**I Created My Voice Assistant With On-Device Wake Word Detection**](https://smarthomecircle.com/How-I-created-my-voice-assistant-with-on-device-wake-word-using-home-assistant)
-   [**Setup ESP32 CAM With ESP Home and Home Assistant**](https://smarthomecircle.com/esp32-cam-esphome-with-home-assistant)
-   [**Connect Home Assistant to the WIFI on First Boot**](https://smarthomecircle.com/how-to-connect-wifi-to-home-assistant-on-startup)
