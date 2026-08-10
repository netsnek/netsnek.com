---
title: Security
description: Sicherheitswerkzeuge von Netsnek e.U. rund um Hardware-Schlüssel und qualifizierte elektronische Signaturen.
path: /docs/security
---

# Security

Netsnek e.U. entwickelt Sicherheitswerkzeuge rund um zwei Fragen. Wie wird ein Hardware-Schlüssel wiederherstellbar, ohne dass der private Schlüssel je den Rechner verlassen muss? Und wie lässt sich eine qualifizierte elektronische Signatur in gewohnte Abläufe wie Login und E-Mail einbauen? Diese Sektion dokumentiert die Ansätze hinter beiden Antworten.

## Was diese Doku abdeckt

### [YubiKey PIV Restore](/docs/security/piv)

Ein Werkzeug, das die Schlüssel eines YubiKey deterministisch aus einer Wallet-Recovery-Phrase ableitet. Derselbe Ed25519-Public-Key dient als TON-Wallet, als PIV-Signaturschlüssel auf der Karte und als OpenPGP-Hauptschlüssel. Verlust oder Defekt der Karte bedeutet damit nicht mehr Verlust der Identität. Dazu ein age-Plugin, das verschlüsselte Dateien an die physische Karte bindet.

### [QES-OIDC](/docs/security/qes-oidc)

Eine Brücke zwischen qualifizierter elektronischer Signatur und OpenID Connect. Wer sich anmeldet, signiert einen kurzen Anmeldetext mit ID Austria. Der Dienst prüft die Signatur kryptographisch und stellt daraus einen standardkonformen OIDC-Login bereit. Darauf aufbauend gibt es eine signaturbestätigte Registrierung mit Gegenzeichnung.

## Wie beides zusammenspielt

Die beiden Bausteine ergänzen sich im Mail-Dienst [emailwerk](/docs/emailwerk). Dort kann ein Versand angehalten werden, bis eine qualifizierte elektronische Signatur über ID Austria vorliegt. Zusätzlich signiert eine PGP-Ebene den exakten Inhalt mit dem Schlüssel vom YubiKey. Die qualifizierte Signatur belegt die Identität der Absenderin, die Hardware-Signatur den unveränderten Inhalt.
