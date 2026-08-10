---
title: Repository RPM Netsnek
description: Il mio repository RPM rpm.netsnek.com, le storie dietro ai pacchetti patchati e perché l'inclusione pubblica arriva solo con una chiave di firma.
path: /docs/linux/rpm
---

# Repository RPM Netsnek

Il mio [desktop Asahi](/docs/linux/asahi) funziona solo perché una manciata di pacchetti è compilata diversamente rispetto a Fedora. Per non dover curare a mano queste build e perché gli aggiornamenti di Fedora non le sovrascrivano, gestisco sotto `rpm.netsnek.com` un repository RPM proprio. Tutti i pacchetti puntano a Fedora 43 su aarch64 e sono tarati sul mio setup Asahi. Su altre architetture o distribuzioni non li ho testati.

## Inclusione tramite dnf

Qui una volta c'era un blocco da copiare e incollare per `/etc/yum.repos.d/netsnek.repo`. L'ho tolto di nuovo, e per un motivo che mi sta più a cuore della comodità: un repository porta software con diritti di root su computer altrui. Una cosa del genere va firmata, e un'istruzione che per farlo disattiva la verifica della firma non voglio metterla davanti a nessuno. È esattamente quello che sarebbe stato scritto qui.

La chiave di firma è perciò il prossimo passo per questo repository. Non appena i pacchetti saranno firmati, qui comparirà l'inclusione con `gpgcheck=1` e la chiave pubblica. I metadati li genero comunque con `createrepo`, dnf tratta poi il repository come qualsiasi altro. Fino ad allora vale questo: chi ha bisogno di uno dei pacchetti si fa vivo attraverso i contatti indicati su [netsnek.com](https://netsnek.com), e guardiamo insieme che cosa abbia senso per il computer in questione.

## Precedenza su Fedora

I pacchetti portano i loro nomi upstream originali, quindi per esempio `swappy` invece di `swappy-netsnek`. Perché la mia versione abbia la precedenza sul pacchetto Fedora, uso a seconda del pacchetto una release più alta, un `Epoch: 1` oppure un `Obsoletes:` sui vecchi nomi di pacchetto. Gli aggiornamenti da Fedora non sovrascrivono così per sbaglio i pacchetti patchati.

## Che cosa c'è dentro e perché

### Il nucleo Wayland

**wlroots** è il vero motivo di questo repository. Il mio pannello XFCE vedeva una sola area di lavoro, perché wlroots 0.19 non implementa ancora il protocollo `ext-workspace-v1`. La salvezza è stata un backport dell'implementazione 0.20 dalla community attorno a dkondor, che ho impacchettato per Fedora su 0.19.2. La patch aggiunge solo file nuovi e due righe di build, il codice esistente resta invariato. Non appena wlroots 0.20 arriverà in Fedora, butto fuori di nuovo il pacchetto.

**wayfire** porta il mio stack di patch. Un fix per il crash delle finestre layer shell che vengono rimostrate dopo essere state nascoste, mi serviva per il terminale a tendina di kitty. Il plugin `wlr-workspaces` dallo stesso lavoro di community di dkondor, che espone le aree di lavoro di Wayfire tramite `ext-workspace-v1`, così il pager di XFCE le vede e i clic nel pager cambiano workspace. Vera profondità di colore a 10 bit, `depth = 10` nel blocco `[output]` della wayfire.ini funziona così davvero e riduce il banding dei gradienti. E due estensioni per il cubo: l'attivazione del cubo del desktop con modificatore più swipe a quattro dita e un'interfaccia di rendering per i plugin dentro al cubo.

**wayfire-plugins-extra** porta con sé due plugin miei. `cube-gears`, come citazione di glxgears, disegna ingranaggi dentro al cubo del desktop. `dither` riduce con l'ordered dithering il banding visibile dei gradienti sul display interno.

### I mattoni di XFCE e del desktop

**xfce4-panel** lo compilo con `gtk-layer-shell` attivo. Il pannello viene così riconosciuto sotto Wayland come superficie di shell, non riceve una barra del titolo dal compositor e riserva correttamente il proprio spazio sullo schermo.

**xfdesktop** riceve la build Wayland più una patch mia per i nomi dei monitor. Senza di essa la finestra di impostazioni scrive le impostazioni dello sfondo su `monitor0`, mentre il desktop le cerca sotto il nome del connettore come `monitoreDP-1`. Il mio sfondo era quindi impostabile, ma mai visibile. La patch risolve il nome tramite libxfce4windowing, così entrambi i lati usano la stessa chiave.

**swappy**, il mio editor di screenshot, upstream usa una GtkHeaderBar come decorazione lato client e usciva così dalla mia fila di decorazioni lato server. La patch sposta la HeaderBar nel normale contenuto della finestra, così Wayfire può disegnare una barra del titolo uniforme attorno alla finestra.

**swaylock-effects** lo compilo dal fork di jirutka, perché supporta il protocollo `ext-session-lock-v1` e fornisce effetti come blur, orologio e fade-in per il lockscreen.

**kitty** riceve due fix: una patch upstream per Python 3.14 e una mia per una lettura fuori dai limiti nel codice delle notifiche dbus, che da me faceva crashare kitty con le notifiche del desktop. Sono inclusi anche i sottopacchetti `kitty-kitten`, `kitty-terminfo` e `kitty-shell-integration`.

**mugshot** è upstream invariato da bluesabre/mugshot, che in Fedora semplicemente non è impacchettato. Fornisce la finestra dell'immagine del profilo di cui ha bisogno il pulsante del profilo nel menu Whisker di XFCE.

### App che per aarch64 altrimenti non esistono

**telegram-desktop** lo compilo nativamente per aarch64 sulla base del fork Nicegram, stack WebRTC incluso. Pacchetti binari ufficiali per questa architettura non esistono.

**signal-desktop** è una build nativa aarch64 dal codice sorgente ufficiale, che altrimenti non esiste come pacchetto Fedora. La voce desktop parte con `--no-sandbox --ozone-platform=wayland`, perché la sandbox su Fedora ARM64 non funziona e altrimenti l'app girerebbe tramite XWayland.

**youtube-music** è la mia build aarch64 del fork Pear Desktop di YouTube Music (upstream [pear-devs/pear-desktop](https://github.com/pear-devs/pear-desktop)). Rispetto a upstream è adattata solo la resa grafica, la pagina di consenso di Google viene renderizzata in dark mode.

## Progetto di una persona sola

Il repository è un progetto di una persona sola per un setup concreto. Non c'è nessuna garanzia di stabilità né di rebuild tempestive dopo gli aggiornamenti di Fedora. Il feedback lo accetto comunque volentieri attraverso i contatti indicati su [netsnek.com](https://netsnek.com).
