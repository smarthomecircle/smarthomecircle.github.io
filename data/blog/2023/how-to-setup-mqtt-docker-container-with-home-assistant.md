---
title: 'How I Setup MQTT Broker Docker Container Or Addon In Home Assistant — Step-By-Step Guide'
author: 'Amrut Prabhu'
categories: ''
tags: [MQTT, Home Assistant, Docker]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-09-07'
draft: false
summary: 'In this article, we will be looking at how we configure Frigate to detect object and then connect it to Home Assistant to receive notification.'
imageUrl: /static/images/2023/mqtt-broker-setup/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: ""
---

In this article, we will be looking at how we configure MQTT Broker as a Home Assistant Addon or run at as a Docker Container.
  
<TOCInline toc={props.toc} asDisclosure />  
In this article, we will look at how you can run an MQTT broke in Home Assistant as an Addon or as a Docker container.

## Running MQTT broker as a Home Assistant Addon

To install an MQTT broker as an Addon in Home Assistant is possible only in Home Assistant OS.

For this, go to the Addons store in settings, and search for “Mosquitto Broker” or “MQTT”

![1-mqtt-addon](/static/images/2023/mqtt-broker-setup/1-mqtt-addon.webp)

Once you see this, click on it and then click on Install.

![2-mqtt-addon-started](/static/images/2023/mqtt-broker-setup/2-mqtt-addon-started.webp)

Next, head to the “Devices & Services” section in Home Assistant “Settings”.

Here click on “Add Integration” in the bottom right-hand corner.

Now search for “MQTT” and click it.

Home Assistant will automatically find the Addon you started before and will show you the below message to confirm the connection.

![3-mqtt-integration](/static/images/2023/mqtt-broker-setup/3-mqtt-integration.webp)

Once you click submit, the MQTT broker will be configured.

## Running MQTT Broker as a Docker Container Using Docker Compose

To run the MQTT broker as a Docker Container, create a file with the name `docker-compose.yaml` and fill it will the content from below.
```yaml
version: "3.1"  
services:  
  mosquitto:  
    image: eclipse-mosquitto  
    container_name: mosquitto  
    restart: unless-stopped  
    volumes:  
      - ./mosquitto:/mosquitto  
      - ./mosquitto/data:/mosquitto/data  
      - ./mosquitto/log:/mosquitto/log  
    ports:  
      - 1883:1883  
      - 9001:9001
```
Once you save the file, you can start the Docker container using `docker compose up`

You can add the option `-d` to run in the background like this `docker compose up -d`

Now to connect it to Home Assistant, go to the Home Assistant settings page, then click on “Devices & Services” and search of the MQTT integration.

Now here you will have to specify the IP address of the machine that is running the MQTT docker image and keep the port as 1883.

![4-mqtt-broker-configuration](/static/images/2023/mqtt-broker-setup/4-mqtt-broker-configuration.webp)

With this, you are running MQTT Broker as a Docker container and have connected it to Home Assistant.

If you are interested in more such easy-to-follow guides about Home Assistant, these may be something interesting to you.


-   [**Connect Zigbee Plug Using Sonoff Zigbee 3.0 USB Dongle Plus**](https://smarthomecircle.com/connect-zigbee-device-using-sonoff-zigbee-3-dongle-plus-to-home-assistant)
-   [**How I Built My Own Air Quality Monitor With Light Sensor For Home Assistant**](https://smarthomecircle.com/air-quality-sensor-and-light-sensor-esp32-home-assistant)
-   [**How I Added a Matter Device to Home Assistant**](https://smarthomecircle.com/add-matter-devices-to-home-assistant)