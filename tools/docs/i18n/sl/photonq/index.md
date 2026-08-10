---
title: PhotonQ
description: Kako smo z Walthergruppe Univerze na Dunaju zgradili PhotonQ, spletno platformo za fotonsko kvantno računalništvo.
path: /docs/photonq
---

# Kako smo z Walthergruppe zgradili PhotonQ

Na Fakulteti za fiziko Univerze na Dunaju računajo s svetlobo. Laboratorij Christiana Dopplerja za fotonsko kvantno računalništvo, die Walthergruppe, tam raziskuje kvantne računalnike, ki delajo s fotoni. Iz vprašanja, kako to raziskovanje iz laboratorija pride v brskalnik, je nastal PhotonQ. In iz PhotonQ je nastal eden najbolj zaznamovalnih projektov v zgodovini podjetja Netsnek e.U. Kadar tukaj pišem mi, mislim to dobesedno. PhotonQ nikoli ni bil projekt enega človeka. Takrat smo bili majhna ekipa in platforma nosi rokopis vseh, ki so bili zraven.

## Kaj je PhotonQ

PhotonQ je spletna platforma skupine. Sama sebe opisuje kot prvo avstrijsko fotonsko spletno platformo za kvantno računalništvo, njen zahtevek pa stoji naravnost na začetni strani: make quantum accessible to all.

Konkretno to pomeni: ustvariš račun, pišeš kvantna vezja v OpenQASM, jih vidiš kot shemo in jih izvedeš kot poskus. Prevaja in simulira se s Percevalom, Qiskitom in PyZX. Kot demonstracijo začetna stran predračuna quantum ripple-carry adder, majhen seštevalni stroj iz kvantnih vrat. K temu pride še štiridelna dokumentacija, od osnov kvantne informacije prek linearne optike in kvantnega računalništva na osnovi meritev do OpenQASM.

## Kaj smo zgradili

Platformo samo. photonq.org je stran Gatsby z [Jaenom](/docs/jaen), našim odprtokodnim CMS, ki ga razvijam še danes. PhotonQ je s tem postal ena od referenčnih strani za Jaen. Koda je javna, repozitorij je medtem pri 875 commitih. Jedro je nastalo leta 2023, produktivno je platforma tekla najpozneje od začetka leta 2024.

Dva kosa imam posebej rad. Prvi je igrišče. Dokumentacija je sestavljena iz MDX, in sredi besedila sedi urejevalnik QASM kot lasten gradnik. Prebereš poglavje, spremeniš vrstico kode in takoj vidiš novo vezje. Drugi je skupnostni del. Poskusi so objave s profili, zvezdicami, sledenji, virom dejavnosti in lestvico priljubljenosti čez trideset dni. Vsak poskus se začne kot zasebni osnutek. Objavi se šele, ko si pripravljen. To privzeto nastavitev imam še danes za pravilno.

Zadaj ne teče monolit. Vmesnik se prek generiranih odjemalcev GraphQL pogovarja z majhnimi storitvami, ki jim pravimo Pylon. Takrat so se še imenovale snek functions. Ena upravlja profile in objave, ena registracijo, ena izvaja kodo OpenQASM iz poskusov. Za identiteto in prijavo stavimo na namenskega ponudnika identitete. Platforma se upravlja v okolju, ki smo ga določili skupaj s skupino.

## Sodelovanje

Razdelitev vlog je bila jasna od začetka. Die Walthergruppe stoji za znanost, poglavja dokumentacije nosijo njeno navedbo avtorstva. Na začetni strani stojita Netsnek in cronit studios kot razvojna partnerja, na skupni infrastrukturi pa še danes tečejo tudi storitve podjetja cronit. Za temi imeni podjetij je na naši strani tičala ubrana majhna ekipa, in prav to skupinsko delo je platformo omogočilo.

Iz spletnega projekta je nastalo več. Netsnek medtem skrbi za infrastrukturo skupine, jaz pa na novo gradim njihovo arhitekturo identitete, tokrat s tipiziranim API GraphQL nad njo.

Projekt sta zame nosila predvsem dva človeka iz skupine: [Felix](https://www.linkedin.com/in/felix-zilk/) in [Tobias](https://www.linkedin.com/in/tobias-guggemos-0307358a/). Da smo lahko PhotonQ uresničili skupaj, sem jima še danes zelo hvaležen. Kadar fiziki in programerji sedijo za isto mizo in na koncu iz tega pride kvantni računalnik v brskalniku, je to točno tista vrsta sodelovanja, zaradi katere sem Netsnek ustanovil.

## Kaj me je PhotonQ naučil

Programska oprema se deduje. PhotonQ je bil generiran iz moje predloge Jaen. netsnek.com, stran, na kateri stoji to besedilo, je nato nastal iz kode PhotonQ. Ob prenovi avgusta 2026 sem igrišče, strani s poskusi in celo vejo teme PhotonQ spet izluščil iz agencijske strani. Lastni kodi se leta pozneje spet srečaš v novih povezavah.

In včasih je najboljša odločitev utemeljen ne. Julija 2026 sem preračunal, ali skupnostni del PhotonQ pristaja na protokol AT od Bluesky. Javni del se preslika skoraj ena na ena. Zasebni osnutki, umik objav, statistike ogledov in dolžnosti brisanja po GDPR ne pristajajo. Torej ne port, ampak kvečjemu most za sindikacijo, če bi protokol nekoč zmogel zasebne podatke.

## Dokumentacija iz projekta

Srce PhotonQ je bil vedno zahtevek, narediti kvantno računalništvo razumljivo. Dokumentacija o kvantnem računalništvu iz projekta zato živi naprej tukaj. Na podstraneh spodaj se najdejo poglavja o kvantnem računalništvu in kvantni informaciji, o linearni optiki, o kvantnem računalništvu na osnovi meritev in o OpenQASM.

Zraven sodi opozorilo, ali bolje povabilo: v teh poglavjih tiči res veliko matematike. Vektorji stanj, matrike, verjetnosti meritev. To ni nesreča, to je bistvo. Razložiti, kako kvantna fizika zares deluje, namesto da bi se le govorilo mimo, je bilo del projekta od začetka. In iskreno me je veselilo.
