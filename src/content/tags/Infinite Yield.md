---
title: "Infinite Yield"
---

 
`Infinite yield possible` is a **warning** produced when you are waiting for a child to load in for potentially too long. Because it is a warning (orange text), it normally does not stop your script compared to errors (red text).

If your script has stopped running due to this warning, this is caused by:
- Waiting in the wrong parent
- Waiting with the wrong/typo'd name
- Waiting for a child that has not been created yet by another script
- A combination of the above