---
title: Bäckerherz
description: Wie [Momo](https://www.linkedin.com/in/momo-matsumoto-746594290/) und ich den Backwaren-Lieferdienst Bäckerherz auf der Software- und Vertriebsseite unterstützt haben und was wir dabei über Betriebe mit täglicher Produktion gelernt haben.
path: /docs/baeckerherz
---

# Bäckerherz

Bäckerherz ist ein Lieferdienst mit einer einfachen und schönen Idee: frische Backwaren vom regionalen Bäcker, frühmorgens direkt an die Haustür geliefert, in Villach und Umgebung. Momo, meine Partnerin, und ich haben beim Aufbau mitgeholfen. Diese Seite erzählt, woran wir gearbeitet haben und was wir dabei über Betriebe mit täglicher Produktion und Zustellung gelernt haben.

## Was Bäckerherz macht

Wer bei Bäckerherz bestellt, bekommt sein Gebäck vor dem Frühstück an die Tür. Bestellt wird online, viele Kundinnen und Kunden haben wiederkehrende Bestellungen. Dahinter steht jede Nacht echte Arbeit: backen, kommissionieren, ausliefern, alles bevor die Stadt aufwacht.

Technisch stand darunter ein eigenes Backend mit GraphQL-API und ein Kundenportal. Wiederkehrende Bestellungen wurden mit einem Liefer-ERP für Lebensmittelbetriebe synchronisiert, der Vertrieb arbeitete mit einem CRM, Benachrichtigungen gingen automatisch per E-Mail und Messenger hinaus.

## Wie wir geholfen haben

Ich habe auf der Software-Seite mitgeholfen: Automatisierung, Werkzeuge zum Abruf und zur Auswertung von Bestellungen im Backend und kleine Helfer für den Alltag. Das sichtbarste Stück davon war der [OpenClaw Dienstplan-Bot](/docs/baeckerherz/openclaw) in Telegram, dazu kamen digitale Formulare und andere kleine Werkzeuge nach demselben Muster.

Momo arbeitete im operativen Herz des Betriebs, vom Vertrieb über Berichte für Managemententscheidungen bis zur Koordination der Dienstpläne. Viele ihrer Verbesserungsideen landeten direkt in den täglich genutzten Systemen.

Ein Kapitel, auf das wir beide stolz sind: Momo und ich haben das Vertriebsteam mit aufgebaut und geschult. Telefonvertrieb ist ein hartes Geschäft. Man hört an einem Vormittag öfter Nein als in einem normalen Monat, und trotzdem muss der nächste Anruf freundlich klingen. Was wir dabei über Motivation gelernt haben: Sie kommt nicht aus Durchhalteparolen, sondern aus sichtbaren Zahlen und kleinen Erfolgen. Wer die eigene Trefferquote kennt, hört im Nein nur noch einen Zwischenschritt zum nächsten Ja. Gute Schulung heißt am Ende, Zahlen so zu erzählen, dass sie Mut machen.

## Startups sind am Ende ein Zahlengame

Bei PhotonQ ging es um Zustandsvektoren, bei Bäckerherz um Deckungsbeiträge. Auch Mathematik, nur eine ganz andere. Ich habe für den Betrieb ein Prognosemodell gebaut, und die Mechanik dahinter erklärt das Geschäft besser als jede Folienpräsentation.

Die Logik geht so: Neukundschaft kommt über Proben an der Haustür. Jede Probe kostet Wareneinsatz, Arbeitszeit und die Telefonie drumherum. Nur ein Teil der Proben wird zu Kundschaft, ein gewonnener Kunde ist also ein Vielfaches einer Probe wert. Dagegen rechnet der monatliche Deckungsbeitrag eines Abos, und dagegen nagt der Churn. Wer früher kündigt, hat seine eigene Akquise nie zurückverdient. In dieser Spanne müssen die Akquise, die Fixkosten und am Ende noch ein Rest Platz haben.

Genau da wird aus einem sympathischen Produkt ein Rechenproblem. Jede Stellschraube hängt an den anderen. Mehr Proben pro Woche treiben die Akquisekosten, bessere Conversion senkt sie, weniger Churn wirkt stärker als fast alles andere. Wer mag, kann mit den Reglern selbst spielen: [das Prognosemodell zum Ausprobieren](/models/delivery-prediction.html). Es ist die Mechanik, mit der ich damals gerechnet habe, vorbelegt mit frei gewählten Beispielwerten.

## Wie es weiterging

Unsere Zusammenarbeit mit Bäckerherz ist inzwischen abgeschlossen. Wir sind allen dankbar, mit denen wir in dieser Zeit arbeiten durften. Was wir über Software für Betriebe mit täglicher Produktion und Zustellung gelernt haben, steht unten.

## Was wir gelernt haben

**Zufriedene Kundschaft ist noch kein Geschäftsmodell.** Ein Produkt, das Menschen mögen, beweist Nachfrage. Ob der Deckungsbeitrag hinter jeder einzelnen Lieferung die Akquise, den Churn und die Fixkosten trägt, ist eine ganz eigene Frage, und genau diese Frage entscheidet.

**Frischware und Logistik verzeihen wenig.** Software kann planen, erinnern und auswerten. Die Semmel bäckt und liefert sie nicht. Wer ein Geschäftsmodell mit täglicher Produktion und Zustellung plant, sollte die operative Last vom ersten Tag an genauso ernst nehmen wie die Technik.

**Integrieren statt selbst bauen.** CRM, Liefer-ERP und Messaging kamen als fertige Dienste, eigener Code war vor allem der Klebstoff dazwischen. Für ein kleines Team ist das der richtige Weg. Jede Eigenentwicklung, die es fertig zu mieten gibt, kostet Zeit, die im Tagesgeschäft fehlt.

**Werkzeuge müssen dorthin, wo das Team ohnehin ist.** Der Dienstplan lief dort, wo das Team ohnehin täglich schrieb: in Telegram. Digitale Formulare ersetzten Zettel, ohne dass jemand eine neue App lernen musste. Kleine Werkzeuge, die wirklich benutzt werden, schlagen große Plattformen, die keiner öffnet.

**Wer täglich im Betrieb steht, sieht, welche Software fehlt.** Die besten Anforderungen kamen nicht aus Meetings, sondern aus Momos Tagesgeschäft zwischen Vertrieb, Berichten und Dienstplanung. Software für einen Betrieb baut man am besten mit den Menschen, die ihn tragen.

**Erfahrung zieht mit um.** Von einem abgeschlossenen Projekt bleiben die Muster, die Werkzeuge und der Blick für das, was ein Betrieb wirklich braucht. Beim nächsten Mal starten wir mit all dem im Gepäck.

## Mehr in dieser Sektion

### [OpenClaw Dienstplan-Bot](/docs/baeckerherz/openclaw)

Der Telegram-Bot für die Dienstplanung bei Bäckerherz, gebaut auf dem Open-Source-Gateway OpenClaw, und das kleine Tooling, das rund um ihn entstand.
