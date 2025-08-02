---
title: 'How to Build Your Own Local Voice Assistant with ReSpeaker Lite and Home Assistant'
author: 'Amrut Prabhu'
categories: ''
tags: [Home Assistant, Voice Assistant, ReSpeaker Lite, micro wake word, whisper, piper]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2024-10-31'
draft: false
summary: 'Step by step guide to create your own local voice assistant with Home Assistant with on-device Wake Word detection'
imageUrl: /static/images/2024/respeaker-lite/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/XjUeJh2Ok3o"

---
<TOCInline toc={props.toc} asDisclosure />  

In this guide, we’ll walk through setting up your own local voice assistant using [Seeed Studio’s ReSpeaker Lite Voice Assistant Kit](https://www.seeedstudio.com/ReSpeaker-Lite-Voice-Assistant-Kit-p-5929.html) and Home Assistant. With this setup, you can enjoy voice command functionality without relying on cloud-based services — all while keeping your data secure and private. Plus, the process is straightforward: no soldering or wiring required! Let’s dive in.

----------

#### What You’ll Need

To start, you’ll need a few specific components:

-   **ReSpeaker Lite with XIAO ESP32S3**
-   **5W Speaker**
-   **Acrylic Enclosure (optional)**

You can buy these from [here](https://www.seeedstudio.com/ReSpeaker-Lite-Voice-Assistant-Kit-p-5929.html). You can alternatively buy it from [AliExpress](https://s.click.aliexpress.com/e/_oCuVeir).

Make sure to select the ESP32-S3 version of the ReSpeaker Lite and a 5W speaker for the best compatibility. The acrylic enclosure is optional but recommended if you want a polished look; it costs around $5. Alternatively, you can 3D print a [custom case](https://www.thingiverse.com/thing:6813270), which I did to personalize my setup.

----------

#### Step 1: Updating the Firmware

Before starting, you’ll need to update the firmware on the ReSpeaker board. Here’s how:

1.  **Connect the Device:** Use the USB port next to the microphone to connect the board to your computer.
2.  **Install dfu-util:** Install `dfu-util` based on your operating system from here(Windows, macOS, or Linux) from [here](https://wiki.seeedstudio.com/reSpeaker_usb_v3/#install-dfu-util).
3.  **Download the Firmware:** Get the latest I2S firmware from Seed Studio’s website. At the time of writing, the latest version is **1.0.9**. Make sure you download the I2S firmware and not the USB firmware. You can download the firmware from [here](https://wiki.seeedstudio.com/reSpeaker_usb_v3/#resource).
4.  **Flash the Firmware:** Once downloaded, flash the firmware onto your device using the appropriate command as listed in the documentation.

![flash-firmware](/static/images/2024/respeaker-lite/flash-firmware.webp)
Your ReSpeaker device is now ready for integration with Home Assistant.

----------

#### Step 2: Adding On-Device Wake Word Detection

To enable wake-word detection, we’ll use ESPhome, which supports **Micro Wake Word**. This feature allows the device to listen continuously for a wake word, making it more responsive.

Here’s the ESPHome Yaml Code

**Updated For Home Assistant 2025.07**

```yaml
esphome:
  name: respeaker-lite
  friendly_name: ReSpeaker-lite
  platformio_options:
    board_build.flash_mode: dio
    board_build.mcu: esp32s3
  on_boot:
    - light.turn_on:
        id: led           
        red: 0%
        green: 100%
        blue: 0%
        brightness: 60%
        effect: fast pulse 
  on_shutdown:
    then:
      # Prevent loud noise on software restart
      - lambda: id(respeaker).mute_speaker();

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
  mode: octal
  speed: 80MHz

external_components:
  - source:
      type: git
      url: https://github.com/formatBCE/esphome
      ref: respeaker_microphone
    components:
      - i2s_audio
    refresh: 0s
  - source:
      type: git
      url: https://github.com/formatBCE/Respeaker-Lite-ESPHome-integration
      ref: main
    components: 
      - respeaker_lite
    refresh: 0s

# Enable logging
logger:

# Enable Home Assistant API
api:
  encryption:
    key: "r/Sisfr4iti6gYFTiTP0/ip7PWtf59Utc1ILfK92Sco="
  on_client_connected:
        then:
          - delay: 50ms
          - light.turn_off: led
          - micro_wake_word.start:
  on_client_disconnected:
        then:
          - voice_assistant.stop: 

ota:
  - platform: esphome
    password: "9f4f17ff79c3f803413a44210d7bfddc"

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

  # Enable fallback hotspot (captive portal) in case wifi connection fails
  ap:
    ssid: "Respeaker-Lite Fallback Hotspot"
    password: "ojjt3U1DHzKn"

captive_portal:

i2c:
  - id: internal_i2c
    sda: GPIO5
    scl: GPIO6
    frequency: 400kHz

respeaker_lite:
  id: respeaker
  reset_pin: GPIO2
  mute_state:
    internal: true
    id: mute_state
  firmware_version:
    icon: mdi:application-cog
    name: XMOS firmware version
    internal: false
    id: firmware_version
  firmware:
    url: https://github.com/formatBCE/Respeaker-Lite-ESPHome-integration/raw/refs/heads/main/respeaker_lite_i2s_dfu_firmware_48k_v1.1.0.bin
    version: "1.1.0"
    md5: 9297155d1bf3eb21a9d4db52a89ea0c6

i2s_audio:
  - id: i2s_output
    i2s_lrclk_pin: 
      number: GPIO7
      allow_other_uses: true
    i2s_bclk_pin:  
      number: GPIO8
      allow_other_uses: true
    i2s_mclk_pin:  
      number: GPIO9
      allow_other_uses: true

  - id: i2s_input
    i2s_lrclk_pin:  
      number: GPIO7
      allow_other_uses: true
    i2s_bclk_pin:  
      number: GPIO8
      allow_other_uses: true
    i2s_mclk_pin:  
      number: GPIO9
      allow_other_uses: true

audio_dac:
  - platform: aic3204
    id: aic3204_dac
    i2c_id: internal_i2c

microphone:
  - platform: i2s_audio
    id: i2s_mics
    i2s_din_pin: GPIO44
    adc_type: external
    pdm: false
    sample_rate: 48000
    bits_per_sample: 32bit
    i2s_mode: secondary
    i2s_audio_id: i2s_input
    channel: stereo


speaker:

  - platform: i2s_audio
    id: i2s_audio_speaker
    sample_rate: 48000
    i2s_mode: secondary
    i2s_dout_pin: GPIO43
    bits_per_sample: 32bit
    i2s_audio_id: i2s_output
    dac_type: external
    channel: stereo
    timeout: never
    buffer_duration: 100ms
    audio_dac: aic3204_dac

  - platform: mixer
    id: mixing_speaker
    output_speaker: i2s_audio_speaker
    num_channels: 2
    source_speakers:
      - id: announcement_mixing_input
        timeout: never
      - id: media_mixing_input
        timeout: never

  - platform: resampler
    id: announcement_resampling_speaker
    output_speaker: announcement_mixing_input
    sample_rate: 48000
    bits_per_sample: 16
  - platform: resampler
    id: media_resampling_speaker
    output_speaker: media_mixing_input
    sample_rate: 48000
    bits_per_sample: 16

media_player:
  - platform: speaker
    id: external_media_player
    name: Media Player
    internal: False
    volume_increment: 0.05
    volume_min: 0.4
    volume_max: 0.85
    announcement_pipeline:
      speaker: announcement_resampling_speaker
      format: FLAC     # FLAC is the least processor intensive codec
      num_channels: 1  # Stereo audio is unnecessary for announcements
      sample_rate: 48000
    media_pipeline:
      speaker: media_resampling_speaker
      format: FLAC     # FLAC is the least processor intensive codec
      num_channels: 2
      sample_rate: 48000
    on_announcement:
      - mixer_speaker.apply_ducking:
          id: media_mixing_input
          decibel_reduction: 20
          duration: 0.0s
    files:
      - id: timer_audio
        file: https://github.com/esphome/firmware/raw/main/voice-assistant/sounds/timer_finished.wav

micro_wake_word:
  id: mww
  vad:
    probability_cutoff: 0.05
  microphone:
    microphone: i2s_mics
    channels: 1
    gain_factor: 4
  stop_after_detection: false
  models:
    - model: hey_jarvis
      probability_cutoff: 0.5
      sliding_window_size: 5
  on_wake_word_detected:
    
    - voice_assistant.start:
        wake_word: !lambda return wake_word;
        silence_detection: true
    - light.turn_on:
        id: led           
        red: 80%
        green: 0%
        blue: 80%
        brightness: 60%
        effect: fast pulse 


voice_assistant:
  microphone:
    microphone: i2s_mics
    channels: 0
  media_player: external_media_player
  micro_wake_word: mww
  use_wake_word: false
  noise_suppression_level: 0
  auto_gain: 0 dbfs
  volume_multiplier: 1
  on_stt_end:
       then: 
         - light.turn_off: led
         
  on_error:
          - micro_wake_word.start:  
  on_end:
        then:
          - light.turn_off: led
          
          - wait_until:
              not:
                voice_assistant.is_running:
          # Stop ducking audio.        
          - mixer_speaker.apply_ducking:
              id: media_mixing_input
              decibel_reduction: 0
              duration: 1.0s
          - light.turn_off: led
          - micro_wake_word.start:

# timer functionality 
  on_timer_finished:
    - switch.turn_on: timer_ringing
    - light.turn_on:
        id: led
        effect: "Slow Pulse"
        red: 80%
        green: 0%
        blue: 30%
        brightness: 80%

    - while:
        condition:
          switch.is_on: timer_ringing
        then:
          # - nabu.play_local_media_file: timer_audio
          - delay: 2s
    - light.turn_off: led
    - micro_wake_word.start:

switch:
  - platform: template
    id: timer_ringing
    optimistic: true
    internal: False
    name: "Timer Ringing"
    restore_mode: ALWAYS_OFF
    
button:
  - platform: restart
    name: "Restart"
    id: but_rest

light:
  - platform: esp32_rmt_led_strip
    id: led
    name: "Led Light"

    pin: GPIO1
    default_transition_length: 0s
    chipset: ws2812
    num_leds: 1
    rgb_order: grb
    # rmt_channel: 
    # rmt_channel: 0
    effects:
      - pulse:
          name: "Slow Pulse"
          transition_length: 250ms
          update_interval: 250ms
          min_brightness: 50%
          max_brightness: 100%
      - pulse:
          name: "Fast Pulse"
          transition_length: 100ms
          update_interval: 100ms
          min_brightness: 50%
          max_brightness: 100%

```

----------

#### Important Considerations

Before using this setup as your main voice assistant, keep the following points in mind:

1.  **Sound Quality**: The ReSpeaker is capped at a 32-bit and 16,000 Hz sample rate. This limitation arises because both the microphone and speaker share the same I2S bus, and the microphone’s 16,000 Hz rate dictates the same for the speaker. This setup is excellent for voice commands but may not be ideal for high-quality music playback.
2.  **Development Stage**: The ESPhome code we’re using is still under development. As such, there may be updates or changes that could affect functionality. I plan to use this setup as my daily driver, so stay tuned for updates on [Twitter](https://x.com/smarthomecircle) & [YouTube](https://www.youtube.com/@SmartHomeCircle) related to its stability and improvements.

----------

#### Final Thoughts and Support

This DIY local voice assistant is a fantastic way to integrate voice commands into your smart home while keeping your data local. I’ll continue to test and refine this setup, so make sure to subscribe to my [YouTube](https://www.youtube.com/@SmartHomeCircle) channel for updates.

If you enjoy my content and want to support the channel, consider [buying me a coffee](https://buymeacoffee.com/amrutprabhu).

Thanks for following along, and happy building!

-   [**Create a NAS with Raspberry Pi 5**](https://smarthomecircle.com/create-nas-with-raspberry-pi-5)
-   [**Control LED Matrix With Home Assistant Like A Pro**](https://smarthomecircle.com/how-to-control-8x32-led-matrix-like-a-pro)
-   [**Share Files With Home Assistant OS with Samba Share**](https://smarthomecircle.com/easily-share-files-with-home-assistant-using-samba-share)
-   [**Orange Pi 5 MAX: A Powerful Successor to the Orange Pi 5 Pro**](https://smarthomecircle.com/Orange-pi-5-max-a-powerful-successor-to-orange-pi-5-pro)

