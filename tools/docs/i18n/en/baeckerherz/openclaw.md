---
title: OpenClaw shift-planning bot
description: The Telegram bot for shift planning at Bäckerherz, built on the open-source gateway OpenClaw, and the small tooling around it.
path: /docs/baeckerherz/openclaw
---

# OpenClaw shift-planning bot

At [Bäckerherz](/docs/baeckerherz), the workday began before most people get up. Who bakes, picks and delivers when had to be coordinated continuously. Coordinating the shift schedules was daily operational work and lay with my partner. The shift-planning bot brought this work to where the team was already writing: to Telegram.

## What OpenClaw is

OpenClaw is an open-source gateway for personal AI assistants. It runs self-hosted on your own hardware and connects an assistant to messengers like Telegram or WhatsApp. Instead of a separate app with separate logins, the team simply gets a contact in the messenger it can write to.

## The bot in everyday use

For Bäckerherz, a shift-planning bot ran in Telegram on this foundation. The team could coordinate shift schedules directly in the chat and ask questions, without installing another app or signing up anywhere. For the daily coordination, that meant fewer paper slips, fewer follow-up questions and a schedule everyone had on their phone.

## Operation and stack

The gateway ran self-hosted on a server of Netsnek e.U. The process was bound locally only, and the only thing talking to the outside was the connection to the messenger. Shift schedules and team communication thus stayed on our own infrastructure instead of with yet another third party.

## The tooling around the bot

The bot was part of a series of small tools following the same pattern: simple, close to everyday work, immediately usable.

- Digital forms for internal workflows and better information management, replacing the paper-slip economy.
- Sales routes in Google My Maps, making tours visible and plannable.
- Sales reports as a basis for management decisions.
- A command in the Django backend that fetches all orders for analysis.

None of it was big. All of it was used daily. That was exactly the idea.

## What became of it

Bäckerherz sadly did not make it as a company in the end. The OpenClaw gateway kept running afterwards and was still in operation on a server of Netsnek e.U. in the summer of 2026.
