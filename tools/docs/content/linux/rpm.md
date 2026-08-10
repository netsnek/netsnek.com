---
title: Netsnek RPM-Repository
description: Das Repository rpm.netsnek.com mit gepatchten aarch64-Paketen für Asahi Linux, inklusive dnf-Einbindung und Paketübersicht.
path: /docs/linux/rpm
---

# Netsnek RPM-Repository

Netsnek e.U. betreibt unter `rpm.netsnek.com` ein eigenes RPM-Repository. Es enthält Pakete, die für den Wayland-Desktop auf Asahi Linux gepatcht oder überhaupt erst für aarch64 gebaut wurden. Alle Pakete zielen auf Fedora 43 auf aarch64 und sind auf das Asahi-Setup ausgerichtet. Auf anderen Architekturen oder Distributionen sind sie ungetestet.

## Einbindung per dnf

Die Repo-Definition kommt nach `/etc/yum.repos.d/netsnek.repo`:

```ini
[netsnek]
name=Netsnek Custom Packages for Asahi Linux
baseurl=https://rpm.netsnek.com/
enabled=1
gpgcheck=0
metadata_expire=300
```

Danach genügt ein `sudo dnf makecache --repo netsnek` und die Pakete stehen normal über dnf zur Verfügung.

Hinweis: Die Pakete sind derzeit nicht GPG-signiert, daher `gpgcheck=0`. Wer das Repository einbindet, vertraut den Netsnek-Builds. Die Auslieferung erfolgt über HTTPS.

## Namens- und Versionslogik

Die Pakete tragen ihre originalen Upstream-Namen, also zum Beispiel `swappy` statt `swappy-netsnek`. Damit die Netsnek-Version Vorrang vor dem Fedora-Paket bekommt, wird je nach Paket ein höheres Release, ein `Epoch: 1` oder ein `Obsoletes:` auf alte Paketnamen verwendet. Updates aus Fedora überschreiben die gepatchten Pakete dadurch nicht versehentlich.

## Pakete

| Paket | Version | Warum gepatcht |
|---|---|---|
| xfce4-panel | 4.20.6 | Layer-Shell-Support für Wayland |
| xfdesktop | 4.20.1 | Wayland-Build plus Monitornamen-Fix |
| swappy | 1.5.1 | Server-Side-Decorations statt CSD |
| swaylock-effects | 1.7.0 | ext-session-lock-v1-Support |
| telegram-desktop | 6.6.0 | Nativer aarch64-Build |
| signal-desktop | 8.1.0 | Nativer aarch64-Build |
| mugshot | 0.4.3 | Nicht in Fedora paketiert |

### xfce4-panel

Rebuild des Fedora-Pakets mit aktiviertem `gtk-layer-shell`. Das Panel wird damit unter Wayland als Shell-Fläche erkannt, bekommt keine Compositor-Titelleiste und reserviert seinen Bildschirmplatz korrekt.

### xfdesktop

Rebuild mit `--enable-wayland` plus einem Quellcode-Patch für die Monitornamen. Ohne den Patch schreibt der Einstellungsdialog Wallpaper-Settings auf `monitor0`, während der Desktop sie unter dem Connector-Namen wie `monitoreDP-1` sucht. Der Patch löst den Namen über libxfce4windowing auf, damit beide Seiten denselben Schlüssel verwenden.

### swappy

Der Screenshot-Editor nutzt upstream eine GtkHeaderBar als Client-Side-Decoration. Der Patch verschiebt die HeaderBar in den normalen Fensterinhalt, damit Wayfire eine einheitliche Server-Side-Decoration um das Fenster zeichnen kann.

### swaylock-effects

Build des jirutka-Forks in Version 1.7.0. Dieser Fork unterstützt das Protokoll `ext-session-lock-v1` und liefert Effekte wie Blur, Uhr und Fade-in für den Lockscreen.

### telegram-desktop

Nativ für aarch64 kompilierter Telegram-Client auf Basis des Nicegram-Forks. Offizielle Binärpakete für diese Architektur fehlen, daher der eigene Build inklusive WebRTC-Stack.

### signal-desktop

Nativer aarch64-Build aus dem offiziellen Signal-Desktop-Quellcode, den es sonst nicht als Fedora-Paket gibt. Der Desktop-Eintrag startet mit `--no-sandbox --ozone-platform=wayland`, weil die Sandbox auf ARM64-Fedora nicht funktioniert und die App sonst über XWayland liefe.

### mugshot

Unverändertes Upstream-Paket von bluesabre/mugshot, das in Fedora nicht paketiert ist. Es liefert den Profilbild-Dialog, den der Profil-Button im Whisker-Menü von XFCE benötigt.

## Repodata

Die Repository-Metadaten werden mit `createrepo` erzeugt. dnf konsumiert das Repository wie jedes andere, inklusive `metadata_expire` von 300 Sekunden für zeitnahe Updates.

## Support

Das Repository ist ein Ein-Personen-Projekt für ein konkretes Setup. Es gibt keine Garantie auf Stabilität oder zeitnahe Rebuilds nach Fedora-Updates. Feedback ist trotzdem willkommen über die auf [netsnek.com](https://netsnek.com) angegebenen Kontaktwege.
