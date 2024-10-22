---
title: 'How to Integrate Home Assistant with Google Home, Apple Home, and Alexa Without Exposing it to the Internet'
author: 'Amrut Prabhu'
categories: ''
tags: [Home Assistant, Home Assistant Add-On, Matter, Apple Home, Google Home, Alexa]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2024-10-24'
draft: false
summary: 'Securely connect Home Assistant devices to Google Home, Apple Home, and Alexa without internet exposure.'
imageUrl: /static/images/2024/matter-bridge-addon/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/169M3z38Ys4"

---
<TOCInline toc={props.toc} asDisclosure />  

Smart home enthusiasts often face the challenge of integrating Home Assistant with popular ecosystems like Google Home, Apple Home, and Amazon Alexa. Typically, this required either a [Nabu Casa](https://www.nabucasa.com) subscription or a workaround using services like Cloudflared, which expose your Home Assistant instance to the internet. However, there's now a solution that allows you to share your devices with these ecosystems while keeping Home Assistant running locally, without needing external access. This solution is an add-on called [**Matter Bridge**](https://github.com/Luligu/matterbridge).

## What is the Matter Bridge Add-on?

The Matter Bridge add-on enables your Home Assistant instance to share devices with other smart home ecosystems using the Matter protocol, all while ensuring Home Assistant remains local-only. Unlike other solutions that require cloud-based access, this bridge works locally, ensuring that your setup is more secure and does not depend on external servers.

Follow the steps below to configure the add-on.

1.  Navigate to **Setting** > **Add-ons**. Click on **Add-On Store**
2.  Click the 3 dots on the top right-hand corner, then on **Repositories**
3.  Add the following URL  
    ```
    https://github.com/t0bst4r/matterbridge-home-assistant-addon
    ```
4.  Search for **Matter Bridge.**
5.  Click on **Install** and **Start** the Add-On.

![Addon](/static/images/2024/matter-bridge-addon/matter-bridge-installation.webp)

## Running Matter Bridge As A Container

If you're running Home Assistant using Docker, you can also run the Matter Bridge as a container. Here is the docker compose file to run the addon as Docker container.

```yaml
services:
  matterbridge:
    image: ghcr.io/t0bst4r/matterbridge-home-assistant:latest
    restart: unless-stopped
    network_mode: host
    environment:
      MHA_CONFIG: |
            {
              "homeAssistant": {
                "url": "http://Home_Assistant_URL:8123/",
                "accessToken": "YOUR_HOME_ASSISTANT_TOKEN",
                "matcher": {
                  "includeDomains": ["light"]
                }
              }
            }
    volumes:
      - ./data:/root/.matterbridge
```
Make sure to replace the url and then token value in the file. You can also find the various config options [here](https://github.com/t0bst4r/matterbridge-home-assistant?tab=readme-ov-file#configuration)

## How Does the Matter Bridge Work?

The Matter Bridge enables certain devices in Home Assistant to be recognized by ecosystems like Google Home, Apple Home, and Alexa as Matter devices. However, there are a few caveats to consider:

1. **Limited Device Support**: The Matter specification currently supports a limited range of devices. For example, while smart plugs and switches work well, more complex entities, like power usage sensors, might not appear in other ecosystems. This is because these sensors aren't yet recognized as Matter-supported devices.

2. **Device Discovery Issues**: During my testing, I noticed that when I added a new Zigbee device to Home Assistant, it did not immediately appear in the Matter Bridge's device list. After waiting for about 30 minutes without success, I restarted the add-on, and only then did the device show up in Home Assistant and the other ecosystems. So, if you're experiencing similar issues, a simple restart of the add-on might resolve the problem.

## Important Notes on the Add-on

The Matter Bridge add-on I’m using is not created by the original developer of [Matter Bridge](https://github.com/Luligu/matterbridge) but is instead a community-provided version from another [GitHub user](https://github.com/t0bst4r). The original Matter Bridge developer add-on did not have a plugin to add Home Assistant devices as Matter devices.

Additionally, the developer of the current add-on has exciting plans to rebrand and evolve it into a new project called [**Home Assistant Matter Hub**](https://github.com/t0bst4r/matterbridge-home-assistant/discussions/271). This new project will feature a different interface and additional functionality, so stay tuned for updates! 

Since this is an open-source project, if you'd like to support the developer, you can do so by buying him a coffee in this [link](https://github.com/t0bst4r/matterbridge-home-assistant)

## Final Thoughts

The Matter Bridge add-on opens up a lot of possibilities for integrating Home Assistant with other smart home ecosystems while keeping your setup local and secure. Although there are a few limitations due to the Matter protocol's current scope, this solution is a great step forward for users who prioritize security and local control.

Check out [Smart Home Scenes](https://smarthomescene.com/) for more smart home-related content, as their site introduced me to the Matter Bridge, and they have a wealth of useful information.

If you're interested in this integration, consider giving the Matter Bridge add-on a try, and don't forget to support the developers behind it!

You can explore more of such easy to follow step by step guides about Home Assistant with these few suggestions

-   [**Create a NAS with Raspberry Pi 5**](https://smarthomecircle.com/create-nas-with-raspberry-pi-5)
-   [**Control LED Matrix With Home Assistant Like A Pro**](https://smarthomecircle.com/how-to-control-8x32-led-matrix-like-a-pro)
-   [**Share Files With Home Assistant OS with Samba Share**](https://smarthomecircle.com/easily-share-files-with-home-assistant-using-samba-share)
-   [**Create Your Voice Assistant With On-Device Wake Word Detection On ESP32 & Micro Wake Word**](https://smarthomecircle.com/How-I-created-my-voice-assistant-with-on-device-wake-word-using-home-assistant)

