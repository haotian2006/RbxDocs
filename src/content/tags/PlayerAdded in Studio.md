---
title: "PlayerAdded in Studio"
---

 
The `PlayerAdded` event in studio does not always fire on time, sometimes it is so fast that the functions you connect to the event never get the chance to run.

This is only a studio issue and can be fixed by running your `PlayerAdded` function for every player currently in the game *after* connecting your functions to the event.

[Here](https://github.com/cyrus01337/snippets/blob/luau/StudioPlayerAdded.lua) is an example demonstration.