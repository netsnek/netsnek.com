---
title: Repozitorij Netsnek RPM
description: Moj lastni repozitorij RPM rpm.netsnek.com, zgodbe za popravljenimi paketi in zakaj javna vključitev pride šele s podpisnim ključem.
path: /docs/linux/rpm
---

# Repozitorij Netsnek RPM

Moje [namizje Asahi](/docs/linux/asahi) deluje samo zato, ker je peščica paketov zgrajena drugače kot v Fedori. Da mi teh gradenj ni treba vzdrževati na roko in da jih posodobitve Fedore ne prepišejo, pod `rpm.netsnek.com` upravljam lastni repozitorij RPM. Vsi paketi ciljajo na Fedoro 43 na aarch64 in so naravnani na mojo nastavitev Asahi. Na drugih arhitekturah ali distribucijah jih nisem preizkusil.

## Vključitev prek dnf

Tukaj je nekoč stal blok za kopiranje v `/etc/yum.repos.d/netsnek.repo`. Tega sem spet vzel ven, in sicer iz razloga, ki mi je pomembnejši od udobja: repozitorij prinaša programsko opremo s pravicami root na tuje računalnike. Kaj takega mora biti podpisano, in navodil, ki za to izklopijo preverjanje podpisa, nočem nikomur položiti pred nos. Prav to bi tukaj pisalo.

Podpisni ključ je zato naslednji korak za ta repozitorij. Takoj ko bodo paketi podpisani, bo na tem mestu na vrsti vključitev z `gpgcheck=1` in javnim ključem. Metapodatke tako ali tako ustvarjam s `createrepo`, dnf potem repozitorij obravnava kot vsakega drugega. Do takrat velja: kdor kakšen paket potrebuje, se javi po kontaktnih poteh, navedenih na [netsnek.com](https://netsnek.com), in skupaj pogledava, kaj za posamezen računalnik da smisel.

## Prednost pred Fedoro

Paketi nosijo svoja izvirna imena od zgoraj, torej na primer `swappy` namesto `swappy-netsnek`. Da moja različica dobi prednost pred paketom iz Fedore, glede na paket uporabim višjo izdajo, `Epoch: 1` ali `Obsoletes:` na stara imena paketov. Posodobitve iz Fedore popravljenih paketov tako ne prepišejo pomotoma.

## Kaj je notri in zakaj

### Jedro za Wayland

**wlroots** je pravzaprav povod za ta repozitorij. Moj pult XFCE je videl samo eno samo delovno površino, ker wlroots 0.19 protokola `ext-workspace-v1` še ne implementira. Rešitev je bil vzvratni prenos implementacije iz 0.20 iz skupnosti okoli dkondorja, ki sem ga za Fedoro zapakiral na 0.19.2. Popravek doda samo nove datoteke in dve vrstici v gradnjo, obstoječa koda ostane nespremenjena. Takoj ko wlroots 0.20 pristane v Fedori, paket spet vržem ven.

**wayfire** nosi moj sklad popravkov. Popravek sesutja za okna layer-shell, ki so po skritju spet prikazana, tega sem potreboval za kittyjev spustni terminal. Vtičnik `wlr-workspaces` iz istega dela skupnosti dkondorja, ki delovne površine Wayfira izpostavi prek `ext-workspace-v1`, da jih pregledovalnik XFCE vidi in da kliki v pregledovalniku preklopijo delovno površino. Prava 10-bitna barvna globina, `depth = 10` v bloku `[output]` datoteke wayfire.ini s tem zares deluje in zmanjša pasovanje prelivov. In dve razširitvi za kocko: vklop namizne kocke prek modifikatorja plus štiriprstnega potega ter vmesnik za izrisovanje za vtičnike v notranjosti kocke.

**wayfire-plugins-extra** prinaša s seboj dva lastna vtičnika. `cube-gears` kot namig na glxgears nariše zobnike v notranjost namizne kocke. `dither` z urejenim razprševanjem zmanjša vidno pasovanje barvnih prelivov na notranjem zaslonu.

### Gradniki za XFCE in namizje

**xfce4-panel** gradim z vklopljenim `gtk-layer-shell`. Pult je s tem pod Waylandom prepoznan kot površina lupine, ne dobi naslovne vrstice od upravljalnika prikaza in svoj prostor na zaslonu pravilno rezervira.

**xfdesktop** dobi gradnjo za Wayland plus lasten popravek za imena zaslonov. Brez njega nastavitveno pogovorno okno zapiše nastavitve ozadja na `monitor0`, medtem ko jih namizje išče pod imenom priključka, kot je `monitoreDP-1`. Moje ozadje je bilo torej nastavljivo, a nikoli vidno. Popravek ime razreši prek libxfce4windowing, da obe strani uporabljata isti ključ.

**swappy**, moj urejevalnik zaslonskih posnetkov, po izvorni izdaji uporablja GtkHeaderBar kot okrasitev na strani odjemalca in je s tem plesal iz moje vrste okrasitev na strani strežnika. Popravek naslovno vrstico premakne v običajno vsebino okna, da lahko Wayfire okoli okna nariše enotno naslovno vrstico.

**swaylock-effects** gradim iz forka jirutka, ker ta podpira protokol `ext-session-lock-v1` in za zaklenjeni zaslon prinaša učinke, kot so zabrisanost, ura in postopno pojavljanje.

**kitty** dobi dva popravka: popravek iz izvorne izdaje za Python 3.14 in lasten popravek za branje zunaj meja v kodi za obvestila prek dbus, zaradi katerega se je kitty pri meni sesuval ob namiznih obvestilih. Vključeni so tudi podpaketi `kitty-kitten`, `kitty-terminfo` in `kitty-shell-integration`.

**mugshot** je nespremenjena izvorna izdaja iz bluesabre/mugshot, ki v Fedori preprosto ni zapakirana. Prinaša pogovorno okno za profilno sliko, ki ga potrebuje gumb za profil v meniju Whisker v XFCE.

### Aplikacije, ki jih za aarch64 sicer ni

**telegram-desktop** gradim izvorno za aarch64 na osnovi forka Nicegram, vključno s skladom WebRTC. Uradnih binarnih paketov za to arhitekturo ni.

**signal-desktop** je izvorna gradnja za aarch64 iz uradne izvorne kode, ki je sicer kot paket za Fedoro ni. Namizni vnos se zažene z `--no-sandbox --ozone-platform=wayland`, ker peskovnik na Fedori za ARM64 ne deluje in bi aplikacija sicer tekla prek XWaylanda.

**youtube-music** je moja gradnja za aarch64 forka Pear Desktop od YouTube Music (izvorna izdaja [pear-devs/pear-desktop](https://github.com/pear-devs/pear-desktop)). Nasproti izvorni izdaji je prilagojen samo prikaz, Googlova stran s privolitvijo se izrisuje v temnem načinu.

## Projekt ene osebe

Repozitorij je projekt ene osebe za konkretno nastavitev. Ni jamstva za stabilnost ali za pravočasne ponovne gradnje po posodobitvah Fedore. Povratne informacije kljub temu rad sprejmem po kontaktnih poteh, navedenih na [netsnek.com](https://netsnek.com).
