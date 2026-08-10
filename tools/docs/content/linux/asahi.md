---
title: Asahi Desktop Setup
description: Wayfire und XFCE als Wayland-Desktop auf Fedora Asahi, mit Login über greetd, Audio über PipeWire und praktischen Fixes für Bluetooth, HiDPI und GTK4.
path: /docs/linux/asahi
---

# Asahi Desktop Setup

Dieses Setup läuft auf einem MacBook Pro mit Apple Silicon unter Fedora 43 (Asahi Linux, aarch64). Es kombiniert Wayfire als Wayland-Compositor mit XFCE als Desktop-Umgebung. Die Apple-GPU wird über Mesa angesprochen.

## Der Stack im Überblick

```
greetd + tuigreet
  └→ startxfce4 --wayland wayfire
       ├→ Wayfire (Wayland-Compositor, wlroots-basiert)
       ├→ xfce4-session
       ├→ xfce4-panel (gepatcht: gtk-layer-shell)
       ├→ xfdesktop (gepatcht: Wayland-Monitornamen)
       └→ nm-applet, swayidle
```

Die Idee: Wayfire übernimmt das Compositing, Fenstermanagement und die Effekte. XFCE liefert Session-Management, Panel, Desktop, Einstellungen und die vertrauten Anwendungen wie Thunar und Mousepad. XFCE startet dabei als Wayland-Session direkt auf Wayfire.

## Login: greetd + tuigreet

Als Display-Manager dient greetd mit dem textbasierten Greeter tuigreet. Das ist minimal, schnell und funktioniert ohne eigene Grafik-Session. Die Konfiguration in `/etc/greetd/config.toml`:

```toml
[terminal]
vt = 7

[default_session]
command = "tuigreet --time --remember --cmd 'startxfce4 --wayland wayfire'"
user = "greetd"
```

## Wayfire

Wayfire wird über `~/.config/wayfire.ini` konfiguriert. Die wichtigsten Entscheidungen in diesem Setup:

- `preferred_decoration_mode = server` sorgt für Server-Side-Decorations an allen Fenstern. Alle Apps bekommen einheitliche Titelleisten vom Compositor.
- `scale = 2.0` für HiDPI auf dem Retina-Display.
- Virtuelle Arbeitsflächen in einer 4x1-Reihe (`vwidth = 4`, `vheight = 1`), erreichbar per Tastatur und Gesten.
- Plugins wie expo (Workspace-Übersicht), grid, cube und wobbly für den klassischen Compositing-Komfort.

Screenshots laufen über grim und slurp, die Bearbeitung über swappy. Als Launcher dient wofi, als Terminal kitty.

## XFCE als Wayland-Session

XFCE 4.20 kann als Wayland-Session auf einem externen Compositor laufen. Genau das passiert hier mit `startxfce4 --wayland wayfire`. Zwei Details sind entscheidend:

**Umgebungsvariablen gehören in `~/.config/xfce4/xinitrc`.** greetd lädt keine Login-Shell-Profile. Wer Variablen wie `GTK_MODULES=xfsettingsd-gtk-settings-sync` setzen will, muss das in der xinitrc tun. Diese Variable sorgt dafür, dass XFCE-Einstellungsdialoge die Server-Side-Decorations von Wayfire nutzen statt eigener GtkHeaderBars.

**`dbus-update-activation-environment --systemd` muss `WAYLAND_DISPLAY` und `DISPLAY` enthalten.** Ohne diese Weitergabe an die systemd-User-Session schlägt `xdg-desktop-portal-gtk` fehl. Die Folge wären kaputte Datei-Dialoge in Wayland-Anwendungen, etwa beim Speichern in Chromium.

Eine bekannte Grenze: Wayfire unterstützt das Protokoll `ext_workspace_manager_v1` nicht. XFCE sieht deshalb alle Arbeitsflächen als eine einzige. Die Wayfire-Workspaces selbst funktionieren einwandfrei, nur Features wie Wallpaper pro Arbeitsfläche entfallen.

## Audio: PipeWire

Audio läuft über PipeWire 1.4 mit WirePlumber 0.5. Das Paket `pipewire-pulseaudio` stellt die PulseAudio-Kompatibilität für ältere Anwendungen bereit, `pipewire-jack-audio-connection-kit` die JACK-Schnittstelle. `pulseaudio-utils` liefert das gewohnte `pactl`.

## Bluetooth: stabiles A2DP

Bluetooth-Audio auf Asahi braucht zwei Eingriffe für einen sauberen Betrieb.

### HFP-Autoswitch abschalten

Sobald eine App das Headset-Mikrofon anfordert, schalten viele Setups automatisch auf das HFP/HSP-Profil um. Das Ergebnis ist Mono-Audio in Telefonqualität plus Rauschen. Eine WirePlumber-Drop-in-Datei unter `~/.config/wireplumber/wireplumber.conf.d/51-bluez-no-autoswitch.conf` erzwingt reinen Musikbetrieb:

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

Der Preis: Das Bluetooth-Mikrofon steht nicht zur Verfügung. Für Calls dient das eingebaute MacBook-Mikrofon. Wer das Headset-Mikrofon braucht, setzt `autoswitch-to-headset-profile = true` und entfernt die Zeile mit `bluez5.roles`.

### A2DP-Aussetzer bei WLAN-Traffic

Die Broadcom-Chips in Apple-Silicon-Macs teilen sich eine Antenne für WLAN und Bluetooth. macOS priorisiert A2DP-Verbindungen über ein herstellerspezifisches HCI-Kommando. Der Linux-Treiber tut das nicht, deshalb knistert Bluetooth-Audio bei WLAN-Last. Die Lösung ist ein kleiner systemd-Service, der nach jedem Bluetooth-Connect die Traffic-Priorität per HCI-Kommando hochsetzt. Der Ansatz stammt aus dem Projekt [asahi-bt-a2dp-fix](https://github.com/christian-korneck/asahi-bt-a2dp-fix).

### Erstkopplung

Manche Headsets verbinden sich beim ersten Pairing nur mit HFP, sodass kein A2DP-Profil erscheint. Abhilfe schafft ein Neustart der Audio-Dienste zwischen Disconnect und Reconnect:

```bash
bluetoothctl disconnect <MAC>
systemctl --user restart wireplumber pipewire-pulse pipewire
bluetoothctl connect <MAC>
```

Danach bleibt das A2DP-Profil auch über Reconnects erhalten.

## HiDPI und Notch

Das interne Display läuft mit `scale = 2.0` in Wayfire. Die Notch des MacBook Pro ist standardmäßig ausgeblendet. Wer die volle Displayfläche nutzen will, aktiviert sie mit dem Kernel-Parameter `appledrm.show_notch=1`. Die Änderung braucht einen Reboot.

## Stolpersteine

### 16K-Speicherseiten

Der Asahi-Kernel verwendet 16K-Pages statt der üblichen 4K. Die meiste Software ist darauf vorbereitet, aber Programme mit fest einkompilierten 4K-Annahmen stürzen ab. Ein Beispiel aus der Praxis ist Minecraft: Der LWJGL-eigene Allocator crasht auf 16K-Systemen. Der Fix ist das JVM-Flag `-Dorg.lwjgl.system.allocator=system` in Kombination mit Java 21. Ähnliche Symptome bei anderer Software sind fast immer ein Hinweis auf ein 16K-Problem.

### GTK4 stürzt im Vulkan-Renderer ab

GTK4-Anwendungen crashen auf Asahi mit SIGSEGV, wenn sie den Vulkan-Renderer verwenden. Der Workaround gilt für alle GTK4-Apps:

```bash
GSK_RENDERER=gl <app>
```

Wer das dauerhaft will, setzt die Variable in der `~/.config/xfce4/xinitrc`, damit sie die gesamte Session erbt.

### Signal Desktop braucht --no-sandbox

Signal Desktop benötigt auf ARM64-Fedora das Flag `--no-sandbox`, sonst startet es nicht.

### Suspend ist s2idle

Apple Silicon unterstützt unter Linux nur s2idle. Hibernate ist wegen einer Einschränkung der GPU-Firmware nicht möglich.

## Gepatchte Pakete

Mehrere Bausteine dieses Setups brauchen Patches, die es so nicht in Fedora gibt. Das Panel muss als Layer-Shell-Fläche laufen, xfdesktop braucht einen Wayland-Monitornamen-Fix, der Lockscreen braucht `ext-session-lock-v1`. Diese Pakete kommen aus dem eigenen Repository. Details stehen unter [Netsnek RPM-Repository](/docs/linux/rpm).
