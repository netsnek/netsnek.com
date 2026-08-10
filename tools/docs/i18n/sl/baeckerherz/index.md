---
title: Bäckerherz
description: Kako sva [Momo](https://www.linkedin.com/in/momo-matsumoto-746594290/) in jaz dostavno službo za pekovske izdelke Bäckerherz podpirala na strani programske opreme in prodaje ter kaj sva se pri tem naučila o obratih z dnevno proizvodnjo.
path: /docs/baeckerherz
---

# Bäckerherz

Bäckerherz je dostavna služba s preprosto in lepo idejo: sveži pekovski izdelki od regionalnega peka, zgodaj zjutraj dostavljeni naravnost pred domača vrata, v Beljaku in okolici. Momo, moja partnerica, in jaz sva pomagala pri vzpostavitvi. Ta stran pripoveduje, na čem sva delala in kaj sva se pri tem naučila o obratih z dnevno proizvodnjo in dostavo.

## Kaj počne Bäckerherz

Kdor naroči pri Bäckerherz, dobi svoje pecivo pred zajtrkom pred vrata. Naroča se prek spleta, veliko strank ima ponavljajoča se naročila. Za tem stoji vsako noč pravo delo: peči, komisionirati, dostaviti, vse preden se mesto zbudi.

Tehnično sta pod tem stala lasten zaledni sistem z vmesnikom GraphQL API in portal za stranke. Ponavljajoča se naročila so se sinhronizirala z dostavnim sistemom ERP za živilske obrate, prodaja je delala s sistemom CRM, obvestila pa so samodejno odhajala po e-pošti in prek sporočilnika.

## Kako sva pomagala

Jaz sem pomagal na strani programske opreme: avtomatizacija, orodja za priklic in analizo naročil v zaledju ter mali pomočniki za vsakdan. Najbolj viden kos tega je bil [bot za razpored dela OpenClaw](/docs/baeckerherz/openclaw) v Telegramu, poleg tega so prišli digitalni obrazci in druga majhna orodja po istem vzorcu.

Momo je delala v operativnem srcu obrata, od prodaje prek poročil za odločitve vodstva do usklajevanja razporedov dela. Veliko njenih idej za izboljšave je pristalo neposredno v vsak dan uporabljanih sistemih.

Poglavje, na katero sva oba ponosna: Momo in jaz sva sooblikovala in izšolala prodajno ekipo. Prodaja po telefonu je trd posel. V enem dopoldnevu slišiš več nejev kot v običajnem mesecu, pa vendar mora naslednji klic zveneti prijazno. Kaj sva se pri tem naučila o motivaciji: ne pride iz parol o vztrajanju, ampak iz vidnih številk in majhnih uspehov. Kdor pozna svojo lastno stopnjo zadetkov, v neju sliši le še vmesni korak do naslednjega ja. Dobro šolanje na koncu pomeni številke pripovedovati tako, da dajejo pogum.

## Startupi so na koncu igra s številkami

Pri PhotonQ je šlo za vektorje stanj, pri Bäckerherz za prispevke za kritje. Prav tako matematika, samo čisto druga. Za obrat sem zgradil napovedni model in mehanika za njim razloži posel bolje kot katera koli predstavitev s prosojnicami.

Logika gre takole: nove stranke pridejo prek vzorcev pred domačimi vrati. Vsak vzorec stane vložek blaga, delovni čas in telefonijo okoli tega. Samo del vzorcev postane stranka, pridobljena stranka je torej vredna večkratnik vzorca. Proti temu računa mesečni prispevek za kritje naročnine, nanj pa gloda osip strank. Kdor odpove prej, svojega lastnega pridobivanja ni nikoli zaslužil nazaj. V tem razponu morajo imeti prostor pridobivanje strank, fiksni stroški in na koncu še kaj ostanka.

Prav tu iz simpatičnega izdelka nastane računski problem. Vsak vijak je odvisen od drugih. Več vzorcev na teden dviguje stroške pridobivanja, boljša konverzija jih znižuje, manj osipa učinkuje močneje kot skoraj vse drugo. Kdor želi, se lahko sam poigra z drsniki: [napovedni model za preizkušanje](/models/delivery-prediction.html). To je mehanika, s katero sem takrat računal, prednastavljena s prosto izbranimi vzorčnimi vrednostmi.

## Kako je šlo naprej

Najino sodelovanje z Bäckerherz je medtem zaključeno. Hvaležna sva vsem, s katerimi sva v tem času smela delati. Kaj sva se naučila o programski opremi za obrate z dnevno proizvodnjo in dostavo, stoji spodaj.

## Kaj sva se naučila

**Zadovoljne stranke še niso poslovni model.** Izdelek, ki je ljudem všeč, dokazuje povpraševanje. Ali prispevek za kritje za vsako posamezno dostavo nosi pridobivanje strank, osip in fiksne stroške, je čisto svoje vprašanje, in prav to vprašanje odloča.

**Sveže blago in logistika malo odpuščata.** Programska oprema zna načrtovati, opominjati in analizirati. Žemlje ne speče in ne dostavi. Kdor načrtuje poslovni model z dnevno proizvodnjo in dostavo, naj operativno breme od prvega dne jemlje prav tako resno kot tehniko.

**Integrirati namesto graditi sam.** CRM, dostavni ERP in sporočanje so prišli kot gotove storitve, lastna koda je bila predvsem lepilo vmes. Za majhno ekipo je to prava pot. Vsak lasten razvoj, ki ga je mogoče najeti že gotovega, stane čas, ki potem manjka pri vsakodnevnem poslu.

**Orodja morajo tja, kjer ekipa tako ali tako je.** Razpored dela je tekel tam, kjer je ekipa tako ali tako vsak dan pisala: v Telegramu. Digitalni obrazci so nadomestili listke, ne da bi se moral kdo učiti nove aplikacije. Majhna orodja, ki se resnično uporabljajo, premagajo velike platforme, ki jih nihče ne odpre.

**Kdor vsak dan stoji v obratu, vidi, katera programska oprema manjka.** Najboljše zahteve niso prišle s sestankov, ampak iz vsakdanjega dela Momo med prodajo, poročili in načrtovanjem razporedov. Programsko opremo za obrat najbolje gradiš z ljudmi, ki ga nosijo.

**Izkušnje se preselijo s tabo.** Od zaključenega projekta ostanejo vzorci, orodja in občutek za to, kar obrat resnično potrebuje. Naslednjič začneva z vsem tem v prtljagi.

## Več v tem razdelku

### [Bot za razpored dela OpenClaw](/docs/baeckerherz/openclaw)

Telegramski bot za načrtovanje razporedov dela pri Bäckerherz, zgrajen na odprtokodnem prehodu OpenClaw, in majhna orodja, ki so nastala okoli njega.
