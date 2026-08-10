---
title: Security
description: Zwei Geschichten über digitale Identität. Ein YubiKey mit Papier-Backup und ein Login, der eine qualifizierte Signatur ist.
path: /docs/security
---

# Security

Hinter dieser Sektion stecken zwei Projekte, die mich lange beschäftigt haben. Beide kreisen um dieselbe Frage. Wie baue ich digitale Identität, die mir wirklich gehört und die etwas aushält?

Bei [YubiKey PIV Restore](/docs/security/piv) geht es um die Angst vor dem Verlust. Ein Hardware-Schlüssel ist wunderbar sicher und genau deshalb endgültig. Ich erzähle, wie ich ihm ein Backup auf Papier verpasst habe und warum am Ende ein einziger Public Key als TON-Wallet, als Kartenschlüssel und als PGP-Hauptschlüssel dient.

Bei [QES-OIDC](/docs/security/qes-oidc) geht es um den Login. Statt ein Passwort einzutippen signiert man einen kurzen Text mit ID Austria, und aus der qualifizierten Signatur wird ein ganz normaler OpenID-Connect-Login. Angefangen hat das mit einer Vereinsanmeldung, bei der nur Mitglied wird, wer wirklich unterschreibt.

Im Mail-Dienst [emailwerk](/docs/emailwerk) treffen sich die beiden. Eine Mail kann dort warten, bis eine qualifizierte Signatur vorliegt, und der Schlüssel vom YubiKey signiert den exakten Inhalt gleich mit. Die eine Signatur belegt, wer sendet. Die andere, dass unterwegs niemand etwas verändert hat.
