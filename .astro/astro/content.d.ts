declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"documents": {
"Basic Methods of Instances.md": {
	id: "Basic Methods of Instances.md";
  slug: "basic-methods-of-instances";
  body: string;
  collection: "documents";
  data: any
} & { render(): Render[".md"] };
"Fixing Errors.mdx": {
	id: "Fixing Errors.mdx";
  slug: "fixing-errors";
  body: string;
  collection: "documents";
  data: any
} & { render(): Render[".mdx"] };
"Inheritance.md": {
	id: "Inheritance.md";
  slug: "inheritance";
  body: string;
  collection: "documents";
  data: any
} & { render(): Render[".md"] };
"Parallel luau.mdx": {
	id: "Parallel luau.mdx";
  slug: "parallel-luau";
  body: string;
  collection: "documents";
  data: any
} & { render(): Render[".mdx"] };
"ProxyTables.mdx": {
	id: "ProxyTables.mdx";
  slug: "proxytables";
  body: string;
  collection: "documents";
  data: any
} & { render(): Render[".mdx"] };
"Testing.mdx": {
	id: "Testing.mdx";
  slug: "testing";
  body: string;
  collection: "documents";
  data: any
} & { render(): Render[".mdx"] };
"Vector3 Methods.md": {
	id: "Vector3 Methods.md";
  slug: "vector3-methods";
  body: string;
  collection: "documents";
  data: any
} & { render(): Render[".md"] };
};
"tags": {
"Animation Ownership.md": {
	id: "Animation Ownership.md";
  slug: "animation-ownership";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Before You Ask.md": {
	id: "Before You Ask.md";
  slug: "before-you-ask";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Beginner Tips.md": {
	id: "Beginner Tips.md";
  slug: "beginner-tips";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Breakdown.md": {
	id: "Breakdown.md";
  slug: "breakdown";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Don't Ask to Ask.md": {
	id: "Don't Ask to Ask.md";
  slug: "dont-ask-to-ask";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Factory Method.md": {
	id: "Factory Method.md";
  slug: "factory-method";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Filtering Enabled.md": {
	id: "Filtering Enabled.md";
  slug: "filtering-enabled";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Fsm.md": {
	id: "Fsm.md";
  slug: "fsm";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Generalised Iteration.md": {
	id: "Generalised Iteration.md";
  slug: "generalised-iteration";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Guard Clause.md": {
	id: "Guard Clause.md";
  slug: "guard-clause";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"How to Print Debug.md": {
	id: "How to Print Debug.md";
  slug: "how-to-print-debug";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Infinite Yield.md": {
	id: "Infinite Yield.md";
  slug: "infinite-yield";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Joe.md": {
	id: "Joe.md";
  slug: "joe";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Latency.md": {
	id: "Latency.md";
  slug: "latency";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"List of Debounces.md": {
	id: "List of Debounces.md";
  slug: "list-of-debounces";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Local Scripts.md": {
	id: "Local Scripts.md";
  slug: "local-scripts";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Managing Connections.md": {
	id: "Managing Connections.md";
  slug: "managing-connections";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Memory Leaks.md": {
	id: "Memory Leaks.md";
  slug: "memory-leaks";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Module Scripts.md": {
	id: "Module Scripts.md";
  slug: "module-scripts";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"New Alternative Methods.md": {
	id: "New Alternative Methods.md";
  slug: "new-alternative-methods";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"No DM Help.md": {
	id: "No DM Help.md";
  slug: "no-dm-help";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Partitioning.md": {
	id: "Partitioning.md";
  slug: "partitioning";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Pass by value vs reference.md": {
	id: "Pass by value vs reference.md";
  slug: "pass-by-value-vs-reference";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"PlayerAdded in Studio.md": {
	id: "PlayerAdded in Studio.md";
  slug: "playeradded-in-studio";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Prefabrication.md": {
	id: "Prefabrication.md";
  slug: "prefabrication";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Race Condition.md": {
	id: "Race Condition.md";
  slug: "race-condition";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Recommended Modules.md": {
	id: "Recommended Modules.md";
  slug: "recommended-modules";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Remote Events.md": {
	id: "Remote Events.md";
  slug: "remote-events";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Remote Functions.md": {
	id: "Remote Functions.md";
  slug: "remote-functions";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Rubber Duck Debugging.md": {
	id: "Rubber Duck Debugging.md";
  slug: "rubber-duck-debugging";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Scripting Tutorials.md": {
	id: "Scripting Tutorials.md";
  slug: "scripting-tutorials";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Server Scripts.md": {
	id: "Server Scripts.md";
  slug: "server-scripts";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Timing Methods.md": {
	id: "Timing Methods.md";
  slug: "timing-methods";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Tutorial Hell.md": {
	id: "Tutorial Hell.md";
  slug: "tutorial-hell";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Unique Random Value.md": {
	id: "Unique Random Value.md";
  slug: "unique-random-value";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Unique Random Values.md": {
	id: "Unique Random Values.md";
  slug: "unique-random-values";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"VSCode Recommended Extensions.md": {
	id: "VSCode Recommended Extensions.md";
  slug: "vscode-recommended-extensions";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Variable.md": {
	id: "Variable.md";
  slug: "variable";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"What Should I Make.md": {
	id: "What Should I Make.md";
  slug: "what-should-i-make";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"What are Frameworks.md": {
	id: "What are Frameworks.md";
  slug: "what-are-frameworks";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"What is return.md": {
	id: "What is return.md";
  slug: "what-is-return";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"When to use AI.md": {
	id: "When to use AI.md";
  slug: "when-to-use-ai";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"When to use Knit.md": {
	id: "When to use Knit.md";
  slug: "when-to-use-knit";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"When to use Paradigms.md": {
	id: "When to use Paradigms.md";
  slug: "when-to-use-paradigms";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"Why External Editors.md": {
	id: "Why External Editors.md";
  slug: "why-external-editors";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
"a test Tag.md": {
	id: "a test Tag.md";
  slug: "a-test-tag";
  body: string;
  collection: "tags";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
