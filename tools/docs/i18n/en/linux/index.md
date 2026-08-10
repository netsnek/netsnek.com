---
title: Linux on Apple Silicon
description: Why I run my MacBook Pro with Fedora Asahi, how my desktop came about and what I run my own RPM repository for.
path: /docs/linux
---

# Linux on Apple Silicon

My main machine is a MacBook Pro with Apple Silicon. It does not run macOS, it runs Fedora 43 with the Asahi Linux patches. I installed from Fedora Minimal, that is from a system that can do almost nothing after the first boot. Everything that came after it I put together myself, piece by piece. These pages tell what the setup looks like, why it looks that way and where I fell over along the road.

## Why Linux on a MacBook at all

The hardware is the reason. Apple Silicon MacBooks deliver a lot of performance at very low power draw, and the Asahi project brings Linux to exactly these devices, including graphics acceleration for the Apple GPU via Mesa. That gives you a full Wayland desktop running natively on aarch64. For me it is the best Linux machine I have ever had.

The catch: some packages from the official Fedora repositories need adjustments for this setup. Some software does not exist for aarch64 in the first place. That is exactly the gap I close with my own patches and my own RPM repository.

## What is here

### [Asahi desktop setup](/docs/linux/asahi)

My complete desktop stack: Wayfire as the Wayland compositor, XFCE as the desktop environment in a Wayland session, greetd with tuigreet as the login, PipeWire for audio and a Bluetooth setup that finally stopped hissing. Plus the stumbling blocks that caught me on Asahi, such as the kernel's 16K memory pages that my Minecraft shattered on, a workaround for crashing GTK4 apps and the road to x86 software via FEX and muvm.

### [Netsnek RPM repository](/docs/linux/rpm)

Under `rpm.netsnek.com` sit the patched packages that make this setup possible in the first place. The page tells which packages I patch and why, from the backported workspace protocol in wlroots to Wayland fixes for panel and desktop.

## Who this is for

For everyone who wants to build a similar setup on an Apple Silicon device. I assume basic knowledge of Fedora and the command line. All examples refer to Fedora 43 on aarch64.
