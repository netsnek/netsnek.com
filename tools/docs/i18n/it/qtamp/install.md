---
title: Installare qtamp
description: Un comando su Linux e macOS, nessuno nel browser. Come qtamp arriva sul computer tramite l'installer qtamp.sh.
path: /docs/qtamp/install
---

# Installare qtamp

La strada più semplice non richiede alcuna installazione. Su [qtamp.org](https://qtamp.org) il player vero gira come build WebAssembly direttamente nel browser, nei browser basati su Chromium. Per farsi un'idea basta e avanza.

Per il desktop ho costruito l'installer come lo vorrei io. Un comando, su Linux come su macOS:

```sh
curl https://qtamp.sh | sh
```

Lo script riconosce il sistema operativo, prende le dipendenze necessarie tramite il gestore di pacchetti e compila qtamp dal codice sorgente. Chiede `sudo` solo per l'installazione dei pacchetti e per il passaggio finale di installazione. Chi prima vuole leggere che cosa sta per succedere:

```sh
curl -fsSL https://qtamp.sh | less
```

Sorgenti originali altrui non le distribuisco e non le diffondo oltre. Chi ne ha bisogno per una build se le procura da sé e verifica le condizioni di licenza che valgono per lui.

## Linux

Sono supportati Fedora, Debian e Ubuntu, Arch e openSUSE. Asahi Linux su aarch64 passa dalla strada Fedora e mi sta particolarmente a cuore, è la mia piattaforma di ogni giorno. Dopo la build `qtamp` avvia il player. Le skin da provare stanno come fork di vetrina con licenza MIT sotto [github.com/qtamp](https://github.com/qtamp). Una nuova esecuzione dell'installer aggiorna semplicemente l'installazione esistente.

## macOS

Su Apple Silicon qtamp gira in modo nativo, e vale lo stesso comando. Se serve, l'installer predispone gli strumenti di build tramite Homebrew e alla fine impacchetta una `qtamp.app` autonoma. Finisce in `/Applications` e si avvia come qualsiasi altra app tramite Spotlight.

## Compilare da sé la build per il browser

Chi vuole generare da sé la build WebAssembly aggiunge `--wasm`. Questa strada richiede Docker:

```sh
curl https://qtamp.sh | sh -s -- --wasm
```

Il risultato si trova poi come player pronto al deploy sotto `build-wasm/dist`.

## A mano dal codice sorgente

Chi non ama l'installer compila a mano:

```sh
git clone --recursive https://github.com/qtamp/qtamp && cd qtamp && deps/qtWasabi/scripts/fetch-wasabi.sh && cmake -B build -DQTAMP_USE_QTWASABI=ON && cmake --build build
```

Importante è il `--recursive`, altrimenti manca il motore qtWasabi come submodule.

## Windows

Windows è previsto, ma non c'è ancora. Il motore è puro Qt6 e C++ senza trucchi di piattaforma, il port è una questione di infrastruttura di build. Il mio focus va prima alla fedeltà delle skin.

## Se qualcosa si inceppa

Domande e segnalazioni di errori volentieri nell'issue tracker: [github.com/qtamp/qtamp/issues](https://github.com/qtamp/qtamp/issues)
