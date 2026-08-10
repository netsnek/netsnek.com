---
title: PhotonQ
description: Come abbiamo costruito PhotonQ con die Walthergruppe dell'Università di Vienna, una piattaforma online per il calcolo quantistico fotonico.
path: /docs/photonq
---

# Come abbiamo costruito PhotonQ con die Walthergruppe

Alla Facoltà di Fisica dell'Università di Vienna si calcola con la luce. Il laboratorio Christian Doppler per il calcolo quantistico fotonico, die Walthergruppe, vi studia computer quantistici che lavorano con i fotoni. Dalla domanda su come questa ricerca arrivi dal laboratorio al browser è nato PhotonQ. E da PhotonQ è nato uno dei progetti più formativi nella storia di Netsnek e.U. Quando qui scrivo noi, lo intendo alla lettera. PhotonQ non è mai stato un progetto di un uomo solo. Allora eravamo un piccolo team, e la piattaforma porta la firma di tutte le persone che c'erano.

## Che cos'è PhotonQ

PhotonQ è la piattaforma online del gruppo. Si descrive da sé come la prima piattaforma austriaca online di calcolo quantistico fotonico, e la sua ambizione sta direttamente sulla home page: make quantum accessible to all.

Concretamente vuol dire: si crea un account, si scrivono circuiti quantistici in OpenQASM, li si vede come schema e li si esegue come esperimento. La traduzione e la simulazione avvengono con Perceval, Qiskit e PyZX. Come demo la home page calcola un quantum ripple-carry adder, una piccola macchina addizionatrice fatta di porte quantistiche. Si aggiunge una documentazione in quattro parti, dalle basi dell'informazione quantistica all'ottica lineare e al calcolo quantistico basato sulla misura fino a OpenQASM.

## Che cosa abbiamo costruito

La piattaforma stessa. photonq.org è un sito Gatsby con [Jaen](/docs/jaen), il nostro CMS open source che sviluppo ancora oggi. PhotonQ è diventato così uno dei siti di riferimento per Jaen. Il codice è pubblico, il repo è ormai a 875 commit. Il nucleo è nato nel 2023, in produzione la piattaforma girava al più tardi dall'inizio del 2024.

Due pezzi mi piacciono in modo particolare. Il primo è il playground. La documentazione è fatta di MDX, e in mezzo al testo sta l'editor QASM come blocco a sé. Si legge un capitolo, si cambia una riga di codice e si vede subito il nuovo circuito. Il secondo è la parte community. Gli esperimenti sono post con profili, stelle, follow, un feed delle attività e una classifica trending su trenta giorni. Ogni esperimento comincia come bozza privata. Si pubblica solo quando si è pronti. Questa impostazione predefinita la ritengo giusta ancora oggi.

Dietro non gira un monolite. Il frontend parla tramite client GraphQL generati con piccoli servizi che chiamiamo Pylon. Allora si chiamavano ancora snek functions. Uno gestisce profili e post, uno la registrazione, uno esegue il codice OpenQASM degli esperimenti. Per identità e login puntiamo su un identity provider dedicato. La piattaforma viene gestita in un ambiente che abbiamo stabilito insieme al gruppo.

## La collaborazione

La divisione dei ruoli è stata chiara fin dall'inizio. Die Walthergruppe rappresenta la scienza, i capitoli della documentazione portano la loro attribuzione. Sulla home page Netsnek e cronit studios compaiono come partner di sviluppo, e sull'infrastruttura condivisa girano ancora oggi anche servizi di cronit. Dietro questi nomi di aziende, dalla nostra parte, c'era un piccolo team ben affiatato, ed è proprio questo lavoro di squadra ad aver reso possibile la piattaforma.

Dal progetto del sito è venuto fuori di più. Nel frattempo Netsnek cura l'infrastruttura del gruppo, e io sto ricostruendo da capo la loro architettura di identità, questa volta con un'API GraphQL tipizzata sopra.

A portare il progetto, per me, sono state soprattutto due persone del gruppo: [Felix](https://www.linkedin.com/in/felix-zilk/) e [Tobias](https://www.linkedin.com/in/tobias-guggemos-0307358a/). Di aver potuto realizzare PhotonQ insieme sono grato a entrambi ancora oggi. Quando fisici e persone del software siedono allo stesso tavolo e alla fine ne esce un computer quantistico nel browser, quello è esattamente il tipo di collaborazione per cui ho fondato Netsnek.

## Che cosa PhotonQ mi ha insegnato

Il software si eredita. PhotonQ è stato generato dal mio template Jaen. netsnek.com, il sito su cui sta questo testo, è nato a sua volta dal codice di PhotonQ. Durante il relaunch nell'agosto 2026 ho tirato di nuovo fuori dal sito dell'agenzia il playground, le pagine degli esperimenti e un intero ramo del tema PhotonQ. Il proprio codice lo si reincontra anni dopo in contesti nuovi.

E a volte la decisione migliore è un no motivato. Nel luglio 2026 ho fatto i conti per capire se la parte community di PhotonQ stia bene sull'AT Protocol di Bluesky. La parte pubblica si mappa quasi uno a uno. Le bozze private, il ritiro dei post, le statistiche di visualizzazione e gli obblighi di cancellazione del GDPR non ci stanno. Quindi nessun port, ma al massimo un ponte di syndication, se un giorno il protocollo saprà gestire dati privati.

## La documentazione nata dal progetto

Il cuore di PhotonQ è sempre stato l'ambizione di rendere comprensibile il calcolo quantistico. La documentazione sul calcolo quantistico nata dal progetto continua perciò a vivere qui. Nelle sottopagine qui sotto si trovano i capitoli su calcolo quantistico e informazione quantistica, sull'ottica lineare, sul calcolo quantistico basato sulla misura e su OpenQASM.

Ci vuole anche un avvertimento, o meglio un invito: in questi capitoli c'è davvero tanta matematica. Vettori di stato, matrici, probabilità di misura. Non è un incidente, è il punto. Spiegare come funziona davvero la fisica quantistica, invece di limitarsi a parlarne, faceva parte del progetto fin dall'inizio. E mi ha sinceramente divertito.
