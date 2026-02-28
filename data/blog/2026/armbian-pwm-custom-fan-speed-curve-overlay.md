---
title: "How to Tune CPU FAN Speed With PWM on Armbian (cooling-levels based on Temperature)"
author: 'Amrut Prabhu'
categories: ''
tags: [SBC, armbian, os, fan speed, overlay]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2026-03-05'
draft: false
autoAds: true
summary: 'Tune Armbian’s PWM fan curve using a Device Tree Overlay. This step-by-step guide shows how to locate the pwm-fan node, edit cooling-levels and temp-trips, compile a .dtbo overlay, enable it in armbianEnv.txt, and verify fan speed changes in Linux'
imageUrl: /static/images/2026/armbian-pwm-fan-curve/cover.webp
suggestedArticles:
  - title: "How to Auto-Mount an NVMe Drive on Linux at Startup"
    url: "https://smarthomecircle.com/how-to-auto-mount-storage-in-linux-on-startup"
  - title: "Radxa Cubie A5E Hands-On: The Budget NVMe SBC"
    url: "https://smarthomecircle.com/radxa-cubie-a5e-review-benchmarks-vs-raspberry-pi"
  - title: "How to Back Up an SD Card (Full OS Image) to an IMG File Using Linux"
    url: "https://smarthomecircle.com/how-to-backup-os-on-sd-card-to-img-linux"

---

<TOCInline toc={props.toc} asDisclosure /> 


Armbian images for many SBCs expose a **PWM-controlled fan** through the Linux thermal framework and a `pwm-fan` device tree node. If you want the fan to spin up earlier, run quieter, or use your own temperature→PWM mapping *without* a userspace script, the clean approach is to create a **Device Tree Overlay** that modifies:

- `cooling-levels` — PWM values (0–255)
- `rockchip,temp-trips` — temperature thresholds mapped to those levels (on many Rockchip-based boards)

This post shows a practical, repeatable way to create, install, and enable an overlay on Armbian.

> Note: Not every Armbian board uses `rockchip,temp-trips`. This guide applies to systems where you can find `cooling-levels` and `rockchip,temp-trips` under the `pwm-fan` node in the running device tree.

---

## 1) Confirm you have PWM fan control in Armbian

Check sysfs for PWM control:

```bash
ls -R /sys/class/pwm 2>/dev/null
grep -R . /sys/class/hwmon/hwmon*/name 2>/dev/null
ls /sys/class/hwmon/hwmon*/pwm* 2>/dev/null
```

If you see a `pwm1` file under an `hwmon` device (often named `pwmfan`), the kernel exposes PWM control.

---

## 2) Dump the running device tree and locate the fan node

Install the device tree compiler:

```bash
sudo apt update
sudo apt install -y device-tree-compiler
```

Dump the live device tree (best source of truth because it reflects overlays already applied):

```bash
sudo dtc -I fs -O dts -o /tmp/running.dts /proc/device-tree
```

Search for the fan node and curve properties:

```bash
grep -nEi 'pwm-fan|pwmfan|cooling-levels|rockchip,temp-trips|temp-trips' /tmp/running.dts | head -120
```

You’re looking for something like:

- `pwm-fan { ... }`
- `cooling-levels = <...>;`
- `rockchip,temp-trips = <...>;`

Also identify the **node path** for the fan. On many systems it’s `/pwm-fan`, but don’t assume—verify in `running.dts`.

---

## 3) Understand what you’re editing

### `cooling-levels`
A list of PWM duty values (0–255). Example:

- `<0 50 100 150 200 255>`

Each entry is a cooling “state”.

### `rockchip,temp-trips`
Pairs of:

- temperature (millidegrees C) and
- cooling level index (usually 1..N, where 0 would be off)

Example:
- `<40000 1 42000 2 45000 3>`

Meaning:
- at 40°C use cooling level 1
- at 42°C use cooling level 2
- at 45°C use cooling level 3

> Temperatures are in **millidegrees C**: `45000` = 45°C.

---

## 4) Create a Device Tree Overlay to set your fan curve

### A) Choose your fan node path
From `/tmp/running.dts`, determine the correct path for the fan node. In the example below we use:

- `/pwm-fan`

If your fan node path differs, update `target-path = "/pwm-fan";` accordingly.

### B) Write the overlay source (`.dtso`)
This example sets the curve:

- 40°C → PWM 200  
- 42°C → PWM 225  
- 45°C+ → PWM 255  

```bash
sudo tee /root/fan-curve.dtso >/dev/null <<'EOF'
/dts-v1/;
/plugin/;

&{/} {
  fragment@0 {
    target-path = "/pwm-fan";
    __overlay__ {
      /*
       * Fan PWM steps (0..255):
       * level 0 = off
       * level 1 = 200
       * level 2 = 225
       * level 3 = 255
       */
      cooling-levels = <0 200 225 255>;

      /*
       * Temp (milli°C) -> cooling level index
       * 40°C -> level 1 (200)
       * 42°C -> level 2 (225)
       * 45°C -> level 3 (255)
       */
      rockchip,temp-trips = <40000 1 42000 2 45000 3>;
    };
  };
};
EOF
```

---

## 5) Compile the overlay to `.dtbo`

Armbian typically supports user overlays in `/boot/overlay-user/`:

```bash
sudo mkdir -p /boot/overlay-user
sudo dtc -@ -I dts -O dtb -o /boot/overlay-user/fan-curve.dtbo /root/fan-curve.dtso
```

Verify the file exists:

```bash
ls -l /boot/overlay-user/fan-curve.dtbo
```

---

## 6) Enable the overlay in Armbian

Edit Armbian’s boot environment file:

```bash
sudo nano /boot/armbianEnv.txt
```

Add or update:

```ini
user_overlays=fan-curve
```

If you already have overlays enabled, append it space-separated:

```ini
user_overlays=existing-overlay another-overlay fan-curve
```

Save the file and reboot:

```bash
sudo reboot
```

---

## 7) Verify the overlay applied

After reboot, dump the live device tree again:

```bash
sudo dtc -I fs -O dts -o /tmp/running2.dts /proc/device-tree
grep -n "cooling-levels" /tmp/running2.dts | head -40
grep -n "rockchip,temp-trips" /tmp/running2.dts | head -40
```

You should see your updated values (sometimes displayed in hex).

---

## 8) Watch PWM change in real time

Find your PWM hwmon device:

```bash
for d in /sys/class/hwmon/hwmon*; do
  n=$(cat "$d/name" 2>/dev/null)
  if echo "$n" | grep -qi pwm; then
    echo "$d -> $n"
    ls "$d"/pwm* 2>/dev/null
  fi
done
```

Then watch a thermal zone temperature and the PWM value together (adjust paths for your system):

```bash
watch -n 1 'cat /sys/class/thermal/thermal_zone0/temp; cat /sys/class/hwmon/hwmon8/pwm1'
```
