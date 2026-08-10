---
title: Namizna nastavitev Asahi
description: Kako sem si na MacBooku Pro zgradil namizje Wayland iz Wayfira in XFCE, skupaj s kamni spotike, ki so me med potjo ujeli.
path: /docs/linux/asahi
---

# Namizna nastavitev Asahi

Moje namizje je kombinacija, ki je nikjer ni dobiti gotove: Wayfire kot upravljalnik prikaza za Wayland, na njem XFCE 4.20 kot namizno okolje, vse skupaj na MacBooku Pro s Fedoro 43 in jedrom Asahi. Applov GPE teče prek Mese. Hotel sem učinke kompozicije Wayfira in kljub temu domači svet XFCE s pultom, Thunarjem in nastavitvenimi pogovornimi okni. Oboje skupaj deluje. Le trajalo je, da so se vsi deli čisto zagrabili drug v drugega, in prav ta prehojena pot je opisana na tej strani.

## Sklad na kratko

```
greetd + tuigreet
  └→ startxfce4 --wayland wayfire
       ├→ Wayfire (Wayland-Compositor, wlroots-basiert)
       ├→ xfce4-session
       ├→ xfce4-panel (gepatcht: gtk-layer-shell)
       ├→ xfdesktop (gepatcht: Wayland-Monitornamen)
       └→ nm-applet, swayidle
```

Delitev dela: Wayfire prevzame kompozicijo, upravljanje oken in učinke. XFCE prispeva upravljanje seje, pult, namizje, nastavitve in aplikacije. XFCE se pri tem zažene kot seja Wayland neposredno na Wayfiru.

## Prijava: greetd + tuigreet

Težkega upravitelja prikaza nisem hotel. greetd s tekstovnim pozdravnikom tuigreet je minimalen, hiter in ne potrebuje lastne grafične seje. Moja nastavitev v `/etc/greetd/config.toml`:

```toml
[terminal]
vt = 7

[default_session]
command = "tuigreet --time --remember --cmd 'startxfce4 --wayland wayfire'"
user = "greetd"
```

## Wayfire

Wayfire nastavljam prek `~/.config/wayfire.ini`. Najpomembnejše odločitve, ki sem jih pri tem sprejel:

- `preferred_decoration_mode = server` poskrbi za okrasitve na strani strežnika pri vseh oknih. Vsaka aplikacija dobi isto naslovno vrstico od upravljalnika prikaza, ne glede na to, kaj prinese s seboj. Ta enoten videz mi je bil pomemben.
- `scale = 2.0` za HiDPI na zaslonu Retina.
- Navidezne delovne površine v vrsti 4x1 (`vwidth = 4`, `vheight = 1`), dosegljive s tipkovnico in gestami.
- Vtičniki, kot so expo (pregled delovnih površin), grid, cube in wobbly, za klasično udobje kompozicije, ki sem ga pogrešal od časov Compiza.

Moja najljubša podrobnost je namizna kocka. Delovne površine 4x1 ležijo na stranicah vrtljive kocke, ki jo odprem s Super plus klikom ali s štiriprstnim potegom. Oboje izvira iz lastnega popravka, ki ga prinese moj popravljeni Wayfire z [rpm.netsnek.com](/docs/linux/rpm). In ker je pač mogoče, vtičnik `cube-gears` kot namig na glxgears v notranjost kocke nariše vrteče se zobnike. Na skladu Applovega GPE vse to teče tekoče.

Zaslonske posnetke delam z grim in slurp, urejam pa s swappy. Kot zaganjalnik služi wofi, kot terminal kitty.

## XFCE kot seja Wayland

XFCE 4.20 lahko teče kot seja Wayland na zunanjem upravljalniku prikaza. Prav to se tukaj dogaja z `startxfce4 --wayland wayfire`. Dve podrobnosti sta me stali časa:

**Okoljske spremenljivke sodijo v `~/.config/xfce4/xinitrc`.** greetd ne naloži profilov prijavne lupine. Kdor želi nastaviti spremenljivke, kot je `GTK_MODULES=xfsettingsd-gtk-settings-sync`, mora to storiti v xinitrc. Ta spremenljivka poskrbi, da nastavitvena pogovorna okna XFCE uporabljajo okrasitve Wayfira na strani strežnika namesto lastnih GtkHeaderBar.

**`dbus-update-activation-environment --systemd` mora vsebovati `WAYLAND_DISPLAY` in `DISPLAY`.** Brez te predaje uporabniški seji systemd `xdg-desktop-portal-gtk` spodleti. Opazil sem to ob pokvarjenih datotečnih pogovornih oknih v aplikacijah Wayland, na primer pri shranjevanju v Chromiumu.

Najdlje sem se boril s pregledovalnikom delovnih površin. wlroots 0.19 protokola `ext_workspace_manager_v1` ne implementira, izvorna podpora pride šele z wlroots 0.20. S standardnimi paketi XFCE zato vidi samo eno samo delovno površino, in moja lepa kocka 4x1 je bila za pult nevidna. Moja rešitev: popravljen wlroots 0.19.2 z implementacijo ext-workspace-v1 kot vzvratno prenesenim dodatkom, k temu Wayfire 0.10.1 z vtičnikom `wlr-workspaces`, ki delovne površine Wayfira izpostavi prek protokola. Oba paketa prihajata iz mojega [repozitorija RPM](/docs/linux/rpm). Pregledovalnik XFCE s tem prikazuje vse delovne površine v gumbnem načinu, kliki v pregledovalniku pa preklopijo delovno površino. Pult mora biti za to vsaj različice 4.20.1, 4.20.0 vsebuje napako v ext-workspace. Kar še naprej manjka: protokol ne pozna preslikave okna na delovno površino, pregledovalnika s sličicami in ozadja na delovno površino zato ni.

## Zvok: PipeWire

Zvok teče prek PipeWire 1.4 z WirePlumber 0.5. Paket `pipewire-pulseaudio` zagotavlja združljivost s PulseAudio za starejše aplikacije, `pipewire-jack-audio-connection-kit` pa vmesnik JACK. `pulseaudio-utils` prinaša običajni `pactl`.

## Bluetooth: stabilen A2DP

Zvok prek Bluetootha me je na Asahiju stal dveh bojev, preden se je začel počutiti kot dokončan izdelek.

### Izklop samodejnega preklopa na HFP

Prvi boj: glasba zveni odlično, potem katera koli aplikacija zahteva mikrofon slušalk in naenkrat slišim mono zvok v telefonski kakovosti plus šum. Kriv je samodejni preklop na profil HFP/HSP. Moja dodatna datoteka za WirePlumber pod `~/.config/wireplumber/wireplumber.conf.d/51-bluez-no-autoswitch.conf` vsiljuje čisto glasbeno delovanje:

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

Cena: mikrofon Bluetooth ni na voljo. Za klice uporabljam vgrajeni mikrofon MacBooka, ta je tako ali tako boljši. Kdor potrebuje mikrofon slušalk, nastavi `autoswitch-to-headset-profile = true` in odstrani vrstico z `bluez5.roles`.

### Izpadi A2DP ob prometu WLAN

Drugi boj je bil bolj prefinjen: zvok prek Bluetootha je prasketal vedno natanko takrat, ko se je v WLAN kaj dogajalo. Čipi Broadcom v Macih z Apple Silicon si delijo eno anteno za WLAN in Bluetooth. macOS povezave A2DP prednostno obravnava prek proizvajalčevega ukaza HCI, gonilnik za Linux tega ne počne. Rešitev je majhna storitev systemd, ki po vsaki povezavi Bluetooth prednost prometa dvigne z ukazom HCI. Pristop izvira iz projekta [asahi-bt-a2dp-fix](https://github.com/christian-korneck/asahi-bt-a2dp-fix).

### Prvo seznanjanje

Nekatere slušalke se ob prvem seznanjanju povežejo samo s HFP, tako da profil A2DP sploh ne pride na dan. Kar pri meni pomaga, je ponoven zagon zvočnih storitev med prekinitvijo in ponovno povezavo:

```bash
bluetoothctl disconnect <MAC>
systemctl --user restart wireplumber pipewire-pulse pipewire
bluetoothctl connect <MAC>
```

Zatem profil A2DP ostane tudi čez ponovne povezave.

## HiDPI in zareza

Notranji zaslon teče s `scale = 2.0` v Wayfiru. Zareza MacBooka Pro je privzeto skrita. Kdor želi uporabljati celotno površino zaslona, jo vklopi s parametrom jedra `appledrm.show_notch=1`. Sprememba potrebuje ponovni zagon.

## Kamni spotike

### 16K pomnilniške strani

Moj prvi pravi trenutek z Asahijem je bil Minecraft, ki je ob zagonu takoj izginil. Jedro Asahi uporablja 16K strani namesto običajnih 4K. Večina programske opreme je na to pripravljena, a programi s trdo vgrajenimi predpostavkami o 4K se sesujejo. Najpogostejši storilec je priložen jemalloc, prepoznaven po sporočilu `<jemalloc>: Unsupported system page size`. Trije primeri, ki sem jih sam prebil:

- **Minecraft**: jemalloc, ki ga prinaša LWJGL, se zagotovljeno sesuje ob zagonu. Popravek je zastavica JVM `-Dorg.lwjgl.system.allocator=system`, s čimer LWJGL uporabi dodeljevalnik iz glibc. Za novejše nalagalnike modov je treba dodatno pripeti Javo 21 kot Javo instance.
- **Widevine**: CDM za ARM64 mora biti popravljen za 16K strani. Asahijev `widevine-installer` to ob namestitvi opravi samodejno.
- **FEX-emu**: emulator x86 na jedrih s 16K umre ob isti težavi z jemalloc. Zato programska oprema x86 pri meni teče v mikro navideznem stroju, glej spodaj.

Kadar se na Asahiju karkoli sesuje brez komentarja, je moj prvi sum medtem vedno velikost strani.

### GTK4 se sesuje v izrisovalniku Vulkan

Aplikacije GTK4 so pri meni brez komentarja izginile s SIGSEGV, brez uporabne sledi. Vzrok: novejše različice GTK4 izberejo izrisovalnik Vulkan, takoj ko je nameščen gonilnik za Vulkan. Asahijev gonilnik za Vulkan Honeykrisp te poti še ne prenese zanesljivo. Moj obvod vsili izrisovalnik GL in velja za vse aplikacije GTK4:

```bash
GSK_RENDERER=gl <app>
```

Kdor to želi trajno, spremenljivko nastavi v `~/.config/xfce4/xinitrc`, da jo podeduje celotna seja. Za Flatpake velja za vsako aplikacijo posebej:

```bash
flatpak override --user --env=GSK_RENDERER=gl <app-id>
```

Za protipreizkus aplikacijo zaženem z `GSK_DEBUG=renderer`, v dnevniku mora pisati `Using renderer 'GskGLRenderer'`. Če težave dela tudi izrisovalnik GL, je `GSK_RENDERER=cairo` čisto programska pot, vedno stabilna, a počasnejša.

### Signal Desktop potrebuje --no-sandbox

Signal Desktop na Fedori za ARM64 potrebuje zastavico `--no-sandbox`, sicer se ne zažene.

### Zaustavitev je s2idle

Apple Silicon pod Linuxom podpira samo s2idle. Mirovanje zaradi omejitve strojne programske opreme GPE ni mogoče. S tem sem se sprijaznil.

### Naprave USB 1.1 na vratih USB-C

Na jedrih Asahi pred 6.19 se naprave s polno hitrostjo, kot so starejši vmesniki ali plošče z mikrokrmilniki, pogosto ne naštejejo, v dnevniku jedra potem stojijo sporočila, kot je `device descriptor read/64, error -71`. Napaka je v obravnavi USB2 PHY in je odpravljena od Linuxa 6.19. Opozorilo iz izkušenj: gonilnika `dwc3-apple` nikoli ne odveži med delovanjem, da bi ponastavil PHY. To zaklene krmilnik in oba vodila USB sta do ponovnega zagona izgubljena.

## Programska oprema x86 s FEX in muvm

Nekatere programske opreme preprosto ni kot gradnje za ARM64 Linux, pri meni je tak primer odjemalec TeamSpeak. Na Asahiju kljub temu teče, s FEX-emu kot emulatorjem x86_64. Ker FEX sam na jedru s 16K spodleti, emulacija tiči v muvm, lahkotnem mikro navideznem stroju z gostom na 4K straneh. Potrebni paketi se imenujejo `fex-emu`, `muvm` in `fex-emu-rootfs-fedora`. Vnos binfmt v gostu binarne datoteke x86 samodejno usmeri skozi FEX.

Nekaj posebnosti, ki sem si jih moral vse posamično priboriti:

- Gost vidi X11, ne vtičnice Wayland. muvm nastavi `DISPLAY` na most X11 do gostiteljevega Xwaylanda. Aplikacije Chromium in CEF zato potrebujejo `--ozone-platform=x11`, aplikacije Qt pa `QT_QPA_PLATFORM=xcb`.
- Zvok deluje brez posega, muvm PipeWire in Pulse prepusti v gosta.
- Domači imenik se deli prek virtiofs. Manjkajoče knjižnice x86 pridobim z `dnf download --forcearch=x86_64 <paket>`, jih razpakiram pod HOME in vključim prek `LD_LIBRARY_PATH`.
- Aplikacije Chromium in CEF potrebujejo `--no-sandbox`, ker se njihov peskovnik pod FEX ne inicializira. Za Qt WebEngine analogno velja `QTWEBENGINE_DISABLE_SANDBOX=1`.
- Pospeševanje GPE v gostu potrebuje paket `mesa-fex-emu-overlay-x86_64` in gradnjo virglrenderer iz Asahijevega COPR. Pozor: Fedorin lastni virglrenderer lahko paket iz COPR ob posodobitvah tiho zamenja, zatem pospeševanja GPE v gostu ni več. To prepreči `dnf versionlock add virglrenderer`.
- Če se muvm brez očitnega razloga ne zažene več, v imeniku XDG za izvajanje pogosto ležijo osirotele datoteke (`krun`, `muvm.lock`) iz prejšnjega sesutega zagona. Izbriši jih, takoj ko noben proces muvm več ne teče.

## Popravljeni paketi

Več gradnikov te nastavitve potrebuje popravke, ki jih v Fedori v taki obliki ni. Pult mora teči kot površina layer-shell, xfdesktop potrebuje popravek imen zaslonov pod Waylandom, zaklenjeni zaslon potrebuje `ext-session-lock-v1`, pregledovalnik delovnih površin potrebuje popravljeni wlroots skupaj z vtičnikom za Wayfire. Te pakete gradim sam. Celotna zgodba o tem je opisana pod [Repozitorij Netsnek RPM](/docs/linux/rpm).
