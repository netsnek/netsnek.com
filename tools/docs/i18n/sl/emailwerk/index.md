---
title: emailwerk
description: Kako je iz mailpressa nastal emailwerk. Trije poskusi lastne poštne storitve, kaj danes pošilja zame in katero dediščino sem pri tretjem prepisu pokopal.
path: /docs/emailwerk
---

# emailwerk

emailwerk je moja storitev za transakcijsko pošto. Pošilja sporočila, ki stojijo za kontaktnim obrazcem strani netsnek.com, zadržuje pošiljke, dokler ni na voljo kvalificiran podpis, in se pogovarja neposredno z Gmailom. Razvijam ga skupaj z [Nicom](https://github.com/schettn) iz podjetja [cronit](https://www.cronit.io) in ga upravljam pod svojim podjetjem Netsnek e.U. Ta stran pripoveduje, kako je do tega prišlo.

## Trije poskusi

emailwerk je tretja glavna različica projekta, ki se je leta 2023 začel kot mailpress. Da so bile potrebne tri različice, je deloma tudi zato, ker je orodje pod njim raslo skupaj z njim. Nico gradi [Pylon](https://pylon.cronit.io), ogrodje, na katerem teče emailwerk. Vsaka velika različica Pylona je za seboj potegnila novo različico mailpressa.

Prva različica je nastala na snek-functions, predhodniku Pylona. Predloge HTML so bile trdo zapisane v kodi, dejansko pošiljanje pa je opravljala zunanja mikrostoritev za pošto. Marsikaj je bilo takrat začasno, a dve ideji iz tistega časa sta preživeli do danes. Verižene predloge, pri katerih ena pošiljka sproži nadaljnja sporočila, na primer povpraševanje ekipi in poleg tega potrditev stranki. In verifyReplyTo, preverjanje, ki prepreči, da bi kdo v imenu tujega naslova pošiljal sporočila, na katera je mogoče odgovoriti.

mailpress v2 je bil leta 2024 prvi pravi met. Pylon v2, Prisma in Postgres, večnajemniškost prek Zitadela, Twig kot jezik predlog in ločen skrbniški vmesnik v Gatsbyju. Ta različica je dve leti tekla v produkciji. Imela pa je konstrukcijske odločitve, ki jih tako ne bi sprejel še enkrat. O tem takoj več.

Leta 2026 je prišel prepis na Pylon v3 in z njim novo ime. Iz mailpressa je nastal emailwerk, ker naj bi iz internega orodja nastal izdelek. Skrbniški vmesnik se je preselil v storitev samo in se na strežniku izrisuje v istem procesu kot API. K temu sta prišli še zgodovina pošiljanja in prava čakalna vrsta opravil, ki teče v isti zbirki Postgres. Rezultat je en sam proces Node z eno podatkovno zbirko. Brez ločene postavitve vmesnika, brez drugega repozitorija, brez CORS, brez Redisa.

## Kaj danes počne zame

Najbolj viden je kontaktni obrazec strani netsnek.com. Kdor tam piše, sproži povpraševanje pri nas in prek povezane predloge dobi nazaj potrditev. Oboje teče brez prijave prek anonimne veje emailwerka, ki kljub temu ni odprt rele. Ta zgodba ima [svojo stran](/docs/emailwerk/kontaktformular).

Nato podpisi. emailwerk lahko zadrži pošiljko, dokler vsebina ni kvalificirano elektronsko podpisana, z ID Austria. Sporočilo se ob uvrstitvi v vrsto izriše in zamrzne, nato ga podpišem v spletni ceremoniji, in šele zatem odide ven, s podpisanim PDF-jem kot prilogo. Spodaj leži naš prepis PDF-Over v TypeScript, poleg tega še lastna plast PGP nad natančno vsebino. Kdor tako sporočilo prejme, lahko podpis preveri na signature.netsnek.com, v brskalniku in brez povezave.

In Gmail. Poštni predal pošiljatelja se poveže prek OAuth, nato emailwerk pošilja kot ta predal prek Gmailovega API. Podpis, ki je vzdrževan v predalu, samodejno potuje zraven, pri podpisanih pošiljkah se celo sopodpiše. Čisto odkrito, ena muha pri tej povezavi še ostaja. Aplikacija OAuth je pri Googlu v testnem stanju, zato žetoni potečejo po približno enem tednu in moram povezavo znova potrditi.

Ob prehodu sem šestnajst predlog stare instance mailpressa preselil v emailwerk. Da bi se izrisovale nespremenjeno, je emailwerk poleg Liquida, ki je standard za novo, obdržal tudi Twig kot združljivostni pogon. Izvor vsake posamezne predloge se je izdal pri datumskem filtru v glavi pisma, ki ga Twig pozna, Liquid pa ne.

## Kaj sem pokopal

Prepis je bil tudi pogreb. Štirih konstrukcij iz mailpressa v2 nisem hotel vzeti s seboj.

**Anonimno pošiljanje.** Kontaktni obrazci potrebujejo pot brez prijave. V emailwerku prejemnike pri tem vedno določa predloga, nikoli klicatelj. Ta ločnica ne stoji v preverjalni rutini, ki jo lahko kdo pozabi, ampak v podatkovnem modelu.

**Transformer.** V v2 je bilo mogoče predloge razširiti z majhnimi skriptnimi gradniki. V emailwerku tega ni več. Ne zato, ker bi jih bolje ogradil, ampak zato, ker je potreba izginila. Zadeva, prejemniki in reply-to so zdaj sami nizi predloge in se izrisujejo z istimi spremenljivkami kot vsebina. Pri selitvi šestnajstih predlog so zato stari gradniki namenoma obležali.

**Poverilnice ne sodijo v shemo.** V emailwerku ležijo gesla SMTP in ključi API šifrirani v lastnem podatkovnem modelu, ki prek API GraphQL strukturno sploh ni dosegljiv. Česar shema ne pozna, noben razreševalnik ne more pomotoma izdati.

**Verižene predloge sodijo v meje.** Veriga, ki znova zažene samo sebe, teče v krogu, če je nihče ne ustavi. V emailwerku pred njo stoji zaščita pred cikli, potrditveno sporočilo kontaktnega obrazca pa seže natanko eno raven globoko.

## Kaj sem se naučil

**Nevarnih funkcij ne zapreš v peskovnik, narediš jih odvečne.** Transformer je učni primer. Njegova varna različica ni bila boljša ograja, ampak ovojnica, ki je sama predloga. Funkcija je izginila, zmožnost je ostala.

**Struktura premaga disciplino.** Na varovalo za avtentikacijo se lahko pozabi, polje lahko zdrsne skozi v odgovor. Podatkovnega modela, ki v shemi ne obstaja, ne more nihče poizvedovati. Prejemnikov, ki lahko pridejo samo iz predloge, noben klicatelj ne more preusmeriti. Najzanesljivejše varnostne odločitve v emailwerku so tiste, ki jih ni treba nikomur sprejemati vsakič znova.

**Manj delov, manj skrbi.** Čez tri različice storitev ni postala večja, ampak bolj strnjena. v1 je potrebovala zunanjo poštno storitev, v2 ločen skrbniški vmesnik v lastnem repozitoriju. v3 izrisuje vmesnik v istem procesu in položi čakalno vrsto v isto podatkovno zbirko. Vsak del, ki odpade, je tisti, ki se ne more pokvariti.

**Prepis ni nov začetek.** Dobre ideje se preselijo, verifyReplyTo in verižene predloge izvirajo iz čisto prve različice. Podatki se preselijo, za stare predloge Twig obstaja poseben združljivostni pogon. Zadaj ostanejo samo napake, in prav zaradi tega se prepis naredi.

## Več v tem razdelku

### [Kontaktni obrazec](/docs/emailwerk/kontaktformular)

Kako kontaktni obrazec strani netsnek.com brez prijave pošilja neposredno v emailwerk in zakaj to kljub temu ni odprt rele.
