---
title: Contact form
description: How the contact form of netsnek.com sends directly to Emailwerk without a login and why that is still not an open relay.
path: /docs/emailwerk/kontaktformular
---

# A contact form without an open relay

A public contact form has no login. Somebody still has to be allowed to trigger a mail without that turning into a relay. That is exactly the question Emailwerk answers in the data model instead of in a check routine.

The solution is unspectacular, and that is precisely why I like it. There is no second endpoint and no REST route of its own. The same GraphQL operation on the same endpoint simply behaves differently depending on whether the request arrives authenticated or not.

Without authentication, three rules apply. The template must have been explicitly marked as public by an admin, knowing an id is not enough. The recipients always come from the stored envelope of the template, the caller can neither choose them nor overwrite them through the back door. And the only things the caller contributes are the form values and their own reply-to address, so that we can reply.

Everything else is rejected loudly, with an error instead of a silent discard. A misconfigured form should fail rather than quietly deliver somewhere. Only one detail stays deliberately vague. A missing template and a non-public template produce the same error message, otherwise the mutation would become an oracle for which template ids exist.

The confirmation mail to the person who wrote goes through a linked child template, exactly one level deep. It is best-effort on purpose. If the confirmation fails, the inquiry still counts as accepted. A broken confirmation template must not tell visitors that their message was lost.

The anonymous branch is rate-limited, per sender IP and globally. Only accepted sends consume budget. A blocked IP therefore cannot drain the global quota and thereby lock everyone out of the forms. And a test pins down that exactly one operation is reachable anonymously. If I add a new mutation later, it cannot silently become public, the test fails first.

This is exactly the path the contact form of netsnek.com itself runs on. The inquiry goes to us, the confirmation to the person who wrote. No token in the frontend, no form service in between, and still no relay.
