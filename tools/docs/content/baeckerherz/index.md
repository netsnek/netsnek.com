---
title: Bäckerherz
description: Wie Florian Kleber und seine Partnerin beim Aufbau des Backwaren-Startups Bäckerherz mitgeholfen haben, warum es am Ende nicht gereicht hat und was sie daraus über Startups gelernt haben.
path: /docs/baeckerherz
---

# Bäckerherz

Bäckerherz war ein kleines Startup mit einer einfachen und schönen Idee: frische Backwaren vom regionalen Bäcker, frühmorgens direkt an die Haustür geliefert, in Villach und Umgebung. Meine Partnerin und ich haben beim Aufbau mitgeholfen. Am Ende hat es leider doch nicht geklappt. Diese Seite erzählt die Geschichte und hält fest, was wir daraus über Startups gelernt haben.

## Was Bäckerherz war

Wer bei Bäckerherz bestellte, bekam sein Gebäck vor dem Frühstück an die Tür. Bestellt wurde online, viele Kundinnen und Kunden hatten wiederkehrende Bestellungen. Dahinter stand jede Nacht echte Arbeit: backen, kommissionieren, ausliefern, alles bevor die Stadt aufwacht. Der Betrieb bediente rund 400 Kundinnen und Kunden zuverlässig.

Technisch lief der Betrieb auf einem Django-Backend mit GraphQL-API und einem Kundenportal unter mein.baeckerherz.at. Wiederkehrende Bestellungen wurden mit einem Liefer-ERP für Lebensmittelbetriebe synchronisiert, der Vertrieb arbeitete mit einem CRM, Benachrichtigungen gingen automatisch per E-Mail und WhatsApp hinaus. Die Website [baeckerherz.at](https://baeckerherz.at) war beim Schreiben dieser Seite noch erreichbar.

## Wie wir geholfen haben

Ich habe auf der Software-Seite mitgeholfen: Automatisierung, Werkzeuge zum Abruf und zur Auswertung von Bestellungen im Backend und kleine Helfer für den Alltag. Das sichtbarste Stück davon war der [OpenClaw Dienstplan-Bot](/docs/baeckerherz/openclaw) in Telegram, dazu kamen digitale Formulare und andere kleine Werkzeuge nach demselben Muster.

Meine Partnerin arbeitete im operativen Herz des Betriebs, vom Vertrieb über Berichte für Managemententscheidungen bis zur Koordination der Dienstpläne. Viele ihrer Verbesserungsideen landeten direkt in den täglich genutzten Systemen.

## Wie es ausging

Trotz treuer Kundschaft und viel Einsatz hat es am Ende nicht gereicht. Bäckerherz konnte sich als Unternehmen nicht dauerhaft tragen. Das ist schade, und es tut auch ein wenig weh, weil von allen Beteiligten viel Herzblut drinsteckte. Schuld daran ist niemand. Ein junges Unternehmen mit Frischware, nächtlicher Produktion und eigener Zustellung kämpft an vielen Fronten gleichzeitig. Wir sind allen dankbar, mit denen wir in dieser Zeit arbeiten durften.

## Was wir über Startups gelernt haben

**Zufriedene Kundschaft ist noch kein Geschäftsmodell.** Rund 400 Kundinnen und Kunden, ein verlässlicher Betrieb und trotzdem kein tragfähiges Ganzes. Ein Produkt, das Menschen mögen, beweist Nachfrage. Ob die Rechnung hinter jeder einzelnen Lieferung aufgeht, ist eine eigene Frage, und genau diese Frage entscheidet.

**Frischware und Logistik verzeihen wenig.** Software kann planen, erinnern und auswerten. Die Semmel bäckt und liefert sie nicht. Wer ein Geschäftsmodell mit täglicher Produktion und Zustellung plant, sollte die operative Last vom ersten Tag an genauso ernst nehmen wie die Technik.

**Integrieren statt selbst bauen.** Bäckerherz hat CRM, Liefer-ERP und Messaging als fertige Dienste genutzt und eigenen Code vor allem als Klebstoff dazwischen geschrieben. Für ein kleines Team ist das der richtige Weg. Jede Eigenentwicklung, die es fertig zu mieten gibt, kostet Zeit, die im Tagesgeschäft fehlt.

**Werkzeuge müssen dorthin, wo das Team ohnehin ist.** Der Dienstplan lief dort, wo das Team ohnehin täglich schrieb: in Telegram. Digitale Formulare ersetzten Zettel, ohne dass jemand eine neue App lernen musste. Kleine Werkzeuge, die wirklich benutzt werden, schlagen große Plattformen, die keiner öffnet.

**Wer täglich im Betrieb steht, sieht, welche Software fehlt.** Die besten Anforderungen kamen nicht aus Meetings, sondern aus dem Tagesgeschäft meiner Partnerin zwischen Vertrieb, Berichten und Dienstplanung. Software für einen Betrieb baut man am besten mit den Menschen, die ihn tragen.

**Ein Ende ist kein Totalverlust.** Die Erfahrung bleibt, die Werkzeuge zum Teil auch. Der Versuch war es wert, und beim nächsten Mal starten wir mit all dem im Gepäck.

## Mehr in dieser Sektion

### [OpenClaw Dienstplan-Bot](/docs/baeckerherz/openclaw)

Der Telegram-Bot für die Dienstplanung bei Bäckerherz, gebaut auf dem Open-Source-Gateway OpenClaw, und das kleine Tooling, das rund um ihn entstand.
