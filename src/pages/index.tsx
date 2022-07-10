import { invoke } from "@tauri-apps/api/tauri";
import { getLayout as NotesLayout } from "layouts/notes"; // effectively getLayout from layouts/home
import { useEffect } from "react";

function HomePage(props: any) {
    return (
        <div>
            <p>
                This is where the markdown editor will go!

                For now, we can make this a sweet cute design and fill it with

                cute pictures and other cute things to be cute.
            </p>
        </div>
    )
}

HomePage.getLayout = NotesLayout;
export default HomePage;