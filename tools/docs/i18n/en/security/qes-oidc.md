---
title: QES-OIDC
description: Qualified electronic signatures via ID Austria as a standards-compliant OpenID Connect login on the Cloudflare edge.
path: /docs/security/qes-oidc
---

# QES-OIDC

A qualified electronic signature (QES) via ID Austria is the strongest digital proof of identity available in Austria. QES-OIDC packages this proof as an ordinary OpenID Connect login. Whoever logs in signs a short, human-readable login text in the familiar flow of the trust service provider A-Trust. The service verifies the signature and issues a standards-compliant ID token from it.

What makes this special: it requires no service provider registration, no contract and no register access. The user brings her own ID Austria, and the service verifies a signature. The identity, meaning first name, last name and a person-bound serial number, comes directly from the signature certificate.

## How a login works

1. The application redirects via an OIDC authorization request, authorization code with PKCE.
2. The service starts a signature ceremony at A-Trust. The user authenticates on A-Trust's original pages, for example with phone number, password and a second factor.
3. What gets signed is a short German text with the application name, the time and a one-time login code. The code binds each signature to exactly one login.
4. A-Trust delivers the signature server-side to a single-use pickup address. Repeated deliveries go nowhere.
5. The service verifies the signature and then serves the normal OIDC flow with code, token, discovery, JWKS, userinfo and RP-initiated logout.

## Verification without leaps of faith

Signature verification fails on any doubt. What gets checked are the signature itself, the hash over the exact login text and the signature's time window. The certificate chain is validated against a hard-pinned set of A-Trust certificates. The certificate must be marked as qualified, non-qualified certificates are rejected. The revocation status is queried live via OCSP at the issuer. A revoked certificate always fails.

## A stable subject without invented data

The OIDC subject is derived as a hash over the person-bound serial number from the certificate and thus stays stable across logins. The service invents no data. In particular, there is no email claim, because the certificate contains no email address. Applications that need their own linking rules get the raw serial numbers as dedicated claims. Because the issuer does not contractually guarantee the stability of the serial number, applications should additionally offer a way to re-link an account.

## Running on the edge

The service runs as a Cloudflare Worker. Ceremonies, auth requests, codes and tokens live in a Durable Object store with atomic one-time retrieval. Each key can be redeemed exactly once, which prevents replays at the storage level. There is deliberately no persistent SSO session. Every login is a fresh signature ceremony, and there is no silent re-login.

## Federation

Any standards-compliant OIDC application can connect to the service directly via discovery. Alternatively, it sits as an external identity provider behind a broker like Zitadel. There, the qualified signature then appears as another login option alongside password and passkey.

## Signature-confirmed registration

An optional registration ceremony builds on the login building block. The candidate signs a server-generated registration PDF with a qualified signature. The operator countersigns, delivered as a signature-required mail via [emailwerk](/docs/emailwerk). The reply mail contains an activation link with an authorization JWT signed by the service. Only the confirmed click on this link provisions the account, idempotently and within a tight time window. Existing accounts are deliberately never linked to a signature automatically, because the provided email address is unconfirmed. This flow was developed for an association project where only those whose membership declaration is qualified-signed and countersigned can join.

## Quality

The service is safeguarded by an extensive automated test suite, including checks against real qualified signatures and live status queries at the issuer. Several security reviews led to targeted hardening, for example against PKCE downgrade, against logout CSRF and for the freshness of OCSP responses.

The source code is open: [github.com/kleberbaum/qes-oidc](https://github.com/kleberbaum/qes-oidc).
