---
title: Bäckerherz
description: How [Momo](https://www.linkedin.com/in/momo-matsumoto-746594290/) and I supported the baked-goods delivery service Bäckerherz on the software and sales side, and what we learned about businesses with daily production.
path: /docs/baeckerherz
---

# Bäckerherz

Bäckerherz is a delivery service with a simple and beautiful idea: fresh baked goods from the regional baker, delivered right to the front door early in the morning, in Villach and the surrounding area. Momo, my partner, and I helped build it up. This page tells what we worked on and what we learned about businesses with daily production and delivery.

## What Bäckerherz does

Whoever orders at Bäckerherz gets their pastries at the door before breakfast. Orders are placed online, and many customers have recurring orders. Behind it stands real work every night: baking, picking, delivering, all before the town wakes up.

Technically, underneath there was a backend of its own with a GraphQL API and a customer portal. Recurring orders were synchronized with a delivery ERP for food businesses, sales worked with a CRM, and notifications went out automatically via email and messenger.

## How we helped

I helped on the software side: automation, tools for fetching and analyzing orders in the backend, and small helpers for everyday work. The most visible piece of that was the [OpenClaw shift-plan bot](/docs/baeckerherz/openclaw) in Telegram, joined by digital forms and other small tools following the same pattern.

Momo worked in the operational heart of the business, from sales through reports for management decisions to coordinating the shift plans. Many of her improvement ideas landed directly in the systems used every day.

One chapter we are both proud of: Momo and I helped build up and train the sales team. Phone sales is a hard business. In a single morning you hear no more often than in a normal month, and still the next call has to sound friendly. What we learned about motivation along the way: it does not come from pep talks, but from visible numbers and small wins. Once you know your own hit rate, a no is nothing more than an intermediate step towards the next yes. In the end, good training means telling numbers in a way that gives courage.

## In the end, startups are a numbers game

At PhotonQ it was about state vectors, at Bäckerherz about contribution margins. Mathematics too, just a completely different kind. I built a forecasting model for the business, and the mechanics behind it explain the business better than any slide deck.

The logic goes like this: new customers come via samples at the front door. Every sample costs cost of goods, working time and the phone calls around it. Only a fraction of the samples turn into customers, so a won customer is worth a multiple of a sample. Against that stands the monthly contribution margin of a subscription, and against that gnaws churn. Whoever cancels early never earned back their own acquisition. Within that span, acquisition, fixed costs and, at the end, a remainder all have to fit.

That is exactly where a likeable product turns into an arithmetic problem. Every lever hangs on the others. More samples per week drive acquisition costs up, better conversion brings them down, less churn works more strongly than almost anything else. If you like, you can play with the sliders yourself: [the forecasting model to try out](/models/delivery-prediction.html). It is the mechanic I calculated with back then, pre-filled with freely chosen example values.

## How it went on

Our collaboration with Bäckerherz has since come to an end. We are grateful to everyone we were allowed to work with during that time. What we learned about software for businesses with daily production and delivery is written below.

## What we learned

**Happy customers are not yet a business model.** A product that people like proves demand. Whether the contribution margin behind every single delivery carries the acquisition, the churn and the fixed costs is a separate question entirely, and exactly that question decides.

**Fresh goods and logistics forgive very little.** Software can plan, remind and analyze. It does not bake the roll and does not deliver it. Anyone planning a business model with daily production and delivery should take the operational load just as seriously as the technology from day one.

**Integrate instead of building yourself.** CRM, delivery ERP and messaging came as ready-made services, and code of our own was mostly the glue in between. For a small team, that is the right way. Every in-house build that could be rented ready-made costs time that is missing in the day-to-day business.

**Tools have to go where the team already is.** The shift plan ran where the team was already writing every day: in Telegram. Digital forms replaced paper slips without anyone having to learn a new app. Small tools that actually get used beat big platforms that nobody opens.

**Whoever stands in the operation every day sees which software is missing.** The best requirements did not come from meetings but from Momo's daily work between sales, reports and shift planning. Software for a business is best built with the people who carry it.

**Experience moves along with you.** What remains from a finished project are the patterns, the tools and the eye for what a business really needs. Next time we start with all of that in our luggage.

## More in this section

### [OpenClaw shift-plan bot](/docs/baeckerherz/openclaw)

The Telegram bot for shift planning at Bäckerherz, built on the open-source gateway OpenClaw, and the small tooling that grew around it.
