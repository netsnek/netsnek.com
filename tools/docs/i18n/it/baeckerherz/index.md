---
title: Bäckerherz
description: Come [Momo](https://www.linkedin.com/in/momo-matsumoto-746594290/) e io abbiamo supportato il servizio di consegna di prodotti da forno Bäckerherz sul lato software e commerciale e che cosa abbiamo imparato sulle attività con produzione quotidiana.
path: /docs/baeckerherz
---

# Bäckerherz

Bäckerherz è un servizio di consegna con un'idea semplice e bella: prodotti da forno freschi del panettiere della zona, consegnati di primo mattino direttamente alla porta di casa, a Villach e dintorni. Momo, la mia compagna, e io abbiamo dato una mano nella costruzione. Questa pagina racconta a che cosa abbiamo lavorato e che cosa abbiamo imparato sulle attività con produzione e consegna quotidiane.

## Che cosa fa Bäckerherz

Chi ordina da Bäckerherz riceve i suoi prodotti da forno alla porta prima della colazione. Si ordina online, molte clienti e molti clienti hanno ordini ricorrenti. Dietro c'è ogni notte lavoro vero: infornare, preparare gli ordini, consegnare, tutto prima che la città si svegli.

Tecnicamente sotto c'erano un backend proprio con API GraphQL e un portale clienti. Gli ordini ricorrenti venivano sincronizzati con un ERP di consegna per aziende alimentari, il reparto commerciale lavorava con un CRM, le notifiche uscivano automaticamente via e-mail e messenger.

## Come abbiamo aiutato

Io ho dato una mano sul lato software: automazione, strumenti per estrarre e analizzare gli ordini nel backend e piccoli aiutanti per il quotidiano. Il pezzo più visibile è stato il [bot dei turni OpenClaw](/docs/baeckerherz/openclaw) in Telegram, a cui si sono aggiunti moduli digitali e altri piccoli strumenti secondo lo stesso schema.

Momo lavorava nel cuore operativo dell'azienda, dal reparto commerciale ai report per le decisioni di management fino al coordinamento dei piani turni. Molte delle sue idee di miglioramento finivano direttamente nei sistemi usati ogni giorno.

Un capitolo di cui siamo entrambi orgogliosi: Momo e io abbiamo contribuito a costruire e formare il team commerciale. La vendita telefonica è un mestiere duro. In una sola mattinata si sente più volte no che in un mese normale, e ciononostante la chiamata successiva deve suonare cordiale. Quello che abbiamo imparato sulla motivazione: non nasce dagli slogan di incoraggiamento, ma da numeri visibili e piccoli successi. Chi conosce il proprio tasso di successo sente nel no soltanto un passaggio intermedio verso il prossimo sì. Una buona formazione significa, alla fine, raccontare i numeri in modo che diano coraggio.

## Alla fine le startup sono un gioco di numeri

Con PhotonQ si trattava di vettori di stato, con Bäckerherz di margini di contribuzione. Anche questa è matematica, solo di tutt'altro genere. Per l'azienda ho costruito un modello previsionale, e la meccanica che ci sta dietro spiega il business meglio di qualsiasi presentazione a slide.

La logica è questa: la nuova clientela arriva tramite campioni consegnati alla porta. Ogni campione costa merce, tempo di lavoro e la telefonata che ci gira intorno. Solo una parte dei campioni diventa clientela, quindi un cliente acquisito vale un multiplo di un campione. Contro questo conta il margine di contribuzione mensile di un abbonamento, e contro questo rode il churn. Chi disdice prima non ha mai ripagato la propria acquisizione. In questo margine devono trovare posto l'acquisizione, i costi fissi e, alla fine, ancora un resto.

È proprio qui che da un prodotto simpatico nasce un problema di calcolo. Ogni parametro dipende dagli altri. Più campioni a settimana fanno salire i costi di acquisizione, una conversione migliore li abbassa, meno churn agisce più forte di quasi ogni altra cosa. Chi vuole può giocare da sé con i cursori: [il modello previsionale da provare](/models/delivery-prediction.html). È la meccanica con cui allora facevo i conti, precompilata con valori di esempio scelti liberamente.

## Come è proseguita

La nostra collaborazione con Bäckerherz è ormai conclusa. Siamo grati a tutte le persone con cui abbiamo potuto lavorare in quel periodo. Quello che abbiamo imparato sul software per aziende con produzione e consegna quotidiane sta qui sotto.

## Che cosa abbiamo imparato

**Una clientela soddisfatta non è ancora un modello di business.** Un prodotto che alle persone piace dimostra che c'è domanda. Se il margine di contribuzione dietro ogni singola consegna regga l'acquisizione, il churn e i costi fissi è una domanda del tutto a sé, ed è proprio questa domanda a decidere.

**La merce fresca e la logistica perdonano poco.** Il software può pianificare, ricordare e analizzare. Il panino non lo sforna né lo consegna. Chi progetta un modello di business con produzione e consegna quotidiane dovrebbe prendere il carico operativo, fin dal primo giorno, tanto sul serio quanto la tecnica.

**Integrare invece di costruire in proprio.** CRM, ERP di consegna e messaging arrivavano come servizi pronti, il codice proprio era soprattutto la colla in mezzo. Per una squadra piccola è la strada giusta. Ogni sviluppo interno che si può noleggiare già pronto costa tempo, e quel tempo manca nell'operatività quotidiana.

**Gli strumenti devono andare dove il team è comunque già.** Il piano turni girava dove il team scriveva comunque ogni giorno: in Telegram. I moduli digitali sostituivano i foglietti senza che nessuno dovesse imparare una nuova app. Piccoli strumenti che vengono davvero usati battono grandi piattaforme che nessuno apre.

**Chi sta ogni giorno nell'azienda vede quale software manca.** I requisiti migliori non venivano dalle riunioni, ma dal lavoro quotidiano di Momo tra reparto commerciale, report e pianificazione dei turni. Il software per un'azienda si costruisce meglio insieme alle persone che la portano avanti.

**L'esperienza trasloca con noi.** Di un progetto concluso restano gli schemi, gli strumenti e l'occhio per ciò di cui un'azienda ha davvero bisogno. La prossima volta partiamo con tutto questo nel bagaglio.

## Altro in questa sezione

### [Bot dei turni OpenClaw](/docs/baeckerherz/openclaw)

Il bot Telegram per la pianificazione dei turni da Bäckerherz, costruito sul gateway open source OpenClaw, e il piccolo tooling nato attorno a lui.
