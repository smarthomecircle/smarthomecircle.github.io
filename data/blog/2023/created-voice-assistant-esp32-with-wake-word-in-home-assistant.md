---
title: 'My Local Voice Assistant Device With Wake Word In Home Assistant'
author: 'Amrut Prabhu'
categories: ''
tags: [Wake Word, ESP32, Voice Assistant, Home Assistant]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-11-23'
draft: false
summary: 'In this article, we will look at how I created my voice assistant device to send commands to Home Assistant using Wake Word'
imageUrl: /static/images/2023/voice-assistant-device-with-wake-word/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/aEs5m-sn_wg"

---

In this article, we will look at how I created my voice assistant device to send commands to Home Assistant using Wake Word.

<TOCInline toc={props.toc} asDisclosure />  


## Requirements

1.  **Home Assistant** up and running.  
    You can check [this](https://smarthomecircle.com/how-to-connect-wifi-to-home-assistant-on-startup) link to see how you can install it for the first time
2.  **ESPHome** is setup and running  
    In case you have not set it up, you can look at it [here](https://smarthomecircle.com/esp32-esp8266-esphome-with-home-assistant).
    <br/>
3. **ESP32 Dev Board**  
    Links to buy this:
[![ESP32 Wroom](/static/images/2023/wled-with-home-assistant/esp32-wroom.webp)](https://s.click.aliexpress.com/e/_DB4HfST)
        -   [**AliExpress - ESP32 Dev Board**](https://s.click.aliexpress.com/e/_DB4HfST)
        -   [**Amazon - ESP32 Dev Board**](https://amzn.to/3QPvyrR)
      <br/>
4. **WS2812B LED Strip**  
    Links to buy this:
[![WS2812B LED Strip](/static/images/2023/wled-with-home-assistant/led-strip-aliexpress.webp)](https://s.click.aliexpress.com/e/_DEYtbQb)
        -   [**AliExpress - WS2812B LED**](https://s.click.aliexpress.com/e/_DEYtbQb)
        -   [**Amazon - WS2812B LED**](https://amzn.to/47nsU3F)
      <br/>
5.  **INMP441 Microphone**  
    Links to buy this:
        
[![INMP441 MICROPHONE](/static/images/2023/esp32-voice-assistant/inmp441-microphone.webp)](https://s.click.aliexpress.com/e/_Dmn2PyR)
        -   [**AliExpress - INMP441 Microphone**](https://s.click.aliexpress.com/e/_Dmn2PyR)
        -   [**Amazon - INMP441 Microphone**](https://amzn.to/47uScws)
        <br/>
4. **MAX98357A Audio Amplifier**  
    Links to buy this:
[![MAX98357A](/static/images/2023/esp32-voice-assistant/MAX98357A.webp)](https://s.click.aliexpress.com/e/_DdyIFTH)
        -   [**AliExpress - MAX98357A**](https://s.click.aliexpress.com/e/_DdyIFTH)
        -   [**Amazon - MAX98357A**](https://amzn.to/47vEMjH)      
        <br/>
5.  **3-watt Speakers** (Optional: Only required to listen to the pipeline output)  
    Links to buy these.  
[![3 watt speaker](/static/images/2023/esp32-voice-assistant/3-watt-speakers.webp)](https://s.click.aliexpress.com/e/_DBDIScT)
        -   [**AliExpress - 3-watt Speakers**](https://s.click.aliexpress.com/e/_DBDIScT)
        -   [**Amazon - 3-watt Speakers**](https://amzn.to/49BbAJR)      
    

To set up voice assistant, we would need three components to create the voice assist pipeline in Home Assistant.

1.  **Whisper**: For speech-to-text
2.  **Piper**: For text-to-speech
3.  **OpenWakeWord**: For invoking the Assist Pipeline

Now, I have set up these components using Home Assistant Addons in the video below.
<div className="md:w-1/2"> 
                      <iframe
                        id="video"
                        className="w-full aspect-video"
                        src="https://www.youtube.com/embed/P4V2JqCmk7M"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
</div>
You will get to see how to set up the following components that are required

1.  **Whisper** Addon
2.  **Piper** Addon
3.  **OpenWakeWord** Addon
4.  And finally the entire **Voice Assist** pipeline.

So make sure to watch it and set up the **Voice Assist** pipeline

## Voice Assistant Device 3D Model

The 3D model is uploaded [here](https://www.thingiverse.com/thing:6329167). You can download the STL file from there. 

Now we will look at how we can prepare our ESP32 with a microphone and 3-watt speakers.

## Circuit Diagram for Creating Voice Assistant Device With ESP32

Here is the circuit diagram for connecting the ESP32 with INMP441 Microphone, MAX98357A Audio Amplifier, and WS2812B LED Strip.

![voice-assistant-circuit-diagram.webp](/static/images/2023/voice-assistant-device-with-wake-word/voice-assistant-circuit-diagram.webp)

Here is the pin mapping table

| ESP32       | INMP441 Microphone | Speaker | W2812B LED Strip | 
| ----------- | ----------- | -------- |  ---------- |
| Vin (5v)    |             | Vin      |  5v pin |
| GND         |             | Gnd  |  GND |
| GPIO 27     |             | DIN  | |
| GPIO 26     |   WS        | LRC  | |
| GPIO 25     |   SCK       | BCLK | |
| GPIO 33     |   SD        |      | |
| 3v3         |   VDD       |      | |
| GND         |  GND & L/R  |      | |
| GPIO 32     |             |      |  DIN |

Let's look at the code we need to install in the ESP32

## ESPHome YAML Code For Voice Assistant
If you are new to how to install YAML code on an ESP32 using ESPhome then you can follow this guide, wherein I have explained how you can install code on an ESP32.
Now here is the code that you will have to add after creating a device in ESPHome

```yaml
i2s_audio:
  - id: i2s_in
    i2s_lrclk_pin: GPIO26 #WS 
    i2s_bclk_pin: GPIO25 #SCK

microphone:
  - platform: i2s_audio
    adc_type: external
    pdm: false
    id: mic_i2s
    channel: right
    bits_per_sample: 32bit
    i2s_audio_id: i2s_in
    i2s_din_pin: GPIO33  #SD Pin from the INMP441 Microphone


media_player:
  - platform: i2s_audio
    name: "esp_speaker"
    id: media_player_speaker
    i2s_audio_id: i2s_in
    dac_type: external
    i2s_dout_pin: GPIO27   #  DIN Pin of the MAX98357A Audio Amplifier
    mode: mono


voice_assistant:
  microphone: mic_i2s
  id: va
  noise_suppression_level: 2
  auto_gain: 31dBFS
  volume_multiplier: 4.0
  use_wake_word: false
  media_player: media_player_speaker
  
  on_wake_word_detected: 
    - light.turn_on:
        id: led_light
  on_listening: 
    - light.turn_on:
        id: led_light
        effect: "Scan Effect With Custom Values"
        red: 63%
        green: 13%
        blue: 93%
  
  on_stt_end:
    - light.turn_on:
        id: led_light
        effect: "None"
        red: 0%
        green: 100%
        blue: 0%

  on_error: 
    - light.turn_on:
        id: led_light
        effect: "None"
    - if:
        condition:
          switch.is_on: use_wake_word
        then:

          - switch.turn_off: use_wake_word
          - delay: 1sec 
          - switch.turn_on: use_wake_word      
  


  on_client_connected:
    - if:
        condition:
          switch.is_on: use_wake_word
        then:
          - voice_assistant.start_continuous:

  on_client_disconnected:
    - if:
        condition:
          switch.is_on: use_wake_word
        then:
          - voice_assistant.stop:
 
  on_end:
    - light.turn_off:
        id: led_light



binary_sensor:
  - platform: status
    name: API Connection
    id: api_connection
    filters:
      - delayed_on: 1s
    on_press:
      - if:
          condition:
            switch.is_on: use_wake_word
          then:
            - voice_assistant.start_continuous:
    on_release:
      - if:
          condition:
            switch.is_on: use_wake_word
          then:
            - voice_assistant.stop:


switch:
  - platform: template
    name: Use wake word
    id: use_wake_word
    optimistic: true
    restore_mode: RESTORE_DEFAULT_ON
    entity_category: config
    on_turn_on:
      - lambda: id(va).set_use_wake_word(true);
      - if:
          condition:
            not:
              - voice_assistant.is_running
          then:
            - voice_assistant.start_continuous
    
    on_turn_off:
      - voice_assistant.stop
      - lambda: id(va).set_use_wake_word(false);

light:
  - platform: neopixelbus
    id: led_light
    type: grb
    pin: GPIO32      # DIN pin of the LED Strip
    num_leds: 9      # change the Number of LEDS accordign to your LED Strip.
    name: "Light"
    variant: ws2812x
    default_transition_length: 0.5s
      
    effects:
      - addressable_scan:
          name: Scan Effect With Custom Values
          move_interval: 50ms
          scan_width: 2


```
Here is how finally the device looks like after assembling it. 

![voice-assistant.webp](/static/images/2023/voice-assistant-device-with-wake-word/voice-assistant.webp)

If you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**Setup ESP32/ESP8266 With ESP Home**](https://smarthomecircle.com/esp32-esp8266-esphome-with-home-assistant)
-   [**Control LED Strip with Home Assistant Using WLED**](https://smarthomecircle.com/how-to-connect-led-strip-with-home-assistant-using-wled)
-   [**How I Added a Matter Device to Home Assistant**](https://smarthomecircle.com/add-matter-devices-to-home-assistant)
