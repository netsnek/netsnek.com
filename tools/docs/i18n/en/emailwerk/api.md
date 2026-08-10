---
title: GraphQL API
description: Overview of the GraphQL surface of emailwerk. Queries, mutations, roles and the lifecycle of a message.
path: /docs/emailwerk/api
---

# GraphQL API

Emailwerk exposes its entire functionality through a single GraphQL endpoint at `/graphql`. The schema is reflected by Pylon v3 directly from the TypeScript types. There is no handwritten SDL. The built-in admin interface talks to the same endpoint internally too.

## Roles

Two roles protect the API.

- `emailwerk:admin` for administration: templates, senders, history and signature requests.
- `emailwerk:send` for sending.

The only exception is the anonymous branch of `sendTemplateMail` for public contact forms. It is described in detail under [Contact form](/docs/emailwerk/kontaktformular).

## Queries

| Query | Purpose |
|---|---|
| `templates` | page of your own organization's templates, with cursor pagination |
| `template(id)` | a single template |
| `senders` | the organization's senders, without credentials |
| `senderConnectUrl(senderId)` | the OAuth connection URL for a Gmail sender |
| `dashboard` | counters for the overview: templates, senders, sent today, in the queue |
| `messages` | page of the send history, filterable by status and search term |
| `message(id)` | a single message including its lifecycle events |
| `signatureRequests` | the organization's signature requests, optionally filtered by status |
| `signatureRequestArtifacts(id)` | the artifacts of a completed signature request, such as the signed PDF |

## Mutations

| Mutation | Purpose |
|---|---|
| `templateCreate` / `templateUpdate` / `templateDelete` | manage templates |
| `senderCreate` / `senderSetDefault` / `senderDelete` | manage senders |
| `senderVerify` | connection test of a sender, without sending mail |
| `templatePreview` | render content and test values server-side, without sending |
| `sendTemplateMail` | enqueue a template send |
| `sendEmail` | ad-hoc send without a template, subject and content come from the call |
| `sendForSignature` | hold a send until a qualified ID Austria signature is present |
| `prepareSignatureContent` | resolve the canonical content bytes of a signature send so they can be PGP-signed locally in advance |
| `messageResend` | re-enqueue a message from the history, as a repetition of the original send that is as faithful as possible |
| `signatureRequestCancel` | cancel a signature request that is still open |
| `signatureRequestRemind` | redeliver the signature notification with a fresh link, the old link immediately loses its validity |

## sendTemplateMail

The central send mutation takes its arguments under `args:`:

```graphql
mutation {
  sendTemplateMail(
    args: {
      templateId: "..."
      to: ["kundin@example.com"]
      values: { order_id: "1234" }
      envelopeOverride: { replyTo: "shop@example.com" }
    }
  ) {
    id
    status
  }
}
```

Key arguments:

- `templateId` selects the template.
- `to` is optional. Without it, the recipients stored in the template's envelope apply.
- `values` provides the values for the template variables.
- `envelopeOverride` overrides subject, recipients or reply-to.
- `scheduledAt` enqueues the send for a later point in time.

Much stricter rules apply to anonymous callers. They are described under [Contact form](/docs/emailwerk/kontaktformular).

## Lifecycle of a message

Every send first creates a message record and then enqueues a job. The status passes through:

```
QUEUED ─► SENDING ─► SENT | FAILED
```

Failed delivery attempts are retried with exponential backoff. Configuration errors fail immediately instead of retrying pointlessly. For each message, the history records the provider message id, the error text and the number of attempts, and it can be queried via `messages` and `message`.

A send that requires a signature passes through an additional state first. The message is rendered on enqueueing, frozen and parked as `AWAITING_SIGNATURE`. Only once the qualified signature is present does it enter the normal queue.
