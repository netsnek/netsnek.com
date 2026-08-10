---
title: Kontaktformular
description: Wie das Kontaktformular von netsnek.com ohne Login direkt an Emailwerk sendet und warum das trotzdem kein offenes Relay ist.
path: /docs/emailwerk/kontaktformular
---

# Kontaktformular ohne offenes Relay

Ein öffentliches Kontaktformular hat keinen Login. Irgendwer muss trotzdem eine Mail auslösen dürfen, ohne dass daraus ein Relay wird. Genau diese Frage beantwortet Emailwerk im Datenmodell statt in einer Prüfroutine.

Die Lösung ist unspektakulär, und genau deshalb mag ich sie. Es gibt keinen zweiten Endpunkt und keine eigene REST-Route. Dieselbe GraphQL-Operation auf demselben Endpunkt verhält sich nur anders, je nachdem ob die Anfrage angemeldet ankommt oder nicht.

Ohne Anmeldung gelten drei Regeln. Die Vorlage muss von einer Adminperson ausdrücklich als öffentlich markiert worden sein, eine Id zu kennen reicht nicht. Die Empfänger kommen immer aus dem gespeicherten Umschlag der Vorlage, der Aufrufer kann sie weder wählen noch durch die Hintertür überschreiben. Und das Einzige, was der Aufrufer beisteuert, sind die Formularwerte und die eigene Reply-To-Adresse, damit wir antworten können.

Alles andere wird laut abgelehnt, mit einem Fehler statt einem stillen Verwerfen. Ein falsch konfiguriertes Formular soll scheitern und nicht leise irgendwohin zustellen. Nur ein Detail bleibt absichtlich vage. Eine fehlende Vorlage und eine nicht öffentliche Vorlage erzeugen dieselbe Fehlermeldung, sonst würde die Mutation zum Orakel dafür, welche Vorlagen-Ids existieren.

Die Bestätigungsmail an die Person, die geschrieben hat, läuft über eine verknüpfte Kind-Vorlage, genau eine Ebene tief. Sie ist bewusst Best-Effort. Scheitert die Bestätigung, bleibt die Anfrage trotzdem angenommen. Eine kaputte Bestätigungs-Vorlage darf den Besuchern nicht melden, ihre Nachricht sei verloren.

Der anonyme Zweig ist limitiert, pro Absender-IP und global. Dabei verbrauchen nur akzeptierte Sendungen Budget. Eine geblockte IP kann das globale Kontingent also nicht leeren und damit alle Formulare aussperren. Und ein Test pinnt fest, dass genau eine Operation anonym erreichbar ist. Wenn ich später eine neue Mutation hinzufüge, kann sie nicht unbemerkt öffentlich werden, der Test schlägt vorher fehl.

Genau über diesen Weg läuft das Kontaktformular von netsnek.com selbst. Die Anfrage geht an uns, die Bestätigung an die Person, die geschrieben hat. Kein Token im Frontend, kein Formular-Dienst dazwischen und trotzdem kein Relay.
