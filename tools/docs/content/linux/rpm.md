---
title: Netsnek RPM-Repository
description: Mein eigenes RPM-Repository rpm.netsnek.com, die Geschichten hinter den gepatchten Paketen und warum die öffentliche Einbindung erst mit einem Signaturschlüssel kommt.
path: /docs/linux/rpm
---

# Netsnek RPM-Repository

Mein [Asahi-Desktop](/docs/linux/asahi) funktioniert nur, weil eine Handvoll Pakete anders gebaut ist als in Fedora. Damit ich diese Builds nicht von Hand pflegen muss und Fedora-Updates sie nicht überschreiben, betreibe ich unter `rpm.netsnek.com` ein eigenes RPM-Repository. Alle Pakete zielen auf Fedora 43 auf aarch64 und sind auf mein Asahi-Setup ausgerichtet. Auf anderen Architekturen oder Distributionen habe ich sie nicht getestet.

## Einbindung per dnf

Hier stand einmal ein Copy-Paste-Block für `/etc/yum.repos.d/netsnek.repo`. Den habe ich wieder herausgenommen, und zwar aus einem Grund, der mir wichtiger ist als die Bequemlichkeit: Ein Repository bringt Software mit Root-Rechten auf fremde Rechner. So etwas gehört signiert, und eine Anleitung, die dafür die Signaturprüfung abschaltet, will ich niemandem hinlegen. Genau das hätte hier gestanden.

Der Signaturschlüssel ist deshalb der nächste Schritt für dieses Repository. Sobald die Pakete signiert sind, steht die Einbindung mit `gpgcheck=1` und dem öffentlichen Schlüssel an dieser Stelle. Die Metadaten erzeuge ich ohnehin mit `createrepo`, dnf behandelt das Repository dann wie jedes andere. Bis dahin gilt: Wer eines der Pakete braucht, meldet sich über die auf [netsnek.com](https://netsnek.com) angegebenen Kontaktwege, und wir schauen uns gemeinsam an, was für den jeweiligen Rechner Sinn ergibt.

## Vorrang vor Fedora

Die Pakete tragen ihre originalen Upstream-Namen, also zum Beispiel `swappy` statt `swappy-netsnek`. Damit meine Version Vorrang vor dem Fedora-Paket bekommt, verwende ich je nach Paket ein höheres Release, ein `Epoch: 1` oder ein `Obsoletes:` auf alte Paketnamen. Updates aus Fedora überschreiben die gepatchten Pakete dadurch nicht versehentlich.

## Was drin ist und warum

### Der Wayland-Kern

**wlroots** ist der eigentliche Anlass für dieses Repository. Mein XFCE-Panel sah nur eine einzige Arbeitsfläche, weil wlroots 0.19 das Protokoll `ext-workspace-v1` noch nicht implementiert. Die Rettung war ein Backport der 0.20-Implementierung aus der Community rund um dkondor, den ich für Fedora auf 0.19.2 paketiert habe. Der Patch fügt nur neue Dateien und zwei Build-Zeilen hinzu, bestehender Code bleibt unverändert. Sobald wlroots 0.20 in Fedora landet, werfe ich das Paket wieder raus.

**wayfire** trägt meinen Patch-Stack. Ein Crashfix für Layer-Shell-Fenster, die nach dem Ausblenden wieder eingeblendet werden, den brauchte ich für kittys Dropdown-Terminal. Das Plugin `wlr-workspaces` aus derselben Community-Arbeit von dkondor, das die Wayfire-Arbeitsflächen über `ext-workspace-v1` exponiert, damit der XFCE-Pager sie sieht und Klicks im Pager den Workspace wechseln. Echte 10-Bit-Farbtiefe, `depth = 10` im `[output]`-Block der wayfire.ini funktioniert damit wirklich und reduziert Gradient-Banding. Und zwei Cube-Erweiterungen: die Aktivierung des Desktop-Würfels per Modifier plus Vier-Finger-Swipe sowie eine Render-Schnittstelle für Inner-Cube-Plugins.

**wayfire-plugins-extra** bringt zwei eigene Plugins mit. `cube-gears` zeichnet als Anspielung auf glxgears Zahnräder ins Innere des Desktop-Würfels. `dither` reduziert per Ordered-Dithering sichtbares Farbverlaufs-Banding auf dem internen Display.

### Die XFCE- und Desktop-Bausteine

**xfce4-panel** baue ich mit aktiviertem `gtk-layer-shell`. Das Panel wird damit unter Wayland als Shell-Fläche erkannt, bekommt keine Compositor-Titelleiste und reserviert seinen Bildschirmplatz korrekt.

**xfdesktop** bekommt den Wayland-Build plus einen eigenen Patch für die Monitornamen. Ohne ihn schreibt der Einstellungsdialog Wallpaper-Settings auf `monitor0`, während der Desktop sie unter dem Connector-Namen wie `monitoreDP-1` sucht. Mein Wallpaper war also einstellbar, aber nie sichtbar. Der Patch löst den Namen über libxfce4windowing auf, damit beide Seiten denselben Schlüssel verwenden.

**swappy**, mein Screenshot-Editor, nutzt upstream eine GtkHeaderBar als Client-Side-Decoration und tanzte damit aus meiner Server-Side-Decoration-Reihe. Der Patch verschiebt die HeaderBar in den normalen Fensterinhalt, damit Wayfire eine einheitliche Titelleiste um das Fenster zeichnen kann.

**swaylock-effects** baue ich aus dem jirutka-Fork, weil der das Protokoll `ext-session-lock-v1` unterstützt und Effekte wie Blur, Uhr und Fade-in für den Lockscreen liefert.

**kitty** bekommt zwei Fixes: einen Upstream-Patch für Python 3.14 und einen eigenen für einen Out-of-bounds-Read im dbus-Notification-Code, der kitty bei mir bei Desktop-Benachrichtigungen crashen ließ. Die Subpakete `kitty-kitten`, `kitty-terminfo` und `kitty-shell-integration` sind ebenfalls enthalten.

**mugshot** ist unverändertes Upstream von bluesabre/mugshot, das in Fedora schlicht nicht paketiert ist. Es liefert den Profilbild-Dialog, den der Profil-Button im Whisker-Menü von XFCE braucht.

### Apps, die es für aarch64 sonst nicht gibt

**telegram-desktop** baue ich nativ für aarch64 auf Basis des Nicegram-Forks, inklusive WebRTC-Stack. Offizielle Binärpakete für diese Architektur gibt es nicht.

**signal-desktop** ist ein nativer aarch64-Build aus dem offiziellen Quellcode, den es sonst nicht als Fedora-Paket gibt. Der Desktop-Eintrag startet mit `--no-sandbox --ozone-platform=wayland`, weil die Sandbox auf ARM64-Fedora nicht funktioniert und die App sonst über XWayland liefe.

**youtube-music** ist mein aarch64-Build des Pear-Desktop-Forks von YouTube Music (Upstream [pear-devs/pear-desktop](https://github.com/pear-devs/pear-desktop)). Gegenüber Upstream ist nur die Darstellung angepasst, die Google-Consent-Seite rendert im Dark Mode.

## Ein-Personen-Projekt

Das Repository ist ein Ein-Personen-Projekt für ein konkretes Setup. Es gibt keine Garantie auf Stabilität oder zeitnahe Rebuilds nach Fedora-Updates. Feedback nehme ich trotzdem gern über die auf [netsnek.com](https://netsnek.com) angegebenen Kontaktwege.
