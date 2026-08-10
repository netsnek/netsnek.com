---
title: qtamp installieren
description: Installation von qtamp auf Linux, macOS und als WebAssembly-Build im Browser über den Installer qtamp.sh oder manuell aus dem Quellcode.
path: /docs/qtamp/install
---

# qtamp installieren

Zum reinen Anhören muss nichts installiert werden. Auf [qtamp.org](https://qtamp.org) läuft der echte Player als WebAssembly-Build direkt im Browser, in Chromium-basierten Browsern.

Für die Installation ist der schnellste Weg der offizielle Installer. Ein Befehl funktioniert auf Linux und macOS:

```sh
curl https://qtamp.sh | sh
```

Der Installer erkennt das Betriebssystem und baut qtamp aus dem Quellcode. Wer das Skript vorher lesen will:

```sh
curl -fsSL https://qtamp.sh | less
```

Beim Build holt qtWasabi die originalen Wasabi-Quellen von einem öffentlichen archive.org-Mirror. Sie stehen unter der Winamp Collaborative License v1.0 und werden nie weiterverbreitet.

## Linux

Unterstützt sind Fedora, Debian und Ubuntu, Arch und openSUSE. Asahi Linux auf aarch64 läuft über den Fedora-Weg und ist ein erstklassiges Ziel.

```sh
curl https://qtamp.sh | sh
```

Der Installer macht dabei Folgendes:

1. Installiert Qt6 (Base, Multimedia, Declarative) und die Build-Werkzeuge (CMake, Ninja, git, p7zip) über den nativen Paketmanager (`dnf`, `apt`, `pacman` oder `zypper`). Nur dieser Schritt und die Installation am Ende fragen nach `sudo`.
2. Klont qtamp samt der qtWasabi-Engine nach `~/.cache/qtamp-build`.
3. Holt die Wasabi-Quellen vom archive.org-Mirror.
4. Baut mit CMake und Ninja und installiert nach `/usr/local`.

Danach startet `qtamp` den Player. Skins zum Ausprobieren liegen als MIT-lizenzierte Showcase-Forks unter [github.com/qtamp](https://github.com/qtamp).

Ein erneuter Lauf verwendet das vorhandene Checkout unter `~/.cache/qtamp-build` wieder und aktualisiert es. Auf Distributionen ohne einen der vier Paketmanager bricht der Installer mit einem Hinweis ab. Dann die genannten Pakete von Hand installieren und das Skript erneut ausführen.

## macOS

Auf Apple Silicon läuft qtamp nativ. Derselbe Befehl gilt:

```sh
curl https://qtamp.sh | sh
```

Der Installer erkennt macOS und übergibt an den macOS-Installer. Dieser provisioniert bei Bedarf die Xcode Command Line Tools und Homebrew (CMake, Ninja, Qt6), klont die Repos, holt die Wasabi-Quellen vom archive.org-Mirror und bündelt mit `macdeployqt` eine eigenständige `qtamp.app`. Sie landet in `/Applications` und startet wie jede andere App über Spotlight.

## Browser (WebAssembly)

qtamp läuft auch in Chromium als WebAssembly-Build. Der Installer baut ihn mit dem Flag `--wasm`:

```sh
curl https://qtamp.sh | sh -s -- --wasm
```

Dieser Weg braucht Docker. Die Toolchain läuft im veröffentlichten Builder-Image `ghcr.io/qtamp/qtamp-wasm-builder`. Das Ergebnis liegt danach als deploybarer Player unter `build-wasm/dist`.

## Manuell aus dem Quellcode

Wer den Installer nicht nutzen will, baut von Hand:

```sh
git clone --recursive https://github.com/qtamp/qtamp && cd qtamp && deps/qtWasabi/scripts/fetch-wasabi.sh && cmake -B build -DQTAMP_USE_QTWASABI=ON && cmake --build build
```

Der Klon muss die Submodule enthalten, sonst fehlt die qtWasabi-Engine. Falls ohne `--recursive` geklont wurde, hilft `git submodule update --init --recursive`. Das Skript `fetch-wasabi.sh` lädt die Wasabi-Quellen, das Verzeichnis ist auf beiden Seiten gitignored.

## Installer anpassen

Der Installer akzeptiert Umgebungsvariablen:

| Variable | Bedeutung | Standard |
|---|---|---|
| `QTAMP_REPO` | Git-URL | `https://github.com/qtamp/qtamp.git` |
| `QTAMP_REF` | Branch oder Tag | `main` |
| `QTAMP_PREFIX` | Installationsverzeichnis | `/usr/local`, auf macOS `/Applications` |
| `QTAMP_WORK` | Build-Verzeichnis | `~/.cache/qtamp-build` |
| `QTAMP_WASM_IMAGE` | Builder-Image für `--wasm` | `ghcr.io/qtamp/qtamp-wasm-builder:latest` |

## Windows

Windows-Unterstützung ist geplant, aber noch nicht verfügbar. Die Engine ist reines Qt6 und C++ ohne Plattformtricks, der Port ist eine Frage der Build-Infrastruktur. Der Fokus liegt zuerst auf der Skin-Treue.

## Probleme

Fragen und Fehlerberichte bitte im Issue-Tracker: [github.com/qtamp/qtamp/issues](https://github.com/qtamp/qtamp/issues)
