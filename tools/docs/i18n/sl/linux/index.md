---
title: Linux na Apple Silicon
description: Zakaj svoj MacBook Pro poganjam s Fedoro Asahi, kako je nastalo moje namizje in čemu upravljam lastni repozitorij RPM.
path: /docs/linux
---

# Linux na Apple Silicon

Moj glavni računalnik je MacBook Pro z Apple Silicon. Na njem ne teče macOS, ampak Fedora 43 s popravki Asahi Linuxa. Nameščal sem iz Fedore Minimal, torej iz sistema, ki po prvem zagonu skoraj ničesar ne zna. Vse, kar je prišlo zatem, sem po koščkih sestavil sam. Te strani pripovedujejo, kako je nastavitev videti, zakaj je videti tako in kje sem se med potjo pobil.

## Zakaj sploh Linux na MacBooku

Razlog je strojna oprema. MacBooki z Apple Silicon dajo veliko zmogljivosti ob zelo majhni porabi energije, projekt Asahi pa Linux prinese prav na te naprave, vključno z grafičnim pospeševanjem za Applov GPE prek Mese. S tem polnovredno namizje Wayland teče izvorno na aarch64. Zame je to najboljši Linux stroj, kar sem jih kdaj imel.

Zanka: nekateri paketi iz uradnih repozitorijev Fedore za to nastavitev potrebujejo prilagoditve. Nekatere programske opreme za aarch64 sploh ni. Prav to vrzel zapiram z lastnimi popravki in lastnim repozitorijem RPM.

## Kaj tukaj piše

### [Namizna nastavitev Asahi](/docs/linux/asahi)

Moj celoten namizni sklad: Wayfire kot upravljalnik prikaza za Wayland, XFCE kot namizno okolje v seji Wayland, greetd s tuigreetom kot prijava, PipeWire za zvok in delovanje Bluetootha, ki končno ne šumi več. K temu še kamni spotike, ki so me ujeli na Asahiju, na primer 16K pomnilniške strani jedra, ob katere se je razbil moj Minecraft, obvod za sesuvajoče se aplikacije GTK4 in pot do programske opreme x86 prek FEX in muvm.

### [Repozitorij Netsnek RPM](/docs/linux/rpm)

Pod `rpm.netsnek.com` ležijo popravljeni paketi, ki to nastavitev sploh omogočajo. Stran pripoveduje, katere pakete zakaj popravljam, od nazaj prenesenega protokola za delovne površine v wlroots do popravkov za Wayland v pultu in namizju.

## Za koga je to

Za vse, ki želijo na napravi z Apple Silicon zgraditi podobno nastavitev. Osnovno znanje Fedore in ukazne vrstice predpostavljam. Vsi primeri se nanašajo na Fedoro 43 na aarch64.
