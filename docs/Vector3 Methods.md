## Pre-requisites
Before reading this tutorial, you should know about vector3s. An explanation of vector3 exists in the [~~Lua-Learning folder~~](https://docs.rodevs.com//Scripting/Intermediate-Courses/Vector3/) (not anymore). Or check out the Roblox [docs](https://create.roblox.com/docs/reference/engine/datatypes/Vector3#summary-methods).

# Info
In this tutorial, I will teach you what each Vector3 method does and some of its use cases.
# Dot(other: Vector3): Vector3
This method returns the scalar dot product between two vectors. The scalar dot formula is 
```
scalarDot = (x1 * x2) + (y1 * y2) + (z1 * z2)
```
## How is it useful?

Take this script for an example
```lua
local part1 = script.Parent.Part1 -- blue part
local part2 = script.Parent.Part2 -- green part

local dirArrow = script.Parent.Dir 	-- blue/yellow arrow

local function Update()
	-- this will be visualized by the light blue/yellow arrow
	local direction = (part2.Position - part1.Position).Unit

	-- this will be visualized by the black arrow
	local lv = part1.CFrame.lookVector 
	local dotProduct = direction:Dot(lv)

	print("Dot: "..dotProduct)

	if dotProduct > 0 then
		-- if part 1 can see part 2
        --turn blue
		dirArrow.Color = Color3.new(0.0352941, 0.537255, 0.811765)
	else
		-- if part 1 cannot  see part 2
        --turn yellow
		dirArrow.Color = Color3.new(1, 1, 0)
	end
	--makes the direction arrow point toward the direction
	dirArrow.CFrame = CFrame.lookAt(part1.Position + Vector3.new(0,.5,0), part1.Position + Vector3.new(0, .5, 0) + direction)

end


Update()
part2.Changed:Connect(Update)
```
What this script does is if the green part is in a 180-degree view of the blue part, then make the arrow blue. Else make the arrow yellow, which you can see from the gif below. It also prints a value between -1 and 1 if you look at the output on the right side.

![img](https://github.com/haotian2006/HelperDocs-contributions/blob/master/Images/Recording_2023-05-28_at_02.01.59%20(1).gif?raw=true)

This can be very useful in some use cases, such as checking if you are in the field of view of an NPC.


But what if I want the NPC's FOV to be narrower?

What you can do is replace this line

```lua
if dotProduct > 0 then
```
With
```lua
if dotProduct > math.cos(math.rad(MAX_ANGLE)) then
```
![img](https://camo.githubusercontent.com/e025b77c6718ca985e8bb6df3f12d760b5369f42b41b10f5b31b91384b41745a/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3934323633353333333635353333393030382f313131323331363237353331303436393231312f5265636f7264696e675f323032332d30352d32385f61745f30322e34362e34342e676966)

Why the math.cos you may ask?   

Take this image as a reference 

![img](https://camo.githubusercontent.com/3ee7195853ead012c553621e72f6caee10465f6c588446705e3fdc4603b1d063/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3934323633353333333635353333393030382f313131323331333038323639383534333133342f696d6167652e706e67)

The bold black arrow is the lookVector. The blue arrows/rays create the cone shape, whereas the pink curve is the range in which the green part is considered inside, and the red line is the red part in the gif.

!!! info 

    A reminder to everyone that forgot trigonometry, cosine is the x value, and sine is the y value, but in this case, we only care about the x value, which is cosine.

# Angle(other: Vector3, axis: Vector3 | nil ): number
This method returns the angle in radians between two vector3s. If an axis is provided, it will return an angle around the specified axis (default is Vector3.zAxis)

## Example
(without providing axis)
```lua
local part1 = script.Parent.Part1 -- blue part
local part2 = script.Parent.Part2 -- green part

local dirArrow = script.Parent.Dir 	-- blue/yellow arrow


local function Update()
	-- this will be visualized by the light blue/yellow arrow
	local direction = (part2.Position - part1.Position).Unit

	-- this will be visualized by the black arrow 
	local lv = part1.CFrame.lookVector 
	local Angle = direction:Angle(lv)
	
	print("Angle: "..math.deg(Angle))
	
	--makes the direction arrow point toward the direction
	dirArrow.CFrame = CFrame.lookAt(part1.Position + Vector3.new(0, .5, 0), part1.Position + Vector3.new(0, .5, 0) + direction)

end


Update()
part2.Changed:Connect(Update)
```
![img](https://camo.githubusercontent.com/e383ffcf7c93af8665a1645524130dd548e78a3ff8d4d383ae6d2a80831c22e4/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3934323633353333333635353333393030382f313131323332303831373033323836333830342f5265636f7264696e675f323032332d30352d32385f61745f30332e30352e32342e676966 )

(with axis argument = Vector3.xAxis)
![img](https://camo.githubusercontent.com/0e04da3fdae175733bed7a9dd97ca8509aba643f8b1dac0528d35453617fc085/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3934323633353333333635353333393030382f313131323332333636323932363836303337382f5265636f7264696e675f323032332d30352d32385f61745f30332e31362e35342e676966)

!!! info

    You can play around more in the test place that I will link at the bottom.

# FuzzyEq(other: Vector3, epsilon: number): boolean
This method returns true if the given vector3 is within the current vector3 by the epsilon.

## How it works
[Source](https://devforum.roblox.com/t/vector3fuzzyeq-and-its-alias-isclose-return-incorrect-results/726222)
```lua
function fuzzyEq(a, b, epsilon)
	return a == b or math.abs(a - b) <= (math.abs(a) + 1) * epsilon
end

function fuzzyEqVec(v1, v2, epsilon)
	for _, axis in ipairs({"X", "Y", "Z"}) do
		if not fuzzyEq(v1[axis], v2[axis], epsilon) then
			return false
		end
	end
	
	return true
end
```
## Use cases 
You can use it to detect when the player stopped moving using their MoveDirection
```lua

local humanoid: Humanoid = script.Parent.Humanoid

humanoid:GetPropertyChangedSignal("MoveDirection"):Connect(function()
	--if it is close by .001 
	if humanoid.MoveDirection:FuzzyEq(Vector3.zero, .001) then
		print("Player Stopped Moving")
	end

end)
```

# Cross(other: Vector3): Vector3
This method returns the cross product of the two vectors 

## Example 
The blue arrow is the the direction(self), the yellow arrow is the cross(result), the black arrow is the lookVector(other)
```lua
local part1 = script.Parent.Part1 -- blue part
local part2 = script.Parent.Part2 -- green part

local dirArrow = script.Parent.Dir 	-- blue arrow
local crossArrow = script.Parent.Cross 	-- yellow arrow

local function Update()
	-- this will be visualized by the light blue arrow
	local direction = (part2.Position - part1.Position).Unit
	-- this will be visualized by the black arrow 
	local lv = part1.CFrame.lookVector 
	local Cross = direction:Cross(lv)
	print("Cross:", Cross)
	
	--makes the direction arrow point toward the direction
	dirArrow.CFrame = CFrame.lookAt(part1.Position + Vector3.new(0, .5, 0), part1.Position+Vector3.new(0, .5, 0) + direction)
	crossArrow.CFrame = CFrame.lookAt(part1.Position + Vector3.new(0, .5, 0), part1.Position+Vector3.new(0, .5, 0) + Cross)

end


Update()
part2.Changed:Connect(Update)
```
![img](https://camo.githubusercontent.com/0b6645ceb09e81a43ae9c67806d15c59a85068e22c443896175029bdcee2892f/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3934323633353333333635353333393030382f313131323333313135323733333234313431352f5265636f7264696e675f323032332d30352d32385f61745f30332e34362e31362e676966)

# Lerp(goal: Vector3, alpha: number): Vector3
This method returns a Vector3 that is interpolated to the goal by the alpha or percent.

## How it works
```lua
function Lerp(start,goal,alpha)
	return start + (goal - start) * alpha
end

function Vector3Lerp(start,goal,alpha)
	return Vector3.new(
		Lerp(start.X, goal.X, alpha),	
		Lerp(start.Y, goal.Y, alpha),
		Lerp(start.Z, goal.Z, alpha),
	)
end
```
???+ info 
	This also works and is more efficient then the other the way. Because Vector3 has __sub and __add metamethods
	```lua
	function Vector3Lerp(start,goal,alpha)
		return Lerp(start,goal,alpha)
	end
	```
## Use Case
You can use it to make parts move smoothly 
```lua

local start = script.Parent.Part1 -- blue part
local end = script.Parent.Part2 -- green part
local move = script.Parent.Move -- grey part

while true do
	-- lerp forward
	for i = 0, 1, .01 do-- go from 0-1
		task.wait()
		Move.Position = Start.Position:Lerp(End.Position,i)
	end

	task.wait(2)
	-- lerp back
	for i = 0, 1, .01 do -- go from 0-1
		task.wait()
		Move.Position = End.Position:Lerp(Start.Position, i)
	end
	task.wait(2)
	--repeat 
end
```
(gif might be a bit laggy)

![img](https://camo.githubusercontent.com/d0b195fd1e33af0bad2107a42483be4029d14004dfb89de67aa2fcb66a558870/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3934323633353333333635353333393030382f313131323333353637373135383334323732382f5265636f7264696e675f323032332d30352d32385f61745f30342e30342e34332e676966)
!!! Info "Difference between Lerp and TweenService"
	
	Tween service is a roblox Service that only works on Instances while with Lerping you don't need instances and all you need is just two values.
	
# Min(vector: Vector3): Vector3
This method returns a Vector3 with each component being the lowest value for both Vectors
```lua
local vector1 = Vector3.new(5,2,7)
local vector2 = Vector3.new(1,5,3)

print("Min: ", vector2:Min(vector1)) -- "Min: 1,2,3"
```

# Max(vector: Vector3): Vector3
This method returns a Vector3 with each component as the highest for both Vectors
```lua
local vector1 = Vector3.new(5,2,7)
local vector2 = Vector3.new(1,5,3)

print("Max: ", vector2:Min(vector1)) -- "Max: 5,5,7"
```

# Conclusion      
I hope this helps you understand these methods better and what they do. The link to the example will be [here](https://www.roblox.com/games/13576225810/Vector3-Methods). To view the code, simply make a copy of the game by pressing the 3 dots on the top right and clicking edit. Once you are in, you can move the green parts around to see different results. Anyways bye! (It is currently 4:18 AM, I spent 3 hours on this)
