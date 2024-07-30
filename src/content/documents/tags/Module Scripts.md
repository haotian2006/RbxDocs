---
title: "Module Scripts"
info: "a"
---

Module scripts (or modules) normally contain code that does not run until they have been `require`d. The code you write will run under the same restrictions as the type of script requiring it, meaning:

-   Modules required by local scripts will run their code as if it were a local script
-   Modules required by server scripts will run their code as if it were a server script

Modules can be stored inside any type of script, though the recommended places to store them are:

-   `StarterPlayerScripts` or `StarterCharacterScripts` - for modules required by local scripts
-   `ServerScriptService` or `ServerStorage` - for modules required by server scripts
-   `ReplicatedStorage` - for modules required by local **_and_** server scripts
