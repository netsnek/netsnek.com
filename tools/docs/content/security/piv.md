---
title: YubiKey PIV Restore
description: Deterministische Ableitung von YubiKey-PIV-Schlüsseln aus einer Recovery-Phrase. Ein Public Key für TON, PIV und OpenPGP.
path: /docs/security/piv
---

# YubiKey PIV Restore

Hardware-Schlüssel wie der YubiKey erzeugen ihre Schlüssel normalerweise auf der Karte. Das ist sicher, aber endgültig. Geht die Karte verloren oder kaputt, ist die Identität weg. piv-restore dreht den Ansatz um. Alle Schlüssel werden deterministisch aus einer Wallet-Recovery-Phrase abgeleitet und dann in die Karte geschrieben. Die Phrase auf Papier ist das Backup. Jede leere Karte kann wieder zur selben Identität werden.

## Ein Public Key, drei Welten

Der Kern des Ansatzes ist ein bewusst geteilter Schlüssel. Eine TON-Wallet leitet aus ihrer Recovery-Phrase einen Ed25519-Schlüssel ab. piv-restore leitet exakt denselben Schlüssel ab und schreibt ihn in den PIV-Signatur-Slot der Karte. Der OpenPGP-Export verwendet ihn unverändert als Hauptschlüssel. Wallet, Karte und PGP-Zertifikat zeigen damit denselben Public Key. Wer eine Signatur prüft, prüft immer dieselbe Identität.

Für das Entschlüsseln gilt das Gegenteil. Verschlüsselungs-Schlüssel werden aus eigenen Ableitungs-Domänen erzeugt und bleiben vom Signaturschlüssel getrennt. Auf der Karte liegt dafür ein eigener X25519-Schlüssel. Damit kann jede Person mit gewöhnlichem age offline an die Karte verschlüsseln, entschlüsseln kann nur die Karte selbst.

## Deterministischer OpenPGP-Export

Der Export erzeugt ein OpenPGP-v4-Zertifikat mit dem Wallet-Schlüssel als Hauptschlüssel und einem getrennten Unterschlüssel für Verschlüsselung. Die Erzeugungszeit des Zertifikats ist fest verdrahtet, weil der v4-Fingerprint sie mit hasht. Nur so liefert dieselbe Phrase auf jedem Rechner und bei jedem Lauf denselben Fingerprint. Der Export-Pfad verbraucht keinerlei Zufall. Zur Absicherung wurde das Ergebnis mit einer zweiten, unabhängigen OpenPGP-Implementierung kreuzvalidiert, beide liefern denselben Fingerprint.

## Unterstützte Phrasen

Das Werkzeug versteht zwei Phrasen-Dialekte, TON mit 24 Wörtern und BIP-39 mit 12 Wörtern. Beim Erzeugen neuer Phrasen werden mehrdeutige Phrasen ausgeschlossen, die in beiden Dialekten gültig wären. Ein optionales Phrasen-Passwort wird unterstützt, bei TON mit eingebauter Prüfung, bei BIP-39 als ungeprüfte Passphrase nach Standard. BIP-39-Phrasen liefern zusätzlich die zugehörigen Bitcoin- und Ethereum-Adressen auf den Standard-Pfaden, kreuzvalidiert gegen die etablierten JavaScript-Bibliotheken. Eine einzige Phrase deckt so Wallet, Karte, PGP und die gängigen Chains ab.

## Werkzeug und Oberfläche

Die Referenz ist in zwei Sprachen implementiert. Eine Rust-CLI übernimmt Ableitung, Kartenprüfung, Wiederherstellung und PGP-Export, eine Node-Implementierung dient als Referenz. Gepinnte Testvektoren halten beide Implementierungen byte-identisch. Die CLI ist bewusst streng, unbekannte Optionen und Tippfehler brechen sofort ab, weil ein Wiederherstellungs-Befehl Karten-Slots überschreibt.

Für die Phraseneingabe gibt es eine kleine Offline-GUI im Look eines Wallet-Recovery-Screens. Sie besteht aus handgeschriebenem HTML, CSS und JavaScript ohne Abhängigkeiten und ohne Build-Schritt. Die Content-Security-Policy erlaubt keinerlei Netzwerkzugriff. Die Wörter bleiben maskiert, bis sie bewusst aufgedeckt werden, und werden nach der Ableitung im Rust-Kern aus dem Speicher gelöscht. Falsche Wörter färben sich live rot, genau wie in der Wallet.

Nebenbei fällt derselbe Public Key auch als OpenSSH-Zeile ab und kann direkt in `authorized_keys` übernommen werden.

## age-plugin-piv25519

Ein verwandter, eigenständiger Baustein ist ein age-Plugin, das Dateien an den PIV-Signaturschlüssel der Karte bindet. Ed25519 kann nicht entschlüsseln, deshalb nutzt das Plugin eine andere Eigenschaft. Die Karte signiert einen festen Kontext-Text, und weil Ed25519-Signaturen deterministisch sind, ist diese Signatur ein wiederholbares Geheimnis. Daraus wird per HKDF ein symmetrischer Schlüssel abgeleitet, der den Dateischlüssel der age-Datei umschließt. Entschlüsseln erfordert die physische Karte, die PIN und je nach Policy eine Berührung.

Die Determinismus-Annahme ist tragend und wurde auf echter Hardware verifiziert. Ein eingebauter Selbsttest prüft sie auf jeder Karte nach, bevor man dem Plugin vertraut.

## Status

Das Werkzeug piv-restore ist derzeit nicht öffentlich verfügbar. Diese Seite dokumentiert den Ansatz und den Funktionsumfang.
