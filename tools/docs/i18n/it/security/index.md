---
title: Security
description: Due storie sull'identità digitale. Uno YubiKey con backup su carta e un login che è una firma qualificata.
path: /docs/security
---

# Security

Dietro questa sezione ci sono due progetti che mi hanno occupato a lungo. Entrambi ruotano attorno alla stessa domanda. Come costruisco un'identità digitale che sia davvero mia e che regga i colpi?

In [YubiKey PIV Restore](/docs/security/piv) si parla della paura della perdita. Una chiave hardware è meravigliosamente sicura e proprio per questo definitiva. Racconto come le ho dato un backup su carta e perché alla fine una sola chiave pubblica serve da wallet TON, da chiave sulla carta e da chiave primaria PGP.

In [QES-OIDC](/docs/security/qes-oidc) si parla del login. Invece di digitare una password si firma un breve testo con ID Austria, e dalla firma qualificata nasce un normalissimo login OpenID Connect. Tutto è cominciato con l'iscrizione a un'associazione, dove diventa socio solo chi firma davvero.

Nel servizio di posta [Emailwerk](/docs/emailwerk) i due si incontrano. Lì una mail può attendere finché non è presente una firma qualificata, e la chiave dello YubiKey firma contestualmente anche il contenuto esatto. Una firma attesta chi invia. L'altra, che lungo il percorso nessuno ha modificato nulla.
