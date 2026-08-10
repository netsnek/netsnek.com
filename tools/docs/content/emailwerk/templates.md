---
title: Vorlagen
description: E-Mail-Vorlagen in emailwerk. Typisierte Variablen, Liquid und Twig, Umschlag-Templating, verkettete Vorlagen und serverseitige Vorschau.
path: /docs/emailwerk/templates
---

# Vorlagen

Eine Vorlage in emailwerk besteht aus dem Inhalt (HTML als Vorlagen-Quelltext), einem Umschlag und einer Liste typisierter Variablen. Beim Versand rendert der Dienst die Vorlage serverseitig, erzeugt automatisch eine Textalternative und reiht die Nachricht in die Queue ein.

## Typisierte Variablen

Jede Variable hat eine Definition mit Name, Beschreibung, Standardwert und Typ. Zwei Flags steuern das Verhalten beim Versand.

- `isRequired` erzwingt, dass der Aufrufer einen Wert liefert.
- `isConstant` fixiert den Wert auf den Standardwert. Der Aufrufer kann ihn nicht überschreiben.

Die Werte übergibt der Aufrufer beim Versand als `values`-Objekt.

## Engines: Liquid und Twig

Jede Vorlage wählt ihre Engine selbst.

- **Liquid** ist der Standard für neue Vorlagen.
- **Twig** ist die Kompatibilitäts-Engine. Vorlagen aus mailpress v2 rendern damit unverändert.

Die beiden Sprachen sind sich ähnlich, aber nicht austauschbar. Ein typisches Beispiel ist der Datumsfilter aus Twig, den Liquid nicht kennt:

```twig
{{ "now"|date('d/m/Y') }}
```

Eine migrierte Twig-Vorlage muss deshalb mit `engine: TWIG` gespeichert bleiben.

## Der Umschlag ist auch eine Vorlage

Betreff, Empfänger und Reply-To sind selbst Vorlagen-Strings und werden mit denselben Variablen gerendert:

```liquid
subject: "Bestellung {{ order_id }} bestätigt"
```

Damit entfallen die meisten Fälle, in denen mailpress v2 noch ein JavaScript-Transformer-Snippet brauchte. Den unsicheren `eval()`-Transformer aus v2 gibt es in emailwerk nicht mehr.

## Verkettete Vorlagen

Vorlagen können über eine Eltern-Kind-Beziehung verknüpft werden. Nach dem Versand der Eltern-Vorlage werden die Kind-Vorlagen als eigene Queue-Jobs eingereiht. Jedes Kind schreibt seinen eigenen Eintrag in die Versandhistorie. Ein fehlschlagendes Kind bricht den Eltern-Versand nicht ab.

Der klassische Anwendungsfall ist ein Kontaktformular. Die Anfrage geht an das Team und eine verknüpfte Bestätigungs-Vorlage geht an die Person, die das Formular ausgefüllt hat. Ein Zyklus-Schutz verhindert, dass sich verkettete Vorlagen gegenseitig endlos auslösen. In mailpress v2 konnte genau das den Prozess aufhängen.

## verifyReplyTo

Eine Vorlage kann `verifyReplyTo` setzen. Dann schlägt der Versand fehl, wenn die verifizierte E-Mail-Adresse des angemeldeten Aufrufers nicht mit der Reply-To-Adresse des Umschlags übereinstimmt. Das verhindert, dass jemand im Namen einer fremden Adresse antwortbare Mails verschickt. Für den anonymen Versand ist eine solche Vorlage gesperrt, weil ein anonymer Aufrufer keine verifizierte Identität hat.

## requiresSignature

Eine Vorlage kann `requiresSignature` setzen. Jeder Versand dieser Vorlage wird dann beim Einreihen gerendert, eingefroren und im Status `AWAITING_SIGNATURE` angehalten, bis die Absenderin den Inhalt mit einer qualifizierten elektronischen Signatur über ID Austria signiert hat. Zugestellt wird erst danach, mit dem signierten PDF als Anhang. Auch diese Vorlagen sind für den anonymen Versand gesperrt, weil eine qualifizierte Signatur zu einer identifizierten Person gehört.

## Vorschau

Die Mutation `templatePreview` rendert Inhalt und Testwerte über die echte Engine auf dem Server, ohne etwas zu versenden. Die Vorschau in der Admin-Oberfläche entspricht damit dem tatsächlichen Versand und nicht nur einer clientseitigen Annäherung.
