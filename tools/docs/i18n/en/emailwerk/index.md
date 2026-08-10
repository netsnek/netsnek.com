---
title: emailwerk
description: How mailpress became emailwerk. Three attempts at a mail service of my own, what it sends for me today and which legacy baggage I buried in the third rewrite.
path: /docs/emailwerk
---

# emailwerk

emailwerk is my service for transactional mail. It sends the mails behind the contact form of netsnek.com, holds a send back until a qualified signature is in place, and talks directly to Gmail. I develop it together with [Nico](https://github.com/schettn) from [cronit](https://www.cronit.io) and run it under my company Netsnek e.U. This page tells the story of how it came about.

## Three attempts

emailwerk is the third major version of a project that started in 2023 as mailpress. That it took three versions is partly because the tooling underneath grew along with it. Nico builds [Pylon](https://pylon.cronit.io), the framework emailwerk runs on. Every major Pylon version has pulled a new mailpress version along behind it.

The first version was built on snek-functions, the predecessor of Pylon. The HTML templates were hardwired into the code, and the actual sending was handled by an external mailer microservice. Much of it was provisional, but two ideas from back then have survived to this day. Linked templates, where one send triggers follow-up mails, for instance an inquiry to the team plus a confirmation to the customer. And verifyReplyTo, a check that prevents anyone from sending reply-able mails in the name of someone else's address.

mailpress v2 in 2024 was the first proper attempt. Pylon v2, Prisma and Postgres, multi-tenancy via Zitadel, Twig as the template language and a separate Gatsby admin interface. That version ran in production for two years. But it had design decisions I would not make the same way again. More on that in a moment.

In 2026 came the rewrite on Pylon v3, and with it the new name. mailpress became emailwerk, because the internal tool is meant to become a product. The admin interface moved into the service itself and is rendered server-side in the same process as the API. Added to that were a send history and a real job queue that runs in the same Postgres database. The result is a single Node process with one database. No separate frontend deployment, no second repository, no CORS, no Redis.

## What it does for me today

The most visible part is the contact form of netsnek.com. Whoever writes there triggers an inquiry to us and gets a confirmation back via a linked template. Both run without a login through the anonymous branch of emailwerk, which is still not an open relay. That story has [a page of its own](/docs/emailwerk/kontaktformular).

Then the signatures. emailwerk can hold a send back until the content has been qualified electronically signed, with ID Austria. The mail is rendered and frozen when it is queued, then I sign it in a web ceremony, and only after that does it go out, with the signed PDF as an attachment. Underneath sits our TypeScript rewrite of PDF-Over, plus a dedicated PGP layer over the exact content. Whoever receives such a mail can verify the signature on signature.netsnek.com, in the browser and offline.

And Gmail. A sender mailbox is connected via OAuth, and from then on emailwerk sends as that mailbox through the Gmail API. The signature maintained in the mailbox travels along automatically, and for signed sends it even gets signed as well. To be perfectly honest, the integration still has one quirk. The OAuth app is in test status with Google, so the tokens expire after about a week and I have to reconfirm the connection.

During the switch I migrated the sixteen templates of the old mailpress instance to emailwerk. So that they render unchanged, emailwerk kept Twig as a compatibility engine alongside Liquid, the default for anything new. What gave away the origin of every single template was the date filter in the letterhead, which Twig knows and Liquid does not.

## What I buried

The rewrite was also a burial. Four constructions from mailpress v2 I did not want to take along.

**Anonymous sending.** Contact forms need a way without a login. In emailwerk the template always determines the recipients, never the caller. That separation does not live in a check routine somebody can forget, it lives in the data model.

**The transformer.** In v2, templates could be extended with small script fragments. In emailwerk that is gone. Not because I fenced them in better, but because the need disappeared. Subject, recipients and reply-to are now template strings themselves and are rendered with the same variables as the content. When migrating the sixteen templates, the old fragments were therefore deliberately left behind.

**Credentials do not belong in the schema.** In emailwerk, SMTP passwords and API keys live encrypted in a data model of their own that is structurally unreachable through the GraphQL API. What the schema does not know, no resolver can accidentally hand out.

**Linked templates belong bounded.** A chain that kicks itself off again runs in circles if nobody stops it. In emailwerk a cycle guard stands in the way, and the confirmation mail of a contact form goes exactly one level deep.

## What I learned

**You do not sandbox dangerous features, you make them unnecessary.** The transformer is the object lesson. The safe version of it was not a better fence, but an envelope that is itself a template. The feature disappeared, the capability stayed.

**Structure beats discipline.** An auth guard can be forgotten, a field can slip through in a response. A data model that does not exist in the schema cannot be queried by anyone. Recipients that can only come from the template cannot be bent by any caller. The most reliable security decisions in emailwerk are the ones nobody has to make anew every time.

**Fewer parts, fewer worries.** Over three versions the service has not grown bigger, but more compact. v1 needed an external mailer, v2 a separate admin interface in its own repository. v3 renders the interface in the same process and puts the queue in the same database. Every part that goes away is one that cannot break.

**A rewrite is not a fresh start.** The good ideas move along, verifyReplyTo and the linked templates come from the very first version. The data moves along, there is a dedicated compatibility engine just for the old Twig templates. Only the mistakes stay behind, and that is exactly what you do the rewrite for.

## More in this section

### [Contact form](/docs/emailwerk/kontaktformular)

How the contact form of netsnek.com sends directly to emailwerk without a login and why that is still not an open relay.
