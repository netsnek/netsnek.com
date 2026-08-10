---
title: Kontaktformular
description: Anonymer Versand über sendTemplateMail. Wie ein Website-Kontaktformular ohne Token und ohne offenes Relay direkt an emailwerk sendet.
path: /docs/emailwerk/kontaktformular
---

# Kontaktformular ohne offenes Relay

Ein öffentliches Kontaktformular hat keinen Login. mailpress v2 löste das, indem genau eine Mutation ohne Auth-Wrapper blieb. Das funktionierte, hatte aber ein Loch: der Aufrufer durfte auch die Empfänger wählen. Damit war die Mutation für jeden, der eine Vorlagen-Id kannte, ein offenes Relay.

emailwerk stellt die Fähigkeit wieder her und schließt das Loch. Es gibt keinen zweiten Endpunkt und keine REST-Route. Dieselbe GraphQL-Operation `sendTemplateMail` auf demselben `/graphql` verhält sich unterschiedlich, je nachdem ob die Anfrage mit einem Principal ankommt oder ohne.

Genau über diesen Weg läuft auch das Kontaktformular von netsnek.com selbst. Die Anfrage geht über eine öffentliche Vorlage an das Team und eine verknüpfte Bestätigung an die Person, die geschrieben hat.

| Aufrufer | Verhalten |
|---|---|
| Principal mit `emailwerk:admin` oder `emailwerk:send` | unverändert, volle Umschlag-Kontrolle |
| gar kein Principal | der öffentliche Zweig unten |
| Principal ohne eine der Rollen | `FORBIDDEN` |

## Der Aufruf

Das Formular sendet einen normalen GraphQL-POST ohne jede Authentifizierung:

```graphql
mutation Contact {
  sendTemplateMail(
    args: {
      templateId: "ID_DER_OEFFENTLICHEN_VORLAGE"
      values: { name: "Ada Lovelace", email: "ada@example.com", message: "Hallo" }
      envelopeOverride: { replyTo: "ada@example.com" }
    }
  ) {
    id
    status
  }
}
```

Als Fetch-Aufruf im Browser:

```js
await fetch("/graphql", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: `mutation Contact {
      sendTemplateMail(args: {
        templateId: "ID_DER_OEFFENTLICHEN_VORLAGE"
        values: { name: ${JSON.stringify(name)}, email: ${JSON.stringify(email)}, message: ${JSON.stringify(message)} }
        envelopeOverride: { replyTo: ${JSON.stringify(email)} }
      }) { id status }
    }`,
  }),
});
```

## Was der anonyme Zweig erlaubt und was er ablehnt

Jede Ablehnung ist ein Fehler und nie ein stilles Verwerfen. Ein falsch konfiguriertes Formular soll laut scheitern statt leise irgendwohin zuzustellen.

| Eingabe | Anonym | Grund |
|---|---|---|
| `templateId` | erforderlich, Vorlage muss existieren und `isPublic` sein | die Id allein ist keine Autorisierung, öffentlich sendbar ist eine Vorlage nur, weil eine Adminperson das so gesetzt hat |
| `to` | abgelehnt | das ist der zentrale Unterschied zu mailpress, die Empfänger kommen immer aus dem gespeicherten Umschlag der Vorlage |
| `envelopeOverride.to` | abgelehnt | derselbe Weg durch die Hintertür |
| `envelopeOverride.replyTo` | erlaubt, genau eine gültige Adresse | die eigene Adresse des Anfragenden, der Sinn eines Kontaktformulars |
| `envelopeOverride.subject` | abgelehnt | den Betreff hat der Vorlagen-Besitzer veröffentlicht, ein fremd gesetzter Betreff ist ein Phishing-Vektor |
| `values` | nur flache Objekte mit Primitiven, maximal 16 KB serialisiert | begrenzt Speicher- und Missbrauchsfläche |
| Signatur-Felder | abgelehnt | eine qualifizierte Signatur gehört zu einem identifizierten Absender |
| `scheduledAt` | abgelehnt | anonym darf niemand Arbeit für einen beliebigen späteren Zeitpunkt einreihen |
| Vorlage mit `verifyReplyTo` oder `requiresSignature` | abgelehnt | beide Prüfungen brauchen eine verifizierte Identität, die ein anonymer Aufrufer nicht hat |
| öffentliche Vorlage ohne gespeicherte Empfänger | abgelehnt | es gäbe kein Ziel und jeder Fallback würde wieder Aufrufer-gewählte Empfänger bedeuten |

Eine fehlende Vorlage und eine Vorlage ohne `isPublic` erzeugen absichtlich dieselbe Fehlermeldung. Sonst würde die Mutation zum Existenz-Orakel für Vorlagen-Ids.

## Rate-Limit

Der anonyme Zweig ist limitiert, mit zwei gleitenden Fenstern über 10 Minuten. Die Standardwerte sind 5 Aufrufe pro Client-IP und 60 Aufrufe global, beides konfigurierbar. Nur akzeptierte Sendungen verbrauchen Budget. Eine geblockte IP kann das globale Kontingent also nicht leeren und damit alle Formulare aussperren. Eine Ablehnung liefert in den Fehler-Extensions `retryAfterSeconds` zurück, also die Wartezeit bis zum nächsten möglichen Versuch.

## Bestätigungsmail über verknüpfte Vorlagen

Nach dem Einreihen der Anfrage werden die verknüpften Kind-Vorlagen zugestellt, sofern sie selbst `isPublic` sind. So erreicht die Bestätigungsmail die Person, die das Formular ausgefüllt hat.

- Die Empfängeradresse der Bestätigung ist `envelopeOverride.replyTo`, sonst `values.email`, wenn das eine gültige Adresse ist. Fehlt beides, wird der Schritt übersprungen.
- Es wird genau eine Ebene zugestellt, ohne Rekursion.
- Die Bestätigung ist Best-Effort. Scheitert ihr Einreihen, bleibt die Anfrage trotzdem angenommen. Eine kaputte Bestätigungs-Vorlage darf den Besuchern nicht melden, ihre Nachricht sei verloren.

## Was zurückkommt

Die Antwort ist der Datensatz der eingereihten Nachricht in redigierter Form. Felder wie Empfängeradresse, Organisations-Id, Absender und Zustelldetails gehören dem Vorlagen-Besitzer und werden für anonyme Aufrufer geleert. Übrig bleiben `id`, `status`, die Zeitstempel und die übergebene `templateId`. Das Formular kann den Status damit genauso abfragen wie ein authentifizierter Aufrufer.

## Einrichtung als Vorlagen-Besitzer

1. Vorlage als Adminperson anlegen oder bearbeiten und `isPublic` setzen.
2. Sicherstellen, dass der Umschlag der Vorlage die echten Empfänger enthält. Nur von dort können sie kommen.
3. Die Bestätigungs-Kind-Vorlage ebenfalls `isPublic` setzen, wenn das Formular eine Bestätigung schicken soll.
4. `verifyReplyTo` und `requiresSignature` ausgeschaltet lassen. Beides macht eine Vorlage nicht öffentlich sendbar.
5. Das Formular auf `/graphql` zeigen lassen, mit der Mutation oben und ohne Zugangsdaten.

## Sicherheitsmodell in Kurzform

Ein einzelner Gate-Baustein entscheidet, ob eine Anfrage ohne Principal weiterlaufen darf. Er erlaubt ausschließlich einen POST auf `/graphql`, dessen einzige ausgeführte Root-Operation `sendTemplateMail` ist. Aliasse, Fragmente und mehrdeutige Operationsnamen werden aufgelöst statt geraten. Introspektion und alle Queries bleiben für anonyme Aufrufer geschlossen. Der Gate vergibt keine Rolle. Jeder andere Resolver behält seinen Auth-Guard und antwortet ohne Principal mit `UNAUTHENTICATED`. Ein Test pinnt die vollständige Liste der Root-Felder, damit keine neue Mutation unbemerkt anonym erreichbar wird.
