---
title: "Race Condition"
author: "github: 63274991"
---

When you tried to access e.g. `workspace.Baseplate`, you received an error stating that it couldn't be found. This is called a race condition and can cause confusion when `workspace.Baseplate` is shown to exist in Explorer - this is because you tried to access something before it even exists/has loaded in.

You can avoid this race condition by waiting for it to load before using it:

```lua
local baseplate = workspace:WaitForChild("Baseplate")

print(baseplate, "now exists")
```
