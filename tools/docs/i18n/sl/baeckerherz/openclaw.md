---
title: Bot za razpored dela OpenClaw
description: Telegramski bot za načrtovanje razporedov dela pri Bäckerherz, zgrajen na odprtokodnem prehodu OpenClaw, in majhna orodja okoli njega.
path: /docs/baeckerherz/openclaw
---

# Bot za razpored dela OpenClaw

Pri [Bäckerherz](/docs/baeckerherz) se je delovni dan začel, preden vstane večina ljudi. Kdo kdaj peče, komisionira in dostavlja, je bilo treba nenehno usklajevati. Usklajevanje razporedov dela je bilo vsakodnevno operativno delo in je bilo v rokah [Momo](https://www.linkedin.com/in/momo-matsumoto-746594290/), moje partnerice. Bot za razpored dela je to delo prinesel tja, kjer je ekipa tako ali tako pisala: v Telegram.

## Kaj je OpenClaw

OpenClaw je odprtokodni prehod za osebne asistente z umetno inteligenco. Teče v lastnem gostovanju na lastni strojni opremi in poveže asistenta s sporočilniki, kot sta Telegram ali WhatsApp. Namesto lastne aplikacije z lastnimi prijavami ekipa dobi preprosto stik v sporočilniku, ki mu lahko piše.

## Bot v vsakdanu

Za Bäckerherz je na tej osnovi v Telegramu tekel bot za razpored dela. Ekipa je lahko razporede usklajevala in spraševala neposredno v klepetu, ne da bi namestila še eno aplikacijo ali se kjer koli prijavila. Za vsakodnevno usklajevanje je to pomenilo manj listkov, manj povratnih vprašanj in razpored, ki so ga vsi imeli na telefonu.

## Delovanje in tehnološki sklad

Prehod je tekel v lastnem gostovanju na enem od mojih strežnikov. Proces je bil vezan samo lokalno, navzven je govorila izključno povezava do sporočilnika. Razporedi dela in komunikacija ekipe so tako ostali na lastni infrastrukturi namesto pri še enem zunanjem ponudniku.

## Orodja okoli bota

Bot je bil del vrste majhnih orodij po istem vzorcu: preprosta, blizu vsakdana, takoj uporabna.

- Digitalni obrazci za interne postopke in boljše upravljanje informacij, kot nadomestilo za listkarjenje.
- Prodajne poti v Google My Maps, da so ture postale vidne in načrtljive.
- Prodajna poročila kot podlaga za odločitve vodstva.
- Ukaz v zaledju Django, ki prikliče vsa naročila za analize.

Nič od tega ni bilo veliko. Vse od tega se je uporabljalo vsak dan. Prav to je bila ideja.

## Kaj sem odnesel s sabo

Vzorec iz tega projekta, prinesti orodja tja, kjer ekipa tako ali tako dela, uporabljam še danes.
