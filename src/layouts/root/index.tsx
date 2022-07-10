
import TitleBar from "components/title-bar";
import Head from "next/head";
import { NotesProvider } from "providers/notes-provider";
import { TagsProvider } from "providers/tags-provider";
import { ReactNode } from "react";

export function RootLayout(props: { children: ReactNode; }) {
    const { children } = props;
    return (
        <NotesProvider>
            <TagsProvider>
                <Head>
                    <title>noggin</title>
                    <meta name="og:title" content="Noggin" key="title" />
                </Head>
                <TitleBar />
                {children}
            </TagsProvider>
        </NotesProvider>
    )
}

export function getLayout(page: ReactNode) {
    return <RootLayout>{page}</RootLayout>
}