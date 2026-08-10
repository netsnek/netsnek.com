---
title: PhotonQ
description: Wie wir mit der Walthergruppe der Universität Wien PhotonQ gebaut haben, eine Online-Plattform für photonisches Quantencomputing.
path: /docs/photonq
---

# Wie wir mit der Walthergruppe PhotonQ gebaut haben

An der Fakultät für Physik der Universität Wien wird mit Licht gerechnet. Das Christian-Doppler-Labor für photonisches Quantencomputing, die Walthergruppe, erforscht dort Quantencomputer, die mit Photonen arbeiten. Aus der Frage, wie diese Forschung aus dem Labor in den Browser kommt, wurde PhotonQ. Und aus PhotonQ wurde eines der prägendsten Projekte in der Geschichte von Netsnek e.U. Wenn ich hier wir schreibe, meine ich das wörtlich. PhotonQ war nie ein Ein-Mann-Projekt. Wir waren damals ein kleines Team, und die Plattform trägt die Handschrift von allen, die dabei waren.

## Was PhotonQ ist

PhotonQ ist die Online-Plattform der Gruppe. Sie beschreibt sich selbst als Österreichs erste photonische Online-Quantencomputing-Plattform, und ihr Anspruch steht direkt auf der Startseite: make quantum accessible to all.

Konkret heißt das: Man legt ein Konto an, schreibt Quantenschaltkreise in OpenQASM, sieht sie als Schaltbild und führt sie als Experiment aus. Übersetzt und simuliert wird mit Perceval, Qiskit und PyZX. Als Demo rechnet die Startseite einen quantum ripple-carry adder vor, eine kleine Addiermaschine aus Quantengattern. Dazu kommt eine vierteilige Doku, von den Grundlagen der Quanteninformation über lineare Optik und messbasiertes Quantencomputing bis zu OpenQASM.

## Was wir gebaut haben

Die Plattform selbst. photonq.org ist eine Gatsby-Site mit [Jaen](/docs/jaen), unserem Open-Source-CMS, das ich bis heute weiterentwickle. PhotonQ wurde damit zu einer der Referenz-Sites für Jaen. Der Code ist öffentlich, das Repo steht inzwischen bei 875 Commits. Der Kern entstand 2023, produktiv lief die Plattform spätestens ab Anfang 2024.

Zwei Stücke mag ich besonders. Das erste ist der Playground. Die Doku besteht aus MDX, und mitten im Text sitzt der QASM-Editor als eigener Baustein. Man liest ein Kapitel, ändert eine Zeile Code und sieht sofort den neuen Schaltkreis. Das zweite ist der Community-Teil. Experimente sind Posts mit Profilen, Stars, Follows, einem Activity-Feed und einem Trending-Ranking über dreißig Tage. Jedes Experiment beginnt als privater Entwurf. Veröffentlicht wird erst, wenn man so weit ist. Diese Voreinstellung halte ich bis heute für richtig.

Dahinter läuft kein Monolith. Das Frontend spricht über generierte GraphQL-Clients mit kleinen Services, die wir Pylons nennen. Damals hießen sie noch snek functions. Einer verwaltet Profile und Posts, einer die Registrierung, einer führt den OpenQASM-Code der Experimente aus. Für Identität und Login setzen wir auf einen dedizierten Identity-Provider. Betrieben wird die Plattform in einer Umgebung, die wir gemeinsam mit der Gruppe festgelegt haben.

## Die Zusammenarbeit

Die Rollenverteilung war von Anfang an klar. Die Walthergruppe steht für die Wissenschaft, die Doku-Kapitel tragen ihre Attribution. Auf der Startseite stehen Netsnek und cronit studios als Entwicklungspartner, und auf der gemeinsamen Infrastruktur laufen bis heute auch Services von cronit. Hinter diesen Firmennamen steckte auf unserer Seite ein eingespieltes kleines Team, und genau diese Teamarbeit hat die Plattform möglich gemacht.

Aus dem Website-Projekt ist mehr geworden. Inzwischen betreut Netsnek die Infrastruktur der Gruppe, und ich baue ihre Identity-Architektur neu auf, diesmal mit einer typisierten GraphQL-API darüber.

Getragen haben das Projekt für mich vor allem zwei Menschen aus der Gruppe: [Felix](https://www.linkedin.com/in/felix-zilk/) und [Tobias](https://www.linkedin.com/in/tobias-guggemos-0307358a/). Dass wir PhotonQ gemeinsam umsetzen konnten, dafür bin ich den beiden bis heute sehr dankbar. Wenn Physiker und Softwareleute an einem Tisch sitzen und am Ende ein Quantencomputer im Browser herauskommt, ist das genau die Art von Zusammenarbeit, für die ich Netsnek gegründet habe.

## Was PhotonQ mir beigebracht hat

Software vererbt sich. PhotonQ wurde aus meinem Jaen-Template generiert. netsnek.com, die Site, auf der dieser Text steht, entstand wiederum aus dem PhotonQ-Code. Beim Relaunch im August 2026 habe ich den Playground, die Experiments-Seiten und einen ganzen PhotonQ-Theme-Zweig wieder aus der Agentur-Site herausgelöst. Man begegnet dem eigenen Code Jahre später in neuen Zusammenhängen wieder.

Und manchmal ist die beste Entscheidung ein begründetes Nein. Im Juli 2026 habe ich durchgerechnet, ob der Community-Teil von PhotonQ auf das AT Protocol von Bluesky passt. Der öffentliche Teil mappt fast eins zu eins. Private Entwürfe, das Zurückziehen von Posts, View-Statistiken und die Löschpflichten der DSGVO passen nicht. Also kein Port, sondern höchstens eine Syndication-Brücke, falls das Protokoll eines Tages private Daten kann.

## Die Doku aus dem Projekt

Das Herzstück von PhotonQ war immer der Anspruch, Quantencomputing verständlich zu machen. Die Quantencomputing-Doku aus dem Projekt lebt deshalb hier weiter. In den Unterseiten unten finden sich die Kapitel zu Quantencomputing und Quanteninformation, zu linearer Optik, zum messbasierten Quantencomputing und zu OpenQASM.

Eine Warnung gehört dazu, oder eher eine Einladung: In diesen Kapiteln steckt richtig viel Mathematik. Zustandsvektoren, Matrizen, Messwahrscheinlichkeiten. Das ist kein Unfall, das ist der Punkt. Zu erklären, wie Quantenphysik wirklich funktioniert, statt nur drüberzureden, war von Anfang an Teil des Projekts. Und es hat mir ehrlich Spaß gemacht.
