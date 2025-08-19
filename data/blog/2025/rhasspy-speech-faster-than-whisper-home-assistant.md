---
title: 'Rhasspy Speech: Boost Home Assistant Voice Control on Raspberry Pi — Faster Than Whisper'
author: 'Amrut Prabhu'
categories: ''
tags: [Voice Assistant, Home Assistant, Rhasspy Speech, Raspberry Pi, micro wake word, piper]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2025-08-21'
draft: false
summary: 'Discover how the Rhasspy Speech addon can supercharge your Home Assistant voice assistant on Raspberry Pi. Learn setup, performance tips, and why it might beat Whisper for speed.'
imageUrl: /static/images/2025/rhasspy-speech/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/0c1OCGVprnI"

---
<TOCInline toc={props.toc} asDisclosure />  


If you’ve been exploring **local voice assistants with Home Assistant**, you’ve probably come across the powerful but resource-heavy **Whisper** speech-to-text engine. I’ve been down that road myself — starting with an [**ESP32 and OpenWakeWord**](https://smarthomecircle.com/created-voice-assistant-esp32-with-wake-word-in-home-assistant), moving to an [**ESP32-S3 with on-device wake word detection**](https://smarthomecircle.com/How-I-created-my-voice-assistant-with-on-device-wake-word-using-home-assistant), and eventually trying out the [**Voice Assistant Preview Edition**](https://youtu.be/4PP14HErHl4) from Home Assistant.

While these setups varied, one thing stayed constant: **Whisper was always the speech-to-text engine**. And while it’s accurate, it can be slow and demanding — especially if you’re running Home Assistant on a **Raspberry Pi**.

## The Whisper Challenge: Accuracy vs Speed

Whisper comes in different models:
- **Small models**: Faster but less accurate.
- **Large models**: More accurate, but slower and more resource-intensive.

For reference, I’ve been using the **medium-int-8 model**, which:
- Converts speech to text in about **3 seconds** on my mini PC.
- Has roughly **90% accuracy**.

![whisper-performance](/static/images/2025/rhasspy-speech/whiper-performance.webp)

But most of us start with a **Raspberry Pi**, and for that hardware, Whisper’s heavier models can feel painfully slow. The question is — do you really need to **upgrade to a mini PC** for good voice control?  
**The answer: not necessarily.**

---

## Meet the Rhasspy Speech

The **Rhasspy Speech** Addon is a lightweight, fast alternative to Whisper. It’s available directly from the **Home Assistant Add-on Store**.

#### How It Works
Instead of transcribing anything you say, Rhasspy matches your commands to a set of **pre-trained phrases**. For example:
- “Turn on the light.”
- “What’s the time?”
- “What’s the temperature in the bedroom?”

![whisper-performance](/static/images/2025/rhasspy-speech/rhasspy-ui.webp)

The Rhasspy Speech addon lets you access the Intents section to view all devices integrated with your Home Assistant. Using the UI, you can Train it with common device commands, add your own custom sentences using a simple YAML format. Then you can integrate the addon via the Wyoming integration so your voice assistant pipeline can start using Rhasspy for speech-to-text.

---

## Lightning-Fast Performance on Raspberry Pi

When I tested Rhasspy, it recognized my speech in **under 1 second** — on a **Raspberry Pi 4**.  
That’s huge for Pi users who don’t want to invest in a mini PC.

![rhasspy-performance.webp](/static/images/2025/rhasspy-speech/rhasspy-performance.webp)

--- 

## My 15-Day Experience

Over the past two weeks of daily use, Rhasspy Speech has consistently impressed me with its near-instant recognition speed. Commands are processed in **under a second**, which makes interacting with my smart home feel natural and fluid. In terms of **accuracy**, I’ve observed an average of **around 80%**, which is slightly lower than Whisper’s ~90% detection rate. However, in real-world use, the snappy responsiveness often outweighed the occasional misinterpretation. 

As a result, I’ve completely switched to using Rhasspy Speech as my primary speech-to-text engine for everyday Home Assistant control, finding it far more enjoyable for quick and common voice commands.

---

## When Rhasspy Might Fall Short

Rhasspy works brilliantly for everyday, **common voice commands**, but it’s not a one-size-fits-all solution. If you’re using **AI agents** and want to ask open-ended questions or have more natural conversations, you might find it not useful. The same goes for very **customized phrasing** — unless you’ve taken the time to train Rhasspy with those exact sentences, it may not always understand what you mean.

---

## Installation and Setup

### On Home Assistant OS

Getting started is straightforward — just head to the **Add-on Store**, search for **Rhasspy Speech**, and install it. Once it’s running, you can use the built-in UI to train the addon with your common sentences and custom commands.

![rhasspy-addon.webp](/static/images/2025/rhasspy-speech/rhasspy-addon.webp)

### On Home Assistant Container

If you’re running Home Assistant in a container, you can still use Rhasspy Speech by running it as a **Docker container**. In this setup, there’s no training UI — instead, Rhasspy automatically trains itself when it starts, using the devices and aliases already in your Home Assistant setup. The only catch is that if you add or rename devices, you’ll need to restart the container so it can pick up the changes.

Here is the docker compose definition
```yaml
services:
  wyoming-speech-to-phrase:
    image: rhasspy/wyoming-speech-to-phrase
    container_name: wyoming-speech-to-phrase
    ports:
      - "10300:10300"
    volumes:
      - ./models:/models
      - ./train:/train
    command: >
      --hass-websocket-uri ws://192.168.0.43:8123/api/websocket
      --hass-token <replace this with your Home Assistant Token>
    stdin_open: true
    tty: true
```

---

## Why Rhasspy is Worth a Try

Rhasspy Speech is a quick, **lightweight** alternative to Whisper for Home Assistant voice control. If you’re on a **Raspberry Pi 4 or 5**, it’s an easy way to keep things fast and responsive without spending money on a more powerful PC.

---

----------

## 🙌 **Support & Subscribe**

If you enjoyed this project and want to see more like it:

-   ✅ **Subscribe** to the [YouTube channel](https://www.youtube.com/@SmartHomeCircle?sub_confirmation=1)
    
-   ☕ **Support my work** on [Patreon](https://patreon.com/AmrutPrabhu) or [Buy Me a Coffee](https://www.buymeacoffee.com/amrutprabhu)
    
-   🔁 **Share** this article with fellow makers and tinkerers

If you are interested in exploring more of such easy to follow step by step guides, then here are a few suggestions.

-   [**Local Voice Assistant with ReSpeaker Lite**](https://smarthomecircle.com/local-voice-assistant-with-seeed-studio-respeaker-lite)
-   [**Setup On-Device Wake Word Detection For Voice Assistant**](https://smarthomecircle.com/How-to-setup-on-device-wake-word-for-voice-assistant-home-assistant)
-   [**Easily Share Files With Home Assistant OS**](https://smarthomecircle.com/easily-share-files-with-home-assistant-using-samba-share)
-   [**Control LED Strip with Home Assistant**](https://smarthomecircle.com/how-to-connect-led-strip-with-home-assistant-using-wled)