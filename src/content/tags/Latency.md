---
title: "Latency"
author: "github: 63274991"
---

Latency is how long something takes to happen, and is normally shown when measuring ping. When doing something, low latency means it will start faster, while high latency means it will start later.

You can reduce latency by moving/(sometimes) duplicating server logic to the client and having 2 versions:

-   The **client-side** version will be fast but also be "pretend", meaning everything will appear super fast only for that client.
-   The **server-side** version will focus on making sure what happened on the client is actually real, and if it is, it copies (read: replicates) the intended effect to other clients.
