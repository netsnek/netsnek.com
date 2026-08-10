---
title: QES-OIDC
description: Zakaj sem iz kvalificiranega podpisa z ID Austria zgradil prijavo in kaj ima s tem opraviti pristopna izjava.
path: /docs/security/qes-oidc
---

# QES-OIDC

Vse se je začelo s prijavo v društvo. Pri nekem društvenem projektu sem hotel, da postane član samo tisti, čigar pristopna izjava je kvalificirano podpisana in sopodpisana. Nobenega skeniranega podpisa, nobene kljukice v obrazcu. Pravi kvalificiran elektronski podpis prek ID Austria, najmočnejši digitalni dokaz identitete, kar jih v Avstriji je.

Pri gradnji me je nato nekaj presenetilo. Za to ne potrebujem ne pogodbe ne registracije kot ponudnik storitev ne dostopa do registra. Kdor se prijavi, prinese s sabo lastno ID Austria, jaz pa moram le preveriti podpis. Ime, priimek in na osebo vezana serijska številka stojijo neposredno v podpisnem potrdilu.

Zato sem ta dokaz zapakiral v to, kar vsaka aplikacija tako ali tako razume: v prijavo OpenID Connect.

## Kakšen občutek je to

Z vidika aplikacije je QES-OIDC čisto navaden ponudnik OIDC. Z vidika osebe poteka takole. Preusmerjena je, prijavi se na znanih straneh A-Trusta in podpiše kratko nemško besedilo. V njem so ime aplikacije, čas in enkratna prijavna koda, ki podpis veže natanko na to eno prijavo. Storitev preveri podpis in iz njega izda standardni žeton.

Preverjanje sem zavestno zgradil nezaupljivo. Ob vsakem dvomu spodleti, nekvalificirano ali preklicano potrdilo pa ne pride skozi.

Odločitev, za katero stojim: tihe seje ni. Vsaka prijava je sveža podpisna ceremonija. To je manj udobno kot piškotek, ampak prav v tem je bistvo. Kdor je prijavljen, je pravkar podpisal.

In storitev si ničesar ne izmišlja. Ni na primer nobenega zahtevka za e-pošto, ker potrdilo preprosto ne vsebuje e-poštnega naslova. Stabilna oznaka uporabnika se izpelje iz serijske številke v potrdilu in tako ostane enaka prek vseh prijav.

## Ceremonija registracije

In potem ceremonija, zaradi katere se je vse začelo. Kdor želi postati član, kvalificirano podpiše registracijski PDF. Upravljavec sopodpiše, dostavljeno kot pošta z obveznim podpisom prek [emailwerk](/docs/emailwerk). Odgovorna pošta vsebuje aktivacijsko povezavo in šele potrjen klik nanjo ustvari račun. Obstoječi računi se pri tem nikoli samodejno ne povežejo s podpisom, saj je navedeni e-poštni naslov v tem trenutku še nepotrjen.

## Kje teče

Storitev teče kot Cloudflare Worker na robu omrežja. Vsako kodo in vsak žeton v njej je mogoče unovčiti natanko enkrat, drugi poskus gre v prazno. Vsaka aplikacija OIDC, skladna s standardom, se lahko priklopi neposredno. Druga možnost je, da storitev visi kot zunanji ponudnik identitete za posrednikom, kot je Zitadel, in se tam prikaže kot dodatna možnost prijave poleg gesla in ključa passkey.

Nabor testov med drugim preverja proti pravim kvalificiranim podpisom, več varnostnih pregledov pa je vodilo do ciljanih utrditev.

Koda je odprta: [github.com/kleberbaum/qes-oidc](https://github.com/kleberbaum/qes-oidc).
