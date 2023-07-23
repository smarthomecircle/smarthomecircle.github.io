---
title: 'How to Install Home Assistant and Connect to WIFI on Raspberry PI'
author: 'Amrut Prabhu'
categories: ''
tags: [Home Assistant, OS, Raspberry Pi, wifi]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-06-22'
draft: false
summary: 'In this article we will look into how we can install Home Assistant OS and connect it to the Wifi on boot up.'
imageUrl: /static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: https://www.youtube.com/embed/oqN_AA93Atg
---


This article is a step-by-step guide on installing Home Assistant on a Raspberry PI and connecting to WIFI on boot up.

## Installing Home Assistant On Raspberry PI.

To install this Home Assistant OS on your SD card, you will need to follow the following steps

1.  Download the Raspberry Pi Imager from [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/)
2.  After installing the imager on your system open it.

![](/static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/1.jpg)

3. click on Choose OS and select “Other specific-purpose OS”.

![](/static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/2.jpg)

4. Then select “Home assistants and home automation” and then select “Home Assistant”

![](/static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/3.jpg)

5. Finally select “Home Assistant OS” depending on the Raspberry PI you have. For example, select RPi 4 for Raspberry PI 4.

![](/static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/4.jpg)

6. Next, Select your storage i.e. your SD card by clicking on “choose storage”.

![](/static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/5.jpg)

7. Make sure you select your SD card here and **not** your computer's hard drive.

![](/static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/6.jpg)

8. With this we are now ready to write the Home Assistant OS on the SD card.

9. Now click on write, you will be prompted for a password to confirm you want to write to the SD card.

With this, you will soon start writing the Home Assistant OS on the SD card.

![](/static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/7.jpg)

Once this finishes, your SD card will automatically be ejected. You will have to reinsert the SD card to your computer.

You can connect a LAN cable to the Raspberry PI and your router and already start up Home Assistant.

But in case you want to start it up by connecting to the WiFi then follow the next set of instructions.

If you are on the Ubuntu system follow the next these steps.

If you are using a Windows system then the steps are mentioned below this section.

## Setting up a WIFI connection using an Ubuntu system

**Step 1:** run the command `sudo fdisk -l` . You should see some devices something like this.

![](/static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/8.jpg)

**Step 2:** Mount the device with the type “Microsoft reserved” using the command `sudo mount -t auto <device location> /mnt/ha` . Make sure you replace the device id from the output of step number 1.

For example for the above list, `sudo mount -t auto /dev/mmcblk0p1 /mnt/ha`

Also, make sure that the location `/mnt/ha` is a directory. If it does not exist then make a directory with the command `sudo mkdir -p /mnt/ha` .

**Step 3:** Change your current directory to `/mnt/ha` using `cd /mnt/ha`and create a folder `config/network` folders inside it using `sudo mkdir -p config/network` .

**Step 4:** Now change your directory to the network directory using `cd config/network` and create a file named `my-network`using the `vi` editor.

**Step 5:** Paste the below content in the file and update the places where you have to put the Wifi SSID and Wifi password.


![](/static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/9.jpg)

![](/static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/10.jpg)

that's all you have to do.

Now you can insert the card in the Raspberry PI and wait for it to connect to the Wifi on boot up.

### Scan Your Network

You can scan the network to see if the Raspberry PI is connected using this command by first finding the network interface of your Ubuntu system using the command`sudo arp-scan`and using the interface name run the following command
```shell
sudo arp-scan -l --interface <name of the network interface>
```
## Setting up a WIFI connection using a Windows system

Insert the SD card again in the computer and you will be able to see a boot drive popping up.

![](/static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/11.jpg)

**Step 1:** Open the drive and create a folder called `config` . Then open the config folder and create another folder called `network` .

**Step 2:** Inside the network folder create a file with the name `my-network` . make sure you do not give any extension to the file.

![](/static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/12.jpg)

**Step 3:** Add the following configuration to the file.

![](/static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/13.jpg)

**Step 4:** Change the Wifi SSID and password in the file as per your Wifi SSID and password.

That’s all, you have now set up the wifi configuration.

Now eject the SD card and insert it into the Raspberry PI and boot up the RaspberryPI.

You can run the command `arp -a` on the command line to find out the IP address of Home Assistant.

## Accessing Your Home Assistant

You can access your Home Assistant from the web browser by the following address
```shell
http://<ip address of raspberrypi>:8123
```
Or you can access it using the location
```shell
http://homeassistant.local:8123
```
![](/static/images/2023/install-homeassistant-with-wifi-on-raspberry-pi/14.jpg)

You can always follow the step-by-step guide in the Youtube video mentioned above.

