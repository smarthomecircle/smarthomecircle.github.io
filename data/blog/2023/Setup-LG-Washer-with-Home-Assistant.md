---
title: 'Setup LG Washer with Home Assistant using ThinQ Integration'
author: 'Amrut Prabhu'
categories: ''
tags: [LG, LG Washer, Home Assistant, Dashboard Cards, Dashboards]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-11-16'
draft: false
autoAds: true
summary: 'In this article we will look at how you can connect an LG Washer with Home Assistant using LG ThinQ integration and configure a dashboard card'
imageUrl: /static/images/2023/lg-washer-card/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/6pZOfskg8I"

---

This article we will look at how you can connect an LG Washer with Home Assistant using LG ThinQ integration and configure a dashboard card.

<TOCInline toc={props.toc} asDisclosure />  

## Requirements

1.  **Home Assistant** should be up and running.  
    You can check  ['How to Install Home Assistant' ](https://smarthomecircle.com/how-to-connect-wifi-to-home-assistant-on-startup)  if your installing it for the first time.
    
2.  **LG ThinQ App** should be installed with Washer/Dryer already connected.
    In case it’s not set up, you can set it up with the help of video below
    
<VideoEmbed 
  videoId="nazDVKuEFx4" 
  title="LG Washer Home Assistant Setup - Part 1" 
  width="half" 
/>

3.  **HACS** should be installed in Home Assistant.  
    In case it’s not setup, you can set it up using the video below

<VideoEmbed 
  videoId="c6kbItcHqwI" 
  title="LG Washer Home Assistant Setup - Part 2" 
  width="half" 
/>

4.  **SSH** should have Access to Home Assistant.  
    In case it’s not setup, you can set it up using the video below

<VideoEmbed 
  videoId="dAmGYrKDpZE" 
  title="LG Washer Dashboard Card Design" 
  width="half" 
/>

## Adding LG ThinQ Integration with Home Assistant

Once you have the devices connected to the ThinQ app, we need to connect it to Home Assistant.
For this, we will have to add the  **SmartThinQ LGE Sensors**  integration.

Let’s do that with the following steps:

**Step 1:**  In Your Home Assistance  in the left panel,  Click on  **HACS** > **Integrations**, then click on “**Explore & Download Repositories**” Button.

**Step 2:**  Now search for “**SmartThinQ LGE Sensors**” in search box, Select the option and click on “**Download**”.

![lg-washer](/static/images/2023/lg-washer-card/1.webp)

**Step 3**: Next, Navigate to  Home Assistant  **Settings** > **Devices & Services** then click on “**Add Integration**” Button from the bottom right-hand corner.

**Step 4**: On 'Set up a new integration' popup, Search for “**SmartThinQ LGE Sensors”** and click on it.

![lg-washer](/static/images/2023/lg-washer-card/2.webp)

**Step 5** : Now there are two ways to provide login credentials:

**1.**  You can directly provide the **username and password** that you used in your LG ThinQ app.
 OR
**2.**  You can log in with the credentials (such as social login) in your browser using the “**URL redirect authentication method**” checkbox.

### Login Using The URL Redirect Authentication Method
To Login Using The URL Redirect Authentication Method follow below steps:

**Step 1**: Select “**Use URL redirect authentication method**” checkbox and click "Submit" Button.

![lg-washer](/static/images/2023/lg-washer-card/3.webp)

**Step 2:** Copy the **SmartThinQ login URL** and paste it into the browser.

![lg-washer](/static/images/2023/lg-washer-card/4.webp)

**Step 3:** Enter your "Username" and "Password".

**Step 4:** Once you log in, your URL will change to show you an access token like this.

![lg-washer](/static/images/2023/lg-washer-card/5.webp)

**Step 5:** Now copy the entire **URL along with the access token** and paste it into the Home Assistant window and click "Submit" Button.

![lg-washer](/static/images/2023/lg-washer-card/6.webp)

With this, you are done with setting up the connection with Home Assistant and you should see the devices you have added to your LG ThinQ app.

## Finding the sensor entities of your devices
Now to add the Washer card to your dashboard, you would need to find the sensor entities of your washer in Home Assistant.
If you are aware of this, you can skip to the next section.

To find the sensor entities follow the below steps:

**Step 1**: Go to Home Assistant **Setting** > **Devices & Services**, then click on “**SmartThinQ LGE Sensor**” card.

**Step 2**: Now select the device here and we would need the names of two sensor entities. i.e. the **Washer** and **Run State**.

![lg-washer](/static/images/2023/lg-washer-card/7.webp)

**Step 3** : Click on the "**Washer icon**".

**Step 4** : Then click on the gear icon (⚙️) in the left corner, where  you will find the sensor entity name.

![lg-washer](/static/images/2023/lg-washer-card/8.webp)

**Step 5** : Perform '**Step 4**' in the same manner to find the sensor entity id of the “**Run State**”.

We will use these 'Sensor Entity Ids' in the Washer card and the template sensors required by the Home Assistant Dashboard.
    
## Adding LG Washer Card to Home Assistant

To add your LG washer card to Home Assistant, we will have to do following three things:

-   Setup card code and Stylesheets in Home Assistant.
-   Add template sensors.
-   Add the Washer card.

### Setup Washer Card Code In Home Assistant

To set up the washer card code follow the steps below:

**Step 1**: Open the **SSH terminal** on the left panel in Home Assistant.

**Step 2**: Now type the following commands one by one and hit enter.
```shell
cd config
mkdir www
cd www
```

If the command  `mkdir www`  fails, saying that the '*directory already exists*' then you can just run the  `cd www`command.

**Step 3** : Run the below command:
`git clone https://github.com/phrz/lg-washer-dryer-card.git`

Running above command should copy all the folders and directories to your computer from the URL  [https://github.com/phrz/lg-washer-dryer-card](https://github.com/phrz/lg-washer-dryer-card)

**Step 4** : Now run the following sequence of commands to copy the contents of the folder `lg-washer-dryer-card/config/www` to your current directory.

```
cp -r lg-washer-dryer-card/config/www/* /root/config/www/
```

Now if you run the  `ls`  command, you should see some files like these mentioned in the image.

![lg-washer](/static/images/2023/lg-washer-card/9.webp)

Next, we will have to add some resources to Home Assistant

### Adding CSS resource to Home Assistant

To add a CSS resource follow below steps:

**Step 1** : Click on “**Edit Dashboard**” on the top right-hand corner and click on “**Manage Resources**”.

![lg-washer](/static/images/2023/lg-washer-card/10.webp)

**Note:**  If the option is not available, you will need to enable “Advanced Mode” in your Home Assistant profile settings.

**Step 2** : Now add the following path `/local/7segment.css` and  select the **Stylesheet** radio button and click “**Create**” Button.



![lg-washer](/static/images/2023/lg-washer-card/11.webp)

Next, we will need to add some template sensors.

### Adding LG Washer Template Sensors in Home Assistant

To add the LG washer sensors, first we will have to edit the Home Assistant Configuration file. 
In order to do so, follow below steps:

**Step 1** : Open the "**configuration file**" in Home Assistant.

**Step 2** : Copy the content from  [this](https://github.com/phrz/lg-washer-dryer-card/blob/main/configuration.yaml)  location and paste it into the Home Assistant configuration file.

**Step 3** : Now replace the  `sensor.washer_run_state`  with the “**Run state**” sensor entity of your device which we got before.

**Step 4** : Similarily replace the  `sensor.washer`  with the “**Washer**” sensor entity of your device.

This is how it should look like.

![lg-washer](/static/images/2023/lg-washer-card/12.webp)

**Step 5** : **Restart your Home Assistant** and after restarting Home Assistant, **Refresh** your page (very important).

Now the last step is adding the Washer card to Home Assistant

## Adding LG washer Card to Home Assistant

To add the Washer card to your Home Assistant dashboard, follow below steps:

**Step 1** : In your Home Assistant “**Overview**” page, click on “**Edit Dashboard**” in the top right-hand corner.

**Step 2** : Now, click on “**Add Card**”, search for YAML, and select the “**Manual**” option.

![lg-washer](/static/images/2023/lg-washer-card/13.webp)

**Step 3** : Copy the content of the  `washer-car.yaml`  file from  [this](https://github.com/phrz/lg-washer-dryer-card/blob/main/washer-card.yaml)  location and paste it into the window.

![lg-washer](/static/images/2023/lg-washer-card/14.webp)

**Step 4** : Now you must replace the sensor entities with the correct sensor entities for your device to solve 'exclamation symbols'.
In this case, you will have to replace the  `sensor.washer`  and  `sensor.washer_run_state`with the sensor entities of your device.

On saving you should see your entities show up as below displayed in image.

![lg-washer](/static/images/2023/lg-washer-card/15.png)

If you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**ESP32 as a Local Voice Assistant**](https://smarthomecircle.com/setup-esp32-with-wake-word-in-home-assistant)
-   [**Control LED Strip with Home Assistant Using WLED**](https://smarthomecircle.com/how-to-connect-led-strip-with-home-assistant-using-wled)
-   [**How I Added a Matter Device to Home Assistant**](https://smarthomecircle.com/add-matter-devices-to-home-assistant))
