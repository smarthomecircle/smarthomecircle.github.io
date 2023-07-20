---
title: 'How I Setup ESP32/ESP8266 With ESP Home and Home Assistant OS And Container - Step By Step Guide'
author: 'Amrut Prabhu'
categories: ''
tags: [Home Assistant Container, ESP32, ESP8266, Home Assistant, Ubuntu, Raspberry Pi, docker compose]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-07-20'
draft: false
summary: 'In this article we will look into how we can setup ESP32 / ESP8266 with ESP Home and Home Assistant'
imageUrl: /static/images/2023/esp32-esp8266-esphome-with-home-assistant/cover.png
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/S6If_kj9MCM"
---

## Pre-Requisites

-   Home Assistant OS Or Home Assistant Container up and running.
-   ESP32/ESP8266 Device.
-   SSH access to the device Or Terminal on the device.

If you are installing Home Assistant on Raspberry PI, you can refer to the article [here](https://smarthomecircle.com/connect-wifi-on-home-assistant-on-startup) where I explain how to install Ubuntu on raspberry pi.

## Installing ESP Home In Home Assistant OS

Click on Settings on the left panel then click on Addons

Then, click on the “Add-On Store” in the bottom right-hand corner

Select ESPHome

![](/static/images/2023/esp32-esp8266-esphome-with-home-assistant/1-esphome.png)

Click on Install and then “Show in sidebar”

![](/static/images/2023/esp32-esp8266-esphome-with-home-assistant/2-esphome-addon.png)

  

## Setting Up ESP Home Container with Home Assistant Container

Create a file with the name `docker-compose.yaml` and add the following config
```yaml
version: '3'

services:
  esphome:
    image: ghcr.io/esphome/esphome:latest
    volumes:
      - ./config:/config:rw
      # Use local time for logging timestamps
      - /etc/localtime:/etc/localtime:ro
    network_mode: host
    restart: always
```
  
All the configs will be stored in the current directory in the `config` folder.

Next, start the ESP Home container using Docker with the following Command
```shell
docker compose up -d
```
Make sure you are running this command in the same directory as the docker compose file.

This will start the container and then make it a background process.

You can check the logs of the container using the following command.
```shell
docker compose logs -f
```
## Installing Configuration to ESP32 with ESP Home

We will be adding a Wifi signal strength sensor and HTTP server to the ESP32 device.

In ESP Home, click on “New Device”, then provide a name for your device.

If you are doing it for the first time, it will ask you for your wifi credentials.

Then select ESP32 or ESP8266 depending on your board.

Next, We need to edit the configuration file.

Add the following to the end of the file.
```yaml
sensor:  
  - platform: wifi_signal  
    name: "WiFi Signal Sensor"  
    update_interval: 1s  
  
web_server:  
  port: 80
```
Your file would look something like this.

![](/static/images/2023/esp32-esp8266-esphome-with-home-assistant/3-esp32-configuration.png)

Once you are done, click on save and then click on the install option.

![](/static/images/2023/esp32-esp8266-esphome-with-home-assistant/4-manual-download.png)

Now, select “Manual Download” then click on “Modern Format” and wait for it to start compiling.

Once it's completed, the generated file will be downloaded or you can click on the download button.

Now, go to [https://web.esphome.io](https://web.esphome.io) , connect your ESP32 to the USB port, and click on connect

![](/static/images/2023/esp32-esp8266-esphome-with-home-assistant/5-web-esphome.png)

Once presented with a window, select the “USB Single Serial”

![](/static/images/2023/esp32-esp8266-esphome-with-home-assistant/6-select-web-esphome.png)

Next, click on the “Install” Option and select the file which we just downloaded previously, and then click Install.

![](/static/images/2023/esp32-esp8266-esphome-with-home-assistant/7-install-web-esphome.png)

Finally when you see connecting progress, press and hold the “Boot” button on your ESP32 until you see the Installing progress bar.

Once finished, unplug the device and connect it again and wait for 1–2 mins for it to connect to your Wifi Network.

You will now have to search the IP address of the device in your router or use some network tool.

Once you figured out the IP address of the device simply paste the IP in the browser and you will see the ESP32 device webpage from the HTTP Server we added.

![](/static/images/2023/esp32-esp8266-esphome-with-home-assistant/8-esp32-http-server.png)

## Connecting ESP32 with Home Assistant

Navigate to settings in Home Assistant, then click on devices, then click on “Add integration” in the bottom right corner

Then search for ESPHome

![](/static/images/2023/esp32-esp8266-esphome-with-home-assistant/9-esphome.png)

Now specify the IP address and keep the port as 6053 and then click submit. No need to change the port.

![](/static/images/2023/esp32-esp8266-esphome-with-home-assistant/10-esp32-home-assistant-setup.png)

Now, if it asks you for an encryption key, then you will find this in the configuration file in the ESPHome.

![](/static/images/2023/esp32-esp8266-esphome-with-home-assistant/11-encryption-key.png)

With this, you are done.

In the ESPHome click on the devices

![](/static/images/2023/esp32-esp8266-esphome-with-home-assistant/11-esphome-homeassistant.png)

Here you will be able to see the ESP32 device.

![](/static/images/2023/esp32-esp8266-esphome-with-home-assistant/12-home-assistant-esp32-device.png)