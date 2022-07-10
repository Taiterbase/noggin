import NotesHeader from "components/headers/notes";
import { getLayout as TagsLayout } from "layouts/tags";
import { ReactNode, useEffect } from "react";
export function NotesLayout(props: { children: ReactNode; }) {
    const { children } = props;

    useEffect(() => {
        console.log("Notes Layout")
    }, [])

    return (
        <>
            <NotesHeader />
            <div className="flex flex-grow flex-col overflow-x-auto">
                <main className="bg-amber-50 h-screen flex flex-col justify-start">
                    {children}
                </main>
            </div>
        </>
    )
}

export function getLayout(page: ReactNode) {
    return TagsLayout(<NotesLayout>{page}</NotesLayout>)
}