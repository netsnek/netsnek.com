---
title: qtamp
description: Warum ich einen Player gebaut habe, der originale Winamp-Skins als Programme ausführt. Über die Maki-VM, tausende Skins als Test-Suite und einen Player, der auch ohne Fenster weiterspielt.
path: /docs/qtamp
---

# qtamp

Ich wollte nie einen Player, der aussieht wie Winamp. Ich wollte einen, auf dem Winamp-Skins wirklich laufen. Der Unterschied ist größer, als er klingt. Eine Modern Skin ist kein Bitmap-Theme, sie ist ein Programm. XML deklariert den Widget-Baum, kompiliertes Maki-Bytecode treibt das Verhalten. Schubladen gleiten, Tabs schalten um, Fenster ändern ihre Form, alles von der Skin selbst geskriptet. Wer das nachmalt, hat ein hübsches Poster. Ich wollte das Original.

Deshalb führt qtamp Skins als echte Programme aus. qtamp ist mein Qt6-nativer Musikplayer und der Referenz-Player für [qtWasabi](https://github.com/qtWasabi/qtWasabi), meine unabhängige Neuimplementierung einer Modern-Skin-Engine. Skins liefern ihr kompiliertes Maki-Bytecode mit, und qtWasabi führt es in seiner eigenen Maki-VM aus. Die Logik der Skin steuert die Oberfläche genau so, wie sie es 2002 tat.

Der Name ist ein Wortspiel. "Qt" wie das Framework, "qt" wie cute. Ein Qt-nativer Amp, und hoffentlich ein niedlicher.

## Wie es anfing

Angefangen hat es nicht bei mir. qtamp ist aus [winamp-linux](https://github.com/lord3nd3r/winamp-linux) hervorgegangen, dem nativen Qt-Port von lord3nd3r. In seinem Repo stand das Issue "make the Modern skins work", und dieser Satz hat mich nicht mehr losgelassen.

Denn Modern Skins zum Laufen bringen heißt nicht, ein paar Grafiken zu laden. 2002 stellte Winamp3 die Wasabi-Engine vor, Winamp 5 führte sie als Modern Skins (`.wal`) weiter. Tausende dieser Skins wurden gebaut, jede mit eigener Logik. Die alle einzeln nachzubauen war keine Option. Also blieb nur die kompromisslose Variante: eine vollständige Maki-VM bauen und jede Skin als das Programm ausführen, das sie ist.

## Die Besessenheit mit der Treue

Aus dieser Entscheidung wurde eine Regel, die ich mir früh auferlegt habe: Es gibt keinen Code pro Skin. Rendert oder verhält sich eine Skin falsch, ist das ein Engine-Bug und wird in qtWasabi behoben. Die tausenden ausgelieferten Skins sind damit zugleich die Spezifikation und die Test-Suite. Was falsch rendert, tracke ich offen im [Fidelity-Audit](https://github.com/qtWasabi/qtWasabi/tree/main/okf) von qtWasabi. Der Showcase auf [qtamp.org](https://qtamp.org) zeigt nur Skins, die bereits exakt so rendern, wie ihre Autoren sie gebaut haben.

Wie tief diese Besessenheit geht, zeigt die Farb-Pipeline. Modern Skins bringen Farbpresets mit, Gammaset-Tabellen, die jede Elementgruppe der Skin-Grafik zur Laufzeit umfärben. qtWasabi rechnet diese Pipeline byte-genau nach, mit derselben Integer-Mathematik wie Winamps GammaFilter. Die Presets einer Skin sehen deshalb exakt so aus, wie ihr Autor sie abgestimmt hat. Für Skins ohne eigene Presets kann die Engine zusätzlich Farbthemen synthetisieren. Das ist strikt opt-in, Skins mit eigenen Presets bleiben unangetastet.

Der schönste Moment ist trotzdem jedes Mal derselbe: Eine über zwanzig Jahre alte Skin lädt, ihre Schubladen gleiten, ihre Tabs schalten um, und nichts davon habe ich programmiert. Das hat ihr Autor, damals.

## Classic und Modern

Bei Modern Skins hört es nicht auf. Klassische Winamp-Skins (`.wsz`) spielt qtamp genauso, über den Qt-nativen Classic-Renderer, den er aus seiner winamp-linux-Herkunft mitbringt und den ich weiterpflege, inklusive Equalizer-Skinning. Liegt keine Modern Skin an, fällt qtamp automatisch auf den Classic-Pfad zurück.

## Ein Player für jeden Tag

Drumherum ist qtamp ein richtiger Player geworden. Er spielt FLAC, MP3, OGG und Opus, hat einen 10-Band-Equalizer und einen echten Playlist-Editor, den die Skin selbst rendert. Die Medienbibliothek baut aus den Tags des Musikordners einen Index mit DuckDB und Parquet, mit Drilldown über Interpret, Album und Titel und Live-Filterung. Dazu kommen projectM als Visualisierung und MPRIS2 unter Linux.

Eines war mir dabei besonders wichtig: Alles läuft nativ auf Apple Silicon und Asahi Linux, weil das meine tägliche Plattform ist. Kein Wine, keine x86-Emulation, aarch64 durch den ganzen Stack. Daneben läuft qtamp auf den großen Linux-Distributionen, auf macOS und als WebAssembly-Build in Chromium direkt im Browser. Windows ist geplant, aber noch nicht da.

## Ein Player ohne Fenster

Meine Vision geht über den Desktop hinaus. Ich baue qtWasabi zu einem Frontend-Framework für Winamp-artige Player um, ungefähr so, wie React zu einem Node-Server steht. Der Player ist darin ein eigenständiger Backend-Dienst, die Oberfläche nur ein Head, der sich verbindet und rendert. Heads sprechen ausschließlich GraphQL mit dem Player. Damit läuft qtamp auch headless weiter, ganz ohne Fenster, und Heads auf dem Desktop, im Browser oder auf einem anderen Rechner verbinden sich mit demselben Zustand. Alle bleiben in allem synchron, vom Titel über den Equalizer bis zur Playlist.

Die Grundlagen davon sind gelandet. Das Frontend spricht intern GraphQL, der WebAssembly-Head nutzt denselben Weg, und die Trennung von Player und Oberfläche ist im Code vollzogen. Der Ausbau zu fernsteuerbaren Playern und Bots läuft. Und weil qtamp selbst nur ein Konsument von qtWasabi ist, kann jeder andere Qt-basierte Player die Engine genauso einbetten.

## Was qtamp nicht ist

qtamp ist bewusst kein vollausgestatteter Player. Es gibt keine Internetradio-Verzeichnisse, keinen Podcast-Manager und keine Musikshop-Anbindung. Du zeigst qtamp auf deinen Musikordner, und er spielt deine Musik. Mein Engineering-Budget bleibt bei der Skin-Treue. Wer heute einen funktionsvollständigen Winamp-Nachfolger sucht, ist bei WACUP oder Audacious besser aufgehoben. Wer Winamp-Skins nativ auf Apple Silicon und Asahi Linux laufen lassen will, ist hier richtig.

Ein paar Abgrenzungen noch. Mit Qmmp und QAmp ist qtamp trotz ähnlicher Namen nicht verwandt, qtamp ist von Grund auf neu geschrieben. Alte Win32-Winamp-Plugins laden nicht, qtamp spricht ein eigenes Qt-natives Plugin-Protokoll nach dem Vorbild der klassischen Winamp-Plugintypen. Und im qtamp-Repository liegt kein Winamp-Quellcode.

## Credits und Lizenz

Der Anfang gehört lord3nd3r und seinem winamp-linux. Die Showcase-Skins stammen von [0x5066](https://github.com/0x5066). Alle auf qtamp.org gezeigten Skins sind MIT-lizenziert und mit Credit als Forks unter [github.com/qtamp](https://github.com/qtamp) gepflegt, geändert habe ich nur Branding-Strings in der Titelleiste. Proprietäre Nullsoft-Skins zeige ich bewusst nicht.

Der von mir geschriebene Code in qtamp und qtWasabi steht unter der MIT-Lizenz. qtWasabi ist eine unabhängige Neuimplementierung und kein Fork. Fremden Code liefere ich weder mit noch verbreite ich ihn weiter. Wer fremde Originalquellen für einen Build braucht, beschafft sie selbst und prüft die für ihn geltenden Lizenzbedingungen. qtamp ist nicht mit Winamp LLC verbunden, Winamp ist eine Marke ihres Inhabers.

## Weiterlesen

- Website und Browser-Player: [qtamp.org](https://qtamp.org)
- Quellcode: [github.com/qtamp/qtamp](https://github.com/qtamp/qtamp)
- Skin-Engine: [github.com/qtWasabi/qtWasabi](https://github.com/qtWasabi/qtWasabi)
- [qtamp installieren](/docs/qtamp/install)
