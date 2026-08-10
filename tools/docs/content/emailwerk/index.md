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
3. **emailwerk v3** ist der Rewrite auf Pylon v3. Die Admin-Oberfläche zieht in den Dienst selbst ein. Dazu kommen eine Versandhistorie, eine echte Queue und austauschbare Auth- und Provider-Schnittstellen. Bekannte Fehler aus v2 sind behoben, darunter der unsichere JavaScript-Transformer auf `eval()`-Basis und ein Fehler, der Zugangsdaten offenlegen konnte.

## Funktionen

- **Vorlagen mit typisierten Variablen.** Liquid als Standard oder Twig für volle Kompatibilität mit mailpress-v2-Vorlagen. Auch Betreff, Empfänger und Reply-To sind Vorlagen-Strings. Details unter [Vorlagen](/docs/emailwerk/templates).
- **Vorlagen-Verkettung.** Ein Versand kann Folge-Mails auslösen, etwa eine Anfrage an das Team plus eine Bestätigung an die Kundin. Ein Zyklus-Schutz verhindert Endlosschleifen.
- **Multi-Provider-Versand.** Eine `EmailBackend`-Schnittstelle, sechs Transporte: SMTP, Gmail, ein integrierter MTA, Haraka eingebettet oder als Inject-Endpunkt und Resend. Absender-Zugangsdaten werden vor dem Speichern live verifiziert.
- **Öffentliche Kontaktformulare ohne offenes Relay.** Eine als `isPublic` markierte Vorlage darf anonym versendet werden. Die Empfänger bestimmt dabei immer die Vorlage, nie der Aufrufer. Details unter [Kontaktformular](/docs/emailwerk/kontaktformular).
- **Versandhistorie.** Jede Nachricht bekommt einen Statusdatensatz (`QUEUED`, `SENDING`, `SENT` oder `FAILED`) mit Provider-Message-Id, Fehlertext und Versuchszähler.
- **Queue, Retry und Zeitplanung.** pg-boss läuft in derselben Postgres-Datenbank. Transaktionales Einreihen, exponentieller Backoff und geplante Sendezeitpunkte, ohne Redis.
- **Verschlüsselte Zugangsdaten.** SMTP-Passwörter und API-Keys liegen AES-256-GCM-verschlüsselt in einem eigenen Datenmodell, das über GraphQL strukturell nicht erreichbar ist.
- **Austauschbare Authentifizierung.** Ein schmaler `AuthAdapter` mit den Rollen `emailwerk:admin` und `emailwerk:send`. HTTP Basic und ein offener Dev-Modus sind enthalten, eigene Adapter sind eine Datei.
- **Qualifizierte Signaturen.** Ein Versand kann angehalten werden, bis eine qualifizierte elektronische Signatur über ID Austria vorliegt. Zusätzlich gibt es eine PGP-Signaturebene über den exakten Inhalt.
- **Zitadel-Anbindung.** emailwerk kann als HTTP-Notification-Provider einer Zitadel-Instanz dienen und deren OTP-, Passwort-Reset- und Init-Mails zustellen.

## Architektur

Ein Node-Prozess, eine Postgres-Datenbank. Pylon v3 reflektiert das GraphQL-Schema aus TypeScript, `usePages()` rendert die React-Admin-Oberfläche serverseitig und pg-boss betreibt die Versand-Queue in derselben Datenbank.

```
Browser ──► Admin-UI (SSR) ─┐
API-Client ──► /graphql ────┤
                            ▼
        Render ─► Message-Datensatz ─► Queue (pg-boss)
                            ▼
                      EmailBackend
        ┌──────┬───────┬─────┬────────┬────────┐
        │ SMTP │ Gmail │ MTA │ Haraka │ Resend │
        └──────┴───────┴─────┴────────┴────────┘
```

## Transporte

Alle Transporte implementieren dieselbe `EmailBackend`-Schnittstelle. Welcher Transport eine Nachricht zustellt, bestimmt der am Absender hinterlegte Typ.

| Transport | Beschreibung |
|---|---|
| SMTP | nodemailer über einen konfigurierten SMTP-Server. Die TLS-Zertifikatsprüfung ist standardmäßig aktiv und lässt sich nur pro Absender ausdrücklich lockern. |
| Gmail | Raw-MIME über die Gmail-REST-API. Die Anbindung läuft über einen OAuth-Connect-Flow mit automatischem Token-Refresh, die im Postfach hinterlegte Gmail-Signatur wird übernommen. |
| Integrierter MTA | emailwerk stellt selbst zu: MX-Auflösung, SMTP auf Port 25 mit opportunistischem STARTTLS und DKIM-Signierung, alles im selben Prozess. |
| Haraka eingebettet | Der Haraka-Mailserver läuft als Outbound-Engine im selben Prozess. Die Nachricht wird vor der Übergabe DKIM-signiert, Haraka übernimmt Zustellung, Warteschlange und Bounce-Behandlung. |
| Haraka-Inject | JSON-Einlieferung an einen entfernt gehosteten Haraka-Endpunkt. Ohne konfigurierten Endpunkt fällt dieser Weg automatisch auf den integrierten MTA zurück. |
| Resend | Die HTTP-API von Resend, ohne eigene Mail-Infrastruktur nutzbar. Dient als Standard und als Fallback. |

## emailwerk im Einsatz

emailwerk wird von Netsnek e.U. entwickelt und betrieben. Der Dienst läuft als ein einzelner Node-Prozess mit einer Postgres-Datenbank und versendet unter anderem die Mails hinter dem Kontaktformular von netsnek.com. Wer emailwerk für ein eigenes Projekt einsetzen möchte, erreicht uns über die auf [netsnek.com](https://netsnek.com) angegebenen Kontaktwege.

## Weiterlesen

- [Vorlagen](/docs/emailwerk/templates). Typisierte Variablen, Engines, Umschlag-Templating und Verkettung.
- [Kontaktformular](/docs/emailwerk/kontaktformular). Anonymer Versand über `sendTemplateMail` für Website-Formulare.
- [GraphQL-API](/docs/emailwerk/api). Überblick über Queries, Mutations und Rollen.
