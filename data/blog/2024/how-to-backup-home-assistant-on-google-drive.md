---
title: 'How To Backup Home Assistant On Google Drive'
author: 'Amrut Prabhu'
categories: ''
tags: [Home Assistant, Google Drive, Back up]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2024-02-08'
draft: false
autoAds: true
summary: 'In this article, we will look at how we can take automated backups of Home Assistant on Google Drive.'
imageUrl: /static/images/2024/home-assistant-backup/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/8fmOfTuFqHo"

---
<TOCInline toc={props.toc} asDisclosure />  

## Install Google Drive Backup Addon

To install the addon follow these steps

**Step 1:** Click on Home Assistant **Settings** > **Add-ons**

**Step 2:** Click on **Add-On Store** on the bottom right right hand corner

**Step 3:** Click on the **three dots** in the top left-hand corner and select **repositories**

**Step 4:** Add the following URL and click Add
```shell
https://github.com/sabeechen/hassio-google-drive-backup
```
**Step 5:** Search for **Home Assistant Google Drive Backup** and click on install.

![01-google-drive-addon](/static/images/2024/home-assistant-backup/01-google-drive-addon.webp)

## Authenticating with **Home Assistant Google Drive Backup**

To authenticate with your Google Drive, follow these steps

**Step 1:** Click the **Open Web UI** button on the addon page.

Step 2: Click on **Authenticate With Google Drive**

![02-authentication](/static/images/2024/home-assistant-backup/02-authentication.webp)

**Step 3:** Authenticate with your Google account and allow **habackup.io** to access your Google Drive

![03-habackup.io](/static/images/2024/home-assistant-backup/03-habackup.io.webp)

**Step 4:** Now copy the **Authorization String** and paste it into the box in Home Assistant and click **Save**

With this, you have now connected your Google Drive to Home Assistant to upload your Home Assistant backups.

## Configuring Home Assistant Backups

You can set quite many options to configure your Home Assistant backups

**Option 1:** You can set the number of backups on your Home Assistant itself and Google Drive.

![04-backup-options-1](/static/images/2024/home-assistant-backup/04-backup-options-1.webp)

**Option 2:** Set a schedule for your backups and password-protect the backups.

![05-backup-schedule](/static/images/2024/home-assistant-backup/05-backup-schedule.webp)

**Option 3:** Set file name pattern and select your custom backup folder on your Google Drive.

![06-backup-custom-folder](/static/images/2024/home-assistant-backup/06-backup-custom-folder.webp)

**Option 4:** Taking **Generational Backups** is one of the best options to enable. This takes backups and maintains backups at certain intervals of time.

![07-generational-backup](/static/images/2024/home-assistant-backup/07-generational-backup.webp)

For example, the above setting will take and maintain a day-old back, a week-old, a month-old, and a year-old backup.

If you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**Create Custom Wake Word For Your Voice Assistant**](https://smarthomecircle.com/custom-wake-word-for-voice-assistant-with-home-assistant)
-   [**Connect Bluetooth Devices to Home Assistant with Bluetooth Proxy**](https://smarthomecircle.com/connect-bluetooth-devices-to-home-assistant-with-bluetooth-proxy)
-   [**Share Files With Home Assistant OS with Samba Share**](https://smarthomecircle.com/easily-share-files-with-home-assistant-using-samba-share)