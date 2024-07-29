---
title: "Guard Clause"
---

Guard clauses are assertions/if statements followed by a return to prevent the rest of the code from running. They're normally used in cases where you want to prevent data that doesn't match a certain criteria from causing issues when it is processed.

Here is an example:

```lua
local function add(x, y)
	-- if x and y aren't numbers, we return early to prevent
	-- any errors
    if typeof(x) ~= "number" or typeof(y) ~= "number" then
        return
    end

    -- now that we are here, x and y are confirmed to be numbers
	-- now we can treat them as such
    return x + y
end

local goodSum = add(2, 3) -- returns 5
local badSum = add("foo", 9) -- returns nothing

...
```
