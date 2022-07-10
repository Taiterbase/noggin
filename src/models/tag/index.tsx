export type Tag = {
    id: string;
    last_modified: Date;
}

export type TagProviderValues = {
    createTag: (tag: Tag) => Promise<boolean>;
    readTags: () => Promise<Tag[]>;
    updateTag: (tag: Tag) => Promise<boolean>;
    deleteTag: (tag: Tag) => Promise<boolean>;
}