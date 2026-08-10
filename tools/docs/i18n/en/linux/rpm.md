---
title: Netsnek RPM repository
description: My own RPM repository rpm.netsnek.com, the stories behind the patched packages and why the public setup instructions only come with a signing key.
path: /docs/linux/rpm
---

# Netsnek RPM repository

My [Asahi desktop](/docs/linux/asahi) only works because a handful of packages are built differently than in Fedora. So that I do not have to maintain these builds by hand and Fedora updates do not overwrite them, I run my own RPM repository under `rpm.netsnek.com`. All packages target Fedora 43 on aarch64 and are tailored to my Asahi setup. I have not tested them on other architectures or distributions.

## Setting it up with dnf

There used to be a copy-paste block for `/etc/yum.repos.d/netsnek.repo` here. I took it out again, for a reason that matters more to me than convenience: a repository brings software onto other people's machines with root privileges. Something like that belongs signed, and I do not want to hand anyone instructions that switch off signature checking for it. Which is exactly what would have stood here.

The signing key is therefore the next step for this repository. As soon as the packages are signed, the setup instructions with `gpgcheck=1` and the public key will go in this spot. I generate the metadata with `createrepo` anyway, and dnf then treats the repository like any other. Until then: whoever needs one of the packages gets in touch through the contact channels listed on [netsnek.com](https://netsnek.com), and we look together at what makes sense for the machine in question.

## Priority over Fedora

The packages carry their original upstream names, so for example `swappy` rather than `swappy-netsnek`. To give my version priority over the Fedora package, I use a higher release, an `Epoch: 1` or an `Obsoletes:` on old package names, depending on the package. Updates from Fedora therefore do not accidentally overwrite the patched packages.

## What is in it and why

### The Wayland core

**wlroots** is the actual reason this repository exists. My XFCE panel only saw a single workspace, because wlroots 0.19 does not implement the `ext-workspace-v1` protocol yet. The rescue was a backport of the 0.20 implementation from the community around dkondor, which I packaged for Fedora on 0.19.2. The patch only adds new files and two build lines, existing code stays untouched. As soon as wlroots 0.20 lands in Fedora, I will throw the package out again.

**wayfire** carries my patch stack. A crash fix for layer-shell windows that get shown again after being hidden, which I needed for kitty's dropdown terminal. The `wlr-workspaces` plugin from the same community work by dkondor, which exposes the Wayfire workspaces over `ext-workspace-v1` so that the XFCE pager sees them and clicks in the pager switch the workspace. Real 10-bit color depth, `depth = 10` in the `[output]` block of the wayfire.ini actually works with it and reduces gradient banding. And two cube extensions: activating the desktop cube via modifier plus four-finger swipe, as well as a render interface for inner-cube plugins.

**wayfire-plugins-extra** brings two plugins of my own. `cube-gears` draws gears inside the desktop cube as a nod to glxgears. `dither` uses ordered dithering to reduce visible gradient banding on the internal display.

### The XFCE and desktop building blocks

**xfce4-panel** I build with `gtk-layer-shell` enabled. With that the panel is recognized as a shell surface under Wayland, gets no compositor title bar and reserves its screen space correctly.

**xfdesktop** gets the Wayland build plus a patch of my own for the monitor names. Without it the settings dialog writes wallpaper settings to `monitor0`, while the desktop looks for them under the connector name such as `monitoreDP-1`. So my wallpaper was configurable, but never visible. The patch resolves the name via libxfce4windowing so that both sides use the same key.

**swappy**, my screenshot editor, upstream uses a GtkHeaderBar as a client-side decoration and therefore stepped out of line with my server-side decoration row. The patch moves the header bar into the normal window content, so that Wayfire can draw a uniform title bar around the window.

**swaylock-effects** I build from the jirutka fork, because it supports the `ext-session-lock-v1` protocol and delivers effects like blur, clock and fade-in for the lockscreen.

**kitty** gets two fixes: an upstream patch for Python 3.14 and one of my own for an out-of-bounds read in the dbus notification code, which made kitty crash on me on desktop notifications. The subpackages `kitty-kitten`, `kitty-terminfo` and `kitty-shell-integration` are included as well.

**mugshot** is unmodified upstream from bluesabre/mugshot, which is simply not packaged in Fedora. It provides the profile picture dialog that the profile button in XFCE's Whisker menu needs.

### Apps that otherwise do not exist for aarch64

**telegram-desktop** I build natively for aarch64 on the basis of the Nicegram fork, including the WebRTC stack. There are no official binary packages for this architecture.

**signal-desktop** is a native aarch64 build from the official source code, which otherwise does not exist as a Fedora package. The desktop entry starts with `--no-sandbox --ozone-platform=wayland`, because the sandbox does not work on ARM64 Fedora and the app would otherwise run over XWayland.

**youtube-music** is my aarch64 build of the Pear Desktop fork of YouTube Music (upstream [pear-devs/pear-desktop](https://github.com/pear-devs/pear-desktop)). Compared to upstream only the presentation is adjusted, the Google consent page renders in dark mode.

## A one-person project

The repository is a one-person project for one specific setup. There is no guarantee of stability or of timely rebuilds after Fedora updates. I still welcome feedback through the contact channels listed on [netsnek.com](https://netsnek.com).
