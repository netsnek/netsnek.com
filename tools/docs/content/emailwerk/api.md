---
title: GraphQL-API
description: Überblick über die GraphQL-Oberfläche von emailwerk. Queries, Mutations, Rollen und der Lebenszyklus einer Nachricht.
path: /docs/emailwerk/api
---

# GraphQL-API

emailwerk stellt seine gesamte Funktionalität über einen einzigen GraphQL-Endpunkt unter `/graphql` bereit. Das Schema wird von Pylon v3 direkt aus den TypeScript-Typen reflektiert. Es gibt kein handgeschriebenes SDL. Auch die eingebaute Admin-Oberfläche spricht intern denselben Endpunkt.

## Rollen

Zwei Rollen schützen die API.

- `emailwerk:admin` für Verwaltung: Vorlagen, Absender, Historie und Signatur-Anfragen.
- `emailwerk:send` für den Versand.

Die einzige Ausnahme ist der anonyme Zweig von `sendTemplateMail` für öffentliche Kontaktformulare. Der ist im Detail unter [Kontaktformular](/docs/emailwerk/kontaktformular) beschrieben.

## Queries

| Query | Zweck |
|---|---|
| `templates` | Seite der Vorlagen der eigenen Organisation, mit Cursor-Pagination |
| `template(id)` | eine Vorlage |
| `senders` | die Absender der Organisation, ohne Zugangsdaten |
| `senderConnectUrl(senderId)` | die OAuth-Verbindungs-URL für einen Gmail-Absender |
| `dashboard` | Zähler für die Übersicht: Vorlagen, Absender, heute gesendet, in der Queue |
| `messages` | Seite der Versandhistorie, filterbar nach Status und Suchbegriff |
| `message(id)` | eine Nachricht samt Lebenszyklus-Ereignissen |
| `signatureRequests` | die Signatur-Anfragen der Organisation, optional nach Status gefiltert |
| `signatureRequestArtifacts(id)` | die Artefakte einer fertig signierten Anfrage, etwa das signierte PDF |

## Mutations

| Mutation | Zweck |
|---|---|
| `templateCreate` / `templateUpdate` / `templateDelete` | Vorlagen verwalten |
| `senderCreate` / `senderSetDefault` / `senderDelete` | Absender verwalten |
| `senderVerify` | Verbindungstest eines Absenders, ohne Mailversand |
| `templatePreview` | Inhalt und Testwerte serverseitig rendern, ohne Versand |
| `sendTemplateMail` | einen Vorlagen-Versand einreihen |
| `sendEmail` | Ad-hoc-Versand ohne Vorlage, Betreff und Inhalt kommen aus dem Aufruf |
| `sendForSignature` | einen Versand anhalten, bis eine qualifizierte ID-Austria-Signatur vorliegt |
| `prepareSignatureContent` | die kanonischen Inhalts-Bytes eines Signatur-Versands auflösen, damit sie vorab lokal PGP-signiert werden können |

## sendTemplateMail

Die zentrale Versand-Mutation nimmt ihre Argumente unter `args:` entgegen:

```graphql
mutation {
  sendTemplateMail(
    args: {
      templateId: "..."
      to: ["kundin@example.com"]
      values: { order_id: "1234" }
      envelopeOverride: { replyTo: "shop@example.com" }
    }
  ) {
    id
    status
  }
}
```

Wesentliche Argumente:

- `templateId` bestimmt die Vorlage.
- `to` ist optional. Ohne Angabe gelten die im Umschlag der Vorlage gespeicherten Empfänger.
- `values` liefert die Werte für die Vorlagen-Variablen.
- `envelopeOverride` überschreibt Betreff, Empfänger oder Reply-To.
- `scheduledAt` reiht den Versand für einen späteren Zeitpunkt ein.

Für anonyme Aufrufer gelten deutlich engere Regeln. Diese stehen unter [Kontaktformular](/docs/emailwerk/kontaktformular).

## Lebenszyklus einer Nachricht

Jeder Versand erzeugt zuerst einen Nachrichten-Datensatz und reiht dann einen Job in die Queue ein. Der Status durchläuft:

```
QUEUED ─► SENDING ─► SENT | FAILED
```

Fehlgeschlagene Zustellversuche werden mit exponentiellem Backoff wiederholt. Konfigurationsfehler schlagen sofort fehl statt sinnlos zu wiederholen. Die Historie hält pro Nachricht die Provider-Message-Id, den Fehlertext und die Anzahl der Versuche fest und ist über `messages` und `message` abfragbar.
