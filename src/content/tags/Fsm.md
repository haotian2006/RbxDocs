---
title: "FSM"
author: "github: 65139606"
---

A Finite State Machine (FSM) is a computation model that's used to design systems with a finite number (limited amount) of states.
At any given moment, the system can be in one of these states and can switch between states based on certain conditions or events, known as transitions.
The benefit of using FSMs is to clearly separate state behaviors making systems easier to manage and understand.

##### Use case:

Consider a system where a npc has 3 states: Idle, Attacking, and Fleeing.

##### In this case:

###### States:

-   idle: npc stands still
-   attacking: npc follows and attacks
-   fleeing: npc runs away

###### Transitions:

-   from idle -> attacking: occurs when a player comes within a detectable range.
-   from attacking -> fleeing: when NPC's health falls below a certain threshold.
-   from fleeing -> idle: when the npc has escaped to a safe distance.

[Example of a FSM Implementation](https://github.com/prooheckcp/RobloxStateMachine)
