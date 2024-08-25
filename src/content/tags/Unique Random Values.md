---
title: "Unique Random Values"
---

1. Make a copy of the **array**
2. Grab a random element from the table, then remove it from the copy
3. Repeat step 2 `n` times for `n` random elements

```lua
local TOTAL_UNIQUE_ELEMENTS = 3
local array = {"foo", "bar", "baz", "quo"}
local copy = table.clone(array)
local uniqueElements = {}

for i = 1, TOTAL_UNIQUE_ELEMENTS do
	local randomIndex = math.random(#copy)
	local randomElement = array[randomIndex]

	table.insert(uniqueElements, randomElement)
	table.remove(copy, randomIndex)
end

...
```
