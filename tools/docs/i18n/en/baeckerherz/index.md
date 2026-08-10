---
title: Bäckerherz
description: How Florian Kleber and his partner helped build the baked-goods startup Bäckerherz, why it was not enough in the end, and what they learned about startups from it.
path: /docs/baeckerherz
---

# Bäckerherz

Bäckerherz was a small startup with a simple and beautiful idea: fresh baked goods from the regional baker, delivered straight to the front door in the early morning, in Villach and the surrounding area. My partner and I helped build it. In the end, it sadly did not work out. This page tells the story and records what we learned about startups along the way.

## What Bäckerherz was

Whoever ordered from Bäckerherz got their pastries at the door before breakfast. Orders were placed online, and many customers had recurring orders. Behind it stood real work every night: baking, picking, delivering, all before the town wakes up. The operation reliably served around 400 customers.

Technically, the operation ran on a Django backend with a GraphQL API and a customer portal at mein.baeckerherz.at. Recurring orders were synchronized with a delivery ERP for food businesses, sales worked with a CRM, and notifications went out automatically via email and WhatsApp. The website [baeckerherz.at](https://baeckerherz.at) was still reachable at the time this page was written.

## How we helped

I helped on the software side: automation, tools for fetching and analyzing orders in the backend, and small helpers for everyday work. The most visible piece of that was the [OpenClaw shift-planning bot](/docs/baeckerherz/openclaw) in Telegram, joined by digital forms and other small tools following the same pattern.

My partner worked in the operational heart of the business, from sales through reports for management decisions to coordinating the shift schedules. Many of her improvement ideas landed directly in the systems used every day.

## How it ended

Despite loyal customers and a lot of dedication, it was not enough in the end. Bäckerherz could not sustain itself as a company in the long run. That is a pity, and it hurts a little too, because everyone involved put a lot of heart into it. Nobody is to blame. A young company with fresh goods, nightly production and its own delivery fights on many fronts at once. We are grateful to everyone we were allowed to work with during that time.

## What we learned about startups

**Happy customers are not yet a business model.** Around 400 customers, a reliable operation, and still no sustainable whole. A product that people like proves demand. Whether the math behind every single delivery works out is a separate question, and that question is exactly what decides.

**Fresh goods and logistics forgive little.** Software can plan, remind and analyze. It does not bake or deliver the bread roll. Whoever plans a business model with daily production and delivery should take the operational load just as seriously as the technology from day one.

**Integrate instead of building yourself.** Bäckerherz used CRM, delivery ERP and messaging as ready-made services and wrote its own code mainly as glue in between. For a small team, that is the right way. Every in-house build that could be rented off the shelf costs time that is missing from the daily business.

**Tools have to go where the team already is.** The shift schedule ran where the team was already writing every day: in Telegram. Digital forms replaced paper slips without anyone having to learn a new app. Small tools that actually get used beat big platforms that nobody opens.

**Whoever stands in the operation every day sees which software is missing.** The best requirements did not come from meetings but from my partner's daily work between sales, reports and shift planning. Software for a business is best built with the people who carry it.

**An ending is not a total loss.** The experience remains, and some of the tools do too. The attempt was worth it, and next time we start with all of that in our luggage.

## More in this section

### [OpenClaw shift-planning bot](/docs/baeckerherz/openclaw)

The Telegram bot for shift planning at Bäckerherz, built on the open-source gateway OpenClaw, and the small tooling that grew around it.
