---
title: qtamp
description: qtamp ist ein Qt-nativer Musikplayer, der originale Winamp-Modern-Skins über die originale Maki-VM ausführt. Er läuft auf Linux, macOS und als WebAssembly-Build im Browser.
path: /docs/qtamp
---

# qtamp

qtamp ist ein Qt6-nativer Musikplayer und der Referenz-Player für [qtWasabi](https://github.com/qtWasabi/qtWasabi). qtWasabi ist die Open-Source-Weiterführung von Wasabi, der Modern-Skin-Engine von Winamp. qtamp imitiert das Aussehen von Winamp nicht. Er führt die Skins als echte Programme aus. Skins liefern kompiliertes Maki-Bytecode mit, und qtWasabi führt dieses Bytecode auf dem originalen Interpreter aus. Die Logik des Skins steuert die Oberfläche damit genau so, wie sie es 2002 tat.

Der Name ist ein Wortspiel. "Qt" wie das Framework, "qt" wie cute. qtamp ist ein Qt-nativer Amp, und hoffentlich ein niedlicher.

## Skins sind Programme

Winamp 5 führte die Wasabi-Engine als "Modern Skins" (`.wal`) weiter. Tausende dieser Skins wurden gebaut. Ein Modern Skin besteht aus XML für die Widgets und kompiliertem Maki-Bytecode für das Verhalten. qtamp lädt eine `.wal`-Datei, rendert sie über qtWasabi und lässt ihre Maki-Skripte auf der originalen VM laufen. Es gibt keinen Code pro Skin. Rendert oder verhält sich ein Skin falsch, ist das ein Engine-Bug und wird in qtWasabi behoben.

Klassische Winamp-Skins (`.wsz`) unterstützt qtamp derzeit nicht. Ihre Unterstützung ist als späterer qtWasabi-Meilenstein geplant.

## Funktionen

- Winamp-Modern-Skins (`.wal`) auf Linux, macOS und im Browser. WinampModernPP, Bento, Big Bento oder eigene Skins laufen über die originale Maki-VM.
- Wiedergabe von FLAC, MP3, OGG und Opus.
- 10-Band-Equalizer als DSP.
- Playlists mit einem echten Playlist-Editor, den der Skin selbst rendert.
- Medienbibliothek mit DuckDB-Index und Drilldown über Interpret, Album und Titel.
- projectM-Visualisierung.
- MPRIS2-Integration unter Linux.
- MIDI-Wiedergabe über FluidSynth mit eigenem SoundFont, ein kleiner Fallback-SoundFont liegt bei.
- Dynamische Farbthemen-Synthese für Skins ohne eigene Farbpresets.
- HiDPI und Wayland funktionieren, weil Qt die schwere Arbeit übernimmt.
- Apple Silicon nativ und Asahi Linux erstklassig unterstützt. Kein Wine, keine x86-Emulation, aarch64 durch den ganzen Stack.
- Einbettbare Engine. qtamp ist ein Konsument von qtWasabi. Jeder andere Qt-basierte Player kann die Engine ebenfalls einbetten.

## Plattformen

- **Linux**: Fedora, Debian und Ubuntu, Arch, openSUSE. Wayland zuerst, X11 über Qt. Asahi Linux auf aarch64 ist ein erstklassiges Ziel.
- **macOS**: nativ auf Apple Silicon.
- **Browser**: als WebAssembly-Build in Chromium.
- **Windows**: geplant, aber noch nicht verfügbar. Die Engine ist reines Qt6 und C++ ohne Plattformtricks, der Port ist eine Frage der Build-Infrastruktur.

## Was qtamp nicht ist

qtamp ist bewusst kein vollausgestatteter Player. Es gibt keine Internetradio-Verzeichnisse, keinen Podcast-Manager und keine Musikshop-Anbindung. Du zeigst qtamp auf deinen Musikordner, und er spielt deine Musik.

Alte Win32-Winamp-Plugins (`in_*.dll`, `out_*.dll`, `gen_*.dll`) laden nicht. qtamp spricht ein eigenes, Qt-natives Plugin-Protokoll nach dem Vorbild der klassischen Winamp-Plugintypen.

qtamp ist außerdem kein Winamp-Klon im rechtlichen Sinn. Im qtamp-Repository liegt kein Winamp-Quellcode.

## Lizenz

qtamp und qtWasabi stehen unter der MIT-Lizenz. Alles Selbstgeschriebene ist MIT. Was nicht selbst geschrieben wurde, wird nicht ausgeliefert. Die originalen Wasabi-Quellen werden erst beim Build von einem öffentlichen archive.org-Mirror geholt und stehen unter der Winamp Collaborative License v1.0. Sie werden nie weiterverbreitet.

## Weiterführende Links

- Website: [qtamp.org](https://qtamp.org)
- Quellcode: [github.com/qtamp/qtamp](https://github.com/qtamp/qtamp)
- Skin-Engine: [github.com/qtWasabi/qtWasabi](https://github.com/qtWasabi/qtWasabi)
- Installation: [/docs/qtamp/install](/docs/qtamp/install)
