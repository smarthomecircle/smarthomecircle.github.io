---
title: 'How to Run Home Assistant Container with Docker'
author: 'Amrut Prabhu'
categories: ''
tags: [Home Assistant Container, Home Assistant, Ubuntu, Raspberry Pi, docker compose]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-06-29'
draft: false
summary: 'In this article we will look into how we can run Home Assistant Container with Docker'
imageUrl: /static/images/2023/run-home-assistant-container/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/Cvjc66-mkFo"
---

<TOCInline toc={props.toc} asDisclosure />

## Pre-Requisites

-   A device with Ubuntu running.
-   Active internet connection to the device.
-   SSH access to the device Or Terminal on the device.

If you are installing this on Raspberry PI, you can refer to the article [here](https://smarthomecircle.com/connect-wifi-on-home-assistant-on-startup) where I explain how to install Ubuntu on raspberry pi.

## Installing Docker and Docker Compose

You can go to [this](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository) website to install Docker and Docker Compose. This is the official Docker website to install Docker.

In the above link, follow the two parts i.e.

-   Set up the repository ( 3 steps)
-   Install Docker Engine ( 3 steps)

Once you are ready with the 3rd step and you can run the hello world docker image, we will then make the docker command run without the `sudo` command i.e. without root permissions.

For this follow [this](https://docs.docker.com/engine/install/linux-postinstall/) link and perform the 4 steps.

At the end of the 4th step, you should be able to run the `docker` command without `sudo` .

## Create Home Assistant Docker Compose file

Create a `docker-compose.yaml` file and add the following content.
```yaml
version: '3'  
services:  
  homeassistant:  
    container_name: homeassistant  
    image: "ghcr.io/home-assistant/home-assistant:stable"  
    volumes:  
      - <YOUR_CONFIG_LOCATION>:/config  
      - /etc/localtime:/etc/localtime:ro  
    restart: unless-stopped  
    privileged: true  
    network_mode: host
```
In this, replace the `YOUR_CONFIG_LOCATION` with a location on your system so that you can store the configs on your machine and will not be lost when the container stops or restarts.

## Starting Home Assistant Container

Once you create the above `docker-compose.yaml`file, in the same directory run the following command
```shell
docker compose up -d
```
This will start the Home Assistant Container using Docker Compose.

You can now access the Home Assistant using your browser at the following location
```shell
http://<your_machine_IP_address>:8123
```
Replace the `your_machine_IP_address` with the IP address of the Ubuntu device.

With this, you are now running Home Assistant Container using Docker Compose.
