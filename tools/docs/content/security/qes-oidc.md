---
title: QES-OIDC
description: Warum ich aus der qualifizierten Signatur mit ID Austria einen Login gebaut habe und was eine Beitrittserklärung damit zu tun hat.
path: /docs/security/qes-oidc
---

# QES-OIDC

Angefangen hat alles mit einer Vereinsanmeldung. Für ein Vereinsprojekt wollte ich, dass nur Mitglied wird, wessen Beitrittserklärung qualifiziert signiert und gegengezeichnet ist. Keine gescannte Unterschrift, kein Häkchen in einem Formular. Eine echte qualifizierte elektronische Signatur über ID Austria, der stärkste digitale Identitätsnachweis, den es in Österreich gibt.

Beim Bauen hat mich dann etwas überrascht. Ich brauche dafür keinen Vertrag, keine Service-Provider-Registrierung und keinen Registerzugriff. Wer sich anmeldet, bringt die eigene ID Austria mit, und ich muss nur eine Signatur prüfen. Vorname, Nachname und eine personengebundene Seriennummer stehen direkt im Signaturzertifikat.

Also habe ich diesen Nachweis als das verpackt, was jede Anwendung ohnehin versteht: einen OpenID-Connect-Login.

## Wie sich das anfühlt

Aus Sicht der Anwendung ist QES-OIDC ein ganz normaler OIDC-Provider. Aus Sicht der Person läuft es so. Sie wird weitergeleitet, meldet sich auf den vertrauten Seiten von A-Trust an und signiert einen kurzen deutschen Text. Darin stehen der Name der Anwendung, der Zeitpunkt und ein einmaliger Anmelde-Code, der die Signatur an genau diesen einen Login bindet. Der Dienst prüft die Signatur und stellt daraus ein Standard-Token aus.

Die Prüfung habe ich bewusst misstrauisch gebaut. Bei jedem Zweifel schlägt sie fehl, und ein nicht qualifiziertes oder gesperrtes Zertifikat kommt nicht durch.

Eine Entscheidung, zu der ich stehe: Es gibt keine stille Session. Jede Anmeldung ist eine frische Signatur-Zeremonie. Das ist unbequemer als ein Cookie, aber genau das ist der Punkt. Wer eingeloggt ist, hat gerade eben signiert.

Und der Dienst erfindet nichts. Es gibt zum Beispiel keinen E-Mail-Claim, weil das Zertifikat schlicht keine E-Mail-Adresse enthält. Das stabile Nutzerkennzeichen leitet sich aus der Seriennummer im Zertifikat ab und bleibt so über Logins hinweg gleich.

## Die Signup-Zeremonie

Und dann die Zeremonie, für die alles begann. Wer beitreten will, signiert ein Registrierungs-PDF qualifiziert. Der Betreiber zeichnet gegen, zugestellt als signaturpflichtige Mail über [emailwerk](/docs/emailwerk). Die Antwortmail enthält einen Aktivierungslink, und erst der bestätigte Klick darauf legt das Konto an. Bestehende Konten werden dabei nie automatisch mit einer Signatur verknüpft, denn die angegebene E-Mail-Adresse ist in diesem Moment noch unbestätigt.

## Wo es läuft

Der Dienst läuft als Cloudflare Worker am Edge. Jeder Code und jedes Token darin lässt sich genau einmal einlösen, ein zweiter Versuch läuft ins Leere. Jede standardkonforme OIDC-Anwendung kann direkt andocken. Alternativ hängt der Dienst als externer Identity Provider hinter einem Broker wie Zitadel und erscheint dort als weitere Login-Möglichkeit neben Passwort und Passkey.

Die Testsuite prüft unter anderem gegen echte qualifizierte Signaturen, und mehrere Sicherheits-Reviews haben zu gezielten Härtungen geführt.

Der Code ist offen: [github.com/kleberbaum/qes-oidc](https://github.com/kleberbaum/qes-oidc).
