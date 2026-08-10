---
title: qtamp installieren
description: Installation von qtamp auf Linux, macOS und als WebAssembly-Build im Browser über den Installer qtamp.sh oder manuell aus dem Quellcode.
path: /docs/qtamp/install
---

# qtamp installieren

Der schnellste Weg ist der offizielle Installer. Ein Befehl funktioniert auf Linux und macOS:

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

1. Installiert Qt6 und die Build-Werkzeuge über den nativen Paketmanager (`dnf`, `apt`, `pacman` oder `zypper`). Für diesen Schritt fragt er nach `sudo`.
2. Klont qtamp samt der qtWasabi-Engine.
3. Holt die Wasabi-Quellen vom archive.org-Mirror.
4. Baut qtamp und installiert nach `/usr/local`.

## macOS

Auf Apple Silicon läuft qtamp nativ. Derselbe Befehl gilt:

```sh
curl https://qtamp.sh | sh
```

Der Installer erkennt macOS und übergibt an den macOS-Installer. Dieser baut mit der Homebrew-Toolchain und legt ein `.app`-Bundle in `/Applications` ab.

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

Windows-Unterstützung ist geplant, aber noch nicht verfügbar.

## Probleme

Fragen und Fehlerberichte bitte im Issue-Tracker: [github.com/qtamp/qtamp/issues](https://github.com/qtamp/qtamp/issues)
