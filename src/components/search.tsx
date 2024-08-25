import Fuse from "fuse.js/basic";
import { useEffect, useRef, useState } from "react";

import MagnifyingGlass from "@/components/magnifying-glass";

import type { CollectionEntry } from "astro:content";
import type { FuseResult } from "fuse.js/basic";

export type Collection = CollectionEntry<"documents" | "tags">;

interface Properties {
    collection: Collection[];
}

export default function Search(properties: Properties) {
    const container = useRef<HTMLDivElement>(null);
    const bar = useRef<HTMLInputElement>(null);
    const [results, setResults] = useState<FuseResult<Collection>[]>([]);
    const fuse = new Fuse(properties.collection, {
        keys: ["body", "data.title"],
    });

    const hideResultsUponExist = (event: MouseEvent) => {
        if (
            container.current !== null &&
            event.target !== container.current &&
            // @ts-ignore
            !container.current.contains(event.target)
        ) {
            setResults([]);

            if (!bar.current) {
                return;
            }

            bar.current.value = "";
        }
    };

    const search: React.KeyboardEventHandler<HTMLInputElement> = event => {
        setResults(fuse.search(event.currentTarget.value));
    };

    useEffect(() => {
        document.addEventListener("click", hideResultsUponExist);

        return () => document.removeEventListener("click", hideResultsUponExist);
    }, []);

    return (
        <div
            className="w-xs group relative max-w-xs"
            data-has-results={results.length > 0}
            ref={container}
        >
            <div className="box-border flex cursor-default items-center gap-2 rounded-lg bg-black bg-opacity-30 px-2 py-1 transition-colors hover:cursor-text group-data-[has-results=true]:rounded-b-none">
                <MagnifyingGlass className="size-5 stroke-2 text-neutral-200" />

                <input
                    className="bg-transparent text-neutral-300 outline-none"
                    placeholder="Search"
                    onInput={search}
                    ref={bar}
                />
            </div>

            <div className="absolute box-border flex w-full flex-col rounded-b-lg bg-base-100 p-2 text-base-content shadow-2xl group-data-[has-results=true]:visible group-data-[has-results=false]:invisible">
                {results.map((entry, index) => (
                    <a
                        className="box-border rounded-md px-2 py-2 transition-colors hover:bg-neutral-content"
                        href={`/RbxDocs/${entry.item.collection}/${entry.item.slug}`}
                        key={`result-${index + 1}`}
                    >
                        {entry.item.data.title}
                    </a>
                ))}
            </div>
        </div>
    );
}
