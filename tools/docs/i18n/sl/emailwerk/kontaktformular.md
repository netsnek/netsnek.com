---
title: Kontaktni obrazec
description: Kako kontaktni obrazec strani netsnek.com brez prijave pošilja neposredno v Emailwerk in zakaj to kljub temu ni odprt rele.
path: /docs/emailwerk/kontaktformular
---

# Kontaktni obrazec brez odprtega releja

Javni kontaktni obrazec nima prijave. Kljub temu mora nekdo smeti sprožiti sporočilo, ne da bi iz tega nastal rele. Prav na to vprašanje Emailwerk odgovori v podatkovnem modelu namesto v preverjalni rutini.

Rešitev je nespektakularna, in prav zato mi je všeč. Ni druge končne točke in ni lastne poti REST. Ista operacija GraphQL na isti končni točki se le vede drugače, glede na to, ali zahteva prispe prijavljena ali ne.

Brez prijave veljajo tri pravila. Predlogo mora skrbnik izrecno označiti kot javno, poznati njen id ne zadošča. Prejemniki vedno pridejo iz shranjene ovojnice predloge, klicatelj jih ne more niti izbrati niti prek stranskih vrat prepisati. In edino, kar klicatelj prispeva, so vrednosti obrazca in lasten naslov za odgovor, da lahko odgovorimo.

Vse drugo je glasno zavrnjeno, z napako namesto s tihim zavrženjem. Napačno nastavljen obrazec naj spodleti in naj ne dostavlja potiho nekam. Le ena podrobnost ostaja namenoma nedoločna. Manjkajoča predloga in nejavna predloga proizvedeta isto sporočilo o napaki, sicer bi mutacija postala prerokovalec za to, kateri idji predlog obstajajo.

Potrditveno sporočilo osebi, ki je pisala, teče prek povezane otroške predloge, natanko eno raven globoko. Namenoma je po načelu najboljšega truda. Če potrditev spodleti, povpraševanje kljub temu ostane sprejeto. Pokvarjena potrditvena predloga obiskovalcem ne sme sporočati, da je njihovo sporočilo izgubljeno.

Anonimna veja je omejena, na naslov IP pošiljatelja in globalno. Pri tem proračun porabijo samo sprejete pošiljke. Blokiran naslov IP torej ne more izprazniti globalne kvote in s tem zapreti vseh obrazcev. In test pribije, da je anonimno dosegljiva natanko ena operacija. Če pozneje dodam novo mutacijo, ne more neopazno postati javna, test spodleti že prej.

Prav po tej poti teče kontaktni obrazec strani netsnek.com sam. Povpraševanje gre k nam, potrditev osebi, ki je pisala. Brez žetona v vmesniku, brez storitve za obrazce vmes in kljub temu brez releja.
