---
title: 'GL.iNet Comet KVM Pro Review: Wi-Fi 6 KVM-over-IP with 4K HDMI Out Passthrough'
author: 'Amrut Prabhu'
categories: ''
tags: [GliNet, KVM OVER IP, Remote Access, 4k, Audio, hdmi passthrough]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2025-09-04'
draft: false
autoAds: true
summary: 'Comet KVM Pro packs Wi-Fi 6 KVM-over-IP, 4K30 HDMI Out, mic/audio, virtual media, Tailscale, plus cloud or self-hosted management for painless remote machine control.'
imageUrl: /static/images/2025/glinet-comet-kvm-pro/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/5C0tfvfKe10"
suggestedArticles:
  - title: "GL.iNet Slate 7 (GL‑BE3600) Review"
    url: "https://smarthomecircle.com/glinet-slate-7-wifi-7-travel-router"
  - title: "I Built A DIY 10 Inch Server Rack"
    url: "https://smarthomecircle.com/I-built-a-diy-10-inch-server-rack"
  - title: "Radxa X4: 60$ Powerful Atlernative to Raspberry Pi 5"
    url: "https://smarthomecircle.com/radxa-x4-alternative-to-raspberry-pi-5"
---
<TOCInline toc={props.toc} asDisclosure />  

I was sent the Comet KVM Pro to test, and after spending time with it, here’s my  take on it. If you’re into remote management, homelab tinkering, or just want pain-free remote access to a remote machine, this one’s worth a look.

<p align="center">
  <img src="/static/images/2025/glinet-comet-kvm-pro/front-view.webp" alt="router" />
</p>

<AffiliateLinks 
  title="GL.iNet Comet KVM Pro" 
  links={[
    { store: "Kickstarter", url: " https://link.gl-inet.com/rm10-smarthomecircle-250827" },
    
  ]}
/>
| **Category**        | **Specification**                                                                 |
|---------------------|-----------------------------------------------------------------------------------|
| Operating System    | Linux 6.1 with Buildroot                                                           |
| CPU                 | Quad-core ARM Cortex-A53                                                           |
| Memory / Storage    | 1GB DDR3L / 32GB eMMC                                                             |
| Display Screen      | 2.22-inch, touchscreen                                                            |
| Wi-Fi Protocol      | 802.11 a/b/g/n/ac/ax                                                              |
| Wi-Fi Speed         | 286 Mbps (2.4 GHz), 286 Mbps (5 GHz)                                              |
| Internal Antennas   | 1× dual-band Wi-Fi antennas (2.4–2.5 GHz, 5.15–5.84 GHz)                          |
| Max. Resolution     | 4K @ 30 fps                                                                       |
| Interface           | 1× USB Type-C (keyboard, mouse) · 1× RJ45 10/100/1000 Gigabit LAN · 1× HD In · 1× HD Out · 1× USB 2.0 Type-A |
| Power Input         | 1× USB Type-C input: 5V/2A (PD compatible)                                        |
| Dimensions / Weight | 93 × 84 × 47 mm / 170 g (3.7 × 3.3 × 1.85 in)                                     |


<p align="center">
  <img src="/static/images/2025/glinet-comet-kvm-pro/back-view.webp" alt="router" />
</p>


## Connectivity & I/O

-   **Wi-Fi 6** (2.4/5 GHz) and **Gigabit Ethernet**
    
-   **HDMI In + HDMI Out** (4K at 30 fps passthrough)
    
-   **USB-C (PD)** for power
    
-   **USB-C** for keyboard/mouse to the remote machine
    
-   **USB-A** for accessories (Fingerbot, ATX power board)
    
-   **2.2" touch display** for status and quick settings
    


<AffiliateLinks 
  title="Buy GL.iNet Slate 7" 
  links={[
    { store: "GLiNet Store", url: "https://link.gl-inet.com/be3600-smarthomecircle-eustore-250523" },
    { store: "Amazon US", url: "https://amzn.to/3IwT8t7" },
    { store: "Amazon DE", url: "https://amzn.to/44FkqWP" },
    { store: "AliExpress", url: "https://s.click.aliexpress.com/e/_oDLL1GK" }
  ]}
/>

## Why this KVM stood out to me

I’ve used the earlier [Comet KVM](https://smarthomecircle.com/comet-kvm-gl-rm1-review-best-kvm-over-ip-2025) (the tiny “just-works” box) and liked it for basic remote control with audio out. The **Pro** model, though, feels like the “no-compromises” version:

-   **Wi-Fi 6 (2.4 & 5 GHz)**: Connect the KVM over wireless and get going—no more hunting for a LAN cable every time. There’s **Gigabit Ethernet** too if you prefer rock-solid wired.
    
-   **HDMI Out (4K30 passthrough)**: You can keep a **local monitor, keyboard, and mouse** connected and still access the machine remotely via KVM. No more choosing between “local” or “remote.”
    
-   **Mic-in + audio out**: Talk from your computer to the remote machine and hear its audio. For WFH or remote troubleshooting with apps that need a mic, this is a best for it.
    
-   **2.2" touch screen**: Shows status (IP, ports connected, Wi-Fi/Ethernet, time) and lets you quickly toggle Wi-Fi, switch networks, adjust brightness, enable screen lock, or set an always-on display. Surprisingly responsive.
    
-   **Accessories control (USB-A)**: can connect to accessories like **Fingerbot** (similar to “SwitchBot Bot”) to physically press the button and an **ATX board** to trigger a desktop/server’s power pins.
    
-   **Virtual media + storage**: With **32 GB eMMC** (about **26 GB usable**), you can upload files/ISOs to share with the remote machine and do **OS installs remotely**, even during machine boot.
    

All of that is just the hardware story. What really ties it together is the software—so let’s peek at the firmware (I’m on v1.6 beta) and see how these features show up in real use.

----------
## WebUI Feature Walkthrough ( Firmware version v1.6 beta)
<div class="image-flex">
  <img src="/static/images/2025/glinet-comet-kvm-pro/webui.webp" alt="system settings" />
</div>
Once I logged into the web UI (my unit’s on **v1.6 beta**), it felt familiar in a good way—clean layout, quick to find things, and no mystery toggles. The basics are where I always start: under **Video** I can pick a quality level, switch between **WebRTC** or **Direct** transport, and set the remote machine’s resolution. 

**Audio** gets its own attention. You can access the speaker output and **microphone input** of the remote machine. This make easier for sending audio and receiving audio from the remote machine.

**Network** is equally straightforward: choose **DHCP** or a **static IP** for Ethernet, and quickly enable/disable **Wi-Fi** or jump to another network using the settings provided.


<div class="image-flex">
  <img src="/static/images/2025/glinet-comet-kvm-pro/system-settings.webp" alt="system settings" />
  <img src="/static/images/2025/glinet-comet-kvm-pro/speaker-settings.webp" alt="speaker-settings" />
  <img src="/static/images/2025/glinet-comet-kvm-pro/toolbox.webp" alt="toolbox" />
  <img src="/static/images/2025/glinet-comet-kvm-pro/shortcuts.webp" alt="toolbox" />
</div>


The **Toolbox** is where you will find some useful controls. I can paste text straight into the remote machine, then trigger common shortcuts like **Ctrl+Alt+Del**. You can send a **Wake-on-LAN** packet to start the machine when the remote machine is off. 
If you want to access the internals of the KVM, you can also access it via the  built-in **Terminal**. This lets you peek at the KVM’s internals (processes, etc.), which is handy when you want to confirm what’s running without SSHing from elsewhere.

**Virtual Media** allow you to mount files or ISOs to the remote machine as if they were plugged in locally, which makes OS installs and recovery sessions feel almost routine. 

Finally, the **App Center** has **Tailscale** integration, to make remote access simple and secure.

----------
## Cloud vs self-host: you choose

GL.iNet offers a **cloud service** to bind and manage multiple KVMs over the internet. If you prefer full control, there’s also a [lightweight, open-source remote management platform](https://github.com/gl-inet/glkvm-cloud) you can **self-host**.  
As someone who values flexibility, I’m happy they didn’t lock this behind a single proprietary service.

----------
## Size & mounting

<div class="image-flex">
  <img src="/static/images/2025/glinet-comet-kvm-pro/size.webp" alt="system settings" />
</div>
It’s **about twice the size of the JetKVM** but **slightly smaller than GL.iNet’s Slate 7 travel router**. I’m putting together a **10" rack-mount** for it and will share the 3D print files soon.

----------

## Pricing & availability

At the time of writing, the Comet KVM Pro is available via [Kickstarter]( https://link.gl-inet.com/rm10-smarthomecircle-250827). Pricing is mentioned as follows:

-   **$135** with **Fingerbot**
    
-   **$123** with the **ATX board**
    

Estimated shipping is this **December 2025**. If you’re reading this much later, check the campaign or official store for current status.

> I already have the device in hand, which gives me confidence they’re far along—but as always with crowdfunded hardware, there is always a caution you have to be aware of.


----------

## Final thoughts

The **Comet KVM Pro** feels like a well-made, thought-through KVM-over-IP that cuts real friction: **touch screen**, **wireless setup**, **HDMI passthrough** and **mic-in/audio** are the headliners. Wi-Fi 6 removes real-life annoyances of hunting for cable conneciton and HDMI Out means no “local vs. remote” issue. Mic + audio can help with WFH calls if that is your use case. The tiny 2.2" touchscreen is surprisingly handy for some quick overview and quick access to some settings. 
Bottom line: a modern, no-nonsense KVM-over-IP that’s earned a spot in my rack. 

## Support the Channel

Enjoyed this article? Consider supporting the channel:

-   ✅ **Subscribe** to the [YouTube channel](https://www.youtube.com/@SmartHomeCircle?sub_confirmation=1)
    
-   ☕ **Support my work** on [Patreon](https://patreon.com/AmrutPrabhu) or [Buy Me a Coffee](https://www.buymeacoffee.com/amrutprabhu)


