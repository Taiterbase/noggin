import TagsHeader from "components/tag-header";
import { getLayout as getRootLayout } from "layouts/root";
import { ReactNode, useEffect, useState } from "react";
export function TagsLayout(props: { children: ReactNode; }) {
    const { children } = props;
    const [tagHeaderEnabled, setTagHeaderEnabled] = useState(false);

    useEffect(() => {
        console.log("Tags Layout")
    }, [])

    return (
        <div className="flex flex-row overscroll-none">
            {tagHeaderEnabled && <TagsHeader />}
            {children}
        </div>
    )
}

export function getLayout(page: ReactNode) {
    return getRootLayout(<TagsLayout>{page}</TagsLayout>)
}