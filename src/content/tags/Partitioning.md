---
title: "Partitioning"
author: "github: 63274991"
---

When defining a lot of variables or having a lot of code as 1 block, it can be hard to read and confusing to those trying to help you.

Partitioning is where you group up code by adding spacing around related blocks, allowing you to better organise what you have already defined. Here is an example with variables you normally define at the start of most scripts:

```lua
-- Services (you use these)
local ContextActionService = game:GetService("ContextActionService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

-- Third-Party Modules (you rely on these so you can write less)
local RaycastVisual = require(ReplicatedStorage.RaycastVisual)

-- Local Modules (you made these so you can write less/organise)
local Context = require(ReplicatedStorage.Utils.Context)
local CustomPlayer = require(ReplicatedStorage.CustomPlayer)
local CustomRaycastParams = require(ReplicatedStorage.CustomRaycastParams)
local Types = require(ReplicatedStorage.Utils.Types)

-- Local variables (you use these)
local player = CustomPlayer.get()
local Movement = {}

-- Types (you use these)
type UnitVector = Vector3
type ActionHandler = (string, Enum.UserInputState, InputObject) -> Enum.ContextActionResult
```
