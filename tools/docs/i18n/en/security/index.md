---
title: Security
description: Security tools by Netsnek e.U. around hardware keys and qualified electronic signatures.
path: /docs/security
---

# Security

Netsnek e.U. develops security tools around two questions. How does a hardware key become recoverable without the private key ever having to leave the machine? And how can a qualified electronic signature be built into familiar workflows like login and email? This section documents the approaches behind both answers.

## What this documentation covers

### [YubiKey PIV Restore](/docs/security/piv)

A tool that deterministically derives the keys of a YubiKey from a wallet recovery phrase. The same Ed25519 public key serves as a TON wallet, as the PIV signature key on the card, and as the OpenPGP primary key. Losing or breaking the card therefore no longer means losing the identity. Alongside it, an age plugin that binds encrypted files to the physical card.

### [QES-OIDC](/docs/security/qes-oidc)

A bridge between qualified electronic signatures and OpenID Connect. Whoever logs in signs a short login text with ID Austria. The service verifies the signature cryptographically and turns it into a standards-compliant OIDC login. Built on top of that, there is a signature-confirmed registration with countersigning.

## How the two work together

The two building blocks complement each other in the mail service [emailwerk](/docs/emailwerk). There, a send can be held back until a qualified electronic signature via ID Austria is in place. In addition, a PGP layer signs the exact content with the key from the YubiKey. The qualified signature proves the sender's identity, the hardware signature the unaltered content.
