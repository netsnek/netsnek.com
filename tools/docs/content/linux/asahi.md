---
title: Asahi Desktop Setup
description: Wie ich mir auf dem MacBook Pro einen Wayland-Desktop aus Wayfire und XFCE gebaut habe, samt der Stolpersteine, die mich unterwegs erwischt haben.
path: /docs/linux/asahi
---

# Asahi Desktop Setup

Mein Desktop ist eine Kombination, die es so fertig nirgends gibt: Wayfire als Wayland-Compositor, darauf XFCE 4.20 als Desktop-Umgebung, das Ganze auf einem MacBook Pro mit Fedora 43 und Asahi-Kernel. Die Apple-GPU läuft über Mesa. Ich wollte die Compositing-Effekte von Wayfire und trotzdem die vertraute XFCE-Welt mit Panel, Thunar und Einstellungsdialogen. Beides zusammen funktioniert. Es hat nur gedauert, bis alle Teile sauber ineinandergegriffen haben, und genau diese Wegstrecke steht auf dieser Seite.

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

Die Arbeitsteilung: Wayfire übernimmt Compositing, Fenstermanagement und Effekte. XFCE liefert Session-Management, Panel, Desktop, Einstellungen und die Anwendungen. XFCE startet dabei als Wayland-Session direkt auf Wayfire.

## Login: greetd + tuigreet

Einen schweren Display-Manager wollte ich nicht. greetd mit dem textbasierten Greeter tuigreet ist minimal, schnell und braucht keine eigene Grafik-Session. Meine Konfiguration in `/etc/greetd/config.toml`:

```toml
[terminal]
vt = 7

[default_session]
command = "tuigreet --time --remember --cmd 'startxfce4 --wayland wayfire'"
user = "greetd"
```

## Wayfire

Wayfire konfiguriere ich über `~/.config/wayfire.ini`. Die wichtigsten Entscheidungen, die ich dabei getroffen habe:

- `preferred_decoration_mode = server` sorgt für Server-Side-Decorations an allen Fenstern. Jede App bekommt dieselbe Titelleiste vom Compositor, egal was sie selbst mitbringt. Dieser einheitliche Look war mir wichtig.
- `scale = 2.0` für HiDPI auf dem Retina-Display.
- Virtuelle Arbeitsflächen in einer 4x1-Reihe (`vwidth = 4`, `vheight = 1`), erreichbar per Tastatur und Gesten.
- Plugins wie expo (Workspace-Übersicht), grid, cube und wobbly für den klassischen Compositing-Komfort, den ich seit Compiz-Zeiten vermisst habe.

Mein Lieblingsdetail ist der Desktop-Würfel. Die 4x1-Arbeitsflächen liegen auf den Seiten eines drehbaren Würfels, den ich mit Super plus Klick oder einem Vier-Finger-Swipe öffne. Beides kommt aus einem eigenen Patch, den mein gepatchtes Wayfire von [rpm.netsnek.com](/docs/linux/rpm) mitbringt. Und weil es geht, zeichnet das Plugin `cube-gears` als Anspielung auf glxgears rotierende Zahnräder ins Innere des Würfels. Auf dem Apple-GPU-Stack läuft das alles flüssig.

Screenshots mache ich mit grim und slurp, bearbeitet wird mit swappy. Als Launcher dient wofi, als Terminal kitty.

## XFCE als Wayland-Session

XFCE 4.20 kann als Wayland-Session auf einem externen Compositor laufen. Genau das passiert hier mit `startxfce4 --wayland wayfire`. Zwei Details haben mich Zeit gekostet:

**Umgebungsvariablen gehören in `~/.config/xfce4/xinitrc`.** greetd lädt keine Login-Shell-Profile. Wer Variablen wie `GTK_MODULES=xfsettingsd-gtk-settings-sync` setzen will, muss das in der xinitrc tun. Diese Variable sorgt dafür, dass XFCE-Einstellungsdialoge die Server-Side-Decorations von Wayfire nutzen statt eigener GtkHeaderBars.

**`dbus-update-activation-environment --systemd` muss `WAYLAND_DISPLAY` und `DISPLAY` enthalten.** Ohne diese Weitergabe an die systemd-User-Session schlägt `xdg-desktop-portal-gtk` fehl. Gemerkt habe ich das an kaputten Datei-Dialogen in Wayland-Anwendungen, etwa beim Speichern in Chromium.

Am längsten habe ich mit dem Workspace-Pager gerungen. wlroots 0.19 implementiert das Protokoll `ext_workspace_manager_v1` nicht, die native Unterstützung kommt erst mit wlroots 0.20. Mit Stock-Paketen sieht XFCE deshalb nur eine einzige Arbeitsfläche, und mein schöner 4x1-Würfel war für das Panel unsichtbar. Meine Lösung: ein gepatchtes wlroots 0.19.2 mit der ext-workspace-v1-Implementierung als Backport, dazu Wayfire 0.10.1 mit dem Plugin `wlr-workspaces`, das die Wayfire-Arbeitsflächen über das Protokoll exponiert. Beide Pakete kommen aus meinem [RPM-Repository](/docs/linux/rpm). Der XFCE-Pager zeigt damit alle Arbeitsflächen im Button-Modus und Klicks im Pager wechseln den Workspace. Das Panel muss dafür mindestens Version 4.20.1 sein, 4.20.0 enthält einen ext-workspace-Bug. Was weiterhin fehlt: Das Protokoll kennt kein Fenster-zu-Workspace-Mapping, Thumbnail-Pager und Wallpaper pro Arbeitsfläche gibt es deshalb nicht.

## Audio: PipeWire

Audio läuft über PipeWire 1.4 mit WirePlumber 0.5. Das Paket `pipewire-pulseaudio` stellt die PulseAudio-Kompatibilität für ältere Anwendungen bereit, `pipewire-jack-audio-connection-kit` die JACK-Schnittstelle. `pulseaudio-utils` liefert das gewohnte `pactl`.

## Bluetooth: stabiles A2DP

Bluetooth-Audio auf Asahi hat mich zwei Kämpfe gekostet, bis es sich wie ein fertiges Produkt angefühlt hat.

### HFP-Autoswitch abschalten

Der erste Kampf: Musik klingt großartig, dann fordert irgendeine App das Headset-Mikrofon an und plötzlich höre ich Mono-Audio in Telefonqualität plus Rauschen. Schuld ist der automatische Wechsel auf das HFP/HSP-Profil. Meine WirePlumber-Drop-in-Datei unter `~/.config/wireplumber/wireplumber.conf.d/51-bluez-no-autoswitch.conf` erzwingt reinen Musikbetrieb:

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

Der Preis: Das Bluetooth-Mikrofon steht nicht zur Verfügung. Für Calls nehme ich das eingebaute MacBook-Mikrofon, das ist ohnehin besser. Wer das Headset-Mikrofon braucht, setzt `autoswitch-to-headset-profile = true` und entfernt die Zeile mit `bluez5.roles`.

### A2DP-Aussetzer bei WLAN-Traffic

Der zweite Kampf war subtiler: Bluetooth-Audio knisterte immer genau dann, wenn im WLAN etwas los war. Die Broadcom-Chips in Apple-Silicon-Macs teilen sich eine Antenne für WLAN und Bluetooth. macOS priorisiert A2DP-Verbindungen über ein herstellerspezifisches HCI-Kommando, der Linux-Treiber tut das nicht. Die Lösung ist ein kleiner systemd-Service, der nach jedem Bluetooth-Connect die Traffic-Priorität per HCI-Kommando hochsetzt. Der Ansatz stammt aus dem Projekt [asahi-bt-a2dp-fix](https://github.com/christian-korneck/asahi-bt-a2dp-fix).

### Erstkopplung

Manche Headsets verbinden sich beim ersten Pairing nur mit HFP, sodass gar kein A2DP-Profil erscheint. Was bei mir hilft, ist ein Neustart der Audio-Dienste zwischen Disconnect und Reconnect:

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

Mein erster echter Asahi-Moment war ein Minecraft, das beim Start sofort verschwand. Der Asahi-Kernel verwendet 16K-Pages statt der üblichen 4K. Die meiste Software ist darauf vorbereitet, aber Programme mit fest einkompilierten 4K-Annahmen stürzen ab. Der häufigste Täter ist ein gebündeltes jemalloc, erkennbar an der Meldung `<jemalloc>: Unsupported system page size`. Drei Fälle, die ich selbst durchhabe:

- **Minecraft**: Das von LWJGL mitgelieferte jemalloc crasht garantiert beim Start. Der Fix ist das JVM-Flag `-Dorg.lwjgl.system.allocator=system`, damit nutzt LWJGL den glibc-Allocator. Für aktuelle Modloader zusätzlich Java 21 als Instanz-Java pinnen.
- **Widevine**: Das ARM64-CDM muss für 16K-Pages gepatcht werden. Asahis `widevine-installer` erledigt das automatisch beim Installieren.
- **FEX-emu**: Der x86-Emulator stirbt auf 16K-Kernels am selben jemalloc-Problem. Deshalb läuft x86-Software bei mir in einer microVM, siehe unten.

Wenn irgendetwas auf Asahi kommentarlos crasht, ist mein erster Verdacht inzwischen immer die Page-Size.

### GTK4 stürzt im Vulkan-Renderer ab

GTK4-Anwendungen verschwanden bei mir kommentarlos mit SIGSEGV, ohne brauchbaren Traceback. Die Ursache: Neuere GTK4-Versionen wählen den Vulkan-Renderer, sobald ein Vulkan-Treiber installiert ist. Der Asahi-Vulkan-Treiber Honeykrisp trägt diesen Pfad noch nicht zuverlässig. Mein Workaround erzwingt den GL-Renderer und gilt für alle GTK4-Apps:

```bash
GSK_RENDERER=gl <app>
```

Wer das dauerhaft will, setzt die Variable in der `~/.config/xfce4/xinitrc`, damit sie die gesamte Session erbt. Für Flatpaks gilt sie pro App:

```bash
flatpak override --user --env=GSK_RENDERER=gl <app-id>
```

Zur Gegenprobe starte ich die App mit `GSK_DEBUG=renderer`, im Log muss `Using renderer 'GskGLRenderer'` stehen. Macht auch der GL-Renderer Probleme, ist `GSK_RENDERER=cairo` der reine Software-Weg, immer stabil, aber langsamer.

### Signal Desktop braucht --no-sandbox

Signal Desktop benötigt auf ARM64-Fedora das Flag `--no-sandbox`, sonst startet es nicht.

### Suspend ist s2idle

Apple Silicon unterstützt unter Linux nur s2idle. Hibernate ist wegen einer Einschränkung der GPU-Firmware nicht möglich. Damit habe ich mich abgefunden.

### USB-1.1-Geräte an den USB-C-Ports

Auf Asahi-Kernels vor 6.19 enumerieren Full-Speed-Geräte wie ältere Adapter oder Mikrocontroller-Boards oft nicht, im Kernel-Log stehen dann Meldungen wie `device descriptor read/64, error -71`. Der Fehler liegt im USB2-PHY-Handling und ist seit Linux 6.19 behoben. Eine Warnung aus Erfahrung: Den Treiber `dwc3-apple` niemals im laufenden Betrieb unbinden, um die PHY zu resetten. Das verklemmt den Controller und beide USB-Buses sind bis zum Reboot weg.

## x86-Software mit FEX und muvm

Manche Software gibt es schlicht nicht als ARM64-Linux-Build, bei mir ist der TeamSpeak-Client so ein Fall. Auf Asahi läuft sie trotzdem, mit FEX-emu als x86_64-Emulator. Weil FEX selbst am 16K-Kernel scheitert, steckt die Emulation in muvm, einer leichtgewichtigen microVM mit 4K-Page-Guest. Die nötigen Pakete heißen `fex-emu`, `muvm` und `fex-emu-rootfs-fedora`. Ein binfmt-Eintrag im Guest routet x86-Binaries automatisch durch FEX.

Ein paar Eigenheiten, die ich mir alle einzeln erarbeiten musste:

- Der Guest sieht X11, keinen Wayland-Socket. muvm setzt `DISPLAY` auf eine X11-Bridge zum Host-Xwayland. Chromium- und CEF-Apps brauchen deshalb `--ozone-platform=x11`, Qt-Apps `QT_QPA_PLATFORM=xcb`.
- Audio funktioniert ohne Zutun, muvm reicht PipeWire und Pulse in den Guest durch.
- Das HOME-Verzeichnis wird per virtiofs geteilt. Fehlende x86-Bibliotheken hole ich mit `dnf download --forcearch=x86_64 <paket>`, entpacke sie unter HOME und binde sie per `LD_LIBRARY_PATH` ein.
- Chromium- und CEF-Apps brauchen `--no-sandbox`, weil ihre Sandbox unter FEX nicht initialisiert. Für Qt WebEngine gilt analog `QTWEBENGINE_DISABLE_SANDBOX=1`.
- GPU-Beschleunigung im Guest braucht das Paket `mesa-fex-emu-overlay-x86_64` und das virglrenderer-Build aus dem Asahi-COPR. Achtung: Das Fedora-eigene virglrenderer kann das COPR-Paket bei Updates still ersetzen, danach ist die GPU-Beschleunigung im Guest weg. Ein `dnf versionlock add virglrenderer` verhindert das.
- Startet muvm ohne erkennbaren Grund nicht mehr, liegen oft verwaiste Dateien (`krun`, `muvm.lock`) eines abgestürzten früheren Laufs im XDG-Runtime-Verzeichnis. Löschen, sobald kein muvm-Prozess mehr läuft.

## Gepatchte Pakete

Mehrere Bausteine dieses Setups brauchen Patches, die es so nicht in Fedora gibt. Das Panel muss als Layer-Shell-Fläche laufen, xfdesktop braucht einen Wayland-Monitornamen-Fix, der Lockscreen braucht `ext-session-lock-v1`, der Workspace-Pager braucht das gepatchte wlroots samt Wayfire-Plugin. Diese Pakete baue ich selbst. Die ganze Geschichte dazu steht unter [Netsnek RPM-Repository](/docs/linux/rpm).
