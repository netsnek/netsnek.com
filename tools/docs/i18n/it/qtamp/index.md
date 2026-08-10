---
title: qtamp
description: Perché ho costruito un player che esegue le skin originali di Winamp come programmi. Sulla VM Maki, migliaia di skin come test suite e un player che continua a suonare anche senza finestra.
path: /docs/qtamp
---

# qtamp

Non ho mai voluto un player che sembrasse Winamp. Ne volevo uno su cui le skin di Winamp girassero davvero. La differenza è più grande di quanto suoni. Una Modern Skin non è un tema bitmap, è un programma. L'XML dichiara l'albero dei widget, il bytecode Maki compilato guida il comportamento. I cassetti scorrono, le schede cambiano, le finestre cambiano forma, tutto scriptato dalla skin stessa. Chi ridipinge tutto questo ottiene un bel poster. Io volevo l'originale.

Per questo qtamp esegue le skin come veri programmi. qtamp è il mio player musicale nativo in Qt6 e il player di riferimento per [qtWasabi](https://github.com/qtWasabi/qtWasabi), la mia reimplementazione indipendente di un motore per Modern Skin. Le skin portano con sé il proprio bytecode Maki compilato, e qtWasabi lo esegue nella sua VM Maki. La logica della skin comanda l'interfaccia esattamente come faceva nel 2002.

Il nome è un gioco di parole. "Qt" come il framework, "qt" come cute. Un amp nativo in Qt, e speriamo anche carino.

## Come è cominciata

Non è cominciata da me. qtamp è nato da [winamp-linux](https://github.com/lord3nd3r/winamp-linux), il port nativo in Qt di lord3nd3r. Nel suo repo c'era la issue "make the Modern skins work", e quella frase non mi ha più lasciato.

Perché far funzionare le Modern Skin non vuol dire caricare qualche immagine. Nel 2002 Winamp3 presentò il motore Wasabi, Winamp 5 lo portò avanti come Modern Skins (`.wal`). Di queste skin ne sono state costruite migliaia, ognuna con la propria logica. Rifarle tutte una per una non era un'opzione. Restava quindi solo la variante senza compromessi: costruire una VM Maki completa ed eseguire ogni skin come il programma che è.

## L'ossessione per la fedeltà

Da questa decisione è nata una regola che mi sono imposto presto: non esiste codice per singola skin. Se una skin rende male o si comporta male, è un bug del motore e viene corretto in qtWasabi. Le migliaia di skin pubblicate sono così allo stesso tempo la specifica e la test suite. Quello che rende male lo traccio apertamente nell'[audit di fedeltà](https://github.com/qtWasabi/qtWasabi/tree/main/okf) di qtWasabi. La vetrina su [qtamp.org](https://qtamp.org) mostra solo skin che rendono già esattamente come le hanno costruite i loro autori.

Quanto vada in profondità questa ossessione lo mostra la pipeline dei colori. Le Modern Skin portano con sé preset di colore, tabelle gammaset che a runtime ricolorano ogni gruppo di elementi della grafica della skin. qtWasabi rifà i conti di questa pipeline byte per byte, con la stessa matematica intera del GammaFilter di Winamp. I preset di una skin appaiono perciò esattamente come li ha calibrati il suo autore. Per le skin senza preset propri il motore può inoltre sintetizzare temi di colore. Questo è strettamente opt-in, le skin con preset propri restano intoccate.

Il momento più bello resta comunque ogni volta lo stesso: si carica una skin di oltre vent'anni, i suoi cassetti scorrono, le sue schede cambiano, e niente di tutto questo l'ho programmato io. L'ha fatto il suo autore, allora.

## Classic e Modern

Con le Modern Skin non finisce. Le skin classiche di Winamp (`.wsz`) qtamp le suona allo stesso modo, tramite il renderer Classic nativo in Qt che si porta dietro dalla sua origine winamp-linux e che continuo a curare, skinning dell'equalizzatore incluso. Se non c'è una Modern Skin, qtamp ripiega automaticamente sul percorso Classic.

## Un player per tutti i giorni

Tutto intorno qtamp è diventato un player vero. Suona FLAC, MP3, OGG e Opus, ha un equalizzatore a 10 bande e un vero editor di playlist, che la skin renderizza da sé. La libreria multimediale costruisce dai tag della cartella musicale un indice con DuckDB e Parquet, con drilldown per artista, album e titolo e filtraggio dal vivo. Ci sono poi projectM come visualizzazione e MPRIS2 su Linux.

Una cosa mi stava particolarmente a cuore: tutto gira nativamente su Apple Silicon e Asahi Linux, perché è la mia piattaforma di ogni giorno. Niente Wine, niente emulazione x86, aarch64 lungo tutto lo stack. Accanto a questo qtamp gira sulle grandi distribuzioni Linux, su macOS e come build WebAssembly in Chromium direttamente nel browser. Windows è previsto, ma non c'è ancora.

## Un player senza finestra

La mia visione va oltre il desktop. Sto trasformando qtWasabi in un framework frontend per player in stile Winamp, più o meno come React sta a un server Node. Il player al suo interno è un servizio backend autonomo, l'interfaccia solo un head che si collega e renderizza. Gli head parlano con il player esclusivamente in GraphQL. Così qtamp continua a girare anche headless, del tutto senza finestra, e head sul desktop, nel browser o su un altro computer si collegano allo stesso stato. Restano tutti sincronizzati in tutto, dal titolo all'equalizzatore fino alla playlist.

Le basi di tutto questo sono atterrate. Il frontend parla GraphQL al suo interno, l'head WebAssembly usa la stessa strada, e la separazione tra player e interfaccia è compiuta nel codice. L'espansione verso player telecomandabili e bot è in corso. E poiché qtamp stesso è solo un consumatore di qtWasabi, qualsiasi altro player basato su Qt può integrare il motore allo stesso modo.

## Che cosa qtamp non è

qtamp non è di proposito un player completo di tutto. Non ci sono directory di radio internet, nessun gestore di podcast e nessun collegamento a negozi di musica. Punti qtamp sulla tua cartella musicale, e lui suona la tua musica. Il mio budget di ingegneria resta sulla fedeltà delle skin. Chi oggi cerca un successore di Winamp completo di funzioni è in mani migliori con WACUP o Audacious. Chi vuole far girare le skin di Winamp nativamente su Apple Silicon e Asahi Linux è nel posto giusto.

Ancora un paio di distinzioni. Con Qmmp e QAmp qtamp non è imparentato nonostante i nomi simili, qtamp è riscritto da zero. I vecchi plugin Win32 di Winamp non si caricano, qtamp parla un protocollo di plugin proprio, nativo in Qt, sul modello dei tipi di plugin classici di Winamp. E nel repository di qtamp non c'è codice sorgente di Winamp.

## Credits e licenza

L'inizio appartiene a lord3nd3r e al suo winamp-linux. Le skin della vetrina vengono da [0x5066](https://github.com/0x5066). Tutte le skin mostrate su qtamp.org sono sotto licenza MIT e sono mantenute con credit come fork sotto [github.com/qtamp](https://github.com/qtamp), ho cambiato solo le stringhe di branding nella barra del titolo. Le skin proprietarie di Nullsoft non le mostro di proposito.

Il codice scritto da me in qtamp e qtWasabi è sotto licenza MIT. qtWasabi è una reimplementazione indipendente e non un fork. Codice altrui non lo distribuisco né lo diffondo oltre. Chi ha bisogno di sorgenti originali altrui per una build se li procura da sé e verifica le condizioni di licenza che valgono per lui. qtamp non è collegato a Winamp LLC, Winamp è un marchio del suo titolare.

## Approfondimenti

- Sito web e player nel browser: [qtamp.org](https://qtamp.org)
- Codice sorgente: [github.com/qtamp/qtamp](https://github.com/qtamp/qtamp)
- Motore delle skin: [github.com/qtWasabi/qtWasabi](https://github.com/qtWasabi/qtWasabi)
- [Installare qtamp](/docs/qtamp/install)
