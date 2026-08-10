---
title: PhotonQ
description: How we built PhotonQ with die Walthergruppe at the University of Vienna, an online platform for photonic quantum computing.
path: /docs/photonq
---

# How we built PhotonQ with die Walthergruppe

At the Faculty of Physics of the University of Vienna, computing is done with light. The Christian Doppler Laboratory for photonic quantum computing, die Walthergruppe, researches quantum computers there that work with photons. Out of the question of how this research gets from the lab into the browser came PhotonQ. And out of PhotonQ came one of the most formative projects in the history of Netsnek e.U. When I write we here, I mean it literally. PhotonQ was never a one-man project. Back then we were a small team, and the platform bears the handwriting of everyone who was part of it.

## What PhotonQ is

PhotonQ is the group's online platform. It describes itself as Austria's first photonic online quantum computing platform, and its ambition is stated right on the front page: make quantum accessible to all.

Concretely that means: you create an account, write quantum circuits in OpenQASM, see them as a circuit diagram and run them as an experiment. Translation and simulation happen with Perceval, Qiskit and PyZX. As a demo, the front page computes a quantum ripple-carry adder, a small adding machine made of quantum gates. On top of that comes a four-part documentation, from the basics of quantum information through linear optics and measurement-based quantum computing to OpenQASM.

## What we built

The platform itself. photonq.org is a Gatsby site with [Jaen](/docs/jaen), our open source CMS, which I keep developing to this day. PhotonQ thereby became one of the reference sites for Jaen. The code is public, and the repo now stands at 875 commits. The core came about in 2023, and the platform was in production by early 2024 at the latest.

There are two pieces I like especially. The first is the playground. The documentation consists of MDX, and right in the middle of the text sits the QASM editor as a building block of its own. You read a chapter, change one line of code and immediately see the new circuit. The second is the community part. Experiments are posts with profiles, stars, follows, an activity feed and a trending ranking over thirty days. Every experiment starts as a private draft. Publishing only happens when you are ready. I still consider that default the right one today.

There is no monolith behind it. The frontend talks through generated GraphQL clients to small services that we call Pylons. Back then they were still called snek functions. One manages profiles and posts, one the registration, one runs the OpenQASM code of the experiments. For identity and login we rely on a dedicated identity provider. The platform is operated in an environment we defined together with the group.

## The collaboration

The division of roles was clear from the start. Die Walthergruppe stands for the science, the documentation chapters carry their attribution. On the front page, Netsnek and cronit studios are listed as development partners, and services from cronit still run on the shared infrastructure to this day. Behind those company names, on our side, was a well-practiced small team, and it is exactly that teamwork that made the platform possible.

The website project has grown into more. By now Netsnek looks after the group's infrastructure, and I am rebuilding their identity architecture, this time with a typed GraphQL API on top.

For me the project was carried above all by two people from the group: [Felix](https://www.linkedin.com/in/felix-zilk/) and [Tobias](https://www.linkedin.com/in/tobias-guggemos-0307358a/). That we were able to realize PhotonQ together is something I am still very grateful to both of them for. When physicists and software people sit at one table and at the end a quantum computer in the browser comes out of it, that is exactly the kind of collaboration I founded Netsnek for.

## What PhotonQ taught me

Software is inherited. PhotonQ was generated from my Jaen template. netsnek.com, the site this text sits on, in turn came out of the PhotonQ code. During the relaunch in August 2026 I pulled the playground, the experiments pages and a whole PhotonQ theme branch back out of the agency site. You run into your own code again years later in new contexts.

And sometimes the best decision is a well-reasoned no. In July 2026 I worked through whether the community part of PhotonQ would fit onto Bluesky's AT Protocol. The public part maps almost one to one. Private drafts, withdrawing posts, view statistics and the deletion obligations of the GDPR do not fit. So no port, but at most a syndication bridge, in case the protocol one day handles private data.

## The documentation from the project

The heart of PhotonQ was always the ambition to make quantum computing understandable. The quantum computing documentation from the project therefore lives on here. In the subpages below you will find the chapters on quantum computing and quantum information, on linear optics, on measurement-based quantum computing and on OpenQASM.

A warning belongs with that, or rather an invitation: there is a serious amount of mathematics in these chapters. State vectors, matrices, measurement probabilities. That is not an accident, that is the point. Explaining how quantum physics really works, instead of just talking around it, was part of the project from the start. And I honestly enjoyed it.
