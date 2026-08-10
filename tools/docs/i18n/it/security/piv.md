---
title: YubiKey PIV Restore
description: Come il mio YubiKey ha perso la sua definitività. Una recovery phrase su carta, una chiave pubblica per TON, PIV e OpenPGP.
path: /docs/security/piv
---

# YubiKey PIV Restore

Mi piacciono le chiavi hardware. Uno YubiKey firma senza che la chiave privata veda mai il computer. Ma un pensiero non mi ha mai lasciato. La carta genera le proprie chiavi da sé, ed è proprio questo a renderla definitiva. Se si perde o se il chip cede, l'identità è persa. Nessun backup, nessun secondo tentativo.

I wallet crypto hanno risolto questo problema anni fa. Una manciata di parole su carta, e ogni nuovo dispositivo torna a essere lo stesso wallet. Era esattamente questo che volevo per il mio YubiKey. Così ho costruito piv-restore e ho ribaltato l'approccio abituale. Le chiavi nascono in modo deterministico da una recovery phrase di wallet e vengono poi scritte sulla carta. La frase nel cassetto è il backup. Ogni carta vuota può tornare a essere la mia identità.

## Una chiave, tre mondi

L'idea che di questo progetto mi piace di più: dalla stessa frase nasce la stessa chiave Ed25519, tre volte. Come wallet TON. Come chiave di firma sulla carta. Come chiave primaria OpenPGP. Wallet, carta e certificato PGP mostrano la stessa chiave pubblica. Chi verifica da qualche parte una mia firma verifica sempre la stessa identità. Come sottoprodotto la stessa chiave esce anche come riga OpenSSH.

Solo per la decifratura volevo il contrario. Per quella ci sono chiavi proprie e separate sulla carta. Così chiunque, con il normale age, può cifrarmi file offline verso la carta, e ad aprirli riesce solo la carta stessa.

## Funziona

Strada facendo OpenPGP mi ha impartito una lezione. Il fingerprint di un certificato include nell'hash anche l'ora di creazione. Se avessi preso semplicemente l'ora corrente, la stessa frase avrebbe ottenuto a ogni esecuzione un fingerprint diverso. Perciò l'ora di creazione è cablata in modo fisso e l'export non consuma alcuna casualità. Per sicurezza ho validato il risultato in modo incrociato contro una seconda implementazione OpenPGP indipendente. Entrambe restituiscono lo stesso fingerprint.

Per l'inserimento della frase mi sono costruito una piccola interfaccia offline che sembra la schermata di recovery di un wallet. Le parole sbagliate si colorano di rosso in tempo reale, esattamente come lì. Funziona senza rete e senza passaggio di build, e le parole restano mascherate finché non le scopro deliberatamente.

## Il ramo laterale: age-plugin-piv25519

Dal progetto è nato un ramo laterale autonomo. Ed25519, di per sé, non sa decifrare. Ma le firme Ed25519 sono deterministiche. Stessa carta, stesso testo, stessa firma, ogni volta. Questa firma è quindi un segreto ripetibile che solo la carta può produrre. Il plugin sfrutta questo per legare i file age alla carta fisica. Aprirli riesce solo con carta, PIN e, a seconda dell'impostazione, un tocco.

Questa assunzione di determinismo regge l'intero plugin, perciò l'ho verificata su hardware reale. In più un autotest integrato ricontrolla ogni carta prima che si dia fiducia al plugin. Il codice è aperto: [github.com/kleberbaum/age-plugin-piv25519](https://github.com/kleberbaum/age-plugin-piv25519).

## A che punto è

piv-restore in sé non è ancora pubblico. Questa pagina racconta l'approccio. Il plugin age è invece già disponibile apertamente su GitHub.
