# Basic Methods of Instances

## AddTag(tag: string): void
 This method adds a tag to the instance which can be used by [CollectionService](https://create.roblox.com/docs/reference/engine/classes/CollectionService) using CollectionService:GetAllTags(). This method also invokes CollectionService:GetInstanceAddedSignal().

```lua
local cs = game:GetService("CollectionService") 
local part = Instance.new("Part",workspace) 
part:AddTag("MyTag") 
print(part:HasTag("MyTag")) --> true
print(cs:GetTagged("MyTag")) --> {Part}
```

## HasTag(tag: string): boolean
returns true/false if the instance has the give tag
## RemoveTag(tag: string): void
This method removes the a tag set to the instance.
## Clone(): Instance
Creates a Copy of the Instance and its Children. The Parent of the cloned Instance will be set to nil. 
## Destroy(): void
Sets the Parent property to nil, but unlike the Remove() method, Destroy() locks the parent and disconnects all connections. This will also call the Destroy methods of the children as well.

!!! info What does locking the parent mean
    Locking the parent means that the object cannot be reused and if you try to re-set the parent you will get the error: <span style="color:red"> The Parent property of [Instance] is locked, current parent: NULL, new parent [Instance]  </span>.
## WaitForChild(childName: String, timeOut: number): Instance
Returns the child of the Instance with the given name. If the child does not exist it will yield the code for the duration of timeOut (if not given default to 5) or until it exist. If timeOut is reached and the child still does not exist, if will send an warning: <span style="color:yellow"> Infinite yield possible on: [line]  </span>.


## FindFirstChild(name: string, recursive: boolean): Instance
This will return the first child with the given name, if no child with the name is found then it will return nil. If given a 2nd argument is true then it will check the children of the children... aka the descendants. 

```lua
local part1 = Instance.new("Part")
local part2 = Instance.new("Part",part1)
part2.Name = "Part2"
local part3 = Instance.new("Part",part2)
part3.Name = "Part3"
print(part1:FindFirstChild("Part2")) --> Part2, Part2 is a child of part1
print(part1:FindFirstChild("Part3")) --> nil, Part is not a child of part1
print(part1:FindFirstChild("Part3",true)) --> Part3, this returns Part3 because we told it to find the descendants of the part as well 
```

!!! info WaitForChild vs FindFirstChild
    WaitForChild is used when you are not sure if a child exists such as when replicating  stuff

## FindFirstAncestor(name: string): Instance
This will return the first ancestor(parent of the parent of the parent...) with the given name. If no ancestor with the name is found then return nil.

```lua
local part1 = Instance.new("Part")
part1.Name = "ParentPart"
local part2 = Instance.new("Part",part1)
part2.Name = "ChildPart"
local part3 = Instance.new("Part",part2)
part3.Name = "SubChildPart"

print(part3:FindFirstAncestor("ChildPart")) --> ChildPart
print(part3:FindFirstAncestor("ParentPart")) --> ParentPart
print(part3:FindFirstAncestor("Parent")) --> nil, part3 has no ancestor is named Parent 
```
## SetAttribute(attribute: string, value: Variant): void
Sets the given attribute to the given value. If value is nil then the Attribute will be removed.

```lua
local part = Instance.new("Part") 
part:SetAttribute("Health",20) 
print(part:GetAttribute("Health")) --> 20
```

!!! warning Limitations
    Naming requirements and restrictions:
    
    - Names must only use alphanumeric characters and underscore
    - No spaces or unique symbols are allowed
    - Strings must be 100 characters or less
    - Names are not allowed to start with RBX unless the caller is a Roblox core-script (reserved for Roblox)
## GetAttribute(attribute: string): Variant
This will return the value stored in the given attributes, nil if the attribute does not exist 

## GetChildren(): Objects
Returns and array of all the children under the Instance. 

## GetDescendants: Objects
Similar to GetChildren() but returns an array with the Children of the Children of the Children as well.

## GetPropertyChangedSignal(property: string): RBXScriptSignal
Returns an event which fires when the given property is modified

!!! Warning 
    GetPropertyChangedSignal will not fire if the Property being changed is being updated via Physics. Ex: trying to detect if a Player moved by doing GetPropertyChangedSignal("Position"). This will not fire when the player moves because the player is moved using Physics.

## IsA(className: string):boolean
Returns true if the Instance class matches or is a sub-class of the given class

```lua
local part = Instance.new("Part")
print(part:IsA("Part")) --> true, Part is a Part
print(part:IsA("BasePart")) --> true, Part is a sub-class of BasePart
print(part:IsA("Model")) --> false, part is not a model  
```


