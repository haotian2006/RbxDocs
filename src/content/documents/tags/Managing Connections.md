---
title: "Managing Connections"
---

Memory leaks and performance drops can become more common without properly managing your connections, which are made whenever you `:Connect()` a function to an event. To prevent these problems:

-   Avoid nesting connected functions, which can cause a function to be connected and run many times
-   Prefer `:Once()` when a connected function only needs to run once
-   Ensure connections are destroyed and removed from tables that store them
