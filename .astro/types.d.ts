declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
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

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
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
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
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
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"documents": {
"docs/Basic Methods of Instances.md": {
	id: "docs/Basic Methods of Instances.md";
  slug: "docs/basic-methods-of-instances";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"docs/Fixing Errors.md": {
	id: "docs/Fixing Errors.md";
  slug: "docs/fixing-errors";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"docs/Inheritance.md": {
	id: "docs/Inheritance.md";
  slug: "docs/inheritance";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"docs/Parallel luau.md": {
	id: "docs/Parallel luau.md";
  slug: "docs/parallel-luau";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"docs/ProxyTables.md": {
	id: "docs/ProxyTables.md";
  slug: "docs/proxytables";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"docs/Vector3 Methods.md": {
	id: "docs/Vector3 Methods.md";
  slug: "docs/vector3-methods";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"index.md": {
	id: "index.md";
  slug: "index";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Animation Ownership.md": {
	id: "tags/Animation Ownership.md";
  slug: "tags/animation-ownership";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Before You Ask.md": {
	id: "tags/Before You Ask.md";
  slug: "tags/before-you-ask";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Beginner Tips.md": {
	id: "tags/Beginner Tips.md";
  slug: "tags/beginner-tips";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Breakdown.md": {
	id: "tags/Breakdown.md";
  slug: "tags/breakdown";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Don't Ask to Ask.md": {
	id: "tags/Don't Ask to Ask.md";
  slug: "tags/dont-ask-to-ask";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Factory Method.md": {
	id: "tags/Factory Method.md";
  slug: "tags/factory-method";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Filtering Enabled.md": {
	id: "tags/Filtering Enabled.md";
  slug: "tags/filtering-enabled";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Generalised Iteration.md": {
	id: "tags/Generalised Iteration.md";
  slug: "tags/generalised-iteration";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Guard Clause.md": {
	id: "tags/Guard Clause.md";
  slug: "tags/guard-clause";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/How to Print Debug.md": {
	id: "tags/How to Print Debug.md";
  slug: "tags/how-to-print-debug";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Infinite Yield.md": {
	id: "tags/Infinite Yield.md";
  slug: "tags/infinite-yield";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Latency.md": {
	id: "tags/Latency.md";
  slug: "tags/latency";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/List of Debounces.md": {
	id: "tags/List of Debounces.md";
  slug: "tags/list-of-debounces";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Local Scripts.md": {
	id: "tags/Local Scripts.md";
  slug: "tags/local-scripts";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Managing Connections.md": {
	id: "tags/Managing Connections.md";
  slug: "tags/managing-connections";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Memory Leaks.md": {
	id: "tags/Memory Leaks.md";
  slug: "tags/memory-leaks";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Module Scripts.md": {
	id: "tags/Module Scripts.md";
  slug: "tags/module-scripts";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/New Alternative Methods.md": {
	id: "tags/New Alternative Methods.md";
  slug: "tags/new-alternative-methods";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/No DM Help.md": {
	id: "tags/No DM Help.md";
  slug: "tags/no-dm-help";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Partitioning.md": {
	id: "tags/Partitioning.md";
  slug: "tags/partitioning";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Pass by value vs reference.md": {
	id: "tags/Pass by value vs reference.md";
  slug: "tags/pass-by-value-vs-reference";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/PlayerAdded in Studio.md": {
	id: "tags/PlayerAdded in Studio.md";
  slug: "tags/playeradded-in-studio";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Prefabrication.md": {
	id: "tags/Prefabrication.md";
  slug: "tags/prefabrication";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Race Condition.md": {
	id: "tags/Race Condition.md";
  slug: "tags/race-condition";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Recommended Modules.md": {
	id: "tags/Recommended Modules.md";
  slug: "tags/recommended-modules";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Remote Events.md": {
	id: "tags/Remote Events.md";
  slug: "tags/remote-events";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Remote Functions.md": {
	id: "tags/Remote Functions.md";
  slug: "tags/remote-functions";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Rubber Duck Debugging.md": {
	id: "tags/Rubber Duck Debugging.md";
  slug: "tags/rubber-duck-debugging";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Scripting Tutorials.md": {
	id: "tags/Scripting Tutorials.md";
  slug: "tags/scripting-tutorials";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Server Scripts.md": {
	id: "tags/Server Scripts.md";
  slug: "tags/server-scripts";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Timing Methods.md": {
	id: "tags/Timing Methods.md";
  slug: "tags/timing-methods";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Tutorial Hell.md": {
	id: "tags/Tutorial Hell.md";
  slug: "tags/tutorial-hell";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Unique Random Value.md": {
	id: "tags/Unique Random Value.md";
  slug: "tags/unique-random-value";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Unique Random Values.md": {
	id: "tags/Unique Random Values.md";
  slug: "tags/unique-random-values";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/VSCode Recommended Extensions.md": {
	id: "tags/VSCode Recommended Extensions.md";
  slug: "tags/vscode-recommended-extensions";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Variable.md": {
	id: "tags/Variable.md";
  slug: "tags/variable";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/What Should I Make.md": {
	id: "tags/What Should I Make.md";
  slug: "tags/what-should-i-make";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/What are Frameworks.md": {
	id: "tags/What are Frameworks.md";
  slug: "tags/what-are-frameworks";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/What is return.md": {
	id: "tags/What is return.md";
  slug: "tags/what-is-return";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/When to use AI.md": {
	id: "tags/When to use AI.md";
  slug: "tags/when-to-use-ai";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/When to use Knit.md": {
	id: "tags/When to use Knit.md";
  slug: "tags/when-to-use-knit";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/When to use Paradigms.md": {
	id: "tags/When to use Paradigms.md";
  slug: "tags/when-to-use-paradigms";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
"tags/Why External Editors.md": {
	id: "tags/Why External Editors.md";
  slug: "tags/why-external-editors";
  body: string;
  collection: "documents";
  data: InferEntrySchema<"documents">
} & { render(): Render[".md"] };
};
"tags": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "tags";
  data: any;
  render(): Render[".md"];
}>;

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../src/content/config.js");
}
