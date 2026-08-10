---
title: Modulo di contatto
description: Come il modulo di contatto di netsnek.com invia senza login direttamente a Emailwerk e perché comunque non è un relay aperto.
path: /docs/emailwerk/kontaktformular
---

# Modulo di contatto senza relay aperto

Un modulo di contatto pubblico non ha login. Qualcuno deve comunque poter far partire una e-mail, senza che ne venga fuori un relay. È esattamente questa la domanda a cui Emailwerk risponde nel modello dati invece che in una routine di controllo.

La soluzione non è spettacolare, ed è proprio per questo che mi piace. Non c'è un secondo endpoint né una route REST dedicata. La stessa operazione GraphQL sullo stesso endpoint si comporta soltanto in modo diverso, a seconda che la richiesta arrivi autenticata oppure no.

Senza autenticazione valgono tre regole. Il template deve essere stato marcato esplicitamente come pubblico da una persona con ruolo di amministrazione, conoscere un id non basta. I destinatari vengono sempre dalla busta salvata nel template, il chiamante non può né sceglierli né sovrascriverli dalla porta di servizio. E l'unica cosa che il chiamante mette del suo sono i valori del modulo e il proprio indirizzo di Reply-To, perché possiamo rispondere.

Tutto il resto viene rifiutato ad alta voce, con un errore invece che con uno scarto silenzioso. Un modulo configurato male deve fallire e non recapitare in sordina chissà dove. Solo un dettaglio resta volutamente vago. Un template mancante e un template non pubblico producono lo stesso messaggio di errore, altrimenti la mutation diventerebbe un oracolo su quali id di template esistono.

L'e-mail di conferma alla persona che ha scritto passa da un template figlio collegato, esattamente un livello più in basso. È best effort di proposito. Se la conferma fallisce, la richiesta resta comunque accettata. Un template di conferma rotto non deve comunicare a chi visita il sito che il suo messaggio è andato perso.

Il ramo anonimo ha un limite, per IP mittente e globale. A consumare budget sono solo gli invii accettati. Un IP bloccato non può quindi svuotare il contingente globale e con esso chiudere fuori tutti i moduli. E un test fissa che in modo anonimo sia raggiungibile esattamente una operazione. Se più avanti aggiungo una nuova mutation, non può diventare pubblica senza che nessuno se ne accorga, il test fallisce prima.

È esattamente per questa strada che passa il modulo di contatto di netsnek.com stesso. La richiesta arriva a noi, la conferma alla persona che ha scritto. Nessun token nel frontend, nessun servizio per moduli in mezzo e comunque nessun relay.
