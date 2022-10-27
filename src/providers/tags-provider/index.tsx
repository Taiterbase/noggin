import { invoke } from "@tauri-apps/api/tauri";
import { Tag, TagProviderValues } from "models/tag";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const TagsContext = createContext<TagProviderValues>(null);

export function TagsProvider(props: { children: ReactNode }) {
    const [tags, setTags] = useState<Tag[]>([])
    const { children } = props;

    useEffect(() => {
        /* invoke("get_tags").then(res => {
            console.log("result: ", res);
        }).catch(e => {
            console.error(e);
        }) */
    }, []);

    const createTag = (tag: Tag): Promise<boolean> => {
        return new Promise((res, err) => {
            invoke("create_tag", tag).then(r => {
                console.log(r);
                res(true);
            }).catch(e => {
                console.error(e);
                err(e);
            })
        })
    }

    const readTags = (): Promise<Tag[]> => {
        return new Promise((res, err) => {
            invoke("read_tags", {}).then(res => {
                console.log(res);
            })
            res(null);
        });
    }

    const updateTag = (): Promise<boolean> => {
        return new Promise((res, err) => {
            res(true);
        });
    }

    const deleteTag = (tag: Tag): Promise<boolean> => {
        return new Promise((res, err) => {
            res(true);
        });
    }


    // list of values associated with the provider. like an interface..
    const values: TagProviderValues = {
        createTag,
        readTags,
        updateTag,
        deleteTag
    };

    return (
        <TagsContext.Provider value={values}>{children}</TagsContext.Provider>
    );
}

// useMap is the context hook
export const useTag = () => {
    const context = useContext(TagsContext);
    if (context === undefined) {
        throw new Error("`useTag` hook must be used within a `TagsContext` component.");
    }
    return context;
};