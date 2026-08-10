---
title: Bot dei turni OpenClaw
description: Il bot Telegram per la pianificazione dei turni da Bäckerherz, costruito sul gateway open source OpenClaw, e il piccolo tooling che gli sta attorno.
path: /docs/baeckerherz/openclaw
---

# Bot dei turni OpenClaw

Da [Bäckerherz](/docs/baeckerherz) la giornata di lavoro cominciava prima che la maggior parte delle persone si alzi. Chi inforna, prepara gli ordini e consegna, e quando, andava concordato di continuo. Il coordinamento dei piani turni era lavoro operativo quotidiano e spettava a [Momo](https://www.linkedin.com/in/momo-matsumoto-746594290/), la mia compagna. Il bot dei turni ha portato questo lavoro dove il team scriveva comunque: su Telegram.

## Che cos'è OpenClaw

OpenClaw è un gateway open source per assistenti IA personali. Gira self-hosted su hardware proprio e collega un assistente a messenger come Telegram o WhatsApp. Invece di un'app propria con login propri, il team ottiene semplicemente un contatto nel messenger a cui può scrivere.

## Il bot nel quotidiano

Per Bäckerherz su questa base girava un bot dei turni in Telegram. Il team poteva concordare i piani turni e fare domande direttamente in chat, senza installare un'altra app o registrarsi da qualche parte. Per il coordinamento quotidiano questo significava meno foglietti, meno richieste di chiarimento e un piano che tutti avevano sul telefono.

## Esercizio e stack

Il gateway girava self-hosted su uno dei miei server. Il processo era in ascolto solo in locale, verso l'esterno parlava esclusivamente il collegamento al messenger. Piani turni e comunicazione del team restavano così su infrastruttura propria invece che presso un ulteriore fornitore terzo.

## Il tooling attorno al bot

Il bot faceva parte di una serie di piccoli strumenti secondo lo stesso schema: semplici, vicini al quotidiano, utilizzabili subito.

- Moduli digitali per i processi interni e una migliore gestione delle informazioni, in sostituzione della gestione a foglietti.
- Percorsi commerciali in Google My Maps, perché i giri diventassero visibili e pianificabili.
- Report commerciali come base per le decisioni di management.
- Un comando nel backend Django che estrae tutti gli ordini per le analisi.

Niente di tutto ciò era grande. Tutto veniva usato ogni giorno. Era esattamente questa l'idea.

## Che cosa mi sono portato via

Lo schema di questo progetto, portare gli strumenti dove il team lavora comunque, lo uso ancora oggi.
