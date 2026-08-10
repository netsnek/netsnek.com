---
title: Setup del desktop Asahi
description: Come mi sono costruito sul MacBook Pro un desktop Wayland fatto di Wayfire e XFCE, compresi gli inciampi che mi hanno colto lungo la strada.
path: /docs/linux/asahi
---

# Setup del desktop Asahi

Il mio desktop è una combinazione che così, già pronta, non esiste da nessuna parte: Wayfire come compositor Wayland, sopra XFCE 4.20 come ambiente desktop, il tutto su un MacBook Pro con Fedora 43 e kernel Asahi. La GPU Apple gira tramite Mesa. Volevo gli effetti di compositing di Wayfire e insieme il mondo familiare di XFCE con pannello, Thunar e finestre di impostazioni. Le due cose insieme funzionano. Ci è solo voluto del tempo perché tutti i pezzi si incastrassero puliti, ed è proprio questo tragitto a stare su questa pagina.

## Lo stack in sintesi

```
greetd + tuigreet
  └→ startxfce4 --wayland wayfire
       ├→ Wayfire (Wayland-Compositor, wlroots-basiert)
       ├→ xfce4-session
       ├→ xfce4-panel (gepatcht: gtk-layer-shell)
       ├→ xfdesktop (gepatcht: Wayland-Monitornamen)
       └→ nm-applet, swayidle
```

La divisione del lavoro: Wayfire si occupa di compositing, gestione delle finestre ed effetti. XFCE fornisce gestione della sessione, pannello, desktop, impostazioni e le applicazioni. XFCE parte come sessione Wayland direttamente su Wayfire.

## Login: greetd + tuigreet

Un display manager pesante non lo volevo. greetd con il greeter testuale tuigreet è minimale, veloce e non ha bisogno di una sessione grafica propria. La mia configurazione in `/etc/greetd/config.toml`:

```toml
[terminal]
vt = 7

[default_session]
command = "tuigreet --time --remember --cmd 'startxfce4 --wayland wayfire'"
user = "greetd"
```

## Wayfire

Wayfire lo configuro tramite `~/.config/wayfire.ini`. Le decisioni più importanti che ho preso:

- `preferred_decoration_mode = server` garantisce decorazioni lato server su tutte le finestre. Ogni app riceve la stessa barra del titolo dal compositor, qualunque cosa si porti dietro. Questo aspetto uniforme era importante per me.
- `scale = 2.0` per l'HiDPI sul display Retina.
- Aree di lavoro virtuali in una fila 4x1 (`vwidth = 4`, `vheight = 1`), raggiungibili da tastiera e con le gesture.
- Plugin come expo (panoramica dei workspace), grid, cube e wobbly per il classico comfort di compositing che mi mancava dai tempi di Compiz.

Il mio dettaglio preferito è il cubo del desktop. Le aree di lavoro 4x1 stanno sulle facce di un cubo girevole, che apro con Super più clic oppure con uno swipe a quattro dita. Entrambe le cose vengono da una patch mia, che il mio Wayfire patchato da [rpm.netsnek.com](/docs/linux/rpm) si porta dietro. E siccome si può, il plugin `cube-gears`, come citazione di glxgears, disegna ingranaggi rotanti dentro il cubo. Sullo stack della GPU Apple tutto questo gira fluido.

Gli screenshot li faccio con grim e slurp, la modifica avviene con swappy. Come launcher uso wofi, come terminale kitty.

## XFCE come sessione Wayland

XFCE 4.20 può girare come sessione Wayland su un compositor esterno. È esattamente quello che succede qui con `startxfce4 --wayland wayfire`. Due dettagli mi sono costati tempo:

**Le variabili d'ambiente vanno in `~/.config/xfce4/xinitrc`.** greetd non carica profili di login shell. Chi vuole impostare variabili come `GTK_MODULES=xfsettingsd-gtk-settings-sync` deve farlo nella xinitrc. Questa variabile fa sì che le finestre di impostazioni di XFCE usino le decorazioni lato server di Wayfire invece di GtkHeaderBar proprie.

**`dbus-update-activation-environment --systemd` deve contenere `WAYLAND_DISPLAY` e `DISPLAY`.** Senza questo passaggio verso la sessione utente di systemd `xdg-desktop-portal-gtk` fallisce. Me ne sono accorto dalle finestre di dialogo dei file rotte nelle applicazioni Wayland, per esempio salvando in Chromium.

Con il pager dei workspace ho lottato più a lungo. wlroots 0.19 non implementa il protocollo `ext_workspace_manager_v1`, il supporto nativo arriva solo con wlroots 0.20. Con i pacchetti stock XFCE vede perciò una sola area di lavoro, e il mio bel cubo 4x1 era invisibile per il pannello. La mia soluzione: un wlroots 0.19.2 patchato con l'implementazione ext-workspace-v1 come backport, più Wayfire 0.10.1 con il plugin `wlr-workspaces`, che espone le aree di lavoro di Wayfire tramite il protocollo. Entrambi i pacchetti vengono dal mio [repository RPM](/docs/linux/rpm). Il pager di XFCE mostra così tutte le aree di lavoro in modalità pulsanti e i clic nel pager cambiano workspace. Per questo il pannello deve essere almeno alla versione 4.20.1, la 4.20.0 contiene un bug ext-workspace. Quello che continua a mancare: il protocollo non conosce alcuna mappatura finestra-workspace, quindi non ci sono pager con anteprime né sfondi per singola area di lavoro.

## Audio: PipeWire

L'audio passa da PipeWire 1.4 con WirePlumber 0.5. Il pacchetto `pipewire-pulseaudio` mette a disposizione la compatibilità PulseAudio per le applicazioni più vecchie, `pipewire-jack-audio-connection-kit` l'interfaccia JACK. `pulseaudio-utils` fornisce il solito `pactl`.

## Bluetooth: A2DP stabile

L'audio Bluetooth su Asahi mi è costato due battaglie, prima che sembrasse un prodotto finito.

### Disattivare l'autoswitch HFP

La prima battaglia: la musica suona benissimo, poi una qualche app richiede il microfono dell'headset e all'improvviso sento audio mono in qualità telefonica più fruscio. La colpa è del passaggio automatico al profilo HFP/HSP. Il mio file drop-in di WirePlumber sotto `~/.config/wireplumber/wireplumber.conf.d/51-bluez-no-autoswitch.conf` impone il puro funzionamento musicale:

```
wireplumber.settings = {
  bluetooth.autoswitch-to-headset-profile = false
}

monitor.bluez.properties = {
  bluez5.roles = [ a2dp_sink a2dp_source ]
  bluez5.codecs = [ aac aptx_hd aptx ldac sbc_xq sbc ]
  bluez5.enable-msbc = false
  bluez5.enable-hw-volume = true
}
```

Il prezzo: il microfono Bluetooth non è disponibile. Per le chiamate uso il microfono integrato del MacBook, che è comunque migliore. Chi ha bisogno del microfono dell'headset imposta `autoswitch-to-headset-profile = true` e rimuove la riga con `bluez5.roles`.

### Interruzioni A2DP con traffico WLAN

La seconda battaglia era più sottile: l'audio Bluetooth crepitava sempre esattamente quando sulla WLAN c'era movimento. I chip Broadcom nei Mac Apple Silicon condividono un'antenna per WLAN e Bluetooth. macOS dà priorità alle connessioni A2DP tramite un comando HCI specifico del produttore, il driver Linux non lo fa. La soluzione è un piccolo servizio systemd che dopo ogni connessione Bluetooth alza la priorità del traffico con un comando HCI. L'approccio viene dal progetto [asahi-bt-a2dp-fix](https://github.com/christian-korneck/asahi-bt-a2dp-fix).

### Primo accoppiamento

Certi headset al primo pairing si collegano solo con HFP, così non compare proprio nessun profilo A2DP. Quello che da me aiuta è un riavvio dei servizi audio tra disconnessione e riconnessione:

```bash
bluetoothctl disconnect <MAC>
systemctl --user restart wireplumber pipewire-pulse pipewire
bluetoothctl connect <MAC>
```

Dopo di che il profilo A2DP resta anche attraverso le riconnessioni.

## HiDPI e notch

Il display interno gira con `scale = 2.0` in Wayfire. Il notch del MacBook Pro è nascosto di default. Chi vuole usare tutta la superficie del display lo attiva con il parametro del kernel `appledrm.show_notch=1`. La modifica richiede un reboot.

## Inciampi

### Pagine di memoria da 16K

Il mio primo vero momento Asahi è stato un Minecraft che all'avvio spariva subito. Il kernel Asahi usa pagine da 16K invece delle solite 4K. La maggior parte del software è preparata a questo, ma i programmi con assunzioni di 4K compilate dentro crashano. Il colpevole più frequente è un jemalloc incluso nel bundle, riconoscibile dal messaggio `<jemalloc>: Unsupported system page size`. Tre casi che ho attraversato di persona:

- **Minecraft**: il jemalloc fornito da LWJGL crasha all'avvio, garantito. Il fix è il flag della JVM `-Dorg.lwjgl.system.allocator=system`, così LWJGL usa l'allocatore di glibc. Per i modloader attuali va inoltre fissato Java 21 come Java dell'istanza.
- **Widevine**: il CDM ARM64 va patchato per le pagine da 16K. Il `widevine-installer` di Asahi lo fa automaticamente durante l'installazione.
- **FEX-emu**: l'emulatore x86 muore sui kernel a 16K per lo stesso problema di jemalloc. Per questo da me il software x86 gira in una microVM, vedi sotto.

Quando qualcosa su Asahi crasha senza commento, il mio primo sospetto ormai è sempre la dimensione delle pagine.

### GTK4 crasha nel renderer Vulkan

Le applicazioni GTK4 da me sparivano senza commento con SIGSEGV, senza un traceback utilizzabile. La causa: le versioni più recenti di GTK4 scelgono il renderer Vulkan non appena è installato un driver Vulkan. Il driver Vulkan di Asahi, Honeykrisp, non regge ancora questo percorso in modo affidabile. Il mio workaround impone il renderer GL e vale per tutte le app GTK4:

```bash
GSK_RENDERER=gl <app>
```

Chi lo vuole in modo permanente imposta la variabile nella `~/.config/xfce4/xinitrc`, così la eredita l'intera sessione. Per i Flatpak vale per singola app:

```bash
flatpak override --user --env=GSK_RENDERER=gl <app-id>
```

Come controprova avvio l'app con `GSK_DEBUG=renderer`, nel log deve comparire `Using renderer 'GskGLRenderer'`. Se anche il renderer GL fa problemi, `GSK_RENDERER=cairo` è la strada puramente software, sempre stabile, ma più lenta.

### Signal Desktop ha bisogno di --no-sandbox

Signal Desktop su Fedora ARM64 ha bisogno del flag `--no-sandbox`, altrimenti non parte.

### Il suspend è s2idle

Apple Silicon sotto Linux supporta solo s2idle. L'ibernazione non è possibile a causa di una limitazione del firmware della GPU. Me ne sono fatto una ragione.

### Dispositivi USB 1.1 sulle porte USB-C

Sui kernel Asahi precedenti al 6.19 i dispositivi full speed come adattatori più vecchi o schede a microcontrollore spesso non vengono enumerati, nel log del kernel compaiono allora messaggi come `device descriptor read/64, error -71`. L'errore sta nella gestione del PHY USB2 ed è risolto da Linux 6.19 in poi. Un avvertimento nato dall'esperienza: non fare mai l'unbind del driver `dwc3-apple` a sistema in funzione per resettare il PHY. Questo blocca il controller ed entrambi i bus USB spariscono fino al reboot.

## Software x86 con FEX e muvm

Certi software semplicemente non esistono come build Linux ARM64, da me il client TeamSpeak è uno di questi casi. Su Asahi gira lo stesso, con FEX-emu come emulatore x86_64. Poiché FEX stesso si arena sul kernel a 16K, l'emulazione sta dentro muvm, una microVM leggera con guest a pagine da 4K. I pacchetti necessari si chiamano `fex-emu`, `muvm` e `fex-emu-rootfs-fedora`. Una voce binfmt nel guest instrada automaticamente i binari x86 attraverso FEX.

Un paio di particolarità, che ho dovuto conquistarmi tutte una per una:

- Il guest vede X11, non un socket Wayland. muvm imposta `DISPLAY` su un bridge X11 verso l'Xwayland dell'host. Le app Chromium e CEF hanno perciò bisogno di `--ozone-platform=x11`, le app Qt di `QT_QPA_PLATFORM=xcb`.
- L'audio funziona senza fare niente, muvm passa PipeWire e Pulse dentro al guest.
- La directory HOME viene condivisa tramite virtiofs. Le librerie x86 mancanti le scarico con `dnf download --forcearch=x86_64 <paket>`, le estraggo sotto HOME e le aggancio tramite `LD_LIBRARY_PATH`.
- Le app Chromium e CEF hanno bisogno di `--no-sandbox`, perché la loro sandbox sotto FEX non si inizializza. Per Qt WebEngine vale analogamente `QTWEBENGINE_DISABLE_SANDBOX=1`.
- L'accelerazione GPU nel guest richiede il pacchetto `mesa-fex-emu-overlay-x86_64` e la build di virglrenderer dal COPR di Asahi. Attenzione: il virglrenderer di Fedora può sostituire silenziosamente il pacchetto COPR durante gli aggiornamenti, dopo di che l'accelerazione GPU nel guest sparisce. Un `dnf versionlock add virglrenderer` lo impedisce.
- Se muvm non parte più senza un motivo riconoscibile, spesso nella directory di runtime XDG stanno file orfani (`krun`, `muvm.lock`) di un'esecuzione precedente andata in crash. Da cancellare, non appena non gira più nessun processo muvm.

## Pacchetti patchati

Diversi mattoni di questo setup hanno bisogno di patch che in Fedora non esistono così. Il pannello deve girare come superficie layer shell, xfdesktop ha bisogno di un fix per i nomi dei monitor su Wayland, il lockscreen ha bisogno di `ext-session-lock-v1`, il pager dei workspace ha bisogno del wlroots patchato insieme al plugin Wayfire. Questi pacchetti li compilo io. Tutta la storia sta sotto [Repository RPM Netsnek](/docs/linux/rpm).
