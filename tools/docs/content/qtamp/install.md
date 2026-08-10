---
title: qtamp installieren
description: Ein Befehl auf Linux und macOS, gar keiner im Browser. Wie qtamp über den Installer qtamp.sh auf den Rechner kommt.
path: /docs/qtamp/install
---

# qtamp installieren

Der einfachste Weg braucht gar keine Installation. Auf [qtamp.org](https://qtamp.org) läuft der echte Player als WebAssembly-Build direkt im Browser, in Chromium-basierten Browsern. Zum Reinhören reicht das völlig.

Für den Desktop habe ich den Installer so gebaut, wie ich ihn mir selbst wünsche. Ein Befehl, auf Linux wie auf macOS:

```sh
curl https://qtamp.sh | sh
```

Das Skript erkennt das Betriebssystem, holt die nötigen Abhängigkeiten über den Paketmanager und baut qtamp aus dem Quellcode. Nach `sudo` fragt es nur für die Paketinstallation und den Installationsschritt am Ende. Wer erst lesen will, was da gleich passiert:

```sh
curl -fsSL https://qtamp.sh | less
```

Fremde Originalquellen liefere ich nicht mit und verbreite ich nicht weiter. Wer sie für einen Build benötigt, beschafft sie selbst und prüft die für ihn geltenden Lizenzbedingungen.

## Linux

Unterstützt sind Fedora, Debian und Ubuntu, Arch und openSUSE. Asahi Linux auf aarch64 läuft über den Fedora-Weg und liegt mir besonders am Herzen, es ist meine tägliche Plattform. Nach dem Build startet `qtamp` den Player. Skins zum Ausprobieren liegen als MIT-lizenzierte Showcase-Forks unter [github.com/qtamp](https://github.com/qtamp). Ein erneuter Lauf des Installers aktualisiert die bestehende Installation einfach.

## macOS

Auf Apple Silicon läuft qtamp nativ, und es gilt derselbe Befehl. Der Installer richtet bei Bedarf die Build-Werkzeuge über Homebrew ein und bündelt am Ende eine eigenständige `qtamp.app`. Sie landet in `/Applications` und startet wie jede andere App über Spotlight.

## Browser-Build selbst bauen

Wer den WebAssembly-Build selbst erzeugen will, hängt `--wasm` an. Dieser Weg braucht Docker:

```sh
curl https://qtamp.sh | sh -s -- --wasm
```

Das Ergebnis liegt danach als deploybarer Player unter `build-wasm/dist`.

## Manuell aus dem Quellcode

Wer den Installer nicht mag, baut von Hand:

```sh
git clone --recursive https://github.com/qtamp/qtamp && cd qtamp && deps/qtWasabi/scripts/fetch-wasabi.sh && cmake -B build -DQTAMP_USE_QTWASABI=ON && cmake --build build
```

Wichtig ist das `--recursive`, sonst fehlt die qtWasabi-Engine als Submodul.

## Windows

Windows ist geplant, aber noch nicht da. Die Engine ist reines Qt6 und C++ ohne Plattformtricks, der Port ist eine Frage der Build-Infrastruktur. Mein Fokus liegt zuerst auf der Skin-Treue.

## Wenn etwas hakt

Fragen und Fehlerberichte gern im Issue-Tracker: [github.com/qtamp/qtamp/issues](https://github.com/qtamp/qtamp/issues)
