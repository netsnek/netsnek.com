---
title: YubiKey PIV Restore
description: Kako je moj YubiKey izgubil svojo dokončnost. Obnovitvena fraza na papirju, en javni ključ za TON, PIV in OpenPGP.
path: /docs/security/piv
---

# YubiKey PIV Restore

Rad imam strojne ključe. YubiKey podpisuje, ne da bi zasebni ključ kdaj videl računalnik. Ampak ena misel me ni nikoli izpustila. Kartica svoje ključe ustvari sama, in prav to jo naredi dokončno. Če se izgubi ali če čip odpove, je identitete konec. Nobene varnostne kopije, nobenega drugega poskusa.

Kriptodenarnice so ta problem rešile že pred leti. Peščica besed na papirju, in vsaka nova naprava spet postane ista denarnica. Prav to sem hotel za svoj YubiKey. Zato sem zgradil piv-restore in obrnil običajni pristop. Ključi nastanejo deterministično iz obnovitvene fraze denarnice in se nato zapišejo na kartico. Fraza v predalu je varnostna kopija. Vsaka prazna kartica lahko spet postane moja identiteta.

## En ključ, trije svetovi

Zamisel, ki mi je pri projektu najbolj všeč: iz iste fraze nastane isti ključ Ed25519, trikrat. Kot denarnica TON. Kot podpisni ključ na kartici. Kot glavni ključ OpenPGP. Denarnica, kartica in potrdilo PGP kažejo isti javni ključ. Kdor kjer koli preverja moj podpis, vedno preverja isto identiteto. Mimogrede iz istega ključa odpade tudi vrstica za OpenSSH.

Samo pri dešifriranju sem hotel nasprotno. Za to na kartici ležijo lastni, ločeni ključi. Tako mi lahko vsakdo z običajnim age brez povezave šifrira datoteke na kartico, odpre pa jih lahko samo kartica sama.

## Deluje

Med potjo mi je OpenPGP dal lekcijo. Prstni odtis potrdila v zgoščeno vrednost vključi tudi čas nastanka. Če bi preprosto vzel trenutni čas, bi ista fraza pri vsakem zagonu dobila drug prstni odtis. Zato je čas nastanka trdo zapisan, izvoz pa ne porabi prav nobene naključnosti. Za vsak primer sem rezultat navzkrižno preveril z drugo, neodvisno izvedbo OpenPGP. Obe vrneta isti prstni odtis.

Za vnos fraze sem si zgradil majhen vmesnik brez povezave, ki izgleda kot obnovitveni zaslon denarnice. Napačne besede se sproti obarvajo rdeče, natanko tako kot tam. Deluje brez omrežja in brez koraka gradnje, besede pa ostanejo zakrite, dokler jih zavestno ne razkrijem.

## Stranska veja: age-plugin-piv25519

Iz projekta je nastala samostojna stranska veja. Ed25519 pravzaprav ne zna dešifrirati. Ampak podpisi Ed25519 so deterministični. Ista kartica, isto besedilo, isti podpis, vsakič. Ta podpis je torej ponovljiva skrivnost, ki jo lahko ustvari samo kartica. Vtičnik to izkorišča, da datoteke age poveže s fizično kartico. Odpreti jih je mogoče samo s kartico, s kodo PIN in, odvisno od nastavitve, z dotikom.

Ta predpostavka o determinizmu nosi celoten vtičnik, zato sem jo preveril na pravi strojni opremi. Poleg tega vgrajeni samotest preveri vsako kartico, preden vtičniku zaupaš. Koda je odprta: [github.com/kleberbaum/age-plugin-piv25519](https://github.com/kleberbaum/age-plugin-piv25519).

## Kje je stvar

Sam piv-restore še ni javen. Ta stran pripoveduje pristop. Vtičnik age je že odprto na voljo na GitHubu.
