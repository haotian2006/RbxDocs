---
title: "What is return"
---

Picture a waiter asking to take down your order. The waiter's job is to relay that information to the kitchen who will produce the meal and have it brought to your table.

```lua
-- You tell the waiter what you want by calling the function with specific instructions.
local function add(x, y)
    -- 'add' receives your 'order' (x and y).

    -- After your meal is prepared, the waiter brings it back to you. This is what the return keyword does in a function.
    return x + y -- returns the sum of x and y
end

local sum = add(5, 3)
print(sum)  -- Outputs: 8
```
