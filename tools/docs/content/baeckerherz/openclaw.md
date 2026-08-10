---
title: OpenClaw Dienstplan-Bot
description: Der Telegram-Bot für die Dienstplanung bei Bäckerherz, gebaut auf dem Open-Source-Gateway OpenClaw, und das kleine Tooling rund um ihn.
path: /docs/baeckerherz/openclaw
---

# OpenClaw Dienstplan-Bot

Bei [Bäckerherz](/docs/baeckerherz) begann der Arbeitstag, bevor die meisten Menschen aufstehen. Wer wann bäckt, kommissioniert und ausliefert, musste laufend abgestimmt werden. Die Koordination der Dienstpläne war tägliche operative Arbeit und lag bei Momo. Der Dienstplan-Bot brachte diese Arbeit dorthin, wo das Team ohnehin schrieb: nach Telegram.

## Was OpenClaw ist

OpenClaw ist ein Open-Source-Gateway für persönliche KI-Assistenten. Es läuft self-hosted auf eigener Hardware und verbindet einen Assistenten mit Messengern wie Telegram oder WhatsApp. Statt einer eigenen App mit eigenen Logins bekommt das Team einfach einen Kontakt im Messenger, dem es schreiben kann.

## Der Bot im Alltag

Für Bäckerherz lief auf dieser Basis ein Dienstplan-Bot in Telegram. Das Team konnte Dienstpläne direkt im Chat abstimmen und nachfragen, ohne eine weitere App zu installieren oder sich irgendwo anzumelden. Für die tägliche Koordination hieß das weniger Zettel, weniger Rückfragen und ein Plan, den alle am Handy hatten.

## Betrieb und Stack

Das Gateway lief self-hosted auf einem Server von Netsnek e.U. Der Prozess war nur lokal gebunden, nach außen sprach ausschließlich die Anbindung an den Messenger. Dienstpläne und Teamkommunikation blieben damit auf eigener Infrastruktur statt bei einem weiteren Drittanbieter.

## Das Tooling rund um den Bot

Der Bot war Teil einer Reihe kleiner Werkzeuge nach demselben Muster: einfach, nah am Alltag, sofort nutzbar.

- Digitale Formulare für interne Abläufe und besseres Informationsmanagement, als Ersatz für Zettelwirtschaft.
- Vertriebsrouten in Google My Maps, damit Touren sichtbar und planbar wurden.
- Vertriebsberichte als Grundlage für Managemententscheidungen.
- Ein Kommando im Django-Backend, das alle Bestellungen für Auswertungen abruft.

Nichts davon war groß. Alles davon wurde täglich benutzt. Genau das war die Idee.

## Was daraus wurde

Bäckerherz hat es als Unternehmen am Ende leider nicht geschafft. Das OpenClaw-Gateway lief danach weiter und war im Sommer 2026 auf einem Server von Netsnek e.U. weiterhin in Betrieb.
