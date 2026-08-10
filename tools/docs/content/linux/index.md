---
title: Linux auf Apple Silicon
description: Warum ich mein MacBook Pro mit Fedora Asahi fahre, wie mein Desktop entstanden ist und wozu ich ein eigenes RPM-Repository betreibe.
path: /docs/linux
---

# Linux auf Apple Silicon

Mein Hauptrechner ist ein MacBook Pro mit Apple Silicon. Darauf läuft kein macOS, sondern Fedora 43 mit den Asahi-Linux-Patches. Installiert habe ich von Fedora Minimal aus, also von einem System, das nach dem ersten Boot fast nichts kann. Alles, was danach kam, habe ich Stück für Stück selbst zusammengestellt. Diese Seiten erzählen, wie das Setup aussieht, warum es so aussieht und wo ich unterwegs hingefallen bin.

## Warum überhaupt Linux auf einem MacBook

Die Hardware ist der Grund. Apple-Silicon-MacBooks liefern viel Leistung bei sehr geringem Stromverbrauch, und das Asahi-Projekt bringt Linux auf genau diese Geräte, inklusive Grafikbeschleunigung für die Apple-GPU über Mesa. Damit läuft ein vollwertiger Wayland-Desktop nativ auf aarch64. Für mich ist das die beste Linux-Maschine, die ich je hatte.

Der Haken: Einige Pakete aus den offiziellen Fedora-Repositories brauchen für dieses Setup Anpassungen. Manche Software gibt es für aarch64 gar nicht erst. Genau diese Lücke schließe ich mit eigenen Patches und einem eigenen RPM-Repository.

## Was hier steht

### [Asahi Desktop Setup](/docs/linux/asahi)

Mein kompletter Desktop-Stack: Wayfire als Wayland-Compositor, XFCE als Desktop-Umgebung in einer Wayland-Session, greetd mit tuigreet als Login, PipeWire für Audio und ein Bluetooth-Betrieb, der endlich nicht mehr rauscht. Dazu die Stolpersteine, die mich auf Asahi erwischt haben, etwa die 16K-Speicherseiten des Kernels, an denen mein Minecraft zerschellte, ein Workaround für abstürzende GTK4-Apps und der Weg zu x86-Software über FEX und muvm.

### [Netsnek RPM-Repository](/docs/linux/rpm)

Unter `rpm.netsnek.com` liegen die gepatchten Pakete, die dieses Setup erst möglich machen. Die Seite erzählt, welche Pakete ich warum patche, vom zurückportierten Workspace-Protokoll in wlroots bis zu Wayland-Fixes für Panel und Desktop.

## Für wen das ist

Für alle, die ein ähnliches Setup auf einem Apple-Silicon-Gerät aufbauen wollen. Grundkenntnisse in Fedora und der Kommandozeile setze ich voraus. Alle Beispiele beziehen sich auf Fedora 43 auf aarch64.
