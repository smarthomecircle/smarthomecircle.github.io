---
title: "How to Auto-Mount an NVMe Drive on Linux at Startup (Using /etc/fstab)"
author: 'Amrut Prabhu'
categories: ''
tags: [SBC, linux, storage, mount, startup]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2026-03-05'
draft: false
autoAds: true
summary: 'Auto-mount your NVMe SSD on Linux at startup using /etc/fstab the right way. Learn how to find the UUID, create a mount point, add a safe fstab entry'
imageUrl: /static/images/2026/auto-mount-nvme/cover.webp
suggestedArticles:
  - title: "How to Tune CPU FAN Speed With PWM on Armbian"
    url: "https://smarthomecircle.com/armbian-pwm-custom-fan-speed-curve-overlay"
  - title: "Radxa Cubie A5E Hands-On: The Budget NVMe SBC"
    url: "https://smarthomecircle.com/radxa-cubie-a5e-review-benchmarks-vs-raspberry-pi"
  - title: "How to Back Up an SD Card (Full OS Image) to an IMG File Using Linux"
    url: "https://smarthomecircle.com/how-to-backup-os-on-sd-card-to-img-linux"

---

<TOCInline toc={props.toc} asDisclosure /> 

If you want your NVMe SSD to mount automatically every time Linux boots, the cleanest method is to use the partition **UUID** in **/etc/fstab**.

---

## 1) Find the NVMe partition and UUID

Run:

```bash
lsblk -f
```

Look for your NVMe partition (example: `/dev/nvme0n1p1`) and note the **FSTYPE** and **UUID**.

Alternative:

```bash
sudo blkid
```

---

## 2) Create a mount point

Choose where you want it mounted (example: `/mnt/nvme`):

```bash
sudo mkdir -p /mnt/nvme
```

---

## 3) Add an `/etc/fstab` entry

Open the file:

```bash
sudo nano /etc/fstab
```

Add the correct line for your filesystem (replace `YOUR_UUID` with the real one).

### For ext4
```fstab
UUID=YOUR_UUID  /mnt/nvme  ext4  defaults,nofail,x-systemd.device-timeout=5  0  2
```

### For xfs
```fstab
UUID=YOUR_UUID  /mnt/nvme  xfs  defaults,nofail,x-systemd.device-timeout=5  0  0
```

### For btrfs
```fstab
UUID=YOUR_UUID  /mnt/nvme  btrfs  defaults,nofail,x-systemd.device-timeout=5  0  0
```

**Why these options?**
- `UUID=...` is stable (won’t break if device names change).
- `nofail` prevents boot from failing if the drive is missing.
- `x-systemd.device-timeout=5` avoids long boot hangs if the drive is slow to appear.

---

## 4) Test before rebooting

This step catches errors immediately:

```bash
sudo mount -a
```

Check it mounted:

```bash
df -h | grep nvme
```

---

## Optional: make the mount writable for your user

If you’re mounting to a non-home directory and want easy write access:

```bash
sudo chown -R "$USER:$USER" /mnt/nvme
```

---

## Done ✅

Reboot and your NVMe should mount automatically.
