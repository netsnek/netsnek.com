---
title: Security
description: Two stories about digital identity. A YubiKey with a paper backup and a login that is a qualified signature.
path: /docs/security
---

# Security

Behind this section are two projects that occupied me for a long time. Both circle around the same question. How do I build a digital identity that truly belongs to me and that can take a hit?

[YubiKey PIV Restore](/docs/security/piv) is about the fear of loss. A hardware key is wonderfully secure and precisely for that reason final. I tell how I gave it a backup on paper and why, in the end, a single public key serves as a TON wallet, as a card key and as an OpenPGP primary key.

[QES-OIDC](/docs/security/qes-oidc) is about the login. Instead of typing a password, you sign a short text with ID Austria, and the qualified signature turns into a perfectly ordinary OpenID Connect login. It all started with an association sign-up where you only become a member if you really sign.

The two meet in the mail service [Emailwerk](/docs/emailwerk). A mail can wait there until a qualified signature is in place, and the key from the YubiKey signs the exact content along with it. One signature proves who is sending. The other proves that nobody changed anything along the way.
