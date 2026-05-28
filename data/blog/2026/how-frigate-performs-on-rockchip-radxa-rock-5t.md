---
title: 'How to Run Frigate NVR on Radxa Rock 5T Using the Built-In NPU'
author: 'Amrut Prabhu'
categories: ''
tags: [SBC, radxa, perfromance, rockchip, frigate, docker, AI, benchmarks]
date: '2026-05-28'
autoAds: true
summary: 'Learn how to run Frigate NVR on the Radxa Rock 5T. Leverage the built-in RK3588 NPU for low-power, subscription-free local AI object detection with multiple IP video streams and see how it performs'
imageUrl: /static/images/2026/frigate-rock-5t/cover.webp
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/9J6cA6-dqWU"
suggestedArticles:
  - title: "Radxa Dragon Q6A: My hands-on experience"
    url: "https://smarthomecircle.com/radxa-dragon-q6a-best-alternative-to-the-raspberry-pi-5"
  - title: "Radxa Rock 5T: Pi-Sized Power With PCIe, NVMe, USB 3.1 Gen2, Thermals & Real-World Benchmarks"
    url: "https://smarthomecircle.com/radxa-rock-5t-better-than-raspberrypi-5"
  - title: "ReSpeaker XVF3800: a surprisingly solid local voice assistant for Home Assistant"
    url: "https://smarthomecircle.com/respeaker-xvf3800-home-assistant-voice-assistant"

affiliateLinks:
  title: Buy Radxa Rock 5T
  image:
    src: /static/images/2026/frigate-rock-5t/radxa-rock-5t.webp
    alt: Seeed Studio ReSpeaker XVF3800
  links:
    - label: "AliExpress"
      url: "https://s.click.aliexpress.com/e/_c40YIHzD"
    - label: "Arace"
      url: "https://arace.tech/products/radxa-rock-5t"


---

<TOCInline toc={props.toc} asDisclosure /> 


Are you looking for a powerful, private, and subscription-free local Network Video Recorder (NVR)?

Traditional NVRs often restrict your video channels or lock advanced AI motion detection behind expensive cloud subscriptions. That is where **Frigate NVR** shines. It processes everything locally, keeping your video streams completely private.

While most local setups require a power-hungry mini PC with a dedicated GPU, I wanted to try a more energy-efficient approach. In this article, I will show you how I ran Frigate NVR on the **Radxa Rock 5T** single-board computer (SBC) using its built-in hardware acceleration.

### The Hardware: Radxa Rock 5T

<div className="image-flex">
  <img src="/static/images/2026/frigate-rock-5t/radxa-rock-5t.webp" alt="rock-5t" />
</div>

<AffiliateLinksFromMetadata />

To achieve low-power AI object detection, I used the [Radxa Rock 5T](https://radxa.com/products/rock5/5t/).

-   **Processor:** Rockchip RK3588 SoC (Quad-core Cortex-A76 & Quad-core Cortex-A55).
    
-   **NPU Power:** Built-in Neural Processing Unit (NPU) providing **6 TOPS** (Tera Operations Per Second) of neural processing power.
    
-   **RAM:** 8GB variant (plenty of headroom for this setup).
    

Instead of relying on the CPU for heavy AI workloads (which is highly discouraged), we can offload object detection directly to this energy-efficient 3 TOPS NPU.

### My Frigate NVR Software Configuration

Setting up the software environment was straightforward:

1.  I flashed **Armbian OS** onto the board.
    
2.  I configured **Docker** to manage the system containers.
    
3.  I deployed the official **Frigate Docker image** compiled specifically for Rockchip SoCs.
    
```yaml
services:
  frigate:
    container_name: frigate
    pull_policy: always
    privileged: true # this may not be necessary for all setups
    restart: unless-stopped
    stop_grace_period: 30s # allow enough time to shut down the various services
    image: ghcr.io/blakeblackshear/frigate:stable-rk
    shm_size: "512mb" # update for your cameras based on calculation above
    security_opt:
      - apparmor=unconfined
      - systempaths=unconfined
    devices:
      - /dev/dri
      - /dev/dma_heap
      - /dev/rga
      - /dev/mpp_service
    volumes:
      - /sys/:/sys/:ro
      - /etc/localtime:/etc/localtime:ro
      - /etc/timezone:/etc/timezone:ro
      - ./config:/config
      - ./storage:/media/frigate
      - type: tmpfs # Optional: 1GB of memory, reduces SSD/SD Card wear
        target: /tmp/cache
        tmpfs:
          size: 1000000000
    ports:
      - "8971:8971"
      - "5000:5000" # Internal unauthenticated access. Expose carefully.
      - "8554:8554" # RTSP feeds
      - "8555:8555/tcp" # WebRTC over tcp
      - "8555:8555/udp" # WebRTC over udp
```
> Adapted the configuration based on the docker compose defintion [here](https://docs.frigate.video/frigate/installation/#docker)

For the camera setup, I integrated **six 2-Megapixel (Full HD) IP cameras**. I used the full-resolution stream for playback, recording, and object detection simultaneously.

#### The AI Detection Model

To leverage the hardware fully, I configured Frigate to use the [**RKNN detector**](https://docs.frigate.video/configuration/object_detectors/#rockchip-supported-models), split across all three cores of the NPU. For the AI model, I chose **deci-fp16-yolonas_m** from the [supported models](https://docs.frigate.video/configuration/object_detectors/#rockchip-supported-models). It offers the perfect balance between speed and accuracy.

I set the system to detect two specific objects: **people** and **cats** (mostly to stop neighborhood cats from digging up the plants in my parents' garden!).

### Frigate Configuration

Here is my entire frigate configuration for the detection model and the 6 cameras configured

<Collapsible title="Frigate Configuration">

```yaml
mqtt:
  host: homeassistant-ip  # ip address of your mqtt broker  
  port: 1883
  topic_prefix: frigate
  client_id: frigate
  user: mqtt-user
  password: password


detectors:
  rknn_0:
    type: rknn
    num_cores: 3


ffmpeg:
  hwaccel_args: preset-rkmpp

go2rtc:
  streams:
    camera1:
      - rtsp://username:password@192.168.0.x:554/cam/realmonitor?channel=1&subtype=0
    camera1_sub:
      - rtsp://username:password@192.168.0.x:554/cam/realmonitor?channel=1&subtype=1
    camera2:
      - rtsp://username:password@192.168.0.x:554/cam/realmonitor?channel=1&subtype=0
    camera2_sub:
      - rtsp://username:password@192.168.0.x:554/cam/realmonitor?channel=1&subtype=1
    camera3:
      - rtsp://username:password@192.168.0.x:554/cam/realmonitor?channel=1&subtype=0
    camera3_sub:
      - rtsp://username:password@192.168.0.x:554/cam/realmonitor?channel=1&subtype=1
    camera4:
      - rtsp://username:password@192.168.0.x:554/cam/realmonitor?channel=1&subtype=0
    camera4_sub:
      - rtsp://username:password@192.168.0.x:554/cam/realmonitor?channel=1&subtype=1
    camera5:
      - rtsp://username:password_@192.168.0.x:554/video/live?channel=1&subtype=0
    camera5_sub:
      - rtsp://username:password_@192.168.0.x:554/video/live?channel=1&subtype=1
    camera6:
      - rtsp://username:password_@192.168.0.x:554/video/live?channel=1&subtype=0
    camera6_sub:
      - rtsp://username:password_@192.168.0.x:554/video/live?channel=1&subtype=1
cameras:
  camera_1:
    enabled: true
    ffmpeg:
      inputs:
        - path: rtsp://127.0.0.1:8554/camera1_sub?video=copy
          input_args: preset-rtsp-restream
          roles:
            - detect
        - path: rtsp://127.0.0.1:8554/camera1?video=copy&audio=copy
          input_args: preset-rtsp-restream
          roles:
            - record

    live:
      streams:
        Main: camera1

    detect:
      enabled: true
      width: 704
      height: 576
      fps: 5
    objects:
      track:
        - person
        - cat

  camera_2:
    enabled: true
    ffmpeg:
      inputs:
        - path: rtsp://127.0.0.1:8554/camera2_sub?video=copy
          input_args: preset-rtsp-restream
          roles:
            - detect
        - path: rtsp://127.0.0.1:8554/camera2?video=copy&audio=copy
          input_args: preset-rtsp-restream
          roles:
            - record

    live:
      streams:
        Main: camera2

    detect:
      enabled: true
      width: 704
      height: 576
      fps: 5
    objects:
      track:
        - person
        - cat

  camera_3:
    enabled: true
    ffmpeg:
      inputs:
        - path: rtsp://127.0.0.1:8554/camera3_sub?video=copy
          input_args: preset-rtsp-restream
          roles:
            - detect
        - path: rtsp://127.0.0.1:8554/camera3?video=copy&audio=copy
          input_args: preset-rtsp-restream
          roles:
            - record

    live:
      streams:
        Main: camera3

    detect:
      enabled: true
      width: 704
      height: 576
      fps: 5
    objects:
      track:
        - person
        - cat

  camera_4:
    enabled: true
    ffmpeg:
      inputs:
        - path: rtsp://127.0.0.1:8554/camera4_sub?video=copy
          input_args: preset-rtsp-restream
          roles:
            - detect
        - path: rtsp://127.0.0.1:8554/camera4?video=copy&audio=copy
          input_args: preset-rtsp-restream
          roles:
            - record

    live:
      streams:
        Main: camera4
        sub: camera4_sub

    detect:
      enabled: true
      width: 704
      height: 576
      fps: 5
    objects:
      track:
        - person
        - cat

  camera_5:
    enabled: true
    ffmpeg:
      inputs:
        - path: rtsp://127.0.0.1:8554/camera5_sub?video=copy
          input_args: preset-rtsp-restream
          roles:
            - detect
        - path: rtsp://127.0.0.1:8554/camera5?video=copy&audio=copy
          input_args: preset-rtsp-restream
          roles:
            - record

    live:
      streams:
        Main: camera5
        sub: camera5_sub

    detect:
      enabled: true
      width: 704
      height: 576
      fps: 5
    objects:
      track:
        - person
        - cat

  camera_6:
    enabled: true
    ffmpeg:
      inputs:
        - path: rtsp://127.0.0.1:8554/camera6_sub?video=copy
          input_args: preset-rtsp-restream
          roles:
            - detect
        - path: rtsp://127.0.0.1:8554/camera6?video=copy&audio=copy
          input_args: preset-rtsp-restream
          roles:
            - record

    live:
      streams:
        Main: camera6
        sub: camera6_sub

    detect:
      enabled: true
      width: 704
      height: 576
      fps: 5
    objects:
      track:
        - person
        - cat

snapshots:
  enabled: true
  bounding_box: true
  crop: false        # optional (true = crop tightly around object)
  retain:
    default: 4       # days to keep snapshots

model:
  path: deci-fp16-yolonas_m
  model_type: yolonas
  width: 320
  height: 320
  input_pixel_format: bgr
  input_tensor: nhwc
  labelmap_path: /labelmap/coco-80.txt

detect:
  enabled: true

record:
  enabled: true
  sync_recordings: true
  alerts:
    retain:
      days: 10
  detections:
    retain:
      days: 10
    pre_capture: 10
    post_capture: 20
  continuous:
    days: 0
  motion:
    days: 10
version: 0.17-0

```

</Collapsible>

### Real-World Performance & Statistics

<div className="image-flex">
  <img src="/static/images/2026/frigate-rock-5t/frigate-stats.webp" alt="frigate-stats" />
</div>

How well does the RK3588 NPU actually handle six Full HD streams? The results are impressive:

-   **NPU Utilization:** Hovers between **43% to 45%** during active object detection.
    
-   **Inference Speed:** Lightning fast, sitting consistently between **30 to 35 milliseconds**.
    
-   **RAM Usage:** The entire system utilizes only **2.4 to 3 Gigabytes of RAM**, leaving the 8GB board feeling completely unbothered.
    
-   **Total CPU Usage:** Stays around **23%**. Most of this overhead goes to the `go2rtc` process for handling the live streams.

<div className="image-flex">
  <img src="/static/images/2026/frigate-rock-5t/frigate-stats-2.webp" alt="frigate-stats" />
</div>


>Note: I did notice some CPU usage spikes while preparing the input/output data for the detection models despite hardware video decoding being active. If you have tips on how to optimize this further, let me know! Add a comment to my Youtube video above or send me an email. 

### Smart Home Integration & Notifications

<div className="image-flex">
  <img src="/static/images/2026/frigate-rock-5t/telegram.webp" alt="telegram" />
</div>


An NVR is only as good as its alerting system. I integrated Frigate into **Home Assistant** to orchestrate my smart home automation.

Whenever Frigate detects a person or a cat, Home Assistant immediately triggers a rich media notification straight to **Telegram**. I receive an instant alert alongside a snapshot of the detection, ensuring I never miss an event.

### Final Verdict: Can it scale?

With six Full HD cameras running simultaneously, the Radxa Rock 5T handles the load effortlessly. Based on these metrics, you could easily add another two cameras—bringing the total to **8 cameras**—and the system would still run perfectly.

If you want a step-by-step guide on how to configure this exact setup from scratch, check out my detailed video tutorial below or you can read it [here](https://smarthomecircle.com/how-to-setup-frigate-with-home-assistant).

<VideoEmbed 
  videoId="05_BF4DVJWg" 
  title="How To Setup Frigate With Home Assistant & Receive Person Detection Notification" 
  width="full" 
/>

<AffiliateLinksFromMetadata />


