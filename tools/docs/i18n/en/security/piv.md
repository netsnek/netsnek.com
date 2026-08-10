---
title: YubiKey PIV Restore
description: How my YubiKey lost its finality. A recovery phrase on paper, one public key for TON, PIV and OpenPGP.
path: /docs/security/piv
---

# YubiKey PIV Restore

I like hardware keys. A YubiKey signs without the private key ever seeing the computer. But one thought never let go of me. The card generates its keys itself, and that is exactly what makes it final. If it gets lost or the chip gives up, the identity is gone. No backup, no second try.

Crypto wallets solved this problem years ago. A handful of words on paper, and every new device becomes the same wallet again. That is exactly what I wanted for my YubiKey. So I built piv-restore and turned the usual approach around. The keys are derived deterministically from a wallet recovery phrase and are then written into the card. The phrase in the drawer is the backup. Any blank card can become my identity again.

## One key, three worlds

The idea I like best about this project: from the same phrase comes the same Ed25519 key, three times over. As a TON wallet. As a signing key on the card. As an OpenPGP primary key. Wallet, card and PGP certificate show the same public key. Anyone verifying a signature of mine somewhere always verifies the same identity. As a side effect, the same key also falls out as an OpenSSH line.

Only for decryption did I want the opposite. For that, separate keys of their own live on the card. That way anyone with ordinary age can encrypt files to the card offline, and only the card itself can open them.

## It works

Along the way, OpenPGP taught me a lesson. A certificate's fingerprint hashes in the creation time. Had I simply taken the current clock time, the same phrase would get a different fingerprint on every run. So the creation time is hard-wired and the export consumes no randomness at all. To be safe, I cross-validated the result against a second, independent OpenPGP implementation. Both produce the same fingerprint.

For entering the phrase I built myself a small offline interface that looks like the recovery screen of a wallet. Wrong words turn red live, exactly as they do there. It works without a network and without a build step, and the words stay masked until I deliberately reveal them.

## The side branch: age-plugin-piv25519

A standalone side branch grew out of the project. Ed25519 cannot actually decrypt. But Ed25519 signatures are deterministic. Same card, same text, same signature, every time. That signature is therefore a repeatable secret that only the card can produce. The plugin uses this to bind age files to the physical card. Opening them works only with the card, the PIN and, depending on the setting, a touch.

This determinism assumption carries the whole plugin, which is why I verified it on real hardware. In addition, a built-in self-test checks every card before you trust the plugin. The code is open: [github.com/kleberbaum/age-plugin-piv25519](https://github.com/kleberbaum/age-plugin-piv25519).

## Where it stands

piv-restore itself is not public yet. This page tells the approach. The age plugin is already out in the open on GitHub.
