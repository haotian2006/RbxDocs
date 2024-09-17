---
title: "Pass by value vs reference"
author: "github: 65139606"
---

Variables can be passed by value or by reference depending on their data type.

-   Pass by value:
    -   Numbers and other primitive data types are passed by value. When you assign a number to another variable or pass it to a function, a copy of the value is created. Any changes made to the copy do not affect the original value.
-   Pass by reference:
    -   Tables, on the other hand, are passed by reference. When you assign a table to another variable or pass it to a function, you're passing a reference to the original table in memory. So, changes made to the table through the new variable or function will directly affect the original table.

Below is an example of a variable being overwritten, instead of the value being changed:

```lua
local coins = player.leaderstats.Coins.Value
coins = 5
```

Here is the correct way to do it:

```lua
local coins = player.leaderstats.Coins
coins.Value = 5
```
