---
title: QES-OIDC
description: Why I built a login out of the qualified signature with ID Austria and what a membership declaration has to do with it.
path: /docs/security/qes-oidc
---

# QES-OIDC

It all started with an association sign-up. For an association project I wanted membership to require a membership declaration that is qualified-signed and countersigned. No scanned signature, no checkbox in a form. A real qualified electronic signature via ID Austria, the strongest proof of digital identity that exists in Austria.

While building it, something surprised me. I need no contract for it, no service provider registration and no register access. Whoever signs up brings their own ID Austria along, and all I have to do is verify a signature. First name, last name and a person-bound serial number are right there in the signing certificate.

So I packaged this proof as the thing every application understands anyway: an OpenID Connect login.

## What it feels like

From the application's point of view, QES-OIDC is a perfectly ordinary OIDC provider. From the person's point of view, it goes like this. They are redirected, sign in on the familiar pages of A-Trust and sign a short German text. It contains the name of the application, the point in time and a one-time login code that binds the signature to this one specific login. The service verifies the signature and issues a standard token from it.

I deliberately built the verification to be suspicious. At every doubt it fails, and a certificate that is not qualified or has been revoked does not get through.

One decision I stand by: there is no silent session. Every sign-in is a fresh signing ceremony. That is less convenient than a cookie, but that is exactly the point. Whoever is logged in has just signed.

And the service invents nothing. There is no email claim, for example, because the certificate simply contains no email address. The stable user identifier is derived from the serial number in the certificate and therefore stays the same across logins.

## The signup ceremony

And then the ceremony that started it all. Whoever wants to join signs a registration PDF with a qualified signature. The operator countersigns, delivered as a signature-required mail via [Emailwerk](/docs/emailwerk). The reply mail contains an activation link, and only the confirmed click on it creates the account. Existing accounts are never automatically linked to a signature in the process, because at that moment the email address given is still unconfirmed.

## Where it runs

The service runs as a Cloudflare Worker at the edge. Every code and every token in it can be redeemed exactly once, a second attempt runs into nothing. Any standards-compliant OIDC application can dock onto it directly. Alternatively, the service hangs behind a broker like Zitadel as an external identity provider and shows up there as another login option next to password and passkey.

The test suite verifies against real qualified signatures, among other things, and several security reviews have led to targeted hardening.

The code is open: [github.com/kleberbaum/qes-oidc](https://github.com/kleberbaum/qes-oidc).
