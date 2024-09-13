---
title: "What is a Finite State Machine (FSM)"
author: "github: 65139606"
---

A Finite State Machine (FSM) is a computation model that's used to design systems with a finite number (limited amount) of states.
At any given moment, the system can be in one of these states and can switch between states based on certain conditions or events, known as transitions.
The benefit of using FSMs is to clearly separate state behaviors making systems easier to manage and understand.

##### Use case:

Consider a NPC system with 3 actions: Idle, Attacking, Fleeing.

##### In this case:

###### States:

-   Idle: NPC stands still.
-   Attacking: NPC follows and attacks.
-   Fleeing: NPC runs away.

###### Transitions:

-   From Idle -> Attacking: Occurs when a player comes within a detectable range.
-   From Attacking -> Fleeing: When NPC's health falls below a certain threshold.
-   From Fleeing -> Idle: When the npc has escaped to a safe distance.

Example:

main

```lua
local StateMachine = require(script.Parent.StateMachine)
local NPCStates = StateMachine.CreateMachine()

local Idle = NPCStates:State({
	Name = "Idle",

	OnEnter = function(entity, fsm)
	end,

	OnExit = function(entity, fsm)
	end,
})

local Attacking = NPCStates:State({
	Name = "Attacking",

	OnEnter = function(entity, fsm)
	end,

	OnExit = function(entity, fsm)
	end,
})

NPCStates:Transition("Idle")
```

state machine

```lua
--!strict
type StateConfig = {
	Name: string,
	OnEnter: (any, StateMachine) -> (),
	OnExit: (any, StateMachine) -> (),
}

type StateMachine = {
	states: { [string]: StateConfig },
	currentState: string?,
	State: (StateMachine, StateConfig) -> (),
	Transition: (StateMachine, string, any) -> (),
}

local StateMachine = {}

function StateMachine.CreateMachine(): StateMachine
	local fsm: StateMachine = {
		states = {},
		currentState = nil,
		State = function(self, stateConfig: StateConfig)
			assert(self.states[stateConfig.Name] == nil, "State already exists: " .. stateConfig.Name)
			self.states[stateConfig.Name] = stateConfig
		end,
		Transition = function(self, stateName, entity)
			local state = self.states[stateName]
			assert(state ~= nil, "State " .. stateName .. " does not exist.")

			if self.currentState then
				self.states[self.currentState].OnExit(self, entity)
			end

			self.currentState = stateName
			state.OnEnter(self, entity)
		end,
	}
	return fsm
end

return StateMachine
```
