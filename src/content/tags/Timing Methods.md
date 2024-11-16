---
title: "Timing Methods"
author: "github: 63274991"
---

Below is a graph detailing when to use which time measurement functions:
| Method | Resolution | Runs backwards | Relative to | Cost | Lags if simulation lags | 1:1 real time | Constant during frame | Usage |
|--------------------------------|----------------|----------------|----------------------------|---------------------------------|--------------------------|---------------|-----------------------|-------------------------------------|
| `os.clock()` | 1 µs | No | Nothing | Cheap, maybe a touch slower | No | Yes | No | High precision micro profile |
| `os.time()` | 1 second | No | UNIX Epoch | Cheap | No | Yes | No | Get real UNIX timestamp |
| `tick()` | 1 µs - sometimes? | Yes | UNIX Epoch (Sometimes) | Cheap | No | Yes | No | Don't use, prefer `os.clock()` |
| `workspace.DistributedGameTime`| 1/60 | No | On game start | Requires reflection? | Yes | No | Yes | Don't use |
| `time()` | 1/?? | No | On game start | Cheap | Yes | No | Yes | For consistent simulation step |
| `RunService.Heartbeat(dt)` | 1/240 | No | N/A | Expensiveish, given in a loop | Yes | No | Yes | Equivalent to `time()`? |
| `RunService.Stepped(time, dt)` | 1/241 | No | time is "On game start" | Expensiveish, given in a loop | Yes | No | Yes | Equivalent to `time()`? |

[Source](https://devforum.roblox.com/t/luau-recap-june-2020/632346/14?u=haotian2006)
