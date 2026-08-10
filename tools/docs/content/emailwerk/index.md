---
title: Emailwerk
description: Wie aus mailpress Emailwerk wurde. Drei Anläufe für einen eigenen Mail-Dienst, was er heute für mich versendet und welche Altlasten ich beim dritten Rewrite begraben habe.
path: /docs/emailwerk
---

# Emailwerk

Emailwerk ist mein Dienst für Transaktionsmails. Er versendet die Mails hinter dem Kontaktformular von netsnek.com, hält Sendungen an, bis eine qualifizierte Signatur vorliegt, und spricht direkt mit Gmail. Ich entwickle ihn gemeinsam mit [Nico](https://github.com/schettn) von [cronit](https://www.cronit.io) und betreibe ihn unter meiner Firma Netsnek e.U. Diese Seite erzählt, wie es dazu kam.

## Drei Anläufe

Emailwerk ist die dritte Hauptversion eines Projekts, das 2023 als mailpress begann. Dass es drei Versionen gebraucht hat, liegt auch daran, dass das Werkzeug darunter mitgewachsen ist. Nico baut [Pylon](https://pylon.cronit.io), das Framework, auf dem Emailwerk läuft. Jede große Pylon-Version hat eine neue mailpress-Version nach sich gezogen.

Die erste Version entstand auf snek-functions, dem Vorgänger von Pylon. Die HTML-Vorlagen waren fest im Code verdrahtet, den eigentlichen Versand erledigte ein externer Mailer-Microservice. Vieles daran war provisorisch, aber zwei Ideen von damals haben bis heute überlebt. Verkettete Vorlagen, bei denen ein Versand Folgemails auslöst, etwa eine Anfrage an das Team plus eine Bestätigung an die Kundin. Und verifyReplyTo, eine Prüfung, die verhindert, dass jemand antwortbare Mails im Namen einer fremden Adresse verschickt.

mailpress v2 war 2024 der erste richtige Wurf. Pylon v2, Prisma und Postgres, Mandantenfähigkeit über Zitadel, Twig als Vorlagensprache und eine separate Gatsby-Admin-Oberfläche. Diese Version lief zwei Jahre produktiv. Sie hatte aber Konstruktionsentscheidungen, die ich so nicht wieder treffen würde. Dazu gleich mehr.

2026 kam der Rewrite auf Pylon v3, und mit ihm der neue Name. Aus mailpress wurde Emailwerk, weil aus dem internen Werkzeug ein Produkt werden soll. Die Admin-Oberfläche zog in den Dienst selbst ein und wird serverseitig im selben Prozess gerendert wie die API. Dazu kamen eine Versandhistorie und eine echte Job-Queue, die in derselben Postgres-Datenbank läuft. Das Ergebnis ist ein einzelner Node-Prozess mit einer Datenbank. Kein separates Frontend-Deployment, kein zweites Repository, kein CORS, kein Redis.

## Was es heute für mich tut

Am sichtbarsten ist das Kontaktformular von netsnek.com. Wer dort schreibt, löst eine Anfrage an uns aus und bekommt über eine verknüpfte Vorlage eine Bestätigung zurück. Beides läuft ohne Login über den anonymen Zweig von Emailwerk, der trotzdem kein offenes Relay ist. Diese Geschichte hat eine [eigene Seite](/docs/emailwerk/kontaktformular).

Dann die Signaturen. Emailwerk kann einen Versand anhalten, bis der Inhalt qualifiziert elektronisch signiert ist, mit ID Austria. Die Mail wird beim Einreihen gerendert und eingefroren, dann signiere ich sie in einer Web-Zeremonie, und erst danach geht sie hinaus, mit dem signierten PDF als Anhang. Darunter liegt unser TypeScript-Rewrite von PDF-Over, dazu eine eigene PGP-Ebene über den exakten Inhalt. Wer so eine Mail bekommt, kann die Signatur auf signature.netsnek.com prüfen, im Browser und offline.

Und Gmail. Ein Absender-Postfach wird per OAuth verbunden, danach versendet Emailwerk als dieses Postfach über die Gmail-API. Die im Postfach gepflegte Signatur wandert automatisch mit, bei signierten Sendungen wird sie sogar mitsigniert. Ganz ehrlich, eine Macke hat die Anbindung noch. Die OAuth-App steht bei Google auf Teststatus, deshalb verfallen die Tokens nach rund einer Woche und ich muss die Verbindung neu bestätigen.

Beim Umstieg habe ich die sechzehn Vorlagen der alten mailpress-Instanz nach Emailwerk migriert. Damit sie unverändert rendern, hat Emailwerk neben Liquid, dem Standard für Neues, auch Twig als Kompatibilitäts-Engine behalten. Verraten hat sich die Herkunft jeder einzelnen Vorlage am Datumsfilter im Briefkopf, den Twig kennt und Liquid nicht.

## Was ich begraben habe

Der Rewrite war auch ein Begräbnis. Vier Konstruktionen aus mailpress v2 wollte ich nicht mitnehmen.

**Der anonyme Versand.** Kontaktformulare brauchen einen Weg ohne Login. In Emailwerk bestimmt dabei immer die Vorlage die Empfänger, nie der Aufrufer. Diese Trennung steht nicht in einer Prüfroutine, die jemand vergessen kann, sondern im Datenmodell.

**Der Transformer.** In v2 ließen sich Vorlagen um kleine Skriptbausteine erweitern. In Emailwerk gibt es das nicht mehr. Nicht weil ich sie besser eingezäunt hätte, sondern weil der Bedarf verschwunden ist. Betreff, Empfänger und Reply-To sind jetzt selbst Vorlagen-Strings und werden mit denselben Variablen gerendert wie der Inhalt. Bei der Migration der sechzehn Vorlagen sind die alten Bausteine deshalb bewusst liegen geblieben.

**Zugangsdaten gehören nicht ins Schema.** In Emailwerk liegen SMTP-Passwörter und API-Keys verschlüsselt in einem eigenen Datenmodell, das über die GraphQL-API strukturell gar nicht erreichbar ist. Was das Schema nicht kennt, kann kein Resolver versehentlich herausgeben.

**Verkettete Vorlagen gehören begrenzt.** Eine Kette, die sich selbst wieder anstößt, läuft im Kreis, wenn niemand sie stoppt. In Emailwerk steht ein Zyklus-Schutz davor, und die Bestätigungsmail eines Kontaktformulars geht genau eine Ebene tief.

## Was ich gelernt habe

**Gefährliche Features sandboxt man nicht, man macht sie überflüssig.** Der Transformer ist das Lehrstück. Die sichere Version davon war nicht ein besserer Zaun, sondern ein Umschlag, der selbst eine Vorlage ist. Das Feature verschwand, die Fähigkeit blieb.

**Struktur schlägt Disziplin.** Ein Auth-Guard kann vergessen werden, ein Feld kann in einer Antwort durchrutschen. Ein Datenmodell, das im Schema nicht existiert, kann niemand abfragen. Empfänger, die nur aus der Vorlage kommen können, kann kein Aufrufer umbiegen. Die verlässlichsten Sicherheitsentscheidungen in Emailwerk sind die, die niemand jedes Mal neu treffen muss.

**Weniger Teile, weniger Sorgen.** Über drei Versionen ist der Dienst nicht größer geworden, sondern kompakter. v1 brauchte einen externen Mailer, v2 eine separate Admin-Oberfläche im eigenen Repository. v3 rendert die Oberfläche im selben Prozess und legt die Queue in dieselbe Datenbank. Jedes Teil, das wegfällt, ist eines, das nicht kaputtgehen kann.

**Ein Rewrite ist kein Neuanfang.** Die guten Ideen ziehen um, verifyReplyTo und die verketteten Vorlagen stammen aus der allerersten Version. Die Daten ziehen um, für die alten Twig-Vorlagen gibt es eigens eine Kompatibilitäts-Engine. Zurück bleiben nur die Fehler, und genau dafür macht man den Rewrite.

## Mehr in dieser Sektion

### [Kontaktformular](/docs/emailwerk/kontaktformular)

Wie das Kontaktformular von netsnek.com ohne Login direkt an Emailwerk sendet und warum das trotzdem kein offenes Relay ist.
