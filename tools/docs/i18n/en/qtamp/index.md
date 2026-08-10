---
title: qtamp
description: Why I built a player that runs original Winamp skins as programs. About the Maki VM, thousands of skins as a test suite and a player that keeps playing even without a window.
path: /docs/qtamp
---

# qtamp

I never wanted a player that looks like Winamp. I wanted one that actually runs Winamp skins. The difference is bigger than it sounds. A Modern Skin is not a bitmap theme, it is a program. XML declares the widget tree, compiled Maki bytecode drives the behavior. Drawers slide, tabs switch, windows change their shape, all of it scripted by the skin itself. Repaint that and you have a pretty poster. I wanted the original.

That is why qtamp runs skins as real programs. qtamp is my Qt6-native music player and the reference player for [qtWasabi](https://github.com/qtWasabi/qtWasabi), my independent reimplementation of a Modern Skin engine. Skins ship their compiled Maki bytecode with them, and qtWasabi executes it in its own Maki VM. The skin's logic drives the interface exactly the way it did in 2002.

The name is a play on words. "Qt" as in the framework, "qt" as in cute. A Qt-native amp, and hopefully a cute one.

## How it started

It did not start with me. qtamp grew out of [winamp-linux](https://github.com/lord3nd3r/winamp-linux), the native Qt port by lord3nd3r. His repo had the issue "make the Modern skins work", and that sentence would not let go of me.

Because making Modern Skins work does not mean loading a few graphics. In 2002 Winamp3 introduced the Wasabi engine, Winamp 5 carried it on as Modern Skins (`.wal`). Thousands of these skins were built, each with its own logic. Rebuilding them all one by one was not an option. So only the uncompromising variant was left: build a complete Maki VM and run every skin as the program it is.

## The obsession with fidelity

Out of that decision grew a rule I imposed on myself early: there is no per-skin code. If a skin renders or behaves wrongly, that is an engine bug and it gets fixed in qtWasabi. The thousands of shipped skins are therefore the specification and the test suite at once. Whatever renders wrongly I track openly in qtWasabi's [fidelity audit](https://github.com/qtWasabi/qtWasabi/tree/main/okf). The showcase on [qtamp.org](https://qtamp.org) only shows skins that already render exactly the way their authors built them.

How deep this obsession goes is shown by the color pipeline. Modern Skins bring color presets with them, gammaset tables that recolor every element group of the skin graphics at runtime. qtWasabi recomputes that pipeline byte for byte, with the same integer math as Winamp's GammaFilter. A skin's presets therefore look exactly the way its author tuned them. For skins without presets of their own, the engine can additionally synthesize color themes. That is strictly opt-in, skins with their own presets stay untouched.

The most beautiful moment is still the same one every time: a skin more than twenty years old loads, its drawers slide, its tabs switch, and I programmed none of it. Its author did, back then.

## Classic and Modern

It does not stop at Modern Skins. Classic Winamp skins (`.wsz`) play just as well in qtamp, through the Qt-native classic renderer it inherits from its winamp-linux origins and which I keep maintaining, including equalizer skinning. If no Modern Skin is loaded, qtamp automatically falls back to the classic path.

## A player for every day

Around all of that, qtamp has become a proper player. It plays FLAC, MP3, OGG and Opus, has a 10-band equalizer and a real playlist editor that the skin itself renders. The media library builds an index from the tags of the music folder with DuckDB and Parquet, with drilldown by artist, album and title plus live filtering. On top of that come projectM as visualization and MPRIS2 on Linux.

One thing mattered to me especially here: everything runs natively on Apple Silicon and Asahi Linux, because that is my daily platform. No Wine, no x86 emulation, aarch64 all the way through the stack. Alongside that, qtamp runs on the major Linux distributions, on macOS and as a WebAssembly build in Chromium directly in the browser. Windows is planned, but not there yet.

## A player without a window

My vision goes beyond the desktop. I am rebuilding qtWasabi into a frontend framework for Winamp-style players, roughly the way React relates to a Node server. Within that, the player is a standalone backend service and the interface is just a head that connects and renders. Heads speak exclusively GraphQL with the player. That way qtamp also keeps running headless, entirely without a window, and heads on the desktop, in the browser or on another machine connect to the same state. They all stay in sync on everything, from the track through the equalizer to the playlist.

The foundations for that have landed. The frontend speaks GraphQL internally, the WebAssembly head uses the same path, and the separation of player and interface is done in the code. The build-out toward remote-controllable players and bots is under way. And because qtamp itself is only a consumer of qtWasabi, any other Qt-based player can embed the engine just the same.

## What qtamp is not

qtamp is deliberately not a fully featured player. There are no internet radio directories, no podcast manager and no music shop integration. You point qtamp at your music folder, and it plays your music. My engineering budget stays with skin fidelity. Anyone looking for a feature-complete Winamp successor today is better off with WACUP or Audacious. Anyone who wants to run Winamp skins natively on Apple Silicon and Asahi Linux is in the right place here.

A few more distinctions. Despite the similar names, qtamp is not related to Qmmp or QAmp, qtamp is written from scratch. Old Win32 Winamp plugins do not load, qtamp speaks a Qt-native plugin protocol of its own modeled on the classic Winamp plugin types. And there is no Winamp source code in the qtamp repository.

## Credits and license

The beginning belongs to lord3nd3r and his winamp-linux. The showcase skins come from [0x5066](https://github.com/0x5066). All skins shown on qtamp.org are MIT-licensed and maintained with credit as forks under [github.com/qtamp](https://github.com/qtamp), all I changed were branding strings in the title bar. Proprietary Nullsoft skins I deliberately do not show.

The code written by me in qtamp and qtWasabi is under the MIT license. qtWasabi is an independent reimplementation and not a fork. I neither ship third-party code nor redistribute it. Anyone who needs third-party original sources for a build obtains them themselves and checks the license terms that apply to them. qtamp is not affiliated with Winamp LLC, Winamp is a trademark of its owner.

## Further reading

- Website and browser player: [qtamp.org](https://qtamp.org)
- Source code: [github.com/qtamp/qtamp](https://github.com/qtamp/qtamp)
- Skin engine: [github.com/qtWasabi/qtWasabi](https://github.com/qtWasabi/qtWasabi)
- [Installing qtamp](/docs/qtamp/install)
