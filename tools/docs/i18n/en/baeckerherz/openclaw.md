---
title: OpenClaw shift-plan bot
description: The Telegram bot for shift planning at Bäckerherz, built on the open-source gateway OpenClaw, and the small tooling around it.
path: /docs/baeckerherz/openclaw
---

# OpenClaw shift-plan bot

At [Bäckerherz](/docs/baeckerherz) the working day began before most people get up. Who bakes, picks and delivers at what time had to be coordinated continuously. Coordinating the shift plans was daily operational work and lay with [Momo](https://www.linkedin.com/in/momo-matsumoto-746594290/), my partner. The shift-plan bot brought this work to where the team was writing anyway: to Telegram.

## What OpenClaw is

OpenClaw is an open-source gateway for personal AI assistants. It runs self-hosted on your own hardware and connects an assistant to messengers like Telegram or WhatsApp. Instead of a dedicated app with its own logins, the team simply gets a contact in the messenger it can write to.

## The bot in everyday use

For Bäckerherz, a shift-plan bot ran on this basis in Telegram. The team could coordinate shift plans and ask questions right in the chat, without installing another app or signing up anywhere. For daily coordination that meant fewer paper slips, fewer follow-up questions and a plan everyone had on their phone.

## Operation and stack

The gateway ran self-hosted on one of my servers. The process was bound only locally, and the only thing talking to the outside was the connection to the messenger. Shift plans and team communication therefore stayed on our own infrastructure instead of with yet another third-party provider.

## The tooling around the bot

The bot was part of a series of small tools following the same pattern: simple, close to everyday work, usable right away.

- Digital forms for internal processes and better information management, as a replacement for paper shuffling.
- Sales routes in Google My Maps, so that tours became visible and plannable.
- Sales reports as a basis for management decisions.
- A command in the Django backend that fetches all orders for analysis.

None of it was big. All of it was used every day. That was exactly the idea.

## What I took away

The pattern from this project, bringing tools to where the team is working anyway, is one I still use today.
