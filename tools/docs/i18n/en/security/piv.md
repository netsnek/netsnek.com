---
title: YubiKey PIV Restore
description: Deterministic derivation of YubiKey PIV keys from a recovery phrase. One public key for TON, PIV and OpenPGP.
path: /docs/security/piv
---

# YubiKey PIV Restore

Hardware keys like the YubiKey normally generate their keys on the card. That is secure, but final. If the card is lost or breaks, the identity is gone. piv-restore turns the approach around. All keys are derived deterministically from a wallet recovery phrase and then written to the card. The phrase on paper is the backup. Any blank card can become the same identity again.

## One public key, three worlds

The core of the approach is a deliberately shared key. A TON wallet derives an Ed25519 key from its recovery phrase. piv-restore derives exactly the same key and writes it to the card's PIV signature slot. The OpenPGP export uses it unchanged as the primary key. Wallet, card and PGP certificate therefore show the same public key. Whoever verifies a signature always verifies the same identity.

For decryption, the opposite applies. Encryption keys are generated from their own derivation domains and remain separate from the signature key. For this, the card holds a dedicated X25519 key. That way, anyone can encrypt to the card offline with ordinary age, while only the card itself can decrypt.

## Deterministic OpenPGP export

The export produces an OpenPGP v4 certificate with the wallet key as the primary key and a separate subkey for encryption. The certificate's creation time is hard-wired, because the v4 fingerprint hashes it in. Only then does the same phrase yield the same fingerprint on every machine and on every run. The export path consumes no randomness at all. As a safeguard, the result was cross-validated with a second, independent OpenPGP implementation, and both produce the same fingerprint.

## Supported phrases

The tool understands two phrase dialects, TON with 24 words and BIP-39 with 12 words. When generating new phrases, ambiguous phrases that would be valid in both dialects are excluded. An optional phrase password is supported, with built-in verification for TON and as an unverified passphrase per the standard for BIP-39. BIP-39 phrases additionally yield the corresponding Bitcoin and Ethereum addresses on the standard paths, cross-validated against the established JavaScript libraries. A single phrase thus covers wallet, card, PGP and the common chains.

## Tool and interface

The reference is implemented in two languages. A Rust CLI handles derivation, card verification, restore and PGP export, while a Node implementation serves as the reference. Pinned test vectors keep both implementations byte-identical. The CLI is deliberately strict, aborting immediately on unknown options and typos, because a restore command overwrites card slots.

For entering the phrase, there is a small offline GUI in the look of a wallet recovery screen. It consists of hand-written HTML, CSS and JavaScript with no dependencies and no build step. The Content Security Policy allows no network access whatsoever. The words stay masked until they are deliberately revealed, and after derivation they are wiped from memory in the Rust core. Wrong words turn red live, just like in the wallet.

As a side effect, the same public key also falls out as an OpenSSH line and can be dropped straight into `authorized_keys`.

## age-plugin-piv25519

A related, standalone building block is an age plugin that binds files to the card's PIV signature key. Ed25519 cannot decrypt, so the plugin uses a different property. The card signs a fixed context text, and because Ed25519 signatures are deterministic, this signature is a repeatable secret. From it, HKDF derives a symmetric key that wraps the file key of the age file. Decryption requires the physical card, the PIN and, depending on policy, a touch.

The determinism assumption is load-bearing and has been verified on real hardware. A built-in self-test re-checks it on every card before the plugin is trusted. The source code is open: [github.com/kleberbaum/age-plugin-piv25519](https://github.com/kleberbaum/age-plugin-piv25519).

## Status

The piv-restore tool is currently not publicly available. This page documents the approach and the feature set. The age plugin is already open on GitHub.
