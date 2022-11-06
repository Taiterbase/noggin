import { invoke } from '@tauri-apps/api/tauri';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { useTag } from "providers/tags-provider";
import HeaderTag from 'components/tag';
import { Tag } from 'models/tag';

export default function TagsHeader(props: { title?: string }) {
    const useTags = useTag();
    const { title } = props;
    const router = useRouter();
    const [path, setPath] = useState(null);
    const [tags, setTags] = useState<Tag[]>([]);

    useEffect(() => {
        useTags.readTags().then((res) => {
            setTags(res ?? []);
        }).catch(e => {
            console.error(e);
        })
    }, []);

    return (
        <div key="header" className="flex flex-shrink-0 select-none z-30 min-w-[8rem] w-[10rem] max-w-[20rem] min-h-full bg-sky-100 ">
            {/* Tags header */}
            <div className="h-screen w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">

                <div className="p-2">
                    <HeaderTag all />
                    <HeaderTag />
                </div>
                <div>
                    {tags.map((tag, i) => {
                        return <HeaderTag tag={tag} />
                    })}
                </div>
            </div>
        </div >
    );
}