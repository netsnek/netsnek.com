---
title: YubiKey PIV Restore
description: Wie mein YubiKey seine Endgültigkeit verlor. Eine Recovery-Phrase auf Papier, ein Public Key für TON, PIV und OpenPGP.
path: /docs/security/piv
---

# YubiKey PIV Restore

Ich mag Hardware-Schlüssel. Ein YubiKey signiert, ohne dass der private Schlüssel je den Rechner sieht. Aber ein Gedanke hat mich nie losgelassen. Die Karte erzeugt ihre Schlüssel selbst, und genau das macht sie endgültig. Geht sie verloren oder gibt der Chip auf, ist die Identität weg. Kein Backup, kein zweiter Versuch.

Krypto-Wallets haben dieses Problem vor Jahren gelöst. Eine Handvoll Wörter auf Papier, und jedes neue Gerät wird wieder zur selben Wallet. Genau das wollte ich für meinen YubiKey. Also habe ich piv-restore gebaut und den üblichen Ansatz umgedreht. Die Schlüssel entstehen deterministisch aus einer Wallet-Recovery-Phrase und werden dann in die Karte geschrieben. Die Phrase in der Schublade ist das Backup. Jede leere Karte kann wieder zu meiner Identität werden.

## Ein Schlüssel, drei Welten

Die Idee, die mir an dem Projekt am besten gefällt: Aus derselben Phrase entsteht derselbe Ed25519-Schlüssel, dreimal. Als TON-Wallet. Als Signaturschlüssel auf der Karte. Als OpenPGP-Hauptschlüssel. Wallet, Karte und PGP-Zertifikat zeigen denselben Public Key. Wer irgendwo eine Signatur von mir prüft, prüft immer dieselbe Identität. Nebenbei fällt derselbe Schlüssel auch als OpenSSH-Zeile ab.

Nur beim Entschlüsseln wollte ich das Gegenteil. Dafür liegen eigene, getrennte Schlüssel auf der Karte. So kann mir jede Person mit gewöhnlichem age offline Dateien an die Karte verschlüsseln, öffnen kann sie nur die Karte selbst.

## Es funktioniert

Unterwegs hat mir OpenPGP eine Lektion erteilt. Der Fingerprint eines Zertifikats hasht die Erzeugungszeit mit. Hätte ich einfach die aktuelle Uhrzeit genommen, bekäme dieselbe Phrase bei jedem Lauf einen anderen Fingerprint. Also ist die Erzeugungszeit fest verdrahtet und der Export verbraucht keinerlei Zufall. Zur Sicherheit habe ich das Ergebnis gegen eine zweite, unabhängige OpenPGP-Implementierung kreuzvalidiert. Beide liefern denselben Fingerprint.

Für die Eingabe der Phrase habe ich mir eine kleine Offline-Oberfläche gebaut, die aussieht wie der Recovery-Screen einer Wallet. Falsche Wörter färben sich live rot, genau wie dort. Sie kommt ohne Netzwerk und ohne Build-Schritt aus, und die Wörter bleiben maskiert, bis ich sie bewusst aufdecke.

## Der Nebenzweig: age-plugin-piv25519

Aus dem Projekt ist ein eigenständiger Nebenzweig entstanden. Ed25519 kann eigentlich nicht entschlüsseln. Aber Ed25519-Signaturen sind deterministisch. Dieselbe Karte, derselbe Text, dieselbe Signatur, jedes Mal. Diese Signatur ist also ein wiederholbares Geheimnis, das nur die Karte erzeugen kann. Das Plugin nutzt das, um age-Dateien an die physische Karte zu binden. Öffnen geht nur mit Karte, PIN und je nach Einstellung einer Berührung.

Diese Determinismus-Annahme trägt das ganze Plugin, deshalb habe ich sie auf echter Hardware verifiziert. Zusätzlich prüft ein eingebauter Selbsttest jede Karte nach, bevor man dem Plugin vertraut. Der Code ist offen: [github.com/kleberbaum/age-plugin-piv25519](https://github.com/kleberbaum/age-plugin-piv25519).

## Wo es steht

piv-restore selbst ist noch nicht öffentlich. Diese Seite erzählt den Ansatz. Das age-Plugin liegt bereits offen auf GitHub.
