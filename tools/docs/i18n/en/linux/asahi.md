---
title: Asahi desktop setup
description: How I built myself a Wayland desktop out of Wayfire and XFCE on the MacBook Pro, along with the stumbling blocks that caught me on the way.
path: /docs/linux/asahi
---

# Asahi desktop setup

My desktop is a combination that does not exist ready-made anywhere: Wayfire as the Wayland compositor, on top of it XFCE 4.20 as the desktop environment, all of it on a MacBook Pro with Fedora 43 and the Asahi kernel. The Apple GPU runs via Mesa. I wanted the compositing effects of Wayfire and still the familiar XFCE world with panel, Thunar and settings dialogs. Both together do work. It just took a while until all the parts meshed cleanly, and exactly that stretch of road is what this page is about.

## The stack at a glance

```
greetd + tuigreet
  └→ startxfce4 --wayland wayfire
       ├→ Wayfire (Wayland-Compositor, wlroots-basiert)
       ├→ xfce4-session
       ├→ xfce4-panel (gepatcht: gtk-layer-shell)
       ├→ xfdesktop (gepatcht: Wayland-Monitornamen)
       └→ nm-applet, swayidle
```

The division of labor: Wayfire handles compositing, window management and effects. XFCE provides session management, panel, desktop, settings and the applications. XFCE starts as a Wayland session directly on top of Wayfire.

## Login: greetd + tuigreet

I did not want a heavyweight display manager. greetd with the text-based greeter tuigreet is minimal, fast and needs no graphics session of its own. My configuration in `/etc/greetd/config.toml`:

```toml
[terminal]
vt = 7

[default_session]
command = "tuigreet --time --remember --cmd 'startxfce4 --wayland wayfire'"
user = "greetd"
```

## Wayfire

I configure Wayfire through `~/.config/wayfire.ini`. The most important decisions I made there:

- `preferred_decoration_mode = server` gives all windows server-side decorations. Every app gets the same title bar from the compositor, no matter what it brings along itself. That uniform look mattered to me.
- `scale = 2.0` for HiDPI on the Retina display.
- Virtual workspaces in a 4x1 row (`vwidth = 4`, `vheight = 1`), reachable by keyboard and gestures.
- Plugins such as expo (workspace overview), grid, cube and wobbly for the classic compositing comfort I had been missing since the Compiz days.

My favorite detail is the desktop cube. The 4x1 workspaces sit on the sides of a rotatable cube that I open with Super plus click or a four-finger swipe. Both come from a patch of my own that my patched Wayfire from [rpm.netsnek.com](/docs/linux/rpm) brings along. And because it can, the `cube-gears` plugin draws rotating gears inside the cube as a nod to glxgears. On the Apple GPU stack all of that runs smoothly.

I take screenshots with grim and slurp, editing happens in swappy. wofi serves as the launcher, kitty as the terminal.

## XFCE as a Wayland session

XFCE 4.20 can run as a Wayland session on an external compositor. That is exactly what happens here with `startxfce4 --wayland wayfire`. Two details cost me time:

**Environment variables belong in `~/.config/xfce4/xinitrc`.** greetd does not load login shell profiles. Anyone who wants to set variables like `GTK_MODULES=xfsettingsd-gtk-settings-sync` has to do it in the xinitrc. That variable makes XFCE settings dialogs use Wayfire's server-side decorations instead of their own GtkHeaderBars.

**`dbus-update-activation-environment --systemd` has to include `WAYLAND_DISPLAY` and `DISPLAY`.** Without that being passed on to the systemd user session, `xdg-desktop-portal-gtk` fails. I noticed it through broken file dialogs in Wayland applications, for instance when saving in Chromium.

The workspace pager is what I wrestled with the longest. wlroots 0.19 does not implement the `ext_workspace_manager_v1` protocol, native support only arrives with wlroots 0.20. With stock packages XFCE therefore only sees a single workspace, and my beautiful 4x1 cube was invisible to the panel. My solution: a patched wlroots 0.19.2 with the ext-workspace-v1 implementation as a backport, plus Wayfire 0.10.1 with the `wlr-workspaces` plugin, which exposes the Wayfire workspaces over the protocol. Both packages come from my [RPM repository](/docs/linux/rpm). With that the XFCE pager shows all workspaces in button mode and clicks in the pager switch the workspace. The panel has to be at least version 4.20.1 for this, 4.20.0 contains an ext-workspace bug. What is still missing: the protocol knows no window-to-workspace mapping, so there is no thumbnail pager and no per-workspace wallpaper.

## Audio: PipeWire

Audio runs through PipeWire 1.4 with WirePlumber 0.5. The package `pipewire-pulseaudio` provides PulseAudio compatibility for older applications, `pipewire-jack-audio-connection-kit` the JACK interface. `pulseaudio-utils` supplies the familiar `pactl`.

## Bluetooth: stable A2DP

Bluetooth audio on Asahi cost me two battles before it felt like a finished product.

### Turning off HFP autoswitch

The first battle: music sounds great, then some app requests the headset microphone and suddenly I hear mono audio in telephone quality plus hiss. The culprit is the automatic switch to the HFP/HSP profile. My WirePlumber drop-in file under `~/.config/wireplumber/wireplumber.conf.d/51-bluez-no-autoswitch.conf` forces pure music operation:

```
wireplumber.settings = {
  bluetooth.autoswitch-to-headset-profile = false
}

monitor.bluez.properties = {
  bluez5.roles = [ a2dp_sink a2dp_source ]
  bluez5.codecs = [ aac aptx_hd aptx ldac sbc_xq sbc ]
  bluez5.enable-msbc = false
  bluez5.enable-hw-volume = true
}
```

The price: the Bluetooth microphone is not available. For calls I use the built-in MacBook microphone, which is better anyway. If you need the headset microphone, set `autoswitch-to-headset-profile = true` and remove the line with `bluez5.roles`.

### A2DP dropouts during WLAN traffic

The second battle was more subtle: Bluetooth audio crackled exactly whenever something was going on over WLAN. The Broadcom chips in Apple Silicon Macs share one antenna for WLAN and Bluetooth. macOS prioritizes A2DP connections through a vendor-specific HCI command, the Linux driver does not. The solution is a small systemd service that raises the traffic priority via HCI command after every Bluetooth connect. The approach comes from the project [asahi-bt-a2dp-fix](https://github.com/christian-korneck/asahi-bt-a2dp-fix).

### First pairing

Some headsets only connect with HFP on first pairing, so that no A2DP profile appears at all. What helps for me is a restart of the audio services between disconnect and reconnect:

```bash
bluetoothctl disconnect <MAC>
systemctl --user restart wireplumber pipewire-pulse pipewire
bluetoothctl connect <MAC>
```

After that the A2DP profile survives reconnects as well.

## HiDPI and notch

The internal display runs with `scale = 2.0` in Wayfire. The notch of the MacBook Pro is hidden by default. If you want to use the full display area, enable it with the kernel parameter `appledrm.show_notch=1`. The change needs a reboot.

## Stumbling blocks

### 16K memory pages

My first real Asahi moment was a Minecraft that vanished immediately on startup. The Asahi kernel uses 16K pages instead of the usual 4K. Most software is prepared for that, but programs with hardcoded 4K assumptions crash. The most frequent culprit is a bundled jemalloc, recognizable by the message `<jemalloc>: Unsupported system page size`. Three cases I have been through myself:

- **Minecraft**: the jemalloc shipped with LWJGL crashes on startup, guaranteed. The fix is the JVM flag `-Dorg.lwjgl.system.allocator=system`, which makes LWJGL use the glibc allocator. For current mod loaders, additionally pin Java 21 as the instance Java.
- **Widevine**: the ARM64 CDM has to be patched for 16K pages. Asahi's `widevine-installer` does that automatically during installation.
- **FEX-emu**: the x86 emulator dies on 16K kernels from the same jemalloc problem. That is why x86 software runs in a microVM here, see below.

Whenever anything crashes without comment on Asahi, my first suspicion by now is always the page size.

### GTK4 crashes in the Vulkan renderer

GTK4 applications vanished on me without comment with SIGSEGV, without a usable traceback. The cause: newer GTK4 versions pick the Vulkan renderer as soon as a Vulkan driver is installed. The Asahi Vulkan driver Honeykrisp does not carry that path reliably yet. My workaround forces the GL renderer and applies to all GTK4 apps:

```bash
GSK_RENDERER=gl <app>
```

If you want that permanently, set the variable in `~/.config/xfce4/xinitrc` so the whole session inherits it. For Flatpaks it applies per app:

```bash
flatpak override --user --env=GSK_RENDERER=gl <app-id>
```

To double-check, I start the app with `GSK_DEBUG=renderer`, and the log has to say `Using renderer 'GskGLRenderer'`. If the GL renderer causes trouble too, `GSK_RENDERER=cairo` is the pure software route, always stable, but slower.

### Signal Desktop needs --no-sandbox

On ARM64 Fedora, Signal Desktop needs the flag `--no-sandbox`, otherwise it does not start.

### Suspend is s2idle

Apple Silicon only supports s2idle under Linux. Hibernate is not possible because of a limitation in the GPU firmware. I have made my peace with that.

### USB 1.1 devices on the USB-C ports

On Asahi kernels before 6.19, full-speed devices such as older adapters or microcontroller boards often do not enumerate, and the kernel log then shows messages like `device descriptor read/64, error -71`. The bug is in the USB2 PHY handling and has been fixed since Linux 6.19. A warning from experience: never unbind the `dwc3-apple` driver during operation to reset the PHY. That jams the controller and both USB buses are gone until reboot.

## x86 software with FEX and muvm

Some software simply does not exist as an ARM64 Linux build, for me the TeamSpeak client is one such case. On Asahi it runs anyway, with FEX-emu as an x86_64 emulator. Because FEX itself fails on the 16K kernel, the emulation sits inside muvm, a lightweight microVM with a 4K-page guest. The necessary packages are called `fex-emu`, `muvm` and `fex-emu-rootfs-fedora`. A binfmt entry in the guest routes x86 binaries through FEX automatically.

A few quirks, all of which I had to work out one by one:

- The guest sees X11, not a Wayland socket. muvm sets `DISPLAY` to an X11 bridge to the host Xwayland. Chromium and CEF apps therefore need `--ozone-platform=x11`, Qt apps `QT_QPA_PLATFORM=xcb`.
- Audio works without any effort, muvm passes PipeWire and Pulse through into the guest.
- The HOME directory is shared via virtiofs. Missing x86 libraries I fetch with `dnf download --forcearch=x86_64 <paket>`, unpack them under HOME and pull them in via `LD_LIBRARY_PATH`.
- Chromium and CEF apps need `--no-sandbox`, because their sandbox does not initialize under FEX. For Qt WebEngine the analogue is `QTWEBENGINE_DISABLE_SANDBOX=1`.
- GPU acceleration in the guest needs the package `mesa-fex-emu-overlay-x86_64` and the virglrenderer build from the Asahi COPR. Careful: Fedora's own virglrenderer can silently replace the COPR package during updates, after which GPU acceleration in the guest is gone. A `dnf versionlock add virglrenderer` prevents that.
- If muvm suddenly refuses to start for no visible reason, there are often orphaned files (`krun`, `muvm.lock`) from a crashed earlier run in the XDG runtime directory. Delete them once no muvm process is running anymore.

## Patched packages

Several building blocks of this setup need patches that do not exist that way in Fedora. The panel has to run as a layer-shell surface, xfdesktop needs a Wayland monitor name fix, the lockscreen needs `ext-session-lock-v1`, the workspace pager needs the patched wlroots plus the Wayfire plugin. I build these packages myself. The whole story on that is under [Netsnek RPM repository](/docs/linux/rpm).
