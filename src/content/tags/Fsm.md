---
title: "FSM"
author: "github: 65139606"
---

A Finite State Machine (FSM) is a computation model that's used to design systems with a finite number (limited amount) of states.
At any given moment, the system can be in one of these states and can switch between states based on certain conditions or events, known as transitions.
The benefit of using FSMs is to clearly separate state behaviors making systems easier to manage and understand.

##### Use case:
Consider a system where a npc has 3 states: Idle, Attacking, Fleeing.

##### In this case:

###### States:

-   Idle: NPC stands still.
-   Attacking: NPC follows and attacks.
-   Fleeing: NPC runs away.

###### Transitions:

-   From Idle -> Attacking: Occurs when a player comes within a detectable range.
-   From Attacking -> Fleeing: When NPC's health falls below a certain threshold.
-   From Fleeing -> Idle: When the npc has escaped to a safe distance.

[Example of a FSM Implementation](https://github.com/prooheckcp/RobloxStateMachine)