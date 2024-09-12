---
title: "Generalised Iteration"
author: "github: 63274991"
---

Since the new metamethod `__iter` was added to every table, all tables can be used as the iterator within for loops, making `pairs` and `ipairs` redundant.

Here's an example:

```lua
local array = {1, 2, 3}
local dictionary = {a = 1, b = 2, c = 3}

-- old
for index, value in ipairs(array) do
    print(index, value)
end

for key, value in pairs(dictionary) do
    print(key, value)
end

-- new
for index, value in array do
    print(index, value)
end

for key, value in dictionary do
    print(key, value)
end
```
