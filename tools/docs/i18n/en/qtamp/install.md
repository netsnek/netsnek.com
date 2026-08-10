---
title: Installing qtamp
description: One command on Linux and macOS, none at all in the browser. How qtamp gets onto your machine via the qtamp.sh installer.
path: /docs/qtamp/install
---

# Installing qtamp

The easiest way needs no installation at all. On [qtamp.org](https://qtamp.org) the real player runs as a WebAssembly build directly in the browser, in Chromium-based browsers. For a first listen that is entirely enough.

For the desktop I built the installer the way I want it myself. One command, on Linux as on macOS:

```sh
curl https://qtamp.sh | sh
```

The script detects the operating system, pulls the necessary dependencies through the package manager and builds qtamp from source. It only asks for `sudo` for the package installation and the install step at the end. If you want to read first what is about to happen:

```sh
curl -fsSL https://qtamp.sh | less
```

I neither ship third-party original sources nor redistribute them. Anyone who needs them for a build obtains them themselves and checks the license terms that apply to them.

## Linux

Supported are Fedora, Debian and Ubuntu, Arch and openSUSE. Asahi Linux on aarch64 runs through the Fedora path and is especially close to my heart, it is my daily platform. After the build, `qtamp` starts the player. Skins to try out are available as MIT-licensed showcase forks under [github.com/qtamp](https://github.com/qtamp). Running the installer again simply updates the existing installation.

## macOS

On Apple Silicon qtamp runs natively, and the same command applies. The installer sets up the build tools via Homebrew if needed and bundles a standalone `qtamp.app` at the end. It lands in `/Applications` and starts like any other app via Spotlight.

## Building the browser build yourself

If you want to produce the WebAssembly build yourself, append `--wasm`. This path needs Docker:

```sh
curl https://qtamp.sh | sh -s -- --wasm
```

The result then sits as a deployable player under `build-wasm/dist`.

## Manually from source

If you do not like the installer, build by hand:

```sh
git clone --recursive https://github.com/qtamp/qtamp && cd qtamp && deps/qtWasabi/scripts/fetch-wasabi.sh && cmake -B build -DQTAMP_USE_QTWASABI=ON && cmake --build build
```

The `--recursive` matters, otherwise the qtWasabi engine is missing as a submodule.

## Windows

Windows is planned, but not there yet. The engine is pure Qt6 and C++ without platform tricks, the port is a question of build infrastructure. My focus is on skin fidelity first.

## When something goes wrong

Questions and bug reports are welcome in the issue tracker: [github.com/qtamp/qtamp/issues](https://github.com/qtamp/qtamp/issues)
