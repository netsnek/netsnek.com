---
title: QES-OIDC
description: Perché dalla firma qualificata con ID Austria ho costruito un login e che cosa c'entra una dichiarazione di adesione.
path: /docs/security/qes-oidc
---

# QES-OIDC

Tutto è cominciato con l'iscrizione a un'associazione. Per un progetto associativo volevo che diventasse socio solo chi ha la dichiarazione di adesione firmata in modo qualificato e controfirmata. Nessuna firma scansionata, nessuna spunta in un modulo. Una vera firma elettronica qualificata tramite ID Austria, la prova di identità digitale più forte che esista in Austria.

Durante la realizzazione qualcosa mi ha poi sorpreso. Per questo non mi serve nessun contratto, nessuna registrazione come service provider e nessun accesso ai registri. Chi si registra porta con sé la propria ID Austria, e io devo solo verificare una firma. Nome, cognome e un numero di serie legato alla persona stanno direttamente nel certificato di firma.

Così ho impacchettato questa prova in ciò che ogni applicazione capisce comunque: un login OpenID Connect.

## Che effetto fa

Dal punto di vista dell'applicazione QES-OIDC è un normalissimo provider OIDC. Dal punto di vista della persona funziona così. Viene reindirizzata, si autentica sulle pagine familiari di A-Trust e firma un breve testo in tedesco. Vi compaiono il nome dell'applicazione, il momento e un codice di accesso monouso che lega la firma esattamente a questo singolo login. Il servizio verifica la firma e ne emette un token standard.

La verifica l'ho costruita deliberatamente diffidente. A ogni dubbio fallisce, e un certificato non qualificato o revocato non passa.

Una decisione che difendo: non esiste una sessione silenziosa. Ogni accesso è una cerimonia di firma nuova. È più scomodo di un cookie, ma è esattamente questo il punto. Chi è loggato ha firmato proprio adesso.

E il servizio non inventa nulla. Per esempio non esiste un claim e-mail, perché il certificato semplicemente non contiene un indirizzo e-mail. L'identificativo utente stabile si deriva dal numero di serie nel certificato e resta così uguale attraverso i login.

## La cerimonia di signup

E poi la cerimonia per cui tutto è cominciato. Chi vuole aderire firma in modo qualificato un PDF di registrazione. Il gestore controfirma, con recapito come mail soggetta a obbligo di firma tramite [Emailwerk](/docs/emailwerk). La mail di risposta contiene un link di attivazione, e solo il clic confermato su di esso crea l'account. Gli account esistenti non vengono mai collegati automaticamente a una firma, perché in quel momento l'indirizzo e-mail indicato è ancora non confermato.

## Dove gira

Il servizio gira come Cloudflare Worker sull'edge. Ogni codice e ogni token al suo interno si riscattano esattamente una volta, un secondo tentativo va a vuoto. Ogni applicazione OIDC conforme allo standard può agganciarsi direttamente. In alternativa il servizio si colloca come identity provider esterno dietro a un broker come Zitadel e lì compare come ulteriore possibilità di login accanto a password e passkey.

La suite di test verifica tra l'altro contro firme qualificate reali, e diverse review di sicurezza hanno portato a irrobustimenti mirati.

Il codice è aperto: [github.com/kleberbaum/qes-oidc](https://github.com/kleberbaum/qes-oidc).
