---
title: 'Setup Home Assistant Connect ZBT-2 With Home Assistant Container And Zigbee2MQTT Container — Step By Step Guide'
author: 'Amrut Prabhu'
categories: ''
tags: [Home Assistant, Zigbee2mqtt, Zigbee, docker, container]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2025-11-27'
draft: false
autoAds: true
summary: 'We will look at setting up the new Home Assistant ZBT-2 with Home Assistant Container and Zigbee2MQTT container'
imageUrl: /static/images/2025/home-assistant-zbt-2/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/YReKqqCN968"
suggestedArticles:
  - title: "Setup Zigbee2Mqtt with Home Assistant"
    url: "https://smarthomecircle.com/install-zigbee2mqtt-with-home-assistant"
  - title: "Connect Zigbee Plug Using Sonoff Zigbee 3.0 USB Dongle Plus To Home Assistant "
    url: "https://smarthomecircle.com/connect-zigbee-device-using-sonoff-zigbee-3-dongle-plus-to-home-assistant"
  - title: "I Built A DIY 10 Inch Server Rack"
    url: "https://smarthomecircle.com/I-built-a-diy-10-inch-server-rack"
---

<TOCInline toc={props.toc} asDisclosure /> 


<p align="center">
  <img src="/static/images/2025/home-assistant-zbt-2/home-assistant-connect-zbt-2.webp" alt="home-assistant-connect-zbt-2" />
</p>


I run home assistant using docker and I want to share with you how we can use the new **Home Assistant Connect ZBT-2** with Home Assistant running as a docker **container**. We will also look at using the ZBT-2 with **Zigbee2MQTT** running as docker container.

## Install Zigbee Firmware

Firstly, we have to install the **Zigbee firmware** on the **Home Assistant Connect ZBT-2**.

1. Open [this](https://toolbox.openhomefoundation.org/home-assistant-connect-zbt-2/install/) link to flash the Zigbee firmware.

2. Connect you ZBT-2 to your comupter and click on install firmware

<p align="center">
  <img src="/static/images/2025/home-assistant-zbt-2/flash-firmware.webp" alt="flash-firmware" />
</p>

3. Select the ZBT-2 and wait till it shows this screen.

<p align="center">
  <img src="/static/images/2025/home-assistant-zbt-2/change-firmware.webp" alt="change-firmware" />
</p>


4. Click on change firmware and select the Zigbee option and click on install. 

<p align="center">
  <img src="/static/images/2025/home-assistant-zbt-2/select-zigbee.webp" alt="select-zigbee" />
</p>


With this the **Zigbee** firmware will be installed on the **Home Assistant Connect ZBT-2**.

## Setup Home Assistant Connect ZBT-2 With Home Assistant Docker Container.

Once you connect the ZBT-2 to the machine running Home Assistant as a docker container, we need to find the device path of the ZBT-2. 

1. Create the following script as `find-usb.sh`.

```sh
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

2. Make the script executable and execute it.
```sh
chmod +x find-usb.sh
./find-usb.sh
```
3. You should see the device path the ZBT-2. e.g in this case it is `/dev/ttyACM1`

<p align="center">
  <img src="/static/images/2025/home-assistant-zbt-2/find-usb.webp" alt="find-usb" />
</p>

4. Update the docker compose file of your Home Assistant to include the device path under the devices section. 
```yaml
services:
  home-assistant:
    image: ghcr.io/home-assistant/home-assistant:stable
    pull_policy: always
    volumes:
      - /dev:/dev
      - ./config/:/config/
    devices:
      - /dev/ttyACM1:/dev/ttyACM1  #this is the place where you need to specify the device path.
    container_name: assistant
    network_mode: host
    restart: always
```

5. Save the docker compose file and restart **Home Assistant**. You should be able to see the device pop up in the devices section in Home Assistant.

<p align="center">
  <img src="/static/images/2025/home-assistant-zbt-2/device-pop-up.webp" alt="device in home assistant" />
</p>


## Setup Home Assistant Connect ZBT-2 with Zigbee2MQTT Docker Container

1. Find the device path using the `find-usb.sh` script specified above. 

2. Update **Zigbee2MQTT** docker compose file to include the path under the devices section. 

```yaml
services:
  zigbee2mqtt:
    container_name: zigbee2mqtt
    restart: unless-stopped
    devices:
      - /dev/ttyACM1:/dev/ttyACM1
    ports:
      - "8080:8080"
    volumes:
      - ./data:/app/data
      - /run/udev:/run/udev:ro
    environment:
      - TZ=Europe/Amsterdam
    image: ghcr.io/koenkk/zigbee2mqtt
```
Pay attension to the volumes section, where we are mounting a local directory. We will create a `configuration.yaml` file in this directory for **Zigbee2MQTT** to use it.

3. Create a file with the name `configuration.yaml` under the `data` folder in the current directory and add the path as shown below.
```yaml
mqtt:
  server: mqtt://192.168.0.43:1883 # these should be your mqtt url
  serial:
    port: /dev/ttyACM1  # specify the path here
frontend:
  enabled: true
advanced: {}
homeassistant:
  enabled: true
serial:
  adapter: ember 
  port: /dev/ttyACM1  # specify the path here
  baudrate: 460800
```

5. Restart your Zigbee2MQTT container and it should start using the new Home Assistant Connect ZBT-2.

