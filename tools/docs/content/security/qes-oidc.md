---
title: QES-OIDC
description: Qualifizierte elektronische Signaturen über ID Austria als standardkonformer OpenID-Connect-Login am Cloudflare-Edge.
path: /docs/security/qes-oidc
---

# QES-OIDC

Eine qualifizierte elektronische Signatur (QES) über ID Austria ist der stärkste digitale Identitätsnachweis, den es in Österreich gibt. QES-OIDC verpackt diesen Nachweis als gewöhnlichen OpenID-Connect-Login. Wer sich anmeldet, signiert einen kurzen, menschenlesbaren Anmeldetext im vertrauten Ablauf des Vertrauensdiensteanbieters A-Trust. Der Dienst prüft die Signatur und stellt daraus ein standardkonformes ID-Token aus.

Das Besondere daran: Es braucht keine Service-Provider-Registrierung, keinen Vertrag und keinen Registerzugriff. Die Nutzerin bringt ihre eigene ID Austria mit, der Dienst verifiziert eine Signatur. Die Identität, also Vorname, Nachname und eine personengebundene Seriennummer, stammt direkt aus dem Signaturzertifikat.

## So läuft ein Login

1. Die Anwendung leitet per OIDC-Authorization-Request weiter, Authorization Code mit PKCE.
2. Der Dienst startet eine Signatur-Zeremonie bei A-Trust. Die Nutzerin authentifiziert sich auf den Original-Seiten von A-Trust, etwa mit Telefonnummer, Passwort und zweitem Faktor.
3. Signiert wird ein kurzer deutscher Text mit Anwendungsname, Zeitpunkt und einem einmaligen Anmelde-Code. Der Code bindet jede Signatur an genau einen Login.
4. A-Trust liefert die Signatur serverseitig an eine einmal verwendbare Abhol-Adresse. Wiederholte Zustellungen laufen ins Leere.
5. Der Dienst verifiziert die Signatur und bedient danach den normalen OIDC-Ablauf mit Code, Token, Discovery, JWKS, Userinfo und RP-initiiertem Logout.

## Verifikation ohne Vertrauensvorschuss

Die Signaturprüfung schlägt bei jedem Zweifel fehl. Geprüft werden die Signatur selbst, der Hash über den exakten Anmeldetext und das Zeitfenster der Signatur. Die Zertifikatskette wird gegen einen fest verankerten Satz von A-Trust-Zertifikaten validiert. Das Zertifikat muss als qualifiziert ausgewiesen sein, nicht qualifizierte Zertifikate werden abgelehnt. Der Sperrstatus wird live per OCSP beim Aussteller abgefragt. Ein widerrufenes Zertifikat fällt immer durch.

## Ein stabiles Subject ohne erfundene Daten

Das OIDC-Subject wird als Hash über die personengebundene Seriennummer aus dem Zertifikat abgeleitet und bleibt damit über Logins hinweg stabil. Der Dienst erfindet keine Daten. Es gibt insbesondere keinen E-Mail-Claim, weil das Zertifikat keine E-Mail-Adresse enthält. Anwendungen, die eigene Verknüpfungsregeln brauchen, bekommen die rohen Seriennummern als eigene Claims. Weil der Aussteller die Stabilität der Seriennummer nicht vertraglich garantiert, sollten Anwendungen zusätzlich einen Weg zum erneuten Verknüpfen eines Kontos anbieten.

## Betrieb am Edge

Der Dienst läuft als Cloudflare Worker. Zeremonien, Auth-Requests, Codes und Tokens leben in einem Durable-Object-Speicher mit atomarer Einmal-Entnahme. Jeder Schlüssel kann genau einmal eingelöst werden, das verhindert Replays auf Speicherebene. Es gibt bewusst keine persistente SSO-Session. Jede Anmeldung ist eine frische Signatur-Zeremonie, einen stillen Re-Login gibt es nicht.

## Föderation

Jede standardkonforme OIDC-Anwendung kann den Dienst direkt über Discovery anbinden. Alternativ hängt er als externer Identity Provider hinter einem Broker wie Zitadel. Dort erscheint die qualifizierte Signatur dann als weitere Login-Möglichkeit neben Passwort und Passkey.

## Signaturbestätigte Registrierung

Auf dem Login-Baustein setzt eine optionale Registrierungs-Zeremonie auf. Die Kandidatin signiert ein serverseitig erzeugtes Registrierungs-PDF qualifiziert. Der Betreiber zeichnet gegen, zugestellt als signaturpflichtige Mail über [emailwerk](/docs/emailwerk). Die Antwortmail enthält einen Aktivierungslink mit einem vom Dienst signierten Berechtigungs-JWT. Erst der bestätigte Klick auf diesen Link provisioniert das Konto, idempotent und mit engem Zeitfenster. Bestehende Konten werden dabei bewusst nie automatisch mit einer Signatur verknüpft, weil die angegebene E-Mail-Adresse unbestätigt ist. Entwickelt wurde dieser Ablauf für ein Vereinsprojekt, bei dem nur beitreten kann, wessen Beitrittserklärung qualifiziert signiert und gegengezeichnet ist.

## Qualität

Der Dienst wird durch eine umfangreiche automatisierte Testsuite abgesichert, darunter Prüfungen gegen echte qualifizierte Signaturen und Live-Statusabfragen beim Aussteller. Mehrere Sicherheits-Reviews führten zu gezielten Härtungen, etwa gegen PKCE-Downgrade, gegen Logout-CSRF und für die Frische von OCSP-Antworten.
