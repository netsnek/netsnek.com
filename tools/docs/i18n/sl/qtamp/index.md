---
title: qtamp
description: Zakaj sem zgradil predvajalnik, ki originalne teme Winampa izvaja kot programe. O navideznem stroju Maki, tisočih tem kot zbirki testov in predvajalniku, ki igra naprej tudi brez okna.
path: /docs/qtamp
---

# qtamp

Nikoli si nisem želel predvajalnika, ki je videti kot Winamp. Želel sem si takega, na katerem teme Winampa zares tečejo. Razlika je večja, kot se sliši. Modern Skin ni bitna slika teme, je program. XML deklarira drevo gradnikov, prevedena bytecoda Maki poganja vedenje. Predali drsijo, zavihki preklapljajo, okna spreminjajo obliko, vse to skriptano iz teme same. Kdor to preriše, ima lep plakat. Jaz sem hotel original.

Zato qtamp teme izvaja kot prave programe. qtamp je moj glasbeni predvajalnik, izvorno napisan v Qt6, in referenčni predvajalnik za [qtWasabi](https://github.com/qtWasabi/qtWasabi), mojo neodvisno novo implementacijo pogona za Modern Skins. Teme s seboj prinesejo svojo prevedeno bytecodo Maki, qtWasabi pa jo izvaja v lastnem navideznem stroju Maki. Logika teme krmili vmesnik natanko tako, kot ga je leta 2002.

Ime je besedna igra. "Qt" kot ogrodje, "qt" kot cute. Ojačevalnik, napisan v Qt, in upam, da tudi ljubek.

## Kako se je začelo

Začelo se ni pri meni. qtamp je izšel iz [winamp-linux](https://github.com/lord3nd3r/winamp-linux), izvornega Qt-porta uporabnika lord3nd3r. V njegovem repozitoriju je stalo vprašanje "make the Modern skins work", in ta stavek me ni več izpustil.

Kajti spraviti Modern Skins v tek ne pomeni naložiti nekaj grafik. Leta 2002 je Winamp3 predstavil pogon Wasabi, Winamp 5 ga je nadaljeval kot Modern Skins (`.wal`). Zgrajenih je bilo na tisoče takih tem, vsaka s svojo logiko. Vse posamično prerisati ni bila možnost. Ostala je torej samo brezkompromisna različica: zgraditi popoln navidezni stroj Maki in vsako temo izvajati kot program, kar v resnici je.

## Obsedenost z zvestobo

Iz te odločitve je nastalo pravilo, ki sem si ga naložil zgodaj: kode za posamezno temo ni. Če se tema izrisuje ali vede napačno, je to napaka pogona in se odpravi v qtWasabiju. Tisoče objavljenih tem je s tem hkrati specifikacija in zbirka testov. Kar se izrisuje napačno, odprto sledim v [reviziji zvestobe](https://github.com/qtWasabi/qtWasabi/tree/main/okf) qtWasabija. Predstavitev na [qtamp.org](https://qtamp.org) prikazuje samo teme, ki se že izrisujejo natanko tako, kot so jih zgradili njihovi avtorji.

Kako globoko gre ta obsedenost, kaže barvni cevovod. Modern Skins prinašajo s seboj barvne prednastavitve, tabele gammaset, ki vsako skupino elementov v grafiki teme med izvajanjem prebarvajo. qtWasabi ta cevovod preračuna bajt za bajtom, z isto celoštevilsko matematiko kot Winampov GammaFilter. Prednastavitve teme so zato videti natanko tako, kot jih je uglasil njen avtor. Za teme brez lastnih prednastavitev lahko pogon barvne teme tudi sintetizira. To je strogo po izbiri, teme z lastnimi prednastavitvami ostanejo nedotaknjene.

Najlepši trenutek je kljub temu vsakič isti: naloži se več kot dvajset let stara tema, njeni predali zdrsnejo, njeni zavihki preklopijo, in ničesar od tega nisem sprogramiral jaz. To je naredil njen avtor, takrat.

## Classic in Modern

Pri Modern Skins se ne konča. Klasične teme Winampa (`.wsz`) qtamp predvaja prav tako, prek izvornega Qt-izrisovalnika za Classic, ki ga prinaša iz svojega izvora v winamp-linux in ki ga naprej vzdržujem, vključno s temami za izenačevalnik. Če Modern Skin ni na voljo, qtamp samodejno pade nazaj na pot Classic.

## Predvajalnik za vsak dan

Naokrog je iz qtampa nastal pravi predvajalnik. Predvaja FLAC, MP3, OGG in Opus, ima 10-pasovni izenačevalnik in pravi urejevalnik seznamov predvajanja, ki ga izrisuje tema sama. Medijska knjižnica iz oznak v glasbeni mapi zgradi indeks z DuckDB in Parquet, z vrtanjem v globino po izvajalcu, albumu in naslovu ter s filtriranjem v živo. K temu prideta še projectM kot vizualizacija in MPRIS2 pod Linuxom.

Eno mi je bilo pri tem posebej pomembno: vse teče izvorno na Apple Silicon in Asahi Linux, ker je to moja vsakodnevna platforma. Brez Wine, brez emulacije x86, aarch64 skozi ves sklad. Poleg tega qtamp teče na velikih distribucijah Linuxa, na macOS in kot gradnja WebAssembly v Chromiumu neposredno v brskalniku. Windows je načrtovan, a ga še ni.

## Predvajalnik brez okna

Moja vizija sega prek namizja. qtWasabi predelujem v ogrodje za vmesnike predvajalnikov v slogu Winampa, približno tako, kot je React v razmerju do strežnika Node. Predvajalnik je v tem samostojna zaledna storitev, vmesnik pa le glava, ki se poveže in izrisuje. Glave se s predvajalnikom pogovarjajo izključno v GraphQL. S tem qtamp teče naprej tudi brez glave, čisto brez okna, glave na namizju, v brskalniku ali na drugem računalniku pa se povežejo z istim stanjem. Vse ostanejo v vsem sinhronizirane, od naslova prek izenačevalnika do seznama predvajanja.

Temelji tega so pristali. Vmesnik interno govori GraphQL, glava WebAssembly uporablja isto pot, in ločitev predvajalnika od vmesnika je v kodi izpeljana. Nadgradnja v daljinsko vodljive predvajalnike in bote poteka. In ker je qtamp sam le porabnik qtWasabija, lahko vsak drug predvajalnik na osnovi Qt pogon prav tako vgradi.

## Kaj qtamp ni

qtamp namenoma ni popolnoma opremljen predvajalnik. Ni imenikov spletnih radiev, ni upravitelja podcastov in ni povezave z glasbeno trgovino. qtamp usmeriš na svojo glasbeno mapo in predvaja tvojo glasbo. Moj inženirski proračun ostaja pri zvestobi tem. Kdor danes išče funkcijsko popolnega naslednika Winampa, bo bolje postrežen z WACUP ali Audacious. Kdor želi teme Winampa izvorno poganjati na Apple Silicon in Asahi Linux, je tukaj na pravem naslovu.

Še nekaj razmejitev. S Qmmp in QAmp qtamp kljub podobnim imenom ni v sorodu, qtamp je od tal na novo napisan. Stari vtičniki Winampa za Win32 se ne naložijo, qtamp govori lasten protokol vtičnikov, izvorno v Qt, po zgledu klasičnih tipov vtičnikov Winampa. In v repozitoriju qtamp ni nobene izvorne kode Winampa.

## Zasluge in licenca

Začetek pripada uporabniku lord3nd3r in njegovemu winamp-linux. Teme v predstavitvi prihajajo od [0x5066](https://github.com/0x5066). Vse na qtamp.org prikazane teme so licencirane po MIT in se z navedbo avtorstva vzdržujejo kot forki pod [github.com/qtamp](https://github.com/qtamp), spremenil sem le nize blagovne znamke v naslovni vrstici. Lastniških tem podjetja Nullsoft namenoma ne prikazujem.

Koda, ki sem jo v qtampu in qtWasabiju napisal sam, je pod licenco MIT. qtWasabi je neodvisna nova implementacija in ne fork. Tuje kode niti ne prilagam niti je ne razširjam naprej. Kdor za gradnjo potrebuje tuje izvirne vire, si jih priskrbi sam in preveri licenčne pogoje, ki zanj veljajo. qtamp ni povezan z Winamp LLC, Winamp je znamka svojega imetnika.

## Za nadaljnje branje

- Spletna stran in predvajalnik v brskalniku: [qtamp.org](https://qtamp.org)
- Izvorna koda: [github.com/qtamp/qtamp](https://github.com/qtamp/qtamp)
- Pogon za teme: [github.com/qtWasabi/qtWasabi](https://github.com/qtWasabi/qtWasabi)
- [Namestitev qtampa](/docs/qtamp/install)
