---
title: "How to Set Up Tuya Local in Home Assistant (Complete Guide)"
author: 'Amrut Prabhu'
categories: ''
tags: [Tuya, Home Assistant, Local, Tuya Local, Smart plug, Energy Monitor]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2026-05-14'
draft: false
autoAds: true
summary: 'Learn how to set up Tuya Local in Home Assistant for fast, reliable local control. Discover how to extract your local key and track energy usage without any cloud delays.'
imageUrl: /static/images/2026/tuya-local-setup/cover.webp
youtubeLink: "https://www.youtube.com/embed/RTcaSoOcgb0"
suggestedArticles:
  - title: "Sonoff Dongle Max: what makes it “Max”"
    url: "https://smarthomecircle.com/sonoff-dongle-max-features-and-home-assistant-setup"
  - title: "How To Backup Home Assistant On Google Drive"
    url: "https://smarthomecircle.com/how-to-backup-home-assistant-on-google-drive"
  - title: "ReSpeaker XVF3800: a surprisingly solid local voice assistant for Home Assistant"
    url: "https://smarthomecircle.com/respeaker-xvf3800-home-assistant-voice-assistant"

affiliateLinks:
  title: Buy Tuya Wifi Smart Plug
  image:
    src: /static/images/2026/tuya-local-setup/tuya-plug.png
    alt: Tuya Wifi Smart Plug
  links: 
    - label: "AliExpress"
      url: "https://s.click.aliexpress.com/e/_c4SlJNBl"
    - label: "Amazon US"
      url: "https://amzn.to/4d0AK8D"
    - label: "Amazon EU"
      url: "https://amzn.to/433hX6A"
    - label: "Amazon UK"
      url: "https://amzn.to/4fcY5Fq"


---

<TOCInline toc={props.toc} asDisclosure /> 


If you have Tuya or Smart Life devices, you probably want to control them locally. Relying on the cloud can cause delays, and internet outages shouldn't stop your smart home from working.

Today, I’ll show you exactly how to set up the [**Tuya Local**](https://github.com/make-all/tuya-local) integration in Home Assistant. This allows you to control your Tuya-based devices entirely on your local network. Let's get started.

<AffiliateLinksFromMetadata />

## Step 1: Install Tuya Local via HACS

First, we need to install the Tuya Local app using HACS (Home Assistant Community Store).

1.  Go to **HACS** in Home Assistant.
    
2.  Click on the three dots and select **Custom Repositories**.
    
3.  Paste the repository URL ("https://github.com/make-all/tuya-local") for Tuya Local and select **Integration** as the category.
    
4.  Click **Add**.
    
5.  Once added, search for **Tuya Local** in HACS, click on it, and hit **Download**.
    

<p align="center">
  <img src="/static/images/2026/tuya-local-setup/Tuya-local-hacs.webp" alt="Tuya-local-hacs" />
</p>

## Step 2: Create a Tuya Developer Account

To control devices locally, we need to extract their unique identifiers from Tuya's backend.

1.  Go to [developer.tuya.com](https://developer.tuya.com/) and sign up for a free account.
    
2.  Once logged in, go to **Cloud** from the left menu and click **Project Management**.

<p align="center">
  <img src="/static/images/2026/tuya-local-setup/cloud-project.webp" alt="cloud-project" />
</p>

3.  Click **Create Cloud Project**.
    
4.  Name it (e.g., "Smart Home"), select "Smart Home" for the industry, and pick your local Data Center.
    
5.  Click **Create**. Make sure the **IoT Core** service is added and click **Authorize**.
    

<p align="center">
  <img src="/static/images/2026/tuya-local-setup/iot-package.webp" alt="iot-package" />
</p>

## Step 3: Link Your Smart Life App

Now, let's link your mobile app to your developer project.

1.  Open your newly created project and go to the **Devices** tab.
    
2.  Click **Link App Account**, then **Add App Account**.
    
3.  Select **Tuya App Account Authorization**. A QR code will appear.


<p align="center">
  <img src="/static/images/2026/tuya-local-setup/link-app.webp" alt="link-app.webp" />
</p>

4.  Open your **Smart Life app** on your phone. Tap **Add** (+) and select the scanner icon.
    
5.  Scan the QR code on your computer screen and confirm the login on your app.
    
6.  Back on your PC, select **Automatic Link** and click **OK**.
    

Your Tuya devices will now populate in the developer portal!

<p align="center">
  <img src="/static/images/2026/tuya-local-setup/tuya-devices.webp" alt="tuya-devices.webp" />
</p>

## Step 4: Get Your Device ID, IP Address, and Local Key

To connect the device to Home Assistant, we need three pieces of information.

**1. Device ID:**

-   In the Tuya Developer Portal (under your linked devices), copy the **Device ID** for the smart plug you want to add.
    

**2. IP Address:**

-   Log into your home router's admin page.
    
-   Find your smart plug in the connected devices list and copy its local **IP address**.
    

**3. Local Key:**

-   Back in the Tuya Developer portal, click on **Cloud** > **API Explorer**.
    

<p align="center">
  <img src="/static/images/2026/tuya-local-setup/api-explorer.webp" alt="api-explorer" />
</p>


-   Go to **Device Management** and scroll down to **Query device details**.
    
-   Paste your Device ID and click **Submit Request**.
    
-   Look at the response output on the right side. Find and copy the **local_key**.
    


<p align="center">
  <img src="/static/images/2026/tuya-local-setup/local-key.webp" alt="local-key.webp" />
</p>

## Step 5: Add the Device to Home Assistant

Now we bring it all together in Home Assistant.

1.  Go to **Settings** > **Devices & Services** > **Add Integration**.
    
2.  Search for **Tuya Local**.
    
3.  Select **Manually Provide Device Connection Information**. Click Next.
    

<p align="center">
  <img src="/static/images/2026/tuya-local-setup/Tuya-local-setup.webp" alt="Tuya-local-setup.webp" />
</p>

4.  Paste your **Device ID**, **IP Address**, and **Local Key**.
    
5.  Set the Protocol to **Auto** and click Submit.
    
6.  Select your specific device type from the dropdown (e.g., Aubess 20A Plug).
    
7.  Name your device, assign it to an area, and click Submit.
    

You can now toggle your device instantly over your local network!


<p align="center">
  <img src="/static/images/2026/tuya-local-setup/wifi-plug-home-assistant.webp" alt="wifi-plug-home-assistant.webp" />
</p>


## Step 6: Create a Power Consumption Sensor

If you are using a smart plug with energy monitoring, you will notice it provides power (Watts), voltage, and current, but _not_ total power consumption (kWh) out of the box. Let's fix that.

1.  Go to **Settings** > **Devices & Services** > **Helpers**.
    
2.  Click **Create Helper** and search for **Integration - Riemann sum integral sensor**.
    

<p align="center">
  <img src="/static/images/2026/tuya-local-setup/Integral-helper.webp" alt="Integral-helper.webp" />
</p>

3.  Name your sensor (e.g., "Smart Plug Power Consumption").
    
4.  Select your plug's power entity as the **Input sensor**.
    
5.  Set the Integration method to **Left Riemann sum**.
    
6.  Set the Metric prefix to **kilo** and the Time unit to **hours**.
    
7.  Click Submit.
    


<p align="center">
  <img src="/static/images/2026/tuya-local-setup/power-consumption-sensor.webp" alt="power-consumption-sensor.webp" />
</p>


## Step 7: Add to Your Energy Dashboard

Finally, let's track this data.

1.  Go to your **Energy Dashboard**.
    
2.  Click **Edit**.
    
3.  Under Individual Devices, click **Add Device**.
    
4.  Select the new power consumption entity you just created.
    
5.  Click **Save**.
    
<p align="center">
  <img src="/static/images/2026/tuya-local-setup/power-consumption-entity-1.webp" alt="power-consumption-sensor.webp" />
  <img src="/static/images/2026/tuya-local-setup/power-consumption-entity-2.webp" alt="power-consumption-sensor.webp" />
</p>

That’s it! You have successfully bypassed the cloud and set up local control and local energy monitoring for your Tuya devices.

<AffiliateLinksFromMetadata />

## Fix: Extend Tuya Developer Trail Period

In case you are facing an error as shown below while fetching the local key for your Tuya device, then you can visit [this](https://support.tuya.com/en/help/_detail/Kc3n6kr7kllhc) guide to extend your IoT core service trail period

<p align="center">
  <img src="/static/images/2026/tuya-local-setup/cloud-error.webp" alt="power-consumption-sensor.webp" />
</p>
