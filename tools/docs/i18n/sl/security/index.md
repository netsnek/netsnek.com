---
title: Varnost
description: Dve zgodbi o digitalni identiteti. YubiKey s papirnato varnostno kopijo in prijava, ki je kvalificiran podpis.
path: /docs/security
---

# Varnost

Za tem razdelkom stojita dva projekta, ki sta me dolgo zaposlovala. Oba krožita okoli istega vprašanja. Kako zgradim digitalno identiteto, ki resnično pripada meni in ki nekaj zdrži?

Pri [YubiKey PIV Restore](/docs/security/piv) gre za strah pred izgubo. Strojni ključ je čudovito varen in prav zato dokončen. Pripovedujem, kako sem mu priskrbel varnostno kopijo na papirju in zakaj na koncu en sam javni ključ služi kot denarnica TON, kot ključ na kartici in kot glavni ključ PGP.

Pri [QES-OIDC](/docs/security/qes-oidc) gre za prijavo. Namesto vtipkavanja gesla podpišeš kratko besedilo z ID Austria, iz kvalificiranega podpisa pa nastane čisto navadna prijava OpenID Connect. Začelo se je s prijavo v društvo, pri kateri postane član samo tisti, ki resnično podpiše.

V poštni storitvi [Emailwerk](/docs/emailwerk) se oba srečata. Pošta lahko tam čaka, dokler ni na voljo kvalificiran podpis, ključ z YubiKeyja pa hkrati podpiše natančno vsebino. En podpis dokazuje, kdo pošilja. Drugi, da na poti nihče ni ničesar spremenil.
