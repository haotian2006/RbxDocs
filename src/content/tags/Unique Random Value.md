---
title: "Unique Random Value"
---

 
Generate a random index that ranges from 1 to the current size of the **array**, which can be used to get the first/last element, or any element between that range:
```lua
-- for arrays
local array = {"a", "b", "c"}
local randomIndex = math.random(#array)
local randomElement = array[randomIndex]

-- for dictionaries - make an array of keys
local dictionary = {
	foo = "a",
	bar = "b",
	baz = "c",
}
local keys = {"foo", "bar", "baz"}  -- or loop if large
local randomIndex = math.random(#keys)
local randomElement = array[randomIndex]

...
```