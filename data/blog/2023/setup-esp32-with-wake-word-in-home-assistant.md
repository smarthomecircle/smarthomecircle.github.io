---
title: 'ESP32 as a Local Voice Assistant With Wake Word In Home Assistant'
author: 'Amrut Prabhu'
categories: ''
tags: [Wake Word, ESP32, Voice Assistant, Home Assistant]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-11-13'
draft: false
summary: '
This article will look at how to setup an ESP32 as local voice assistant and use Wake word to invoke Home Assistant devices'
imageUrl: /static/images/2023/esp32-voice-assistant/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/R-o4xpyHj7M"

---

In this article, we will look at how we can set up an ESP32 with a microphone as a Voice Assistant to send commands to Home Assistant using a Wake Word.

<TOCInline toc={props.toc} asDisclosure />  


## Requirements

1.  **Home Assistant** up and running.  
    You can check [this](https://smarthomecircle.com/connect-wifi-on-home-assistant-on-startup) link to see how you can install it for the first time
2.  **ESPHome** is setup and running  
    In case you have not set it up, you can look at it [here](https://smarthomecircle.com/esp32-esp8266-esphome-with-home-assistant).
    <br/>
3.  **INMP441** microphone  
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

Now we will look at how we can prepare our ESP32 with a microphone and 3-watt speakers.

## Circuit Diagram for ESP32 With INMP441 Microphone

Here is the circuit diagram for connecting the ESP32 with a microphone and speakers.

![esp32-wiring-diagram.webp](/static/images/2023/esp32-voice-assistant/esp32-wiring-diagram.webp)

Here is the pin mapping table

| ESP32       | INMP441 Microphone | Speaker |  
| ----------- | ----------- | -------- |  
| Vin (5v)    |             | Vin      |  
| GND         |             | Gnd  |  
| GPIO 27     |             | DIN  |  
| GPIO 26     |   WS        | LRC  |  
| GPIO 25     |   SCK       | BCLK |  
| GPIO 33     |   SD        |      |  
| 3v3         |   VDD       |      |  
| GND         |  GND & L/R  |      |

Once you have connected the components, let’s look at the code we must flash to the ESP32 using ESPHome.

## Flashing Code to ESP32 with ESPHome

Now to flash the code required to make the ESP32 work with the microphone and speakers, you can follow these steps.

**Step 1**: Create a new device in the ESPHome dashboard by clicking on “**New Device**” in the bottom right-hand corner.

**Step 2:** Give it a name eg. “**Voice Assistant**” and click “**Next**”.

**Step 3**: Now select ESP32 from the options

![1-select-esp32-device.webp](/static/images/2023/esp32-voice-assistant/1-select-esp32-device.webp)

**Step 4**: Now, click on “**Skip**” and open the device card again by clicking on the “**Edit**” option.

![2-edit-device.webp](/static/images/2023/esp32-voice-assistant/2-edit-device.webp)

**Step 5**: Place the following YAML code.

```yaml

i2s_audio:
  - id: i2s_in
    i2s_lrclk_pin: GPIO26   #WS / LRC
    i2s_bclk_pin: GPIO25    #SCK /BCLK

microphone:
  - platform: i2s_audio
    adc_type: external
    pdm: false
    id: mic_i2s
    channel: right
    bits_per_sample: 32bit
    i2s_audio_id: i2s_in
    i2s_din_pin: GPIO33    #SD

speaker:
  - platform: i2s_audio
    id: my_speaker
    dac_type: external
    i2s_dout_pin: GPIO27   #DIN 
    mode: mono
    i2s_audio_id: i2s_in


voice_assistant:
  microphone: mic_i2s
  id: va
  noise_suppression_level: 2
  auto_gain: 31dBFS
  volume_multiplier: 4.0
  use_wake_word: false
  speaker: my_speaker
  
  on_error: 
   - if:
        condition:
          switch.is_on: use_wake_word
        then:
          - switch.turn_off: use_wake_word
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


```
  

**Step 6**: click on “**Save**” and then click on “**Install**” on the top right-hand corner.

**Step 7**: Now, click on the “**Manual Download**” option and then choose “**Modern Format**”.

**Step 8**: Save the file to your computer.

**Step 9**: Open [https://web.esphome.io](https://web.esphome.io) in Chrome or Edge browser.

**Step 10**: Hold the “**Boot**” button on the ESP32 Dev board and connect it to the computer using a USB cable.

Keep holding the “Boot” button until **Step 14**

**Step 11**: Now click on “**Connect**” and you should get a popup window like this.

![3-select-usb.webp](/static/images/2023/esp32-voice-assistant/3-select-usb.webp)

**Step 12**: Select your device and click on “**Install**”

**Step 13**: Now load the file you saved in Step 8 and click on “**Install**”.

**Step 14**: Once you see “**Erasing**” like the image below, you can now leave the “**Boot**” button on the ESP32 Dev board.

![4-erasing.webp](/static/images/2023/esp32-voice-assistant/4-erasing.webp)

With this, you have now prepared your ESP32 to communicate with the microphone and speakers.

Next, we will connect it to Home Assistant.

## Connecting ESP32 With Voice Assistant to Home Assistant

Once you have your ESP32 ready with the code in the above section, we will now connect it to Home Assistant using the ESPHome Integration.

For this, follow these steps.

**Step 1**: Click “**Settings**” in Home Assistant in the left panel.

**Step 2**: Click on “**Devices & Services**”

Now, if the device is already auto-discovered, you can click on “**Configure**” and you have now connected it to Home Assistant.

If not, then

**Step 3**: Click on “**Add Integration**” in the bottom right-hand corner.

**Step 4**: Search for “**ESPhome**” and click on it.

**Step 5**: Add the IP address of your ESP32 board that is connected to your WiFi. Keep the port number as 6053 and click submit

![5-esp32-connect-home-assistant.webp](/static/images/2023/esp32-voice-assistant/5-esp32-connect-home-assistant.webp)

Replace the above IP address with the IP address of your device.

Step 6: If you are asked to enter the encryption key then you can find that in your voice assistant device card in ESPHome under the property `api: encryption: key` . Copy and paste the key in the window.

With this, you are now done setting up the ESP32 with Voice Assistant capabilities using Home Assistant.

## Turning On the Wake Word Functionality

The wake word functionality is ready to use.

You can turn it on by going to your device in Home Assistant’s ESPHome integration and now clicking on “Use Wake Word”.

![6-use-wake-word.webp](/static/images/2023/esp32-voice-assistant/6-use-wake-word.webp)

Now use your wake word and invoke your Home Assistant devices.

If you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**Setup ESP32/ESP8266 With ESP Home**](https://smarthomecircle.com/esp32-esp8266-esphome-with-home-assistant)
-   [**Control LED Strip with Home Assistant Using WLED**](https://smarthomecircle.com/how-to-connect-led-strip-with-home-assistant-using-wled)
-   [**How I Added a Matter Device to Home Assistant**](https://smarthomecircle.com/add-matter-devices-to-home-assistant)