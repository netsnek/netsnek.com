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
| wlroots | 0.19.2 | Backport von ext-workspace-v1 |
| wayfire | 0.10.1 | Patch-Stack samt wlr-workspaces-Plugin |
| wayfire-plugins-extra | 0.10.0 | Zusatz-Plugins cube-gears und dither |
| xfce4-panel | 4.20.6 | Layer-Shell-Support für Wayland |
| xfdesktop | 4.20.1 | Wayland-Build plus Monitornamen-Fix |
| swappy | 1.5.1 | Server-Side-Decorations statt CSD |
| swaylock-effects | 1.7.0 | ext-session-lock-v1-Support |
| kitty | 0.43.1 | Python-3.14-Fix plus Notification-Crashfix |
| mugshot | 0.4.3 | Nicht in Fedora paketiert |
| telegram-desktop | 6.6.0 | Nativer aarch64-Build |
| signal-desktop | 8.1.0 | Nativer aarch64-Build |
| youtube-music | 3.11.0 | aarch64-Build mit wiederhergestellten Plugins |
| winamp | 0.5.0 | Nativer aarch64-Qt6-Port |
| cursor | 2.6.19 | Inoffizieller ARM64-Build |

### wlroots

Rebuild des Fedora-Pakets 0.19.2 mit einem Backport der `ext-workspace-v1`-Protokoll-Implementierung aus wlroots 0.20. Der Patch fügt nur neue Dateien und zwei Build-Zeilen hinzu, bestehender Code bleibt unverändert. Er ist die Grundlage dafür, dass Workspace-Pager wie das XFCE-Panel die Arbeitsflächen des Compositors sehen. Sobald wlroots 0.20 in Fedora landet, wird das Paket obsolet.

### wayfire

Rebuild von Wayfire 0.10.1 mit einem Patch-Stack:

- Crashfix für Layer-Shell-Fenster, die nach dem Ausblenden wieder eingeblendet werden, nötig etwa für kittys Dropdown-Terminal.
- Das Plugin `wlr-workspaces` exponiert die Wayfire-Arbeitsflächen über `ext-workspace-v1`. Der XFCE-Pager zeigt damit alle Workspaces im Button-Modus und Klicks im Pager wechseln die Arbeitsfläche. Benötigt das gepatchte wlroots und xfce4-panel ab Version 4.20.1.
- 10-Bit-Farbtiefe: `depth = 10` im `[output]`-Block der wayfire.ini funktioniert damit wirklich und reduziert Gradient-Banding.
- Zwei Cube-Erweiterungen: Aktivierung des Desktop-Würfels per Modifier plus Vier-Finger-Swipe und eine Render-Schnittstelle für Inner-Cube-Plugins.

### wayfire-plugins-extra

Rebuild mit zwei zusätzlichen Plugins: `cube-gears` zeichnet Zahnräder in den Desktop-Würfel, `dither` reduziert per Ordered-Dithering sichtbares Farbverlaufs-Banding auf dem internen Display.

### xfce4-panel

Rebuild des Fedora-Pakets mit aktiviertem `gtk-layer-shell`. Das Panel wird damit unter Wayland als Shell-Fläche erkannt, bekommt keine Compositor-Titelleiste und reserviert seinen Bildschirmplatz korrekt.

### xfdesktop

Rebuild mit `--enable-wayland` plus einem Quellcode-Patch für die Monitornamen. Ohne den Patch schreibt der Einstellungsdialog Wallpaper-Settings auf `monitor0`, während der Desktop sie unter dem Connector-Namen wie `monitoreDP-1` sucht. Der Patch löst den Namen über libxfce4windowing auf, damit beide Seiten denselben Schlüssel verwenden.

### swappy

Der Screenshot-Editor nutzt upstream eine GtkHeaderBar als Client-Side-Decoration. Der Patch verschiebt die HeaderBar in den normalen Fensterinhalt, damit Wayfire eine einheitliche Server-Side-Decoration um das Fenster zeichnen kann.

### swaylock-effects

Build des jirutka-Forks in Version 1.7.0. Dieser Fork unterstützt das Protokoll `ext-session-lock-v1` und liefert Effekte wie Blur, Uhr und Fade-in für den Lockscreen.

### kitty

Rebuild des Fedora-Pakets mit zwei Fixes: einem Upstream-Patch für Python 3.14 und einem eigenen Fix für einen Out-of-bounds-Read im dbus-Notification-Code, der kitty bei Desktop-Benachrichtigungen crashen ließ. Die Subpakete `kitty-kitten`, `kitty-terminfo` und `kitty-shell-integration` sind ebenfalls enthalten.

### telegram-desktop

Nativ für aarch64 kompilierter Telegram-Client auf Basis des Nicegram-Forks. Offizielle Binärpakete für diese Architektur fehlen, daher der eigene Build inklusive WebRTC-Stack.

### signal-desktop

Nativer aarch64-Build aus dem offiziellen Signal-Desktop-Quellcode, den es sonst nicht als Fedora-Paket gibt. Der Desktop-Eintrag startet mit `--no-sandbox --ozone-platform=wayland`, weil die Sandbox auf ARM64-Fedora nicht funktioniert und die App sonst über XWayland liefe.

### mugshot

Unverändertes Upstream-Paket von bluesabre/mugshot, das in Fedora nicht paketiert ist. Es liefert den Profilbild-Dialog, den der Profil-Button im Whisker-Menü von XFCE benötigt.

### youtube-music

aarch64-Build des Pear-Desktop-Forks von YouTube Music (Upstream [pear-devs/pear-desktop](https://github.com/pear-devs/pear-desktop)). Gegenüber Upstream sind das Adblocker-Plugin und das No-Google-Login-Plugin wiederhergestellt, die beide dort entfernt wurden, und die Google-Consent-Seite rendert im Dark Mode.

### winamp

Nativer aarch64-Qt6-Port von Winamp Classic auf Basis von [lord3nd3r/winamp-linux](https://github.com/lord3nd3r/winamp-linux), das Upstream nur für x86_64 ausliefert. Enthält die klassische Oberfläche mit Classic-Skin-Support, Equalizer, Playlist, Media Library, MPRIS2 für die Medientasten und MilkDrop-Visualisierung über libprojectM. Eigene Patches: Fenster-Ziehen unter Wayland über `QWindow::startSystemMove()`, ein Richtungs-Fix für die EQ-Slider und eine freigeschaltete, als experimentell gekennzeichnete Modern-Skin-Engine. Lizenzhinweis: Winamp steht unter der Winamp Collaborative License, die private Nutzung erlaubt, die Weitergabe modifizierter Versionen laut Lizenztext aber untersagt.

### cursor

Inoffizieller nativer ARM64-Build des Cursor-Editors, der die Cursor-JavaScript-Ressourcen auf VS Code für ARM64 aufsetzt. Cursor liefert offiziell kein Binary für Linux-aarch64. Enthalten ist zusätzlich cursor-web, das die Desktop-Workbench im Browser lädt.

## Repodata

Die Repository-Metadaten werden mit `createrepo` erzeugt. dnf konsumiert das Repository wie jedes andere, inklusive `metadata_expire` von 300 Sekunden für zeitnahe Updates.

## Support

Das Repository ist ein Ein-Personen-Projekt für ein konkretes Setup. Es gibt keine Garantie auf Stabilität oder zeitnahe Rebuilds nach Fedora-Updates. Feedback ist trotzdem willkommen über die auf [netsnek.com](https://netsnek.com) angegebenen Kontaktwege.
