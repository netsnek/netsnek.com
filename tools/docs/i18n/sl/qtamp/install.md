---
title: Namestitev qtampa
description: En ukaz na Linuxu in macOS, v brskalniku sploh noben. Kako qtamp prek namestilnika qtamp.sh pride na računalnik.
path: /docs/qtamp/install
---

# Namestitev qtampa

Najpreprostejša pot sploh ne potrebuje namestitve. Na [qtamp.org](https://qtamp.org) pravi predvajalnik teče kot gradnja WebAssembly neposredno v brskalniku, v brskalnikih na osnovi Chromiuma. Za pokušino to povsem zadošča.

Za namizje sem namestilnik zgradil tako, kot si ga sam želim. En ukaz, na Linuxu kot na macOS:

```sh
curl https://qtamp.sh | sh
```

Skripta prepozna operacijski sistem, prek upravitelja paketov pridobi potrebne odvisnosti in qtamp zgradi iz izvorne kode. Po `sudo` vpraša samo za namestitev paketov in za zaključni namestitveni korak. Kdor si želi najprej prebrati, kaj se bo zdaj zgodilo:

```sh
curl -fsSL https://qtamp.sh | less
```

Tujih izvirnih virov ne prilagam in jih ne razširjam naprej. Kdor jih za gradnjo potrebuje, si jih priskrbi sam in preveri licenčne pogoje, ki zanj veljajo.

## Linux

Podprti so Fedora, Debian in Ubuntu, Arch in openSUSE. Asahi Linux na aarch64 teče po poti za Fedoro in mi je posebej pri srcu, saj je moja vsakodnevna platforma. Po gradnji predvajalnik zažene `qtamp`. Teme za preizkušanje ležijo kot po MIT licencirani predstavitveni forki pod [github.com/qtamp](https://github.com/qtamp). Ponoven zagon namestilnika obstoječo namestitev preprosto posodobi.

## macOS

Na Apple Silicon qtamp teče izvorno in velja isti ukaz. Namestilnik po potrebi prek Homebrewa uredi orodja za gradnjo in na koncu zveže samostojno `qtamp.app`. Ta pristane v `/Applications` in se kot vsaka druga aplikacija zažene prek Spotlighta.

## Gradnja za brskalnik po svoje

Kdor želi gradnjo WebAssembly ustvariti sam, doda `--wasm`. Ta pot potrebuje Docker:

```sh
curl https://qtamp.sh | sh -s -- --wasm
```

Rezultat zatem leži kot predvajalnik, pripravljen za postavitev, pod `build-wasm/dist`.

## Ročno iz izvorne kode

Kdor namestilnika ne mara, gradi na roko:

```sh
git clone --recursive https://github.com/qtamp/qtamp && cd qtamp && deps/qtWasabi/scripts/fetch-wasabi.sh && cmake -B build -DQTAMP_USE_QTWASABI=ON && cmake --build build
```

Pomemben je `--recursive`, sicer manjka pogon qtWasabi kot podmodul.

## Windows

Windows je načrtovan, a ga še ni. Pogon je čisti Qt6 in C++ brez platformnih trikov, port je vprašanje infrastrukture za gradnjo. Moj poudarek je najprej na zvestobi tem.

## Če kaj zaškripa

Vprašanja in poročila o napakah so dobrodošla v sledilniku težav: [github.com/qtamp/qtamp/issues](https://github.com/qtamp/qtamp/issues)
