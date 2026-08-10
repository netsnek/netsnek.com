---
title: emailwerk
description: Selbst gehosteter Transaktionsmail-Dienst mit Vorlagen, Multi-Provider-Versand und eingebauter Admin-Oberfläche. Ein Container, eine Postgres-Datenbank.
path: /docs/emailwerk
---

# emailwerk

emailwerk ist ein Dienst von Netsnek e.U. für Transaktionsmails. Sie definieren E-Mail-Vorlagen mit typisierten Variablen, verbinden ein oder mehrere Absender-Postfächer und versenden über eine rollengeschützte GraphQL-API oder direkt aus der eingebauten Admin-Oberfläche. Jeder Versand landet in einer abfragbaren Historie. Wiederholungen und Zeitplanung übernimmt eine Job-Queue in Postgres.

emailwerk ist auf [Pylon](https://pylon.cronit.io) v3 gebaut. Das GraphQL-Schema wird direkt aus TypeScript reflektiert. Die Admin-Oberfläche rendert der Dienst selbst, als React-Server-Side-Rendering im selben Prozess wie die API. Es gibt kein separates Frontend-Deployment, kein zweites Repository und kein CORS.

## Herkunft

emailwerk ist die dritte Hauptversion von mailpress und wird von denselben beiden Autoren entwickelt, Florian Kleber (Netsnek e.U.) und Nico Schett (cronit).

1. **mailpress v1** (2023) entstand auf snek-functions, dem Vorgänger von Pylon. Fest kodierte HTML-Vorlagen, ein externer Mailer-Microservice und die ersten Ideen, die bis heute überlebt haben, etwa `verifyReplyTo` und verknüpfte Vorlagen.
2. **mailpress v2** (2024 bis 2025, [`getcronit/mailpress`](https://github.com/getcronit/mailpress)) war ein Rewrite auf Pylon v2 mit Prisma und Postgres, Zitadel-Mandantenfähigkeit, Twig-Vorlagen und einer separaten Gatsby-Admin-Oberfläche.
3. **emailwerk v3** ist der Rewrite auf Pylon v3. Die Admin-Oberfläche zieht in den Dienst selbst ein. Dazu kommen eine Versandhistorie, eine echte Queue und austauschbare Auth- und Provider-Schnittstellen. Alle bekannten Fehler aus v2 sind behoben.

## Funktionen

- **Vorlagen mit typisierten Variablen.** Liquid als Standard oder Twig für volle Kompatibilität mit mailpress-v2-Vorlagen. Auch Betreff, Empfänger und Reply-To sind Vorlagen-Strings. Details unter [Vorlagen](/docs/emailwerk/templates).
- **Vorlagen-Verkettung.** Ein Versand kann Folge-Mails auslösen, etwa eine Anfrage an das Team plus eine Bestätigung an die Kundin. Ein Zyklus-Schutz verhindert Endlosschleifen.
- **Multi-Provider-Versand.** Eine `EmailBackend`-Schnittstelle, fünf Transporte: SMTP, Gmail, Microsoft Graph, selbst gehostetes Haraka und Resend.
- **Öffentliche Kontaktformulare ohne offenes Relay.** Eine als `isPublic` markierte Vorlage darf anonym versendet werden. Die Empfänger bestimmt dabei immer die Vorlage, nie der Aufrufer. Details unter [Kontaktformular](/docs/emailwerk/kontaktformular).
- **Versandhistorie.** Jede Nachricht bekommt einen Statusdatensatz (`QUEUED`, `SENDING`, `SENT` oder `FAILED`) mit Provider-Message-Id, Fehlertext und Versuchszähler.
- **Queue, Retry und Zeitplanung.** pg-boss läuft in derselben Postgres-Datenbank. Transaktionales Einreihen, exponentieller Backoff und geplante Sendezeitpunkte, ohne Redis.
- **Verschlüsselte Zugangsdaten.** SMTP-Passwörter und API-Keys liegen AES-256-GCM-verschlüsselt in einem eigenen Datenmodell, das über GraphQL strukturell nicht erreichbar ist.
- **Austauschbare Authentifizierung.** Ein schmaler `AuthAdapter` mit den Rollen `emailwerk:admin` und `emailwerk:send`. HTTP Basic und ein offener Dev-Modus sind enthalten, eigene Adapter sind eine Datei.
- **Qualifizierte Signaturen.** Ein Versand kann angehalten werden, bis eine qualifizierte elektronische Signatur über ID Austria vorliegt. Zusätzlich gibt es eine PGP-Signaturebene über den exakten Inhalt.

Nicht jede Funktion ist bereits fertig portiert. Der Stand pro Transport steht in der Tabelle unten.

## Architektur

Ein Node-Prozess, eine Postgres-Datenbank. Pylon v3 reflektiert das GraphQL-Schema aus TypeScript, `usePages()` rendert die React-Admin-Oberfläche serverseitig und pg-boss betreibt die Versand-Queue in derselben Datenbank.

```
Browser ──► Admin-UI (SSR) ─┐
API-Client ──► /graphql ────┤
                            ▼
        Render ─► Message-Datensatz ─► Queue (pg-boss)
                            ▼
                      EmailBackend
        ┌──────┬───────┬─────────┬────────┬────────┐
        │ SMTP │ Gmail │ MSGraph │ Haraka │ Resend │
        └──────┴───────┴─────────┴────────┴────────┘
```

## Transporte

| Transport | Stand | Hinweis |
|---|---|---|
| SMTP | geplant für v3.0 | nodemailer, TLS-Zertifikatsprüfung standardmäßig aktiv |
| Haraka inject | portiert | JSON-Inject-Endpunkt für selbst gehostete MTAs |
| Resend | portiert | HTTP-API |
| Gmail | geplant für v3.0 | Raw-MIME über die Gmail-REST-API |
| Microsoft Graph | geplant für v3.0 | `sendMail` JSON-API |

## emailwerk im Einsatz

emailwerk wird von Netsnek e.U. entwickelt und betrieben. Der Dienst läuft als ein einzelner Node-Prozess mit einer Postgres-Datenbank und versendet unter anderem die Mails hinter dem Kontaktformular von netsnek.com. Wer emailwerk für ein eigenes Projekt einsetzen möchte, erreicht uns über die auf [netsnek.com](https://netsnek.com) angegebenen Kontaktwege.

## Weiterlesen

- [Vorlagen](/docs/emailwerk/templates). Typisierte Variablen, Engines, Umschlag-Templating und Verkettung.
- [Kontaktformular](/docs/emailwerk/kontaktformular). Anonymer Versand über `sendTemplateMail` für Website-Formulare.
- [GraphQL-API](/docs/emailwerk/api). Überblick über Queries, Mutations und Rollen.
