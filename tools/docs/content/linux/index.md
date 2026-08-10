---
title: Linux auf Apple Silicon
description: Überblick über das Asahi-Linux-Setup von Netsnek auf dem MacBook Pro und das eigene RPM-Repository rpm.netsnek.com.
path: /docs/linux
---

# Linux auf Apple Silicon

Diese Sektion dokumentiert, wie Netsnek e.U. Linux produktiv auf Apple-Silicon-MacBooks einsetzt. Basis ist Fedora 43 mit den Asahi-Linux-Patches auf einem MacBook Pro mit M1 beziehungsweise M2. Installiert wurde von Fedora Minimal aus. Der Desktop wurde von Grund auf selbst zusammengestellt.

## Warum Linux auf Apple Silicon

Apple-Silicon-MacBooks bieten starke Hardware bei sehr geringem Stromverbrauch. Das Asahi-Projekt bringt Linux auf diese Geräte, inklusive Grafikbeschleunigung für die Apple-GPU über Mesa. Damit läuft ein vollwertiger Wayland-Desktop nativ auf aarch64. Einige Pakete aus den offiziellen Fedora-Repositories brauchen dafür allerdings Anpassungen. Genau diese Lücke schließen die hier dokumentierten Konfigurationen und das eigene RPM-Repository.

## Was diese Doku abdeckt

### [Asahi Desktop Setup](/docs/linux/asahi)

Der komplette Desktop-Stack: Wayfire als Wayland-Compositor, XFCE als Desktop-Umgebung in einer Wayland-Session, greetd mit tuigreet als Login, PipeWire für Audio und ein stabiler Bluetooth-A2DP-Betrieb. Dazu die wichtigsten Stolpersteine auf Asahi und ihre Lösungen, etwa die 16K-Speicherseiten des Kernels, ein Workaround für GTK4-Abstürze und der Weg zu x86-Software über FEX und muvm.

### [Netsnek RPM-Repository](/docs/linux/rpm)

Das Repository `rpm.netsnek.com` liefert gepatchte Pakete, die dieses Setup erst möglich machen. Die Seite beschreibt die Einbindung per dnf, die enthaltenen Pakete und was an jedem Paket geändert wurde. Das reicht von gepatchtem wlroots, Wayfire und XFCE-Bausteinen bis zu nativen aarch64-Builds von Telegram, Signal und Winamp. Alle Pakete sind für aarch64 gebaut und auf Asahi Linux ausgerichtet.

## Zielgruppe

Die Doku richtet sich an alle, die ein ähnliches Setup auf einem Apple-Silicon-Gerät aufbauen wollen. Grundkenntnisse in Fedora und der Kommandozeile werden vorausgesetzt. Alle Beispiele beziehen sich auf Fedora 43 auf aarch64.
