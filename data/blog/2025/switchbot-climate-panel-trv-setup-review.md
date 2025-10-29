---
title: 'SwitchBot Climate Panel + TRV — Review and Little Things That Matter'
author: 'Amrut Prabhu'
categories: ''
tags: [Switchbot, TRV, Climate, Matter, Home Assistant]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2025-10-20'
draft: false
autoAds: true
summary: 'A hands‑on write‑up of how I installed and lived with the SwitchBot Home Climate Panel and the Thermostat Radiator Valve (TRV)—what the process looked like, which settings actually helped, and a few “wish‑I‑knew” tips for smoother day‑to‑day use'
imageUrl: /static/images/2025/switchbot-climate-panel/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/S2J1UVsbNg8"
suggestedArticles:
  - title: "GL.iNet Slate 7 (GL‑BE3600) Review"
    url: "https://smarthomecircle.com/glinet-slate-7-wifi-7-travel-router"
  - title: "Rhasspy Speech: Boost Home Assistant Voice Control on Raspberry Pi "
    url: "https://smarthomecircle.com/rhasspy-speech-faster-than-whisper-home-assistant"
  - title: "How to Integrate Home Assistant with Google Home, Apple Home, and Alexa Without Exposing it to the Internet"
    url: "https://smarthomecircle.com/matter-bridge-home-assistant-addon-for-google-home-alexa-apple-home"
---
<TOCInline toc={props.toc} asDisclosure />  

<p align="center">
  <img src="/static/images/2025/switchbot-climate-panel/view.webp" alt="full view" />
</p>
---

<AffiliateLinks 
  title="Buy SwitchBot Climate Panel + Thermostat Radiator Valve" 
  links={[
    { store: "Amazon", url: "https://amzn.to/43cbgj7" },
    { store: "SwitchBot", url: "https://www.switch-bot.com/products/switchbot-smart-radiator-thermostat-panel-combo" }
  ]}
/>

## What these two devices do (in practice)

- **Climate Panel:** Wall unit with a clear LCD and **built‑in temperature + humidity sensor**. I treat it as the “face” of the room—quick glance, quick tap, done.  
- **TRV (Thermostat Radiator Valve):** Replaces the manual radiator knob, adds **Bluetooth control**, and quietly moves the valve to hit your setpoint.

A few things I noticed quickly:

- The TRV movement is **near‑silent** for me—no midnight clicking.  
- The panel and TRV can talk **directly over Bluetooth**; I can adjust the setpoint on the panel, and the radiator responds without any cloud service dependency.


<div class="image-flex">
  <img src="/static/images/2025/switchbot-climate-panel/trv.webp" alt="trv" />
  <img src="/static/images/2025/switchbot-climate-panel/climate-panel.webp" alt="climate panel" />
</div>
---

## At‑a‑glance details

| Device | Power | Claimed battery life | Extra Features |
|---|---|---:|---|
| Climate Panel | 4×AA | ~2 years | Two programmable buttons for scenes |
| TRV | 2×AA | ~10 months | Child lock, frost protection, open‑window detection, built‑in temp sensor |

---

## Setup: what I did and what to expect

### 1) Add the Climate Panel in the app

1. Open the SwitchBot app → **Add Device** → **Climate Panel**.  
2. **Press and hold the two buttons** on the panel (the app shows which) to enter pairing.  
3. Finish the on‑screen flow.


### 2) Mount and add the TRV

1. App → **Add Device** → **TRV (Radiator Valve)**.  
2. When the app shows the “attach” symbol, **physically mount the TRV** on the radiator.  
3. Tap **Connect Device**, then run **Calibrate**.

Calibration took a minute and then the app displayed valve position and current temperature.

<div class="image-flex" height="50">
  <img src="/static/images/2025/switchbot-climate-panel/trv-temp.webp" alt="trv-temp" />
</div>

### 3) Link the TRV to the Climate Panel (for local control)

1. In the app, open the **Climate Panel**.  
2. Choose **Radiator Thermostat** as the device to control.  
3. The panel’s buttons light up—after that I just **tap the panel** to nudge the temperature and the TRV follows.

Small but satisfying: I don’t have to reach for my phone to tweak the heat.

<div class="image-flex">
  <img src="/static/images/2025/switchbot-climate-panel/climate-panel-app.webp" alt="climate-panel-app" />
</div>


---

## Placement tips that helped

- **Panel height:** Mount where you naturally glance (eye‑level in that room).  
- **Avoid heat traps:** Don’t place the panel right above a radiator or in direct sunlight; it should “feel” the room, not the heater.  
- **TRV clearance:** Make sure curtains or furniture don’t press against the valve; it needs room to move and measure.

---

## The setting that changed comfort the most

The TRV has its **own temperature sensor**, but it sits right on the radiator—so it can read warmer than the room. Switching the sensor source improved things:

- In the **TRV settings**, I changed the **Temperature Source** to the **Climate Panel**.  
- That gave me a reading that feels like the actual **room temperature**, not “radiator temperature.”

I also keep **open‑window detection** enabled so the valve backs off if the temperature suddenly drops.

<div class="image-flex" height="50">
  <img src="/static/images/2025/switchbot-climate-panel/data-source.webp"  alt="data-source" />
</div>
---


## Using it with Google Home, Apple Home, Home Assistant, or Alexa (via Matter)

Out of the box, the **panel and TRV work fine over Bluetooth**. If you want them in other ecosystems, add the **SwitchBot Matter Hub Mini** and share devices via **Matter**. Here’s the flow I followed:

1. App → **Add Device** → put the **Matter Hub Mini** in pairing mode (**press ~3s**).  
2. After adding, open the hub’s **Settings → Matter** and you’ll see a **QR code**.  
3. **Press and hold the hub button ~15s** to enable **Matter pairing mode**.  
4. In **Home Assistant**, **Google Home**, etc., **scan that QR** to add the hub.  
5. Back in the hub’s **Matter settings**, **add the TRV as a secondary device** so it appears in those platforms.

After that, the TRV showed up in **Home Assistant** and **Google Home** and I could change setpoints from either app.

<div class="image-flex">
  <img src="/static/images/2025/switchbot-climate-panel/homeassistant.webp" alt="system settings" />
</div>
---

## Daily use: The feel of it

- **Responsiveness:** Panel‑to‑TRV control is snappy; tapping the panel feels “instant enough” for radiator control.  
- **Noise:** The TRV’s motor is **effectively silent** in my space; no audible buzz when it adjusts.  
- **Battery expectations:** I’ll need months to confirm, but the projected lifetimes are generous (panel ~2 years, TRV ~10 months).  
- **Independence:** Nice to have **local control first**, with the option to add Matter integrations later.

---

## Cost

- **TRV:** ~**€40**  
- **TRV + Climate Panel:** ~**€89**  
- **TRV + Climate Panel + Matter Hub Mini:** ~**€109**
- There’s mention of a **20% discount code**—if you have one, apply it at checkout.

<AffiliateLinks 
  title="Buy SwitchBot Climate Panel + Thermostat Radiator Valve" 
  links={[
    { store: "Amazon", url: "https://amzn.to/43cbgj7" },
    { store: "SwitchBot", url: "https://www.switch-bot.com/products/switchbot-smart-radiator-thermostat-panel-combo" }
  ]}
/>

---

## Final thoughts

What stood out for me is the **low‑friction control**: walk up to the wall, tap the panel, and the room heads toward the temperature I actually want—quietly. The flexibility to run **locally over Bluetooth** and later add **Matter** is a nice trajectory: start simple, then expand.

