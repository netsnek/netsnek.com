---
title: emailwerk
description: Come da mailpress è nato emailwerk. Tre tentativi per un servizio di posta proprio, che cosa spedisce oggi per me e quali eredità ho sepolto nel terzo rewrite.
path: /docs/emailwerk
---

# emailwerk

emailwerk è il mio servizio per le e-mail transazionali. Spedisce le e-mail dietro al modulo di contatto di netsnek.com, trattiene gli invii finché non c'è una firma qualificata e parla direttamente con Gmail. Lo sviluppo insieme a [Nico](https://github.com/schettn) di [cronit](https://www.cronit.io) e lo gestisco sotto la mia azienda Netsnek e.U. Questa pagina racconta come ci sono arrivato.

## Tre tentativi

emailwerk è la terza versione principale di un progetto iniziato nel 2023 come mailpress. Che siano servite tre versioni dipende anche dal fatto che lo strumento sottostante è cresciuto insieme a lui. Nico costruisce [Pylon](https://pylon.cronit.io), il framework su cui gira emailwerk. Ogni versione maggiore di Pylon si è tirata dietro una nuova versione di mailpress.

La prima versione è nata su snek-functions, il predecessore di Pylon. I template HTML erano cablati nel codice, l'invio vero e proprio lo faceva un microservizio mailer esterno. Molto era provvisorio, ma due idee di allora sono sopravvissute fino a oggi. I template concatenati, in cui un invio fa scattare e-mail successive, per esempio una richiesta al team più una conferma alla cliente. E verifyReplyTo, un controllo che impedisce a qualcuno di spedire e-mail a cui si può rispondere a nome di un indirizzo altrui.

mailpress v2 nel 2024 è stato il primo colpo davvero riuscito. Pylon v2, Prisma e Postgres, multi-tenancy tramite Zitadel, Twig come linguaggio dei template e un'interfaccia di amministrazione Gatsby separata. Questa versione è rimasta in produzione due anni. Aveva però scelte di progettazione che oggi non rifarei così. Tra poco di più.

Nel 2026 è arrivato il rewrite su Pylon v3, e con lui il nuovo nome. Da mailpress è nato emailwerk, perché dallo strumento interno deve venire fuori un prodotto. L'interfaccia di amministrazione è entrata nel servizio stesso e viene renderizzata lato server nello stesso processo dell'API. Si sono aggiunte una cronologia degli invii e una vera job queue, che gira nello stesso database Postgres. Il risultato è un singolo processo Node con un database. Nessun deployment frontend separato, nessun secondo repository, niente CORS, niente Redis.

## Che cosa fa oggi per me

La cosa più visibile è il modulo di contatto di netsnek.com. Chi scrive lì fa partire una richiesta verso di noi e riceve indietro una conferma tramite un template collegato. Entrambe passano senza login dal ramo anonimo di emailwerk, che comunque non è un relay aperto. Questa storia ha una [pagina dedicata](/docs/emailwerk/kontaktformular).

Poi le firme. emailwerk può trattenere un invio finché il contenuto non è firmato elettronicamente in modo qualificato, con ID Austria. L'e-mail viene renderizzata e congelata al momento dell'accodamento, poi la firmo in una cerimonia web, e solo dopo parte, con il PDF firmato in allegato. Sotto c'è il nostro rewrite in TypeScript di PDF-Over, più un livello PGP proprio sul contenuto esatto. Chi riceve una e-mail così può verificare la firma su signature.netsnek.com, nel browser e offline.

E Gmail. Una casella mittente viene collegata via OAuth, poi emailwerk spedisce come quella casella tramite l'API di Gmail. La firma curata nella casella viaggia automaticamente con l'e-mail, negli invii firmati viene perfino firmata anche lei. Sinceramente, un difetto il collegamento ce l'ha ancora. L'app OAuth presso Google è in stato di test, perciò i token scadono dopo circa una settimana e devo riconfermare la connessione.

Nel passaggio ho migrato in emailwerk i sedici template della vecchia istanza mailpress. Perché rendessero invariati, emailwerk ha tenuto accanto a Liquid, lo standard per le cose nuove, anche Twig come motore di compatibilità. L'origine di ogni singolo template si è tradita dal filtro data nell'intestazione, che Twig conosce e Liquid no.

## Che cosa ho sepolto

Il rewrite è stato anche un funerale. Quattro costruzioni di mailpress v2 non me le volevo portare dietro.

**L'invio anonimo.** I moduli di contatto hanno bisogno di una strada senza login. In emailwerk a stabilire i destinatari è sempre il template, mai il chiamante. Questa separazione non sta in una routine di controllo che qualcuno può dimenticare, ma nel modello dati.

**Il transformer.** In v2 i template si potevano estendere con piccoli blocchi di script. In emailwerk non ci sono più. Non perché li abbia recintati meglio, ma perché il bisogno è sparito. Oggetto, destinatari e Reply-To sono ora essi stessi stringhe di template e vengono renderizzati con le stesse variabili del contenuto. Nella migrazione dei sedici template i vecchi blocchi sono perciò rimasti indietro di proposito.

**Le credenziali non appartengono allo schema.** In emailwerk le password SMTP e le API key stanno cifrate in un modello dati proprio, che tramite l'API GraphQL è strutturalmente irraggiungibile. Quello che lo schema non conosce, nessun resolver può restituirlo per sbaglio.

**I template concatenati vanno limitati.** Una catena che rimette in moto sé stessa gira in tondo, se nessuno la ferma. In emailwerk davanti c'è una protezione contro i cicli, e l'e-mail di conferma di un modulo di contatto scende esattamente di un livello.

## Che cosa ho imparato

**Le funzionalità pericolose non si mettono in sandbox, si rendono superflue.** Il transformer è la lezione esemplare. La sua versione sicura non era un recinto migliore, ma una busta che è essa stessa un template. La funzionalità è sparita, la capacità è rimasta.

**La struttura batte la disciplina.** Un auth guard si può dimenticare, un campo può sfuggire dentro una risposta. Un modello dati che nello schema non esiste, nessuno può interrogarlo. Destinatari che possono venire solo dal template, nessun chiamante può piegarli. Le decisioni di sicurezza più affidabili in emailwerk sono quelle che nessuno deve prendere di nuovo ogni volta.

**Meno pezzi, meno preoccupazioni.** Nell'arco di tre versioni il servizio non è diventato più grande, ma più compatto. v1 aveva bisogno di un mailer esterno, v2 di un'interfaccia di amministrazione separata in un repository proprio. v3 renderizza l'interfaccia nello stesso processo e mette la queue nello stesso database. Ogni pezzo che sparisce è un pezzo che non può rompersi.

**Un rewrite non è ricominciare da zero.** Le buone idee traslocano, verifyReplyTo e i template concatenati vengono dalla primissima versione. I dati traslocano, per i vecchi template Twig c'è apposta un motore di compatibilità. Restano indietro solo gli errori, ed è esattamente per questo che si fa un rewrite.

## Altro in questa sezione

### [Modulo di contatto](/docs/emailwerk/kontaktformular)

Come il modulo di contatto di netsnek.com invia senza login direttamente a emailwerk e perché comunque non è un relay aperto.
