---
title: 'How to Setup Zigbee2Mqtt with Home Assistant — Step By Step Guide'
author: 'Amrut Prabhu'
categories: ''
tags: [Zigbee, Zigbee2mqtt, Sonoff Dongle Plus, MQTT, Home Assistant]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-10-02'
draft: false
summary: 'In this article, we will look at how you can set up a Zigbee2Mqtt with Home Assistant'
imageUrl: /static/images/2023/zigbee2mqtt-setup/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/9c2XUjobVB8"
---
In this article, we will look at how you can set up a Zigbee2Mqtt with Home Assistant

<TOCInline toc={props.toc} asDisclosure />  

## Requirements

1.  Home Assistant up and running.  
    You can check [this](https://smarthomecircle.com/connect-wifi-on-home-assistant-on-startup) link to see how you can install it for the first time
2.  MQTT Broker setup  
    You can check [this](https://smarthomecircle.com/how-to-setup-mqtt-docker-container-with-home-assistant) link to set it up.
3.  A Zigbee Adapter Coordinator  
-   [**Sonoff Zigbee 3.0 USB Dongle Plus**](https://amzn.to/456Yzp1)
[![Sonoff Zigbee 3.0 USB Dongle Plus](/static/images/2023/sonoff-zigbee-3-dongle-home-assistant/sonoff-zigbee-3-dongle-plus-image.webp)](https://amzn.to/456Yzp1)
- [**Amazon**](https://amzn.to/456Yzp1)
- [**Aliexpress**](https://s.click.aliexpress.com/e/_DemtGJ9)
    
4.  A Zigbee device.  
    In our case, we will use a Zigbee plug.
-   [**Zigbee Plug**](https://s.click.aliexpress.com/e/_DchhTXp)
[![Zigbee Plug](/static/images/2023/sonoff-zigbee-3-dongle-home-assistant/zigbee-plug.webp)](https://s.click.aliexpress.com/e/_DchhTXp)
- [**Amazon**](https://amzn.to/3ZFioSq)
- [**Aliexpress**](https://s.click.aliexpress.com/e/_DchhTXp)

There are two ways to set up Zigbee2Mqtt.

As a Home Assistant add-on or run it as a Docker container.

## Setting Up Zigbee2Mqtt as a Home Assistant Add-On

To install Zigbee2Mqtt as a Home Assistant add-on, navigate to the “Add-ons” in Home Assistant settings, then click on “Add-on Store” in the bottom right-hand corner, then click on the 3 dots in the top right-hand corner and click “Repositories”

![1-home-assistant-add-on](/static/images/2023/zigbee2mqtt-setup/1-home-assistant-add-on.webp)

  

Now add the following repository URL and click “Add”
```
https://github.com/zigbee2mqtt/hassio-zigbee2mqtt
```
Now, refresh the UI and you should be able to see Zigbee2Mqtt

![2-zigbee2mqtt-install](/static/images/2023/zigbee2mqtt-setup/2-zigbee2mqtt-install.webp)

Click on this, and then click on “Install”.

After it is installed, we will have to provide it with some configuration.

So now click on the configuration tab, and provide two configs: Your MQTT broker URL and Your Zigbee adapter

You will have to provide the MQTT URL as below
```
url: mqtt:// <IP address of your MQTT broker> : 1883
```
If you are using the Home Assistant MQTT broker, provide your Home Assistant URL.

Now to find this serial port value of our Zigbee USB Dongle, you must have SSH access to your Home Assistant.

Once you SSH into Home Assistant, run the following command.
```shell
ls -l /dev/serial/by-id
```
Since I am using the Sonoff Zigbee Dongle E version, It shows me this.

![3-search-adapter](/static/images/2023/zigbee2mqtt-setup/3-search-adapter.webp)

Now copy value `ttyACM0` from this output and paste it into the serial section like this.

![4-zigbee2mqtt-configuration](/static/images/2023/zigbee2mqtt-setup/4-zigbee2mqtt-configuration.webp)

Because I am using the Sonoff Dongle E version I have to specify the adapter `ezsp` .

You can find the option for your adapter [here](https://www.zigbee2mqtt.io/guide/adapters/).

Next, with this, go to the info tab and click on “Start”

And with this, your Zigbee2Mqtt is now up and running. If you check the logs tab, you should be able to see that Zigbee2Mqtt has started

![5-zigbee2mqtt-logs](/static/images/2023/zigbee2mqtt-setup/5-zigbee2mqtt-logs.webp)

You can access the Zigbee2Mqtt view using the option on the left panel.

![6-zigbee2mqtt-addon](/static/images/2023/zigbee2mqtt-setup/6-zigbee2mqtt-addon.webp)

## Running Zigbee2Mqtt As A Docker Container.

To run the Zigbee2Mqtt as a docker container you can start it with docker compose.

For this create a file called `docker-compose.yaml` and add the following content
```yaml
version: '3'  
services:  
  zigbee2mqtt:  
    container_name: zigbee2mqtt  
    restart: unless-stopped  
    devices:  
      - /dev/ttyACM0:/dev/ttyACM0  
    ports:  
      - "8080:8080"  
    volumes:  
      - ./data:/app/data  
      - /run/udev:/run/udev:ro  
    environment:  
      - TZ=Europe/Amsterdam  
    image: koenkk/zigbee2mqtt
```
Here you have to specify the location of the Zigbee dongle in the `devices` property.

To find the location of your Zigbee dongle, make sure you have connected the dongle to your machine, create a file called `find-usb.sh` and paste the following content
```shell
for sysdevpath in $(find /sys/bus/usb/devices/usb*/ -name dev); do  
    (  
        syspath="${sysdevpath%/dev}"  
        devname="$(udevadm info -q name -p $syspath)"  
        [[ "$devname" == "bus/"* ]] && exit  
        eval "$(udevadm info -q property --export -p $syspath)"  
        [[ -z "$ID_SERIAL" ]] && exit  
        echo "/dev/$devname - $ID_SERIAL"  
    )  
done
```
Next, make this as an executable file using the following command
```
chmod +x find-usb.sh
```
Next, run this file using the `./` command as below
```
./find-usb.sh
```
![7-zigbee2mqtt-adapter](/static/images/2023/zigbee2mqtt-setup/7-zigbee2mqtt-adapter.webp)

As you can see in the image above, the dongle location is `/dev/ttyACM0` and we will use this value in the `docker-compose.yaml` file from above.

Next, we will create the configuration file for Zigbee2Mqtt

For this create the a `data`folder in the same directory where your `docker-compose.yaml` file is present and then create a `configuration.yaml` file inside the `data` folder with the following content
```yaml
permit_join: true  
mqtt:  
  server: mqtt://192.168.0.43:1883  
  serial:  
    port: /dev/ttyACM0  
frontend: true  
advanced:  
  homeassistant_legacy_entity_attributes: false  
  legacy_api: false  
  legacy_availability_payload: false  
device_options:  
  legacy: false  
devices: {}  
homeassistant:  
  legacy_entity_attributes: true  
  legacy_triggers: true
```
Here, specify the IP address of the MQTT server. In my case, it was `192.168.0.43:1883`

Now with this, you are ready to start the Zigbee2Mqtt server.

Now, from the location where the `docker-compose.yaml` is located, run the command `docker compose up`

With this, you can now access the Zigbee2Mqtt interface using the IP address of your machine and port 8080 as shown.

![8-zigbee2mqtt-ui](/static/images/2023/zigbee2mqtt-setup/8-zigbee2mqtt-ui.webp)

## Connecting Zigbee Device with Zigbee2Mqtt And Home Assistant

With the Zigbee2Mqtt up and running, we will now connect a Zigbee device.

For this, put the device in Pairing mode and then click on the “Permit Join (All)” button in the zigbee2Mqtt Interface.

The Zigbee2Mqtt should automatically be able to detect and configure your device.

![9-zigbee-device-with-zigbee2mqtt](/static/images/2023/zigbee2mqtt-setup/9-zigbee-device-with-zigbee2mqtt.webp)

Now, go to Home Assistant Settings, click on “Devices & Services”, then search for your MQTT integration and you will be able to see your Zigbee device configured in Home Assistant

![10-home-assistant-zigbee2mqtt](/static/images/2023/zigbee2mqtt-setup/10-home-assistant-zigbee2mqtt.webp)

Now if you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**Connect Zigbee Plug Using Sonoff Zigbee 3.0 USB Dongle Plus**](https://smarthomecircle.com/connect-zigbee-device-using-sonoff-zigbee-3-dongle-plus-to-home-assistant)
-   [**Setup ESP32 Cam with Frigate And Home Assistant To Detect Objects**](https://smarthomecircle.com/how-to-setup-frigate-with-home-assistant)
-   [**How I Added a Matter Device to Home Assistant**](https://smarthomecircle.com/add-matter-devices-to-home-assistant)

<br/>