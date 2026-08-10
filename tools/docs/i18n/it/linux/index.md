---
title: Linux su Apple Silicon
description: Perché faccio girare il mio MacBook Pro con Fedora Asahi, come è nato il mio desktop e a che cosa mi serve un repository RPM proprio.
path: /docs/linux
---

# Linux su Apple Silicon

Il mio computer principale è un MacBook Pro con Apple Silicon. Sopra non gira macOS, ma Fedora 43 con le patch di Asahi Linux. Ho installato partendo da Fedora Minimal, quindi da un sistema che dopo il primo boot non sa fare quasi niente. Tutto quello che è venuto dopo l'ho messo insieme pezzo per pezzo da me. Queste pagine raccontano come è fatto il setup, perché è fatto così e dove sono caduto lungo la strada.

## Perché proprio Linux su un MacBook

Il motivo è l'hardware. I MacBook con Apple Silicon danno molte prestazioni con un consumo di corrente molto basso, e il progetto Asahi porta Linux esattamente su questi dispositivi, accelerazione grafica per la GPU Apple tramite Mesa inclusa. Così un desktop Wayland completo gira in modo nativo su aarch64. Per me è la migliore macchina Linux che abbia mai avuto.

Il rovescio della medaglia: alcuni pacchetti dei repository ufficiali di Fedora hanno bisogno di adattamenti per questo setup. Certi software per aarch64 non esistono proprio. È esattamente questa lacuna che colmo con patch mie e con un repository RPM proprio.

## Che cosa c'è qui

### [Setup del desktop Asahi](/docs/linux/asahi)

Il mio stack desktop completo: Wayfire come compositor Wayland, XFCE come ambiente desktop in una sessione Wayland, greetd con tuigreet come login, PipeWire per l'audio e un funzionamento Bluetooth che finalmente non fruscia più. E poi gli inciampi che mi hanno colto su Asahi, per esempio le pagine di memoria da 16K del kernel, contro cui il mio Minecraft si è schiantato, un workaround per le app GTK4 che crashano e la strada verso il software x86 tramite FEX e muvm.

### [Repository RPM Netsnek](/docs/linux/rpm)

Sotto `rpm.netsnek.com` stanno i pacchetti patchati che rendono possibile questo setup. La pagina racconta quali pacchetti patcho e perché, dal protocollo workspace retroportato in wlroots fino ai fix Wayland per pannello e desktop.

## Per chi è

Per tutte le persone che vogliono costruire un setup simile su un dispositivo Apple Silicon. Do per scontate conoscenze di base di Fedora e della riga di comando. Tutti gli esempi si riferiscono a Fedora 43 su aarch64.
