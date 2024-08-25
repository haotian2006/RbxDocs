---
title: "Memory Leaks"
---

When your game is constantly consuming an ever-growing amount of memory, it is possible that you have a memory leak, which can be difficult to find and debug.

Some things to keep in mind are:

-   Tables with no size limit could grow to ridiculous sizes
-   Nested connections without proper management will exist forever
-   Nested loops could cause a table to store much more than it should
-   Weak tables allow instances stored in a table to be removed when destroyed
-   The `Player` instance is not destroyed by Roblox when a player leaves - you must manually remove it from normal **and** weak tables
